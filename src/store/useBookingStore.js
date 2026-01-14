import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
   persist(
      (set) => ({
         // Starea inițială
         bookingData: {
            campgroundId: null,
            campgroundName: "",
            checkIn: null,
            checkOut: null,
            guests: 1,
            pricePerNight: 0,
            totalPrice: 0,
         },

         // Acțiune: Setează detaliile de bază ale campingului
         setCampground: (id, name, price) =>
            set((state) => ({
               bookingData: {
                  ...state.bookingData,
                  campgroundId: id,
                  campgroundName: name,
                  pricePerNight: price,
               },
            })),

         // Acțiune: Updatează datele și calculează prețul
         setDates: (checkIn, checkOut) =>
            set((state) => {
               const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 0;

               return {
                  bookingData: {
                     ...state.bookingData,
                     checkIn,
                     checkOut,
                     totalPrice: nights * state.bookingData.pricePerNight,
                  },
               };
            }),

         // Acțiune: Resetare după finalizarea plății
         resetBooking: () =>
            set({
               bookingData: {
                  campgroundId: null,
                  campgroundName: "",
                  checkIn: null,
                  checkOut: null,
                  guests: 1,
                  pricePerNight: 0,
                  totalPrice: 0,
               },
            }),
      }),
      {
         name: "booking-storage", // Numele cheii în localStorage (ține datele la refresh)
      }
   )
);
