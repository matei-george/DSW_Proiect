"use client";
import { motion } from "framer-motion";
import { Camera, Calendar, ShieldCheck, MapPin } from "lucide-react";

const features = [
   {
      title: "Vizualizează înainte de a pleca.",
      description:
         "Galeriile noastre de înaltă rezoluție și hărțile integrate îți permit să explorezi fiecare colț al campingului direct de pe dispozitivul tău. Fără surprize, doar natură pură.",
      icon: <Camera className="w-6 h-6 text-green-600" />,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070",
      accent: "bg-green-500",
   },
   {
      title: "Sistem de rezervare inteligent.",
      description:
         "Uită de telefoane și confirmări manuale. Calendarul nostru în timp real îți arată disponibilitatea exactă, iar integrarea cu Stripe îți asigură locul în câteva secunde.",
      icon: <Calendar className="w-6 h-6 text-orange-600" />,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070",
      accent: "bg-orange-500",
   },
   {
      title: "Siguranță la fiecare pas.",
      description:
         "Fiecare locație este verificată de echipa noastră. Review-urile autentice de la comunitate și politicile de plată securizate îți oferă liniștea de care ai nevoie pentru o vacanță perfectă.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?q=80&w=2012",
      accent: "bg-blue-500",
   },
];

export function DetailedFeatures() {
   return (
      <section className="py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 space-y-32 md:space-y-48">
            {features.map((feature, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 md:gap-24 items-center`}
               >
                  {/* Text Content */}
                  <div className="flex-1 space-y-6">
                     <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center shadow-sm border border-stone-100"
                     >
                        {feature.icon}
                     </motion.div>

                     <h2 className="text-4xl md:text-6xl font-black text-stone-900 leading-[1.1] tracking-tighter">{feature.title}</h2>

                     <p className="text-xl text-stone-500 leading-relaxed font-medium max-w-lg">{feature.description}</p>

                     <div className="pt-4">
                        <div className={`h-1 w-20 ${feature.accent} rounded-full opacity-30`} />
                     </div>
                  </div>

                  {/* Image Content */}
                  <div className="flex-1 w-full relative">
                     <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }} className="relative z-10">
                        {/* Glow effect in background */}
                        <div className={`absolute -inset-4 ${feature.accent} opacity-10 blur-3xl rounded-[4rem]`} />

                        <img
                           src={feature.image}
                           alt={feature.title}
                           className="relative rounded-[3rem] shadow-2xl object-cover h-[450px] md:h-[550px] w-full border border-stone-100"
                        />
                     </motion.div>

                     {/* Floating Label (Apple-style detail) */}
                     <motion.div
                        initial={{ x: i % 2 === 0 ? 20 : -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className={`absolute bottom-8 ${
                           i % 2 === 0 ? "-right-4" : "-left-4"
                        } bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden md:block z-20`}
                     >
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${feature.accent} animate-pulse`} />
                           <span className="text-sm font-bold text-stone-800">Verificat de comunitate</span>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
