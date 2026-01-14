import dbConnect from "../../../../../lib/mongodb";
import Story from "../../../../../models/Story";
import CampGround from "../../../../../models/CampGround";
import StoryEditor from "@/app/components/StoryEditor";
import { notFound } from "next/navigation";

export default async function EditStoryPage({ params }) {
   await dbConnect();
   const { id } = await params;

   const story = await Story.findById(id).lean();
   const campgrounds = await CampGround.find({}, "title").lean();

   if (!story) return notFound();

   return (
      // bg-white forțează fundalul deschis, min-h-screen asigură că albul acoperă toată pagina
      <main className="bg-white min-h-screen pt-40 pb-20 px-6">
         <div className="max-w-4xl mx-auto">
            {/* Header subtil stil Apple */}
            <div className="mb-12">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 block mb-2">Drafting Room</span>
               <h2 className="text-4xl font-black text-stone-900 tracking-tighter">Editează Povestea.</h2>
            </div>

            {/* Containerul Editorului */}
            <div className="bg-white">
               <StoryEditor campgrounds={JSON.parse(JSON.stringify(campgrounds))} story={JSON.parse(JSON.stringify(story))} />
            </div>
         </div>
      </main>
   );
}
