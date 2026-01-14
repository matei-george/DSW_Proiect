import mongoose from "mongoose";

const CampgroundSchema = new mongoose.Schema(
   {
      title: String,
      images: [
         {
            url: String,
            filename: String,
         },
      ],
      geometry: {
         type: {
            type: String,
            enum: ["Point"],
            required: true,
         },
         coordinates: {
            type: [Number],
            required: true,
         },
      },
      price: Number,
      description: String,
      location: String,
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      reviews: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
         },
      ],
   },
   { timestamps: true }
);

export default mongoose.models.Campground || mongoose.model("Campground", CampgroundSchema);
