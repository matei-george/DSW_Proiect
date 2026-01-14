"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function CampgroundCard({ campground }) {
   return (
      <motion.div
         whileHover={{ y: -8 }}
         transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
         className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 group"
      >
         {/* Imaginea Campingului */}
         <div className="relative h-72 w-full overflow-hidden">
            <img
               src={campground.images[0]?.url || "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce"}
               alt={campground.title}
               className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />

            {/* Badge Preț Glassmorphism */}
            <div className="absolute top-5 right-5 backdrop-blur-md bg-white/80 px-4 py-2 rounded-2xl text-stone-900 text-sm font-black shadow-sm border border-white/20">
               {campground.price} RON <span className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">/ noapte</span>
            </div>

            {/* Overlay Gradient subtil la bază */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
         </div>

         {/* Detalii Camping */}
         <div className="p-8">
            <div className="flex items-center gap-1.5 text-orange-600 mb-3">
               <MapPin className="w-3.5 h-3.5" />
               <span className="text-[11px] font-black uppercase tracking-[0.15em]">{campground.location}</span>
            </div>

            <h3 className="text-2xl font-black text-stone-900 mb-3 tracking-tighter leading-tight group-hover:text-green-800 transition-colors">{campground.title}</h3>

            <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-8 font-medium">{campground.description}</p>

            {/* Buton Stil Apple */}
            <Link
               href={`/campgrounds/${campground._id}`}
               className="relative flex items-center justify-between w-full bg-stone-50 group-hover:bg-green-900 group-hover:text-white text-stone-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300"
            >
               <span className="text-sm">Vezi Detalii</span>
               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
               </div>
            </Link>
         </div>
      </motion.div>
   );
}
