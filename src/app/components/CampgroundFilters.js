"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, Coins, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function CampgroundFilters() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const [search, setSearch] = useState(searchParams.get("search") || "");
   const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

   const handleFilter = () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (maxPrice) params.set("maxPrice", maxPrice);
      router.push(`/campgrounds?${params.toString()}`);
   };

   const handleReset = () => {
      setSearch("");
      setMaxPrice("");
      router.push("/campgrounds");
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-white p-2 md:p-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-stone-100 flex flex-col md:flex-row gap-2 items-center"
      >
         {/* INPUT CAUTARE */}
         <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-stone-50 rounded-[2rem] w-full group focus-within:bg-white focus-within:ring-2 focus-within:ring-green-900/10 transition-all">
            <Search className="w-5 h-5 text-stone-400 group-focus-within:text-green-800" />
            <div className="flex flex-col flex-1">
               <span className="text-[10px] font-black uppercase tracking-tighter text-stone-400">Destinație</span>
               <input
                  type="text"
                  placeholder="Unde vrei să mergi?"
                  className="bg-transparent border-none outline-none text-stone-800 font-bold placeholder:text-stone-300 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>

         {/* INPUT PRET */}
         <div className="w-full md:w-64 flex items-center gap-3 px-6 py-4 bg-stone-50 rounded-[2rem] group focus-within:bg-white focus-within:ring-2 focus-within:ring-green-900/10 transition-all">
            <Coins className="w-5 h-5 text-stone-400 group-focus-within:text-green-800" />
            <div className="flex flex-col flex-1">
               <span className="text-[10px] font-black uppercase tracking-tighter text-stone-400">Buget Max (RON)</span>
               <input
                  type="number"
                  placeholder="Ex: 200"
                  className="bg-transparent border-none outline-none text-stone-800 font-bold placeholder:text-stone-300 w-full"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
               />
            </div>
         </div>

         {/* BUTOANE ACTIUNE */}
         <div className="flex gap-2 w-full md:w-auto p-1">
            <button
               onClick={handleFilter}
               className="flex-1 md:flex-none bg-green-900 text-white px-10 py-5 rounded-[1.8rem] font-black text-sm hover:bg-green-800 transition-all shadow-lg shadow-green-900/20 active:scale-95"
            >
               Caută
            </button>
            <button
               onClick={handleReset}
               className="p-5 rounded-[1.8rem] bg-stone-100 text-stone-500 hover:bg-stone-200 transition-all active:rotate-180 duration-500"
               title="Resetează"
            >
               <RotateCcw className="w-5 h-5" />
            </button>
         </div>
      </motion.div>
   );
}
