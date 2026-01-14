import dbConnect from "../../../../lib/mongodb";
import CampGround from "../../../../models/CampGround";
import StoryEditor from "@/app/components/StoryEditor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function NewStoryPage() {
   // În v4, folosim getServerSession pentru a prelua sesiunea pe server
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/login");
   }

   await dbConnect();

   // Preluăm campingurile pentru ca utilizatorul să poată asocia povestea unei locații
   const campgrounds = await CampGround.find({}, "title").lean();

   return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-6">
         <div className="max-w-4xl mx-auto">
            {/* Header-ul paginii de creație */}
            <div className="mb-12">
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-4">Storyboard / New Entry</h2>
               <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter">
                  Începe o poveste nouă<span className="text-green-800">.</span>
               </h1>
            </div>

            {/* Editorul vizual creat anterior */}
            <StoryEditor campgrounds={JSON.parse(JSON.stringify(campgrounds))} />
         </div>
      </main>
   );
}
