"use client";
import { motion } from "framer-motion";
import { Map, ShieldCheck, Star, Zap, Globe, MousePointer2 } from "lucide-react";

export default function Features() {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.1 },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
   };

   return (
      <section className="bg-white py-32 px-4">
         <div className="max-w-7xl mx-auto">
            {/* --- SECTION HEADER --- */}
            <div className="mb-20 space-y-4">
               <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter"
               >
                  Tehnologie pentru <br />
                  <span className="text-stone-400">libertate deplină.</span>
               </motion.h2>
               <p className="max-w-xl text-lg text-stone-500 font-medium">
                  Am reconstruit experiența de camping de la zero. Fiecare detaliu este proiectat pentru a fi invizibil, lăsând natura să fie centrul atenției.
               </p>
            </div>

            {/* --- BENTO GRID --- */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[700px]"
            >
               {/* 1. HARTA - Mare (Vertical) */}
               <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 md:row-span-2 bg-stone-50 rounded-[3rem] p-10 border border-stone-100 flex flex-col justify-between overflow-hidden group relative"
               >
                  <div className="z-10">
                     <div className="w-14 h-14 bg-green-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-900/20">
                        <Map className="w-7 h-7" />
                     </div>
                     <h3 className="text-3xl font-bold text-stone-900 mb-4 tracking-tight">Hartă Interactivă</h3>
                     <p className="text-stone-500 max-w-xs font-medium">
                        Algoritmul nostru de clustering îți permite să descoperi mii de locații fără a supraîncărca interfața.
                     </p>
                  </div>
                  {/* Visual decorativ subtil */}
                  <div className="absolute bottom-[-20px] right-[-20px] w-64 h-64 bg-green-200/30 rounded-full blur-3xl group-hover:bg-green-300/40 transition-colors" />
                  <Globe className="absolute bottom-10 right-10 w-32 h-32 text-stone-200 group-hover:rotate-12 transition-transform duration-1000" />
               </motion.div>

               {/* 2. PLĂȚI - Orizontal (Sus) */}
               <motion.div variants={itemVariants} className="md:col-span-2 bg-stone-900 rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Plăți Stripe</h3>
                        <p className="text-stone-400 font-medium">Securitate de nivel bancar încorporată.</p>
                     </div>
                     <ShieldCheck className="text-green-500 w-10 h-10" />
                  </div>
                  <div className="mt-8 flex gap-2">
                     <div className="h-10 w-16 bg-white/10 rounded-lg backdrop-blur-md border border-white/10" />
                     <div className="h-10 w-16 bg-white/10 rounded-lg backdrop-blur-md border border-white/10" />
                     <div className="h-10 w-16 bg-white/20 rounded-lg backdrop-blur-md border border-white/10" />
                  </div>
               </motion.div>

               {/* 3. BOOKING - Mic (Jos-Stânga) */}
               <motion.div variants={itemVariants} className="bg-orange-50 rounded-[3rem] p-8 flex flex-col justify-between border border-orange-100 group">
                  <Zap className="text-orange-600 w-8 h-8 group-hover:scale-110 transition-transform" />
                  <div>
                     <h3 className="text-xl font-bold text-stone-900">Instant Booking</h3>
                     <p className="text-stone-500 text-sm font-medium mt-1">Fără timp de așteptare.</p>
                  </div>
               </motion.div>

               {/* 4. RATING - Mic (Jos-Dreapta) */}
               <motion.div variants={itemVariants} className="bg-stone-50 rounded-[3rem] p-8 flex flex-col justify-between border border-stone-100 group">
                  <div className="flex text-yellow-500 gap-1">
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-stone-900">Review-uri Verificate</h3>
                     <p className="text-stone-500 text-sm font-medium mt-1">Feedback real de la comunitate.</p>
                  </div>
                  <MousePointer2 className="absolute opacity-0 group-hover:opacity-10 w-20 h-20 -right-4 -bottom-4 rotate-12 transition-opacity" />
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}
