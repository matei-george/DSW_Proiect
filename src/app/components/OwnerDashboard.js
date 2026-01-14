"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOwnerDashboardData } from "../actions/booking";
import { deleteCampground } from "../actions/campground";
import { TrendingUp, Plus, Home, Receipt, Trash2, Edit3, ArrowUpRight, BarChart3 } from "lucide-react";

export default function OwnerDashboard() {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchOwnerData = async () => {
         const result = await getOwnerDashboardData();
         setData(result);
         setLoading(false);
      };
      fetchOwnerData();
   }, []);

   const handleDelete = async (id) => {
      if (confirm("Ești sigur că vrei să ștergi acest camping? Această acțiune este ireversibilă.")) {
         try {
            await deleteCampground(id);
            const result = await getOwnerDashboardData();
            setData(result);
         } catch (err) {
            alert(err.message);
         }
      }
   };

   if (loading)
      return (
         <div className="py-40 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-stone-100 border-t-stone-900 rounded-full animate-spin mb-4" />
            <p className="text-[10px] text-stone-300 font-black uppercase tracking-[0.3em]">Sincronizare Centru Comandă...</p>
         </div>
      );

   if (!data) return <div className="p-20 text-center text-red-500 font-black">Eroare la sincronizarea datelor.</div>;

   const maxAmount = Math.max(...data.revenueData.map((d) => d.amount), 1);

   return (
      <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
         {/* 1. HEADER STATS & ANALYTICS */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Grafic Venituri */}
            <div className="lg:col-span-2 bg-stone-50 p-10 rounded-[3.5rem] border border-stone-100 relative overflow-hidden group">
               <div className="flex justify-between items-start relative z-10 mb-12">
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 block mb-2">Performance Analytics</span>
                     <h2 className="text-5xl font-black text-stone-900 tracking-tighter leading-none">
                        {data.totalRevenue} <span className="text-xl text-stone-300">RON</span>
                     </h2>
                  </div>
                  <div className="p-4 bg-white rounded-3xl shadow-sm border border-stone-100">
                     <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
               </div>

               {/* Grafic Bar Chart Minimalist */}
               <div className="flex items-end gap-4 h-48">
                  {data.revenueData.map((d) => (
                     <div key={d.month} className="flex-1 flex flex-col items-center gap-4 group/bar">
                        <div
                           className="w-full bg-stone-200/50 rounded-full transition-all duration-700 group-hover/bar:bg-stone-900 group-hover/bar:shadow-2xl relative"
                           style={{ height: `${(d.amount / maxAmount) * 100}%` }}
                        >
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[9px] py-1.5 px-3 rounded-full opacity-0 group-hover/bar:opacity-100 transition-all font-black tracking-widest scale-75 group-hover/bar:scale-100">
                              {d.amount}
                           </div>
                        </div>
                        <span className="text-[9px] font-black text-stone-300 uppercase tracking-tighter">{d.month.substring(0, 3)}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Card Proprietăți Active */}
            <div className="bg-green-900 p-10 rounded-[3.5rem] text-white flex flex-col justify-between shadow-2xl shadow-green-900/20">
               <div>
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-300">Inventory</span>
                     <Home className="w-6 h-6 text-green-300" />
                  </div>
                  <h3 className="text-7xl font-black tracking-tighter">{data.campgrounds.length}</h3>
                  <p className="text-green-300/60 font-serif italic text-lg">Campinguri listate de tine.</p>
               </div>

               <Link
                  href="/campgrounds/new"
                  className="w-full bg-white text-green-950 py-5 rounded-full flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
               >
                  <Plus className="w-4 h-4" /> Adaugă Nou
               </Link>
            </div>
         </section>

         {/* 2. LISTA PROPRIETĂȚI (GESTIUNE) */}
         <section>
            <div className="flex items-end justify-between mb-12 px-2">
               <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 block mb-2">Management</span>
                  <h2 className="text-4xl font-black text-stone-900 tracking-tighter leading-none">Locațiile Tale.</h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {data.campgrounds.map((camp) => (
                  <div
                     key={camp._id}
                     className="bg-white p-4 rounded-[2.5rem] border border-stone-100 flex flex-col md:flex-row gap-8 items-center group transition-all duration-500 hover:border-stone-900"
                  >
                     <div className="w-full md:w-32 h-32 bg-stone-100 rounded-[2rem] overflow-hidden shadow-inner">
                        <img src={camp.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                     </div>
                     <div className="flex-1 text-center md:text-left">
                        <h3 className="font-black text-stone-900 text-xl tracking-tight leading-tight mb-1">{camp.title}</h3>
                        <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">{camp.location}</p>

                        <div className="mt-6 flex justify-center md:justify-start gap-6">
                           <Link
                              href={`/campgrounds/${camp._id}/edit`}
                              className="flex items-center gap-1.5 text-[9px] font-black text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors"
                           >
                              <Edit3 className="w-3 h-3" /> Edit
                           </Link>
                           <button
                              onClick={() => handleDelete(camp._id)}
                              className="flex items-center gap-1.5 text-[9px] font-black text-red-300 uppercase tracking-widest hover:text-red-600 transition-colors"
                           >
                              <Trash2 className="w-3 h-3" /> Remove
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* 3. FLUX REZERVĂRI (CLICKABLE TO RECEIPTS) */}
         <section className="pb-20">
            <div className="flex items-center gap-3 mb-10 px-2">
               <BarChart3 className="w-5 h-5 text-stone-300" />
               <h2 className="text-sm font-black text-stone-300 uppercase tracking-[0.4em]">Flux Rezervări Recente</h2>
            </div>

            <div className="bg-white rounded-[3rem] border border-stone-100 overflow-hidden shadow-sm">
               <div className="divide-y divide-stone-50">
                  {data.bookings.map((booking) => (
                     /* LINK CĂTRE DETALII REZERVARE */
                     <Link
                        key={booking._id}
                        href={`/dashboard/bookings/${booking._id}`}
                        className="p-8 flex flex-col md:flex-row justify-between items-center group hover:bg-stone-50 transition-all duration-500"
                     >
                        <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                           <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center font-black text-stone-300 group-hover:bg-white group-hover:shadow-md transition-all text-sm">
                              {booking.user?.username?.charAt(0).toUpperCase()}
                           </div>
                           <div>
                              <p className="font-black text-stone-900 text-lg tracking-tight leading-none mb-1">{booking.user?.username}</p>
                              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{booking.campground?.title}</p>
                           </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Data Check-in</p>
                              <p className="font-bold text-stone-900 text-sm">{new Date(booking.checkIn).toLocaleDateString("ro-RO")}</p>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1">Încasat</p>
                              <p className="text-2xl font-black text-green-900 tracking-tighter">
                                 {booking.totalPrice} <span className="text-xs">RON</span>
                              </p>
                           </div>
                           <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                              <ArrowUpRight className="w-4 h-4 text-stone-900" />
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
