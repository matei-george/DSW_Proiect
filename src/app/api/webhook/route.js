import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "../../../../lib/mongodb";
import Booking from "../../../../models/Booking";
import User from "../../../../models/User";
import CampGround from "../../../../models/CampGround";

// app/api/webhook/route.js (sau calea ta specifică)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
   const body = await req.text();
   const sig = req.headers.get("stripe-signature");
   let event;

   console.log("🔔 Webhook primit: Verificăm semnătura...");

   try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log("✅ Semnătură validă! Tip eveniment:", event.type);
   } catch (err) {
      console.error(`❌ Eroare Semnătură Webhook: ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
   }

   if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("📦 Date primite în Metadata:", session.metadata);

      if (!session.metadata?.userId) {
         console.error("⚠️ Atenție: Sesiunea nu conține userId în metadata!");
         return NextResponse.json({ received: true });
      }

      try {
         await dbConnect();
         console.log("🗄️ Conectat la baza de date pentru salvare...");

         const { userId, campgroundId, checkIn, checkOut, totalPrice } = session.metadata;

         const newBooking = await Booking.create({
            user: userId,
            campground: campgroundId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            totalPrice: Number(totalPrice),
            stripeSessionId: session.id,
            status: "paid",
         });

         console.log("🚀 REZERVARE SALVATĂ CU SUCCES! ID:", newBooking._id);
      } catch (dbError) {
         console.error("❌ EROARE CRITICĂ LA SALVARE ÎN DB:", dbError.message);
         return NextResponse.json({ error: dbError.message }, { status: 500 });
      }
   }

   return NextResponse.json({ received: true }, { status: 200 });
}
