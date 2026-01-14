"use client";

import { useState, useEffect } from "react";
import StoryCard from "./StoryCard";

export default function StoryGrid({ stories }) {
   const [isClient, setIsClient] = useState(false);

   // Forțăm randarea doar pe client pentru a proteja Framer Motion
   useEffect(() => {
      setIsClient(true);
   }, []);

   if (!isClient) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
               <div key={i} className="h-[450px] bg-stone-50 rounded-[2.5rem] animate-pulse" />
            ))}
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
         {stories.map((story) => {
            // Ne asigurăm că ID-ul este string și transmitem prop-ul clar
            const storyId = story._id.toString();
            return <StoryCard key={storyId} story={story} />;
         })}
      </div>
   );
}
