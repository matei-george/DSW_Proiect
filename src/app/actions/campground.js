"use server";

import dbConnect from "../../../lib/mongodb";
import CampGround from "../../../models/CampGround";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- FUNCȚIE HELPER PENTRU GEOCODING (MAPBOX) ---
async function getCoordinates(location) {
   try {
      const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxToken}`);
      const geoData = await response.json();

      // Dacă Mapbox găsește locația, returnăm coordonatele [longitudine, latitudine]
      if (geoData.features && geoData.features.length > 0) {
         return geoData.features[0].geometry.coordinates;
      }

      // Fallback în cazul în care nu găsește nimic (centrul României)
      return [25.0, 45.0];
   } catch (error) {
      console.error("Eroare Geocoding:", error);
      return [25.0, 45.0];
   }
}

// 1. FUNCȚIE PENTRU ȘTERGERE
export async function deleteCampground(id) {
   const session = await getServerSession(authOptions);
   if (!session) throw new Error("Neautorizat");

   await dbConnect();

   const campground = await CampGround.findById(id);

   if (!campground || campground.author.toString() !== session.user.id) {
      throw new Error("Nu ai permisiunea să ștergi acest camping.");
   }

   await CampGround.findByIdAndDelete(id);

   revalidatePath("/dashboard");
   revalidatePath("/campgrounds");
   return { success: true };
}

// 2. FUNCȚIE PENTRU CREARE (CU GEOCODING REAL)
export async function createCampground(formData) {
   const session = await getServerSession(authOptions);

   if (!session || session.user.role !== "owner") {
      throw new Error("Doar proprietarii pot adăuga campinguri.");
   }

   const location = formData.get("location");

   // Obținem coordonatele reale bazate pe locația introdusă
   const coordinates = await getCoordinates(location);

   await dbConnect();

   const newCamp = new CampGround({
      title: formData.get("title"),
      location: location,
      price: Number(formData.get("price")),
      description: formData.get("description"),
      images: [{ url: formData.get("imageUrl"), filename: "preview" }],
      author: session.user.id,
      geometry: {
         type: "Point",
         coordinates: coordinates, // Salvează coordonatele dinamice
      },
   });

   await newCamp.save();

   revalidatePath("/campgrounds");
   revalidatePath("/dashboard");
   redirect("/dashboard");
}

// 3. FUNCȚIE PENTRU ACTUALIZARE (CU GEOCODING REAL)
export async function updateCampground(id, formData) {
   const session = await getServerSession(authOptions);
   if (!session || session.user.role !== "owner") throw new Error("Neautorizat");

   const location = formData.get("location");

   // Recalculăm coordonatele în cazul în care locația a fost schimbată
   const coordinates = await getCoordinates(location);

   await dbConnect();

   const campground = await CampGround.findById(id);

   if (!campground || campground.author.toString() !== session.user.id) {
      throw new Error("Nu ai permisiunea să modifici acest camping.");
   }

   // Actualizăm câmpurile
   campground.title = formData.get("title");
   campground.location = location;
   campground.price = Number(formData.get("price"));
   campground.description = formData.get("description");
   campground.geometry.coordinates = coordinates; // Actualizăm poziția pe hartă

   if (formData.get("imageUrl")) {
      campground.images[0] = { url: formData.get("imageUrl"), filename: "updated" };
   }

   await campground.save();

   revalidatePath(`/campgrounds/${id}`);
   revalidatePath("/dashboard");
   revalidatePath("/campgrounds");
   redirect("/dashboard");
}
