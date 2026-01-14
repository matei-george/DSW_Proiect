"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Home } from "lucide-react";

export default function RegisterSuccessPage() {
   return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 pt-24 pb-12">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-12 border border-stone-50 text-center relative overflow-hidden"
         >
            {/* Element Decorativ Subtil de fundal */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-50 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10">
               {/* Iconiță de succes animată */}
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-900 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-green-900/20"
               >
                  <Check className="w-10 h-10" strokeWidth={3} />
               </motion.div>

               <h2 className="text-4xl font-black text-stone-900 tracking-tighter mb-4">Ești gata de aventură!</h2>

               <p className="text-stone-500 font-medium italic font-serif text-lg leading-relaxed mb-10">
                  Contul tău a fost creat. Comunitatea exploratorilor te așteaptă să descoperi cele mai frumoase locuri.
               </p>

               <div className="space-y-4">
                  <Link
                     href="/login"
                     className="group flex items-center justify-center gap-3 w-full py-5 bg-stone-900 hover:bg-green-950 text-white font-black rounded-[1.5rem] shadow-xl transition-all active:scale-95 text-lg"
                  >
                     <span>Autentificare</span>
                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                     href="/"
                     className="flex items-center justify-center gap-2 w-full py-4 text-stone-400 hover:text-stone-900 text-xs font-black uppercase tracking-[0.2em] transition-colors"
                  >
                     <Home className="w-3 h-3" />
                     Înapoi la acasă
                  </Link>
               </div>
            </div>
         </motion.div>
      </div>
   );
}
