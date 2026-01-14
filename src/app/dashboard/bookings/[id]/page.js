import dbConnect from "../../../../../lib/mongodb";
import Booking from "../../../../../models/Booking";
import Campground from "../../../../../models/CampGround";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { MapPin, Calendar, CreditCard, ChevronLeft, ArrowRight, CheckCircle2, Receipt } from "lucide-react";
import Link from "next/link";

export default async function BookingDetailPage({ params }) {
   await dbConnect();
   const { id } = await params;
   const session = await getServerSession(authOptions);

   const bookingData = await Booking.findById(id).populate({ path: "campground", model: Campground }).populate({ path: "user", model: User, select: "username email" }).lean();

   if (!bookingData) return notFound();

   // VERIFICARE SECURITATE DUALĂ
   // 1. Este utilizatorul cel care a făcut rezervarea (Turist)?
   const isTourist = bookingData.user._id.toString() === session?.user?.id;

   // 2. Este utilizatorul cel care deține campingul (Owner)?
   const isOwner = bookingData.campground.author.toString() === session?.user?.id;

   if (!isTourist && !isOwner) {
      return notFound();
   }

   const b = JSON.parse(JSON.stringify(bookingData));

   return (
      <main className="bg-white min-h-screen pt-40 pb-32 px-6">
         <div className="max-w-3xl mx-auto">
            {/* Navigare dinamică înapoi */}
            <Link
               href="/dashboard"
               className="inline-flex items-center gap-2 text-stone-300 hover:text-stone-900 transition-colors font-black uppercase tracking-[0.4em] text-[10px] mb-12"
            >
               <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>

            {/* Receipt Container */}
            <div className="bg-stone-50 rounded-[3.5rem] p-10 md:p-20 border border-stone-100 shadow-[0_30px_100px_rgba(0,0,0,0.04)]">
               <header className="flex flex-col md:flex-row justify-between items-start gap-10 mb-20">
                  <div>
                     <div className="flex items-center gap-2 text-green-600 mb-4">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">{isOwner ? "Încasare Confirmată" : "Tranzacție Confirmată"}</span>
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter leading-none">
                        Chitanță <br /> Rezervare.
                     </h1>
                  </div>
                  <div className="md:text-right">
                     <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">Status</p>
                     <p className="text-sm font-bold text-stone-900 uppercase">Plătit prin Stripe</p>
                  </div>
               </header>

               {/* ... restul codului de UI pentru tabelul de prețuri și date ... */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 border-t border-stone-200 pt-16">
                  <section className="space-y-12">
                     <div>
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 block mb-4">Proprietate</label>
                        <h3 className="text-3xl font-black text-stone-900 tracking-tight leading-tight">{b.campground?.title}</h3>
                        <p className="flex items-center gap-2 text-stone-400 text-sm mt-2 font-medium">
                           <MapPin className="w-4 h-4" /> {b.campground?.location}
                        </p>
                     </div>

                     <div>
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 block mb-4">Turist</label>
                        <p className="text-sm font-bold text-stone-900">{b.user?.username}</p>
                        <p className="text-xs text-stone-400">{b.user?.email}</p>
                     </div>
                  </section>

                  <section className="space-y-12">
                     <div>
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-300 block mb-4">Interval</label>
                        <div className="flex items-center gap-6">
                           <div>
                              <p className="text-[9px] font-black text-stone-300 uppercase">In</p>
                              <p className="text-lg font-bold text-stone-900">{new Date(b.checkIn).toLocaleDateString("ro-RO")}</p>
                           </div>
                           <ArrowRight className="w-4 h-4 text-stone-200" />
                           <div>
                              <p className="text-[9px] font-black text-stone-300 uppercase">Out</p>
                              <p className="text-lg font-bold text-stone-900">{new Date(b.checkOut).toLocaleDateString("ro-RO")}</p>
                           </div>
                        </div>
                     </div>
                  </section>
               </div>

               <div className="border-t border-stone-900 pt-10 flex justify-between items-end">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-stone-300">Suma Totală</p>
                     <p className="text-xs font-bold text-stone-400 italic">Fonduri procesate</p>
                  </div>
                  <div className="text-right">
                     <span className="text-6xl font-black text-stone-900 tracking-tighter">{b.totalPrice}</span>
                     <span className="text-xl font-black text-stone-300 ml-2 uppercase tracking-widest">RON</span>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}
