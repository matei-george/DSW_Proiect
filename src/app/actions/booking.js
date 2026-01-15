"use server";

import dbConnect from "../../../lib/mongodb";
import Booking from "../../../models/Booking";
import { getServerSession } from "next-auth"; // Importă funcția de sesiune
import { authOptions } from "../../../lib/auth";
import CampGround from "../../../models/CampGround";

export async function getBookedDates(campgroundId) {
   await dbConnect();

   /// Căutăm în tabelul corect unde webhook-ul a salvat datele
   const reservations = await Booking.find({
      campground: campgroundId,
      status: "paid",
   }).select("checkIn checkOut");

   // Transformăm datele pentru DatePicker
   return reservations.map((res) => ({
      start: new Date(res.checkIn),
      end: new Date(res.checkOut),
   }));
}

export async function getUserBookings() {
   const session = await getServerSession(authOptions);
   if (!session) return [];

   await dbConnect();

   // Căutăm rezervările user-ului logat și aducem datele campingului
   const bookings = await Booking.find({ user: session.user.id }).populate("campground").sort({ createdAt: -1 });

   return JSON.parse(JSON.stringify(bookings));
}
export async function getOwnerDashboardData() {
   const session = await getServerSession(authOptions);
   if (!session || session.user.role !== "owner") return null;

   await dbConnect();

   // 1. Găsim campingurile deținute de acest utilizator
   const myCampgrounds = await CampGround.find({ author: session.user.id });
   const campIds = myCampgrounds.map((c) => c._id);

   // 2. Găsim toate rezervările făcute la aceste campinguri
   const bookings = await Booking.find({ campground: { $in: campIds } })
      .populate("user", "username email")
      .populate("campground", "title location images")
      .sort({ createdAt: -1 });

   // 3. Calculăm veniturile pe luni pentru grafic
   const months = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec"];
   const revenueMap = {};

   bookings.forEach((b) => {
      const date = new Date(b.createdAt);
      const monthName = months[date.getMonth()];
      revenueMap[monthName] = (revenueMap[monthName] || 0) + b.totalPrice;
   });

   // Formatăm datele pentru grafic (ultimele luni până la cea curentă)
   const currentMonth = new Date().getMonth();
   const revenueData = months
      .map((m, index) => ({
         month: m,
         amount: revenueMap[m] || 0,
         index,
      }))
      .filter((d) => d.index <= currentMonth);

   return {
      campgrounds: JSON.parse(JSON.stringify(myCampgrounds)),
      bookings: JSON.parse(JSON.stringify(bookings)),
      revenueData,
      totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
   };
}
