"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { getBookedDates } from "../actions/booking";
import { useBookingStore } from "@/store/useBookingStore";
import { createCheckoutSession } from "../actions/stripe";
import { Calendar as CalendarIcon, CreditCard } from "lucide-react";

export default function BookingForm({ campground }) {
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [excludedIntervals, setExcludedIntervals] = useState([]);
   const [loading, setLoading] = useState(false);

   const { setDates, setCampground, bookingData } = useBookingStore();

   useEffect(() => {
      const loadDates = async () => {
         const dates = await getBookedDates(campground._id);
         setExcludedIntervals(dates);
      };

      setCampground(campground._id, campground.title, campground.price);
      loadDates();
   }, [campground._id, campground.title, campground.price, setCampground]);

   const handleDateChange = (update) => {
      const [start, end] = update;
      setStartDate(start);
      setEndDate(end);

      if (start && end) {
         setDates(start, end);
      }
   };

   const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;

   const handleCheckout = async () => {
      if (!startDate || !endDate) return;
      setLoading(true);

      try {
         const result = await createCheckoutSession(bookingData);
         if (result.url) {
            window.location.href = result.url;
         }
      } catch (error) {
         console.error("Checkout Error:", error);
         alert("Eroare: " + error.message);
         setLoading(false);
      }
   };

   return (
      <div className="space-y-6">
         {/* SELECȚIE DATE */}
         <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-400 mb-1">
               <CalendarIcon className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Perioada șederii</span>
            </div>

            <div className="relative group">
               <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  excludeDateIntervals={excludedIntervals}
                  minDate={new Date()}
                  isClearable={true}
                  placeholderText="Alege check-in & check-out"
                  className="w-full bg-stone-50 p-4 rounded-2xl border border-stone-100 text-stone-800 font-bold placeholder:text-stone-300 focus:bg-white focus:ring-2 focus:ring-green-900/10 outline-none transition-all cursor-pointer"
                  calendarClassName="rounded-[2rem] shadow-2xl border-none p-4"
               />
            </div>
         </div>

         {/* DETALII COST (Apare doar când avem date selectate) */}
         {nights > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
               <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-stone-500 font-medium">
                        {campground.price} RON x {nights} nopți
                     </span>
                     <span className="font-bold text-stone-800">{bookingData.totalPrice} RON</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-stone-200/50">
                     <span className="text-stone-900 font-black">Total</span>
                     <span className="text-2xl font-black text-green-900">{bookingData.totalPrice} RON</span>
                  </div>
               </div>
            </div>
         )}

         {/* BUTON PLATA */}
         <button
            type="button"
            onClick={handleCheckout}
            disabled={!startDate || !endDate || loading}
            className={`group relative w-full py-5 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 overflow-hidden ${
               !startDate || !endDate || loading ? "bg-stone-100 text-stone-400 cursor-not-allowed" : "bg-stone-900 text-white hover:bg-green-900 shadow-xl active:scale-95"
            }`}
         >
            {loading ? (
               <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
               <>
                  <CreditCard className={`w-5 h-5 ${!startDate || !endDate ? "opacity-20" : "opacity-100"}`} />
                  <span>{nights > 0 ? `Plătește ${bookingData.totalPrice} RON` : "Selectează datele"}</span>
               </>
            )}

            {/* Overlay discret la hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
         </button>
      </div>
   );
}
