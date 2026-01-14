import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
   {
      body: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      campground: { type: mongoose.Schema.Types.ObjectId, ref: "Campground" },
   },
   { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
