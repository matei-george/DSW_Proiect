"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function StoryCard({ story }) {
   // Folosim un state pentru a ne asigura că randarea textului curățat
   // se face doar după ce componenta s-a montat pe client
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!story) return null;

   const title = String(story.title || "Fără titlu");
   const bodyHTML = String(story.body || "");
   const authorName = String(story.author?.username || "Explorator");
   const storyId = String(story._id);
   const imageUrl = story.images?.[0]?.url || "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4";

   // Funcție de curățare sigură care funcționează identic pe Server și Client
   const cleanPreviewText = (html) => {
      return html
         .replace(/<[^>]*>?/gm, "") // Scoate tag-urile <p>, <strong> etc.
         .replace(/&nbsp;/g, " ") // Înlocuiește spațiile HTML cu spații normale
         .replace(/&amp;/g, "&") // Înlocuiește &
         .substring(0, 150) // Limităm lungimea pentru card
         .trim();
   };

   const plainText = cleanPreviewText(bodyHTML);

   return (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
         <Link href={`/stories/${storyId}`}>
            <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden mb-6 border border-stone-100 shadow-sm bg-stone-50">
               <img src={imageUrl} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" />

               <div className="absolute bottom-6 left-6 backdrop-blur-xl bg-black/30 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black">{authorName.charAt(0).toUpperCase()}</div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{authorName}</span>
               </div>
            </div>

            <div className="px-2">
               <div className="flex justify-between items-start gap-4">
                  <h3 className="text-3xl font-black text-stone-900 tracking-tighter leading-tight group-hover:text-green-900 transition-colors">{title}</h3>
                  <div className="p-2 bg-stone-900 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
                     <ArrowUpRight className="w-4 h-4" />
                  </div>
               </div>

               {/* Afișăm textul doar dacă suntem pe client sau folosim varianta curățată identic */}
               <p className="text-stone-900/80 font-medium italic font-serif mt-3 line-clamp-2 leading-relaxed">{mounted ? plainText : ""}</p>
            </div>
         </Link>
      </motion.div>
   );
}
