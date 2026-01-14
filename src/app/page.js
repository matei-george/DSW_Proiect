import dbConnect from "../../lib/mongodb";
import CampGround from "../../models/CampGround";
import Link from "next/link";

// Importuri Componente UI
import Hero from "./components/Hero";
import Features from "./components/Features";
import CampgroundCard from "./components/CampgroundCard";
import { DetailedFeatures } from "./components/DetailedFeatures"; // Secțiunea de detalii "Apple-style"
import Footer from "./components/Footer";
import PaymentsPage from "./politici/plati/page";

export default async function HomePage() {
   await dbConnect();

   // Preluăm cele mai noi 3 campinguri pentru secțiunea Featured
   const featuredCamps = await CampGround.find({}).sort({ createdAt: -1 }).limit(3).lean();

   return (
      <main className="bg-stone-50 selection:bg-green-200 selection:text-green-900">
         {/* 1. HERO SECTION: 3D, Blobs & Glassmorphism */}
         <Hero />

         {/* 2. BENTO GRID FEATURES: Tehnologie & Libertate */}
         <div className="bg-white relative z-20">
            <Features />
         </div>

         {/* 3. DETAILED FEATURES: Secțiuni alternate cu imagini mari */}
         <DetailedFeatures />

         {/* 4. FEATURED DESTINATIONS: Cardurile cu campinguri reale */}
         <section className="max-w-7xl mx-auto px-4 py-32">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
               <div>
                  <h2 className="text-5xl font-black text-stone-900 tracking-tighter">Destinații de top.</h2>
                  <p className="text-xl text-stone-500 mt-4 max-w-md font-medium">Selecția noastră de locații premium, verificate manual pentru siguranță și confort.</p>
               </div>
               <Link href="/campgrounds" className="group flex items-center text-green-800 font-bold text-lg hover:text-green-700 transition-colors">
                  Explorează tot catalogul
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {featuredCamps.length > 0 ? (
                  featuredCamps.map((camp) => <CampgroundCard key={camp._id} campground={JSON.parse(JSON.stringify(camp))} />)
               ) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-stone-200">
                     <p className="text-stone-400 italic">Nu am găsit campinguri de afișat momentan.</p>
                  </div>
               )}
            </div>
         </section>

         {/* 5. CALL TO ACTION: Cardul final de impact */}
         <section className="py-32 px-4">
            <div className="max-w-6xl mx-auto bg-green-950 rounded-[4rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,45,0,0.3)]">
               {/* Overlay Decorativ */}
               <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500 rounded-full blur-[120px] opacity-20" />
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-400 rounded-full blur-[120px] opacity-20" />

               <div className="relative z-10">
                  <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
                     Ești gata să îți <br /> instalezi cortul <br />
                     <span className="text-green-400">sub stele?</span>
                  </h2>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                     <Link
                        href="/register"
                        className="bg-white text-green-950 px-12 py-6 rounded-full font-black text-xl hover:bg-stone-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
                     >
                        Creează un cont acum
                     </Link>
                     <Link href="/campgrounds" className="text-white font-bold text-lg hover:underline underline-offset-8">
                        Află cum funcționează
                     </Link>
                  </div>

                  <p className="mt-12 text-green-200/60 text-sm font-medium uppercase tracking-[0.3em]">Alătură-te celor +2,000 de exploratori</p>
               </div>
            </div>
         </section>
         <Footer />
      </main>
   );
}
