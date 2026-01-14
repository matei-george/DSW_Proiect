import dbConnect from "../../../../lib/mongodb";
import CampGround from "../../../../models/CampGround";
import Review from "../../../../models/Review";
import Story from "../../../../models/Story";
import User from "../../../../models/User";
import { notFound } from "next/navigation";
import ReviewForm from "../../components/ReviewForm";
import BookingForm from "../../components/BookingForm";
import StoryCard from "../../components/StoryCard"; // Importăm componenta ta de card
import { MapPin, ShieldCheck, Zap, BookOpen } from "lucide-react";
import Footer from "@/app/components/Footer";

export default async function CampgroundShowPage({ params }) {
   await dbConnect();

   // Forțăm înregistrarea modelelor pentru populare
   const _m = [User.schema, Review.schema, Story.schema];

   const { id } = await params;

   // 1. Luăm datele campingului
   const campground = await CampGround.findById(id)
      .populate({
         path: "reviews",
         populate: { path: "author", select: "username" },
      })
      .lean();

   if (!campground) return notFound();

   // 2. Luăm poveștile asociate acestui camping
   const relatedStoriesData = await Story.find({ campground: id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(3) // Afișăm ultimele 3 pentru a nu aglomera pagina
      .lean();

   const camp = JSON.parse(JSON.stringify(campground));
   const stories = JSON.parse(JSON.stringify(relatedStoriesData));

   return (
      <div className="bg-stone-50 min-h-screen pb-20">
         {/* HEADER SECTION */}
         <div className="max-w-7xl mx-auto px-6 pt-32 mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tighter mb-4">{camp.title}</h1>
            <div className="flex items-center gap-4 text-stone-500 font-bold">
               <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="underline decoration-stone-300 underline-offset-4">{camp.location}</span>
               </div>
               <span>•</span>
               <div className="flex items-center gap-1">
                  <span className="text-orange-500">★</span>
                  <span>{camp.reviews?.length || 0} recenzii</span>
               </div>
            </div>
         </div>

         {/* MAIN GRID: Poza și Booking */}
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
               <div className="relative h-[400px] md:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                  <img
                     src={camp.images?.[0]?.url || "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce"}
                     alt={camp.title}
                     className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
                  />
               </div>
            </div>

            <div className="lg:col-span-4">
               <div className="sticky top-32 bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-stone-100 space-y-6">
                  <div className="flex justify-between items-baseline">
                     <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-stone-900">{camp.price} RON</span>
                        <span className="text-stone-400 font-bold">/ noapte</span>
                     </div>
                  </div>
                  <BookingForm campground={camp} />
                  <div className="space-y-4 pt-4 border-t border-stone-50">
                     <div className="flex items-center gap-3 text-stone-600">
                        <Zap className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold tracking-tight">Confirmare instantanee</span>
                     </div>
                     <div className="flex items-center gap-3 text-stone-600">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold tracking-tight">Anulare gratuită (48h)</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* CONTENT SECTION */}
         <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-8 space-y-24">
               {/* DESCRIERE */}
               <section>
                  <h2 className="text-3xl font-black text-stone-900 mb-6 tracking-tight">Despre acest camping</h2>
                  <p className="text-stone-500 leading-relaxed text-xl font-medium whitespace-pre-line">{camp.description}</p>
               </section>

               <hr className="border-stone-100" />

               {/* JURNAL DE CĂLĂTORIE (STORIES) */}
               {stories.length > 0 && (
                  <section className="space-y-10">
                     <div className="flex items-end justify-between">
                        <div>
                           <div className="flex items-center gap-2 text-green-800 mb-2">
                              <BookOpen className="w-5 h-5" />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Experiențe autentice</span>
                           </div>
                           <h3 className="text-4xl font-black text-stone-900 tracking-tighter">Jurnale de la fața locului.</h3>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {stories.map((story) => (
                           <div key={story._id} className="transform scale-95 origin-left">
                              <StoryCard story={story} />
                           </div>
                        ))}
                     </div>
                  </section>
               )}

               <hr className="border-stone-100" />

               {/* RECENZII */}
               <section className="space-y-10">
                  <div className="flex items-center justify-between">
                     <h3 className="text-4xl font-black text-stone-900 tracking-tighter">Feedback.</h3>
                     <div className="bg-stone-100 px-4 py-2 rounded-full text-sm font-black text-stone-600 uppercase">{camp.reviews?.length || 0} opinii</div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
                     <ReviewForm campgroundId={camp._id} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {camp.reviews?.map((review) => (
                        <div key={review._id} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                           <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white font-black">
                                 {review.author?.username?.charAt(0) || "U"}
                              </div>
                              <div>
                                 <p className="font-black text-stone-900 leading-none">{review.author?.username}</p>
                                 <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                                    {new Date(review.createdAt).toLocaleDateString("ro-RO")}
                                 </p>
                              </div>
                           </div>
                           <p className="text-stone-600 italic font-medium leading-relaxed">"{review.body}"</p>
                        </div>
                     ))}
                  </div>
               </section>
            </div>
         </div>
         <Footer />
      </div>
   );
}
