"use server";

import dbConnect from "../../../lib/mongodb";
import Story from "../../../models/Story";
import { getServerSession } from "next-auth/next"; // Importă getServerSession
import { authOptions } from "../../../lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStory(formData) {
   await dbConnect();

   // În NextAuth v4, așa obținem sesiunea pe server în App Router
   const session = await getServerSession(authOptions);

   if (!session) {
      throw new Error("Trebuie să fii autentificat pentru a posta o poveste.");
   }

   const title = formData.get("title");
   const body = formData.get("body");
   const campground = formData.get("campground");
   const imageUrl = formData.get("imageUrl");

   const newStory = new Story({
      title,
      body,
      author: session.user.id, // ID-ul vine din callback-ul jwt/session configurat
      campground: campground || null,
      images: imageUrl ? [{ url: imageUrl }] : [],
   });

   await newStory.save();

   revalidatePath("/stories");
   redirect("/stories");
}

// Adăugăm și funcția pentru Dashboard
export async function getUserStories() {
   await dbConnect();
   const session = await getServerSession(authOptions);

   if (!session) return [];

   const stories = await Story.find({ author: session.user.id }).sort({ createdAt: -1 }).lean();

   return JSON.parse(JSON.stringify(stories));
}

export async function updateStory(id, formData) {
   await dbConnect();

   const updateData = {
      title: formData.get("title"),
      body: formData.get("body"),
      campground: formData.get("campground") || null,
      images: [{ url: formData.get("imageUrl") }],
   };

   await Story.findByIdAndUpdate(id, updateData);

   revalidatePath(`/stories/${id}`);
   revalidatePath("/stories");
   redirect(`/stories/${id}`);
}

export async function deleteStory(id) {
   await dbConnect();
   await Story.findByIdAndDelete(id);

   revalidatePath("/stories");
   redirect("/stories");
}
