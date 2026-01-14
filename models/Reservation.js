import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
   {
      campground: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Campground",
         required: true,
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      totalPrice: Number,
      status: {
         type: String,
         enum: ["pending", "confirmed", "cancelled"],
         default: "pending",
      },
      stripeSessionId: String, // Pentru integrarea cu Stripe de mai târziu [cite: 20]
   },
   { timestamps: true }
);

export default mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);
