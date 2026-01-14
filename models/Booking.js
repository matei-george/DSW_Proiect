import mongoose from "mongoose";

// Definirea Schemei rămâne la fel
const BookingSchema = new mongoose.Schema(
   {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      campground: { type: mongoose.Schema.Types.ObjectId, ref: "Campground", required: true },
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      totalPrice: { type: Number, required: true },
      status: { type: String, default: "paid" },
      stripeSessionId: { type: String, required: true },
   },
   { timestamps: true }
);

// Această linie previne eroarea "OverwriteModelError" în Next.js
const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
