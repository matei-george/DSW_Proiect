"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TouristDashboard from "../components/TouristDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import Footer from "../components/Footer";
import { User, ShieldCheck, Sparkles } from "lucide-react";

export default function DashboardPage() {
   const { data: session, status } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (status === "unauthenticated") {
         router.push("/login");
      }
   }, [status, router]);

   if (status === "loading") {
      return (
         <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-2 border-stone-100 border-t-stone-900 rounded-full animate-spin" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300">Se încarcă profilul...</p>
            </div>
         </div>
      );
   }

   if (!session) return null;

   const isOwner = session.user.role === "owner";

   return (
      <main className="bg-white min-h-screen pt-40 pb-20">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* HEADER PREMIUM */}
            <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-stone-100 pb-16">
               <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="px-3 py-1 bg-stone-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">{session.user.role}</div>
                     <div className="h-[1px] w-8 bg-stone-200" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-green-500" /> Sesiune Securizată
                     </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-[0.85]">
                     Salut, <br />
                     <span className="text-stone-300">{session.user.name || session.user.username}.</span>
                  </h1>
               </div>

               {/* Stats Subtile pe Header */}
               <div className="flex gap-12">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-1">Status Cont</p>
                     <p className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        Verificat <Sparkles className="w-3 h-3 text-orange-400" />
                     </p>
                  </div>
               </div>
            </header>

            {/* DASHBOARD CONTENT */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
               {isOwner ? <OwnerDashboard user={session.user} /> : <TouristDashboard user={session.user} />}
            </div>
         </div>
         <Footer />
      </main>
   );
}
