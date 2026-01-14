"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Trees, LogOut, LayoutDashboard, User } from "lucide-react";

export default function Navbar() {
   const { data: session } = useSession();
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <nav
         // MODIFICARE: w-full înlocuit cu inset-x-0 pentru a preveni overflow-ul
         className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
            isScrolled ? "py-4 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm" : "py-6 bg-transparent"
         }`}
      >
         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 group">
               <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12 shadow-lg shadow-green-900/20">
                  <Trees className="w-6 h-6" />
               </div>
               <span className="text-xl font-black text-stone-900 tracking-tighter">
                  CampGround<span className="text-green-600">.</span>
               </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8">
               <Link href="/campgrounds" className="text-sm font-bold text-stone-600 hover:text-green-900 transition-colors">
                  Explorează
               </Link>

               {session ? (
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-100/50 rounded-full border border-stone-200/50">
                        <div className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center">
                           <User className="w-3.5 h-3.5 text-stone-600" />
                        </div>
                        <span className="text-sm font-bold text-stone-800">{session.user?.username || session.user?.name || "Profil"}</span>
                     </div>

                     <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-green-900 transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                     </Link>

                     <button
                        onClick={() => signOut()}
                        className="bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-stone-800 transition-all active:scale-95 flex items-center gap-2 shadow-md shadow-stone-900/10"
                     >
                        <LogOut className="w-4 h-4" />
                        Ieșire
                     </button>
                  </div>
               ) : (
                  <div className="flex items-center gap-4">
                     <Link href="/login" className="text-sm font-bold text-stone-600 hover:text-green-900 px-4">
                        Autentificare
                     </Link>
                     <Link
                        href="/register"
                        className="bg-green-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-green-800 transition-all shadow-lg shadow-green-900/20"
                     >
                        Înregistrare
                     </Link>
                  </div>
               )}
            </div>

            {/* MOBILE TOGGLE */}
            <button className="md:hidden p-2 text-stone-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
               {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
         </div>

         {/* MOBILE MENU OVERLAY */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  // MODIFICARE: w-full se comportă ok aici deoarece este absolut în raport cu nav, dar inset-x-0 e mai sigur
                  className="absolute top-full inset-x-0 bg-white border-b border-stone-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
               >
                  {session && (
                     <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl mb-2">
                        <User className="w-5 h-5 text-green-800" />
                        <span className="font-black text-stone-900">Salut, {session.user?.username || session.user?.name}!</span>
                     </div>
                  )}
                  <Link href="/campgrounds" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-stone-900">
                     Explorează
                  </Link>
                  <hr className="border-stone-100" />
                  {session ? (
                     <>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-stone-900">
                           Dashboard
                        </Link>
                        <button onClick={() => signOut()} className="text-left text-lg font-bold text-red-600 flex items-center gap-2">
                           <LogOut className="w-5 h-5" /> Ieșire
                        </button>
                     </>
                  ) : (
                     <>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-stone-900">
                           Autentificare
                        </Link>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-green-900 text-white p-4 rounded-2xl text-center font-bold">
                           Înregistrare
                        </Link>
                     </>
                  )}
               </motion.div>
            )}
         </AnimatePresence>
      </nav>
   );
}
