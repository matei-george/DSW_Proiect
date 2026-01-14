import dbConnect from "../../../lib/mongodb";
import CampGround from "../../../models/CampGround";
import CampgroundCard from "../components/CampgroundCard";
import CampgroundFilters from "../components/CampgroundFilters";
import ClusterMap from "../components/ClusterMap";
import Footer from "../components/Footer";

export default async function CampgroundsPage({ searchParams }) {
   await dbConnect();

   // Preluăm filtrele (cu await pentru Next.js 15+)
   const { search, maxPrice } = await searchParams;

   let query = {};
   if (search) {
      query.title = { $regex: search, $options: "i" };
   }
   if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
   }

   const campgrounds = await CampGround.find(query).sort({ createdAt: -1 }).lean();

   return (
      <div className="bg-stone-50 min-h-screen pb-32">
         {/* SECTIUNEA HARTA: Apple-style container */}
         <div className="pt-24 px-4 md:px-10">
            <div className="relative h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
               <ClusterMap campgrounds={JSON.parse(JSON.stringify(campgrounds))} />

               {/* Overlay discret pentru profunzime */}
               <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-[2.8rem]" />
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 mt-16">
            {/* HEADER SI STATISTICI */}
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
               <div className="space-y-2">
                  <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter">
                     Explorare<span className="text-green-800">.</span>
                  </h1>
                  <p className="text-xl text-stone-500 font-medium italic font-serif">{campgrounds.length} destinații descoperite în România</p>
               </div>

               {/* Badge de status */}
               <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-widest">Live Updates</span>
               </div>
            </div>

            {/* FILTRE: Floating Glass Design */}
            <div className="mb-16">
               <CampgroundFilters />
            </div>

            {/* GRID REZULTATE */}
            {campgrounds.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-stone-300">
                  <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center text-4xl mb-6">🗺️</div>
                  <h3 className="text-2xl font-black text-stone-800 tracking-tight">Niciun rezultat găsit</h3>
                  <p className="text-stone-500 mt-2 font-medium">Încearcă să schimbi filtrele sau caută o altă zonă.</p>
                  <button className="mt-8 text-green-800 font-bold hover:underline">Resetează toate filtrele</button>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {campgrounds.map((camp) => (
                     <CampgroundCard key={camp._id} campground={JSON.parse(JSON.stringify(camp))} />
                  ))}
               </div>
            )}
         </div>
         <Footer />
      </div>
   );
}
