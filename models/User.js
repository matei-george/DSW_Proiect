import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: [true, "Te rugăm să introduci un email"],
         unique: true,
      },
      username: {
         type: String,
         required: [true, "Te rugăm să introduci un nume de utilizator"],
         unique: true,
      },
      password: {
         // ASIGURĂ-TE CĂ ACEST CÂMP EXISTĂ AICI
         type: String,
         required: [true, "Te rugăm să introduci o parolă"],
      },
      role: {
         type: String,
         enum: ["tourist", "owner"],
         default: "tourist", // Implicit, utilizatorii sunt turiști
      },
      // Vom adăuga suport pentru NextAuth ulterior
   },
   { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
