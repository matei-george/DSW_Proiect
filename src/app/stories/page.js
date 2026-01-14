import dbConnect from "../../../lib/mongodb";
import Story from "../../../models/Story";
import User from "../../../models/User";
import Link from "next/link";
import { PenLine } from "lucide-react";
import StoryGrid from "../components/StoryGrid";

export default async function StoriesPage() {
   await dbConnect();

   // Preluăm datele
   const storiesData = await Story.find({}).populate("author", "username").sort({ createdAt: -1 }).lean();

   // Serializare curată: transformăm totul în string-uri/obiecte simple
   const stories = JSON.parse(JSON.stringify(storiesData));

   return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-6">
         <div className="max-w-7xl mx-auto">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div className="max-w-2xl">
                  <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-[0.9]">
                     Jurnal de <br />
                     <span className="text-green-800">Călătorie.</span>
                  </h1>
               </div>

               <Link
                  href="/dashboard/stories/new"
                  className="bg-stone-900 text-white px-8 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-green-900 transition-all shadow-xl flex items-center gap-3 active:scale-95"
               >
                  <PenLine className="w-4 h-4" /> Scrie povestea ta
               </Link>
            </header>

            {/* Aici trimitem doar array-ul serializat */}
            <StoryGrid stories={stories} />
         </div>
      </main>
   );
}
