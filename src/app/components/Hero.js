"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
   return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#fafafa]">
         {/* --- VIZUALURI 3D FUNDAL (Blobs animate) --- */}
         <motion.div
            animate={{
               x: [0, 50, 0],
               y: [0, 30, 0],
               scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-green-200 rounded-full blur-[140px] opacity-40"
         />
         <motion.div
            animate={{
               x: [0, -60, 0],
               y: [0, -40, 0],
               scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-100 rounded-full blur-[140px] opacity-40"
         />

         {/* --- CARDUL DE STICLĂ (Backdrop Blur) --- */}
         <div className="max-w-6xl mx-auto px-4 z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="backdrop-blur-xl bg-white/30 border border-white/40 p-10 md:p-20 rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center"
            >
               {/* Badge - Păstrat fontul tău */}
               <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block px-5 py-2 mb-8 text-xs font-bold tracking-[0.2em] text-green-800 uppercase bg-green-100/80 backdrop-blur-md rounded-full"
               >
                  Nou în România: Experiențe Premium
               </motion.span>

               {/* Titlu - Păstrat fontul tău black & italic font-serif */}
               <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-9xl font-black text-stone-900 tracking-tighter leading-[0.9] mb-8"
               >
                  Natura, <br />
                  <span className="text-green-800 italic font-serif bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-600">redescoperită.</span>
               </motion.h1>

               {/* Descriere - Păstrat fontul tău */}
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="max-w-2xl mx-auto text-xl md:text-2xl text-stone-500 mb-12 leading-relaxed"
               >
                  Rezervă cele mai spectaculoase locuri de campare din România cu o simplitate absolută. Securizat, rapid și imersiv.
               </motion.p>

               {/* Butoane - Stilul tău cu hover animat */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
               >
                  <Link
                     href="/campgrounds"
                     className="bg-stone-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-stone-800 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center group"
                  >
                     Începe Explorarea
                     <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                  </Link>
                  <Link
                     href="/register"
                     className="bg-white/50 backdrop-blur-md text-stone-900 border border-stone-200 px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all hover:shadow-lg"
                  >
                     Devino Partener
                  </Link>
               </motion.div>
            </motion.div>
         </div>

         {/* Element decorativ - un inel subtil 3D */}
         <div className="absolute inset-0 pointer-events-none border-[1px] border-stone-200/30 rounded-full scale-[1.5] opacity-50" />
      </section>
   );
}
