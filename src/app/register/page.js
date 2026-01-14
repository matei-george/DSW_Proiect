"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ShieldCheck, Trees, ArrowRight, AlertCircle } from "lucide-react";

export default function RegisterPage() {
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      role: "tourist",
   });
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
         const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
         });

         if (res.ok) {
            router.push("/register/success");
         } else {
            const data = await res.json();
            setError(data.message || "Ceva nu a mers bine.");
         }
      } catch (err) {
         setError("Eroare de conexiune. Încearcă din nou.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6 pt-32 pb-12">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full">
            {/* LOGO & TITLE */}
            <div className="text-center mb-10">
               <div className="w-16 h-16 bg-green-950 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-950/20">
                  <Trees className="w-8 h-8" />
               </div>
               <h2 className="text-5xl font-black text-stone-900 tracking-tighter mb-2">Alătură-te nouă.</h2>
               <p className="text-stone-400 font-medium italic font-serif text-lg">Începe-ți povestea în natură astăzi</p>
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-stone-100 p-10 md:p-14 relative">
               <AnimatePresence>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* USERNAME */}
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                           <User className="w-3 h-3" /> Nume Utilizator
                        </label>
                        <input
                           type="text"
                           name="username"
                           required
                           className="w-full p-4 bg-stone-50 border-none rounded-[1.2rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-300"
                           placeholder="utilizator"
                           onChange={handleChange}
                        />
                     </div>

                     {/* ROLE SELECT */}
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                           <ShieldCheck className="w-3 h-3" /> Rolul Tău
                        </label>
                        <select
                           name="role"
                           className="w-full p-4 bg-stone-50 border-none rounded-[1.2rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 appearance-none cursor-pointer"
                           onChange={handleChange}
                        >
                           <option value="tourist">Sunt Turist</option>
                           <option value="owner">Sunt Proprietar</option>
                        </select>
                     </div>
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                        <Mail className="w-3 h-3" /> Email
                     </label>
                     <input
                        type="email"
                        name="email"
                        required
                        className="w-full p-4 bg-stone-50 border-none rounded-[1.2rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-300"
                        placeholder="contact@exemplu.ro"
                        onChange={handleChange}
                     />
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 ml-4">
                        <Lock className="w-3 h-3" /> Parolă
                     </label>
                     <input
                        type="password"
                        name="password"
                        required
                        className="w-full p-4 bg-stone-50 border-none rounded-[1.2rem] focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-300"
                        placeholder="••••••••"
                        onChange={handleChange}
                     />
                  </div>

                  {/* SUBMIT */}
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
                           <span>Creează Contul</span>
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                     )}
                  </button>
               </form>

               {/* LOGIN LINK */}
               <div className="mt-12 pt-8 border-t border-stone-50 text-center">
                  <p className="text-sm text-stone-400 font-medium">
                     Ai deja un cont?{" "}
                     <Link href="/login" className="text-green-900 font-black hover:underline underline-offset-4">
                        Autentifică-te
                     </Link>
                  </p>
               </div>
            </div>
         </motion.div>
      </main>
   );
}
