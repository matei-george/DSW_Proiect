import dbConnect from "../../../../../lib/mongodb";
import CampGround from "../../../../../models/CampGround";
import { notFound } from "next/navigation";
import { updateCampground } from "@/app/actions/campground";
import { Edit3, MapPin, DollarSign, Image as ImageIcon, AlignLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function EditCampgroundPage({ params }) {
   await dbConnect();
   const { id } = await params;
   const campground = await CampGround.findById(id).lean();

   if (!campground) return notFound();

   const updateWithId = updateCampground.bind(null, id);

   return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-6">
         <div className="max-w-4xl mx-auto">
            {/* HEADER & BACK BUTTON */}
            <div className="mb-12">
               <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors font-black uppercase tracking-[0.2em] text-[10px] mb-6"
               >
                  <ChevronLeft className="w-4 h-4" /> Înapoi la Dashboard
               </Link>
               <h1 className="text-5xl md:text-6xl font-black text-stone-900 tracking-tighter">
                  Editează Locația<span className="text-green-800">.</span>
               </h1>
               <p className="text-xl text-stone-400 font-medium italic font-serif mt-2">{campground.title}</p>
            </div>

            {/* FORM CONTAINER */}
            <div className="bg-white rounded-[3.5rem] border border-stone-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] p-10 md:p-16">
               <form action={updateWithId} className="space-y-10">
                  {/* GRID: TITLU SI PRET */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                           <Edit3 className="w-3 h-3" /> Nume Camping
                        </label>
                        <input
                           name="title"
                           defaultValue={campground.title}
                           type="text"
                           required
                           className="w-full p-5 bg-stone-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-300"
                        />
                     </div>

                     <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                           <DollarSign className="w-3 h-3" /> Preț / Noapte (RON)
                        </label>
                        <input
                           name="price"
                           defaultValue={campground.price}
                           type="number"
                           required
                           className="w-full p-5 bg-stone-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800"
                        />
                     </div>
                  </div>

                  {/* LOCATIE */}
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                        <MapPin className="w-3 h-3" /> Locație (Oraș, Județ)
                     </label>
                     <input
                        name="location"
                        defaultValue={campground.location}
                        type="text"
                        required
                        className="w-full p-5 bg-stone-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800"
                     />
                  </div>

                  {/* IMAGINE URL */}
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                        <ImageIcon className="w-3 h-3" /> URL Imagine Principală
                     </label>
                     <input
                        name="imageUrl"
                        defaultValue={campground.images?.[0]?.url}
                        type="url"
                        required
                        className="w-full p-5 bg-stone-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800"
                     />
                  </div>

                  {/* DESCRIERE */}
                  <div className="space-y-3">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                        <AlignLeft className="w-3 h-3" /> Povestea Locului
                     </label>
                     <textarea
                        name="description"
                        defaultValue={campground.description}
                        required
                        rows="6"
                        className="w-full p-6 bg-stone-50 border-none rounded-[2rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-medium text-stone-600 leading-relaxed resize-none"
                     ></textarea>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col md:flex-row gap-4 pt-6">
                     <button
                        type="submit"
                        className="flex-1 bg-stone-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-green-900 transition-all shadow-xl active:scale-95"
                     >
                        Salvează Modificările
                     </button>
                     <Link
                        href="/dashboard"
                        className="px-10 py-5 rounded-[1.5rem] font-black text-stone-400 hover:bg-stone-50 transition-all text-center uppercase tracking-widest text-xs flex items-center justify-center"
                     >
                        Anulează
                     </Link>
                  </div>
               </form>
            </div>
         </div>
      </main>
   );
}
