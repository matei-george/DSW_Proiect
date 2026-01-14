"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { createStory, updateStory } from "../actions/story";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, MapPin, Feather, ChevronLeft } from "lucide-react";
import Link from "next/link";

// Importăm stilurile pentru Quill
import "react-quill-new/dist/quill.snow.css";

// Importăm editorul dinamic (fără SSR) pentru a fi compatibil cu Next.js
const ReactQuill = dynamic(() => import("react-quill-new"), {
   ssr: false,
   loading: () => <div className="h-64 bg-stone-50 animate-pulse rounded-[2rem]" />,
});

export default function StoryEditor({ campgrounds, story }) {
   const [loading, setLoading] = useState(false);
   // Inițializăm conținutul cu body-ul existent (HTML) sau șir gol
   const [content, setContent] = useState(story?.body || "");
   const router = useRouter();

   const isEditSession = Boolean(story?._id);

   return (
      <form
         action={async (formData) => {
            setLoading(true);
            try {
               // Deoarece formData nu ia automat starea din ReactQuill,
               // am adăugat un input hidden mai jos care se ocupă de asta.
               if (isEditSession) {
                  await updateStory(story._id, formData);
               } else {
                  await createStory(formData);
               }
            } catch (err) {
               alert(err.message);
               setLoading(false);
            }
         }}
         className="space-y-12"
      >
         {/* NAV & ACTIONS */}
         <div className="flex items-center justify-between border-b border-stone-100 pb-8">
            <Link
               href={isEditSession ? `/stories/${story._id}` : "/stories"}
               className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors font-black uppercase tracking-[0.2em] text-[10px]"
            >
               <ChevronLeft className="w-4 h-4" /> Renunță
            </Link>

            <button
               type="submit"
               disabled={loading}
               className="bg-stone-900 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-green-900 shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
               {loading ? "Se salvează..." : isEditSession ? "Salvează Modificările" : "Publică Povestea"}
            </button>
         </div>

         {/* TITLU */}
         <div className="space-y-4">
            <input
               name="title"
               type="text"
               placeholder="Titlul aventurii tale..."
               defaultValue={story?.title || ""}
               required
               className="w-full text-5xl md:text-7xl font-black text-stone-900 tracking-tighter placeholder:text-stone-100 outline-none border-none bg-transparent"
            />

            <div className="flex flex-wrap gap-4 items-center">
               <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
                  <MapPin className="w-3 h-3 text-orange-600" />
                  <select
                     name="campground"
                     defaultValue={story?.campground?._id || story?.campground || ""}
                     className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-stone-500"
                  >
                     <option value="">Alege locația (opțional)</option>
                     {campgrounds.map((camp) => (
                        <option key={camp._id} value={camp._id}>
                           {camp.title}
                        </option>
                     ))}
                  </select>
               </div>

               <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full border border-stone-100 focus-within:ring-2 focus-within:ring-green-900/10">
                  <ImageIcon className="w-3 h-3 text-blue-500" />
                  <input
                     name="imageUrl"
                     type="url"
                     placeholder="URL IMAGINE COVER"
                     defaultValue={story?.images?.[0]?.url || ""}
                     className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-stone-500 w-40 md:w-64"
                  />
               </div>
            </div>
         </div>

         {/* RICH TEXT EDITOR (CORPUL POVEȘTII) */}
         <div className="relative group apple-editor-container">
            {/* Input ascuns care va fi citit de Server Action prin formData.get('body') */}
            <input type="hidden" name="body" value={content} />

            <ReactQuill
               theme="snow"
               value={content}
               onChange={setContent}
               placeholder="Povestește-ne despre experiența ta..."
               className="apple-editor"
               modules={{
                  toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link", "clean"]],
               }}
            />
         </div>

         {/* FOOTER TIPS */}
         <div className="pt-12 border-t border-stone-50">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 text-center italic">Poți folosi formatarea pentru a evidenția momentele cheie.</p>
         </div>
      </form>
   );
}
