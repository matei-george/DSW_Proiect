"use client";
import { useEffect, useState } from "react";
import { getUserBookings } from "../actions/booking";
import { getUserStories } from "../actions/story";
import { Calendar, MapPin, History, ArrowUpRight, BookOpen, PenTool, Plus, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TouristDashboard() {
   const [bookings, setBookings] = useState([]);
   const [stories, setStories] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [bookingsData, storiesData] = await Promise.all([getUserBookings(), getUserStories()]);
            setBookings(bookingsData || []);
            setStories(storiesData || []);
         } catch (error) {
            console.error("Eroare sync:", error);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, []);

   if (loading)
      return (
         <div className="py-40 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-stone-100 border-t-stone-900 rounded-full animate-spin mb-4" />
            <p className="text-[10px] text-stone-300 font-black uppercase tracking-[0.3em]">Sincronizare...</p>
         </div>
      );

   const now = new Date();
   const upcoming = bookings.filter((b) => new Date(b.checkIn) >= now);
   const history = bookings.filter((b) => new Date(b.checkIn) < now);

   return (
      <div className="space-y-32">
         {/* 1. UPCOMING - Ticket Style */}
         <section>
            <div className="flex items-end justify-between mb-12 px-2 text-stone-900">
               <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 block mb-2">Next Adventures</span>
                  <h2 className="text-4xl font-black tracking-tighter">Urmează.</h2>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {upcoming.length === 0 ? (
                  <div className="col-span-full py-20 bg-stone-50 rounded-[3rem] border border-dashed border-stone-200 flex flex-col items-center">
                     <p className="text-stone-400 font-serif italic mb-6 text-lg">Nicio plecare programată.</p>
                     <Link href="/campgrounds" className="bg-stone-900 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">
                        Explorează
                     </Link>
                  </div>
               ) : (
                  upcoming.map((booking) => (
                     <div
                        key={booking._id}
                        className="group relative bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden hover:border-stone-900 transition-all duration-500 hover:shadow-2xl"
                     >
                        <div className="flex flex-col md:flex-row h-full">
                           <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
                              <img
                                 src={booking.campground?.images?.[0]?.url}
                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                 alt=""
                              />
                           </div>
                           <div className="flex-1 p-8 flex flex-col justify-between">
                              <div>
                                 <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 font-sans">Rezervare Confirmată</span>
                                 </div>
                                 <h3 className="text-2xl font-black text-stone-900 tracking-tight mb-2 leading-tight">{booking.campground?.title}</h3>
                                 <p className="text-stone-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" /> {new Date(booking.checkIn).toLocaleDateString("ro-RO")}
                                 </p>
                              </div>

                              <Link
                                 href={`/dashboard/bookings/${booking._id}`}
                                 className="mt-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-900 hover:text-green-800 transition-colors"
                              >
                                 Detalii tranzacție <ArrowUpRight className="w-3 h-3" />
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </section>

         {/* 2. JURNALUL TĂU (AICI ERA BUG-UL, LIPSEA ACEASTĂ SECȚIUNE) */}
         <section>
            <div className="flex items-end justify-between mb-12 px-2">
               <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 block mb-2">My Stories</span>
                  <h2 className="text-4xl font-black text-stone-900 tracking-tighter">Amintiri scrise.</h2>
               </div>
               <Link
                  href="/stories/new"
                  className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-green-900 transition-colors"
               >
                  <Plus className="w-3 h-3" /> Scrie o poveste
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card pentru poveste nouă */}
               <Link
                  href="/stories/new"
                  className="aspect-square rounded-[2.5rem] border-2 border-dashed border-stone-100 flex flex-col items-center justify-center p-10 text-center hover:bg-stone-50 hover:border-stone-200 transition-all group"
               >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                     <PenTool className="w-5 h-5 text-stone-300" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Adaugă o pagină nouă în jurnal</p>
               </Link>

               {/* Afișarea poveștilor din baza de date */}
               {stories.map((story) => (
                  <Link key={story._id} href={`/stories/${story._id}`} className="group relative aspect-square rounded-[2.5rem] overflow-hidden bg-stone-100">
                     <img
                        src={story.images?.[0]?.url || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        alt=""
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                     <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-white font-black text-xl tracking-tight mb-1">{story.title}</h4>
                        <p className="text-white/50 text-[9px] font-black uppercase tracking-widest">Vezi articolul</p>
                     </div>
                  </Link>
               ))}
            </div>
         </section>

         {/* 3. ISTORIC TRANZACȚII */}
         <section className="pb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 mb-10 px-2 flex items-center gap-2">
               <History className="w-4 h-4" /> Istoric Tranzacții
            </h2>
            <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden">
               <div className="divide-y divide-stone-50">
                  {history.length === 0 ? (
                     <div className="p-20 text-center text-stone-300 italic font-serif text-lg">Nicio tranzacție anterioară înregistrată.</div>
                  ) : (
                     history.map((booking) => (
                        <Link
                           key={booking._id}
                           href={`/dashboard/bookings/${booking._id}`}
                           className="p-10 flex flex-col md:flex-row justify-between items-center group hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0"
                        >
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 group-hover:bg-white transition-all">
                                 <CreditCard className="w-5 h-5" />
                              </div>
                              <div>
                                 <h4 className="text-xl font-black text-stone-900 tracking-tighter">{booking.campground?.title}</h4>
                                 <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mt-1 italic">
                                    {new Date(booking.checkIn).toLocaleDateString("ro-RO")}
                                 </p>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="text-2xl font-black text-stone-900 tracking-tighter">{booking.totalPrice} RON</span>
                           </div>
                        </Link>
                     ))
                  )}
               </div>
            </div>
         </section>
      </div>
   );
}
