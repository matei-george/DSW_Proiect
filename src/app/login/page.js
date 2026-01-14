"use client";

import { useState, useEffect, Suspense } from "react"; // Adăugat Suspense
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Trees, AlertCircle, CheckCircle2 } from "lucide-react";

// 1. Mutăm toată logica într-o componentă internă
function LoginContent() {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const [loading, setLoading] = useState(false);

   const router = useRouter();
   const searchParams = useSearchParams();

   useEffect(() => {
      const message = searchParams.get("message");
      if (message) setSuccessMessage(message);
   }, [searchParams]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      const result = await signIn("credentials", {
         redirect: false,
         email: formData.email,
         password: formData.password,
      });

      if (result.error) {
         setError("Datele introduse nu par să fie corecte.");
         setLoading(false);
      } else {
         router.push("/");
         router.refresh();
      }
   };

   return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
         <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-900 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-900/20">
               <Trees className="w-8 h-8" />
            </div>
            <h2 className="text-5xl font-black text-stone-900 tracking-tighter mb-2">Bine ai revenit.</h2>
            <p className="text-stone-400 font-medium italic font-serif text-lg">Aventura ta continuă aici</p>
         </div>

         <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-stone-100 p-10 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
               {successMessage && (
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     className="bg-green-50 text-green-700 p-4 rounded-2xl mb-8 flex items-center gap-3 border border-green-100 text-sm font-bold"
                  >
                     <CheckCircle2 className="w-4 h-4" /> {successMessage}
                  </motion.div>
               )}

               {error && (
                  <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3 border border-red-100 text-sm font-bold"
                  >
                     <AlertCircle className="w-4 h-4" /> {error}
                  </motion.div>
               )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                     <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                     type="email"
                     name="email"
                     required
                     className="w-full p-5 bg-stone-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-300"
                     placeholder="nume@exemplu.com"
                     onChange={handleChange}
                  />
               </div>

               <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                     <Lock className="w-3 h-3" /> Parolă
                  </label>
                  <input
                     type="password"
                     name="password"
                     required
                     className="w-full p-5 bg-stone-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-300"
                     placeholder="••••••••"
                     onChange={handleChange}
                  />
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full py-5 rounded-[1.5rem] font-black text-lg transition-all flex items-center justify-center gap-3 overflow-hidden mt-4 ${
                     loading ? "bg-stone-100 text-stone-400" : "bg-stone-900 text-white hover:bg-green-900 shadow-xl"
                  }`}
               >
                  {loading ? (
                     <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                     <>
                        <span>Intră în cont</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </>
                  )}
               </button>
            </form>

            <div className="mt-12 pt-8 border-t border-stone-50 text-center">
               <p className="text-sm text-stone-400 font-medium">
                  Nu ai un cont încă?{" "}
                  <Link href="/register" className="text-green-900 font-black hover:underline underline-offset-4">
                     Înregistrează-te
                  </Link>
               </p>
            </div>
         </div>
      </motion.div>
   );
}

// 2. Exportăm pagina principală împachetată în Suspense
export default function LoginPage() {
   return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6 pt-24 pb-12">
         <Suspense fallback={<div className="text-stone-400 font-bold uppercase tracking-widest text-xs">Se încarcă...</div>}>
            <LoginContent />
         </Suspense>
      </main>
   );
}
