import { createCampground } from "../../actions/campground";
import { ChevronLeft, MapPin, Camera, Info, Banknote } from "lucide-react";
import Link from "next/link";

export default function NewCampgroundPage() {
   return (
      <main className="bg-white min-h-screen pt-40 pb-20 px-6">
         <div className="max-w-4xl mx-auto">
            {/* HEADER EDITORIAL */}
            <div className="mb-20">
               <Link
                  href="/campgrounds"
                  className="flex items-center gap-2 text-stone-300 hover:text-stone-900 transition-colors font-black uppercase tracking-[0.4em] text-[10px] mb-8"
               >
                  <ChevronLeft className="w-4 h-4" /> Înapoi la listă
               </Link>

               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 block mb-4">Partner Portal</span>
               <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-[0.85]">
                  Adaugă un <br />
                  <span className="text-green-900">Camping Nou.</span>
               </h1>
               <p className="mt-8 text-2xl text-stone-400 font-medium font-serif italic max-w-xl">
                  Împarte frumusețea naturii cu alți turiști și devino gazdă în comunitatea noastră.
               </p>
            </div>

            {/* FORMULAR MINIMALIST */}
            <form action={createCampground} className="space-y-20">
               {/* Secțiunea 1: Informații de bază */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                  <div className="space-y-4 border-b border-stone-100 pb-4 focus-within:border-stone-900 transition-colors">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400">
                        <Info className="w-3 h-3" /> Numele Campingului
                     </label>
                     <input
                        name="title"
                        type="text"
                        required
                        placeholder="Ex: Poiana Brașov Camp"
                        className="w-full text-3xl font-black text-stone-900 outline-none bg-transparent placeholder:text-stone-100"
                     />
                  </div>

                  <div className="space-y-4 border-b border-stone-100 pb-4 focus-within:border-stone-900 transition-colors">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400">
                        <Banknote className="w-3 h-3" /> Tarif (RON / Noapte)
                     </label>
                     <input
                        name="price"
                        type="number"
                        required
                        placeholder="50"
                        className="w-full text-3xl font-black text-stone-900 outline-none bg-transparent placeholder:text-stone-100"
                     />
                  </div>
               </div>

               {/* Secțiunea 2: Locație și Media */}
               <div className="space-y-16">
                  <div className="space-y-4 border-b border-stone-100 pb-4 focus-within:border-stone-900 transition-colors">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400">
                        <MapPin className="w-3 h-3" /> Adresa Locației
                     </label>
                     <input
                        name="location"
                        type="text"
                        required
                        placeholder="Ex: Brașov, România"
                        className="w-full text-3xl font-black text-stone-900 outline-none bg-transparent placeholder:text-stone-100"
                     />
                  </div>

                  <div className="space-y-4 border-b border-stone-100 pb-4 focus-within:border-stone-900 transition-colors">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400">
                        <Camera className="w-3 h-3" /> Imagine Principală (URL)
                     </label>
                     <input
                        name="imageUrl"
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        className="w-full text-xl font-medium text-stone-500 outline-none bg-transparent placeholder:text-stone-100"
                     />
                  </div>
               </div>

               {/* Secțiunea 3: Descriere */}
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Descrierea experienței</label>
                  <textarea
                     name="description"
                     required
                     rows="6"
                     placeholder="Povestește turiștilor despre peisaj, facilități și atmosfera locului..."
                     className="w-full text-2xl font-serif italic text-stone-600 outline-none bg-transparent border-none resize-none placeholder:text-stone-100 leading-relaxed"
                  ></textarea>
               </div>

               {/* BUTOANE ACȚIUNE */}
               <div className="pt-12 flex flex-col md:flex-row items-center gap-8">
                  <button
                     type="submit"
                     className="w-full md:w-auto bg-stone-900 text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest hover:bg-green-900 transition-all shadow-2xl active:scale-95"
                  >
                     Publică Destinația
                  </button>
                  <Link href="/campgrounds" className="text-stone-300 hover:text-stone-900 font-black text-xs uppercase tracking-widest transition-colors">
                     Renunță
                  </Link>
               </div>
            </form>

            {/* FOOTER NOTE */}
            <div className="mt-40 pt-10 border-t border-stone-50 text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-200">CampGround Standard Guidelines &copy; 2025</p>
            </div>
         </div>
      </main>
   );
}
