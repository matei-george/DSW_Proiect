import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "Te rugăm să introduci un titlu pentru povestea ta."],
         trim: true,
      },
      body: {
         type: String,
         required: [true, "Povestea ta are nevoie de un conținut."],
      },
      images: [
         {
            url: String,
            filename: String,
         },
      ],
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      // Opțional: Legăm povestea de un camping existent pe platformă
      campground: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Campground",
      },
   },
   { timestamps: true }
);

// Prevenim eroarea de "OverwriteModelError" la Hot Reload în Next.js
export default mongoose.models.Story || mongoose.model("Story", StorySchema);
