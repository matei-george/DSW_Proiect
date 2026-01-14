import dbConnect from "../../../../lib/mongodb";
import Story from "../../../../models/Story";
import User from "../../../../models/User";
import CampGround from "../../../../models/CampGround";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ChevronLeft, Share2, Trash2, Edit3 } from "lucide-react";
import Link from "next/link";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteStory } from "@/app/actions/story";

export default async function StoryDetailPage({ params }) {
   await dbConnect();

   const session = await getServerSession(authOptions);
   const { id } = await params;

   if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

   const story = await Story.findById(id)
      .populate({ path: "author", model: User, select: "username" })
      .populate({ path: "campground", model: CampGround, select: "title location" })
      .lean();

   if (!story) return notFound();

   const isOwner = session?.user?.id === story.author?._id?.toString();

   return (
      <main className="bg-white min-h-screen pt-32 pb-32 px-6">
         <article className="max-w-4xl mx-auto">
            {/* NAVIGARE & ADMIN ACTIONS */}
            <nav className="flex items-center justify-between mb-12">
               <Link
                  href="/stories"
                  className="flex items-center gap-2 text-stone-400 hover:text-stone-900 font-black uppercase tracking-[0.2em] text-[10px] transition-colors"
               >
                  <ChevronLeft className="w-4 h-4" /> Înapoi la Jurnal
               </Link>

               <div className="flex items-center gap-6">
                  {isOwner && (
                     <div className="flex items-center gap-4 border-r border-stone-100 pr-6">
                        <Link
                           href={`/stories/${id}/edit`}
                           className="flex items-center gap-2 text-stone-400 hover:text-green-800 font-black uppercase tracking-widest text-[10px] transition-colors"
                        >
                           <Edit3 className="w-3.5 h-3.5" /> Editează
                        </Link>

                        <form
                           action={async () => {
                              "use server";
                              await deleteStory(id);
                           }}
                        >
                           <button className="flex items-center gap-2 text-stone-400 hover:text-red-600 font-black uppercase tracking-widest text-[10px] transition-colors">
                              <Trash2 className="w-3.5 h-3.5" /> Șterge
                           </button>
                        </form>
                     </div>
                  )}
                  <button className="text-stone-300 hover:text-stone-900 transition-all p-2 hover:bg-stone-50 rounded-full">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </nav>

            {/* HEADER EDITORIAL */}
            <header className="mb-16 text-center">
               <h1 className="text-5xl md:text-8xl font-black text-stone-900 tracking-tighter leading-[0.9] mb-10">{story.title}</h1>

               <div className="flex flex-wrap items-center justify-center gap-6 text-stone-400">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-[12px] text-white font-black shadow-lg">
                        {story.author?.username?.charAt(0).toUpperCase() || "U"}
                     </div>
                     <span className="text-[11px] font-black uppercase tracking-widest text-stone-900">{story.author?.username || "Explorator"}</span>
                  </div>

                  <div className="h-4 w-[1px] bg-stone-100 hidden md:block" />

                  <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-stone-900">
                     <Calendar className="w-3.5 h-3.5" />
                     {new Date(story.createdAt).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                     })}
                  </div>

                  {story.campground && (
                     <>
                        <div className="h-4 w-[1px] bg-stone-100 hidden md:block" />
                        <Link
                           href={`/campgrounds/${story.campground._id}`}
                           className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors"
                        >
                           <MapPin className="w-3.5 h-3.5" />
                           {story.campground.title}
                        </Link>
                     </>
                  )}
               </div>
            </header>

            {/* IMAGINE HERO */}
            <div className="relative h-[500px] md:h-[750px] w-full rounded-[3.5rem] overflow-hidden mb-24 shadow-2xl border border-stone-100">
               <img
                  src={story.images?.[0]?.url || "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"}
                  alt={story.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-[3s] ease-out"
               />
            </div>

            {/* CONȚINUTUL POVEȘTII (Randare HTML) */}
            <div className="max-w-2xl mx-auto">
               {/* BUG FIXED: Folosim dangerouslySetInnerHTML pentru a interpreta tag-urile HTML din Quill */}
               <div
                  className="prose prose-stone prose-2xl font-serif text-stone-900 leading-relaxed italic selection:bg-green-100"
                  dangerouslySetInnerHTML={{ __html: story.body }}
               />

               {/* FINAL DECORATIV */}
               <div className="mt-24 flex flex-col items-center">
                  <div className="w-16 h-[1px] bg-stone-200 mb-8" />
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-stone-300">Sfârșitul Poveștii</p>
               </div>
            </div>
         </article>
      </main>
   );
}
