"use client";
import { useState } from "react";
import { createReview } from "../actions/review";

export default function ReviewForm({ campgroundId }) {
   const [body, setBody] = useState("");
   const [rating, setRating] = useState(5);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await createReview(campgroundId, { body, rating });
         setBody("");
         alert("Recenzia a fost adăugată!");
      } catch (err) {
         alert("Eroare la adăugare: " + err.message);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] mb-12 border border-stone-100 shadow-sm">
         {/* Titlu cu font negru dens */}
         <h3 className="text-2xl font-black mb-6 text-stone-900 tracking-tighter">Lasă o recenzie.</h3>

         <div className="mb-6">
            {/* Label mai închis la culoare */}
            <label className="block mb-3 text-[10px] font-black uppercase tracking-widest text-stone-900">Notă: {rating} ⭐</label>
            <input
               type="range"
               min="1"
               max="5"
               value={rating}
               onChange={(e) => setRating(e.target.value)}
               className="w-full h-1.5 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-stone-900"
            />
         </div>

         <div className="mb-6">
            <textarea
               className="w-full p-4 rounded-2xl border border-stone-100 focus:border-stone-900 outline-none transition-all text-stone-900 placeholder:text-stone-200 bg-stone-50/30 resize-none"
               placeholder="Spune-ne părerea ta despre acest camping..."
               rows="4"
               value={body}
               onChange={(e) => setBody(e.target.value)}
               required
            />
         </div>

         <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-stone-900 text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-green-900 transition-all active:scale-95 shadow-lg shadow-stone-200 ${
               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
         >
            {isSubmitting ? "Se trimite..." : "Publică Recenzia"}
         </button>
      </form>
   );
}
