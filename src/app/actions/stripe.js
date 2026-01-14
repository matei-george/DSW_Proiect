"use server";

import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(bookingData) {
   const session = await getServerSession(authOptions);
   if (!session) throw new Error("Trebuie să fii logat!");

   try {
      // Extragem valorile și le transformăm în string-uri sigure
      const checkoutSession = await stripe.checkout.sessions.create({
         payment_method_types: ["card"],
         line_items: [
            {
               price_data: {
                  currency: "ron",
                  product_data: {
                     name: String(bookingData.campgroundName),
                  },
                  unit_amount: Math.round(Number(bookingData.totalPrice) * 100),
               },
               quantity: 1,
            },
         ],
         mode: "payment",
         success_url: `${process.env.NEXTAUTH_URL}/dashboard?status=success`,
         cancel_url: `${process.env.NEXTAUTH_URL}/campgrounds/${bookingData.campgroundId}`,
         // METADATA - Aici este cheia succesului
         metadata: {
            userId: String(session.user.id),
            campgroundId: String(bookingData.campgroundId),
            checkIn: new Date(bookingData.checkIn).toISOString(),
            checkOut: new Date(bookingData.checkOut).toISOString(),
            totalPrice: String(bookingData.totalPrice),
         },
      });

      return { url: checkoutSession.url };
   } catch (error) {
      console.error("❌ Stripe Action Error:", error.message);
      throw error;
   }
}
