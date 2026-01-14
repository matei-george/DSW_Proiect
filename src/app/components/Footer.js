import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
   return (
      <footer className="bg-stone-50 border-t border-stone-200 pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Branding */}
            <div className="space-y-6">
               <h3 className="text-2xl font-black text-green-900 tracking-tighter">CampGround.</h3>
               <p className="text-stone-500 text-sm leading-relaxed">
                  Redescoperă natura prin cele mai exclusiviste locații de camping din România. Simplitate în rezervare, amintiri pe viață.
               </p>
               <div className="flex gap-4 text-stone-400">
                  <Instagram className="w-5 h-5 hover:text-green-800 cursor-pointer transition-colors" />
                  <Facebook className="w-5 h-5 hover:text-green-800 cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-green-800 cursor-pointer transition-colors" />
               </div>
            </div>

            {/* Link-uri Utile */}
            <div>
               <h4 className="font-bold text-stone-900 mb-6">Explorare</h4>
               <ul className="space-y-4 text-sm text-stone-500 font-medium">
                  <li>
                     <Link href="/campgrounds" className="hover:text-green-800 transition-colors">
                        Toate Locațiile
                     </Link>
                  </li>
                  <li>
                     <Link href="/campgrounds/new" className="hover:text-green-800 transition-colors">
                        Adaugă un Camping
                     </Link>
                  </li>
                  <li>
                     <Link href="/dashboard" className="hover:text-green-800 transition-colors">
                        Contul Meu
                     </Link>
                  </li>
               </ul>
            </div>

            {/* Politici Legale */}
            <div>
               <h4 className="font-bold text-stone-900 mb-6">Legal</h4>
               <ul className="space-y-4 text-sm text-stone-500 font-medium">
                  <li>
                     <Link href="/politici/termeni" className="hover:text-green-800 transition-colors">
                        Termeni și Condiții
                     </Link>
                  </li>
                  <li>
                     <Link href="politici/termeni/confidentialitate/" className="hover:text-green-800 transition-colors">
                        Confidențialitate (GDPR)
                     </Link>
                  </li>
                  <li>
                     <Link href="/politici/plati" className="hover:text-green-800 transition-colors">
                        Politica de Plăți & Stripe
                     </Link>
                  </li>
               </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
               <h4 className="font-bold text-stone-900 mb-6">Suport</h4>
               <div className="flex items-center gap-3 text-sm text-stone-500">
                  <Mail className="w-4 h-4" />
                  <span>contact@campground.ro</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-stone-500">
                  <MapPin className="w-4 h-4" />
                  <span>București, România</span>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-stone-400 font-medium italic">Creat cu ❤️ pentru iubitorii de natură. © 2026 CampGround.</p>
            <div className="flex gap-6 grayscale opacity-50">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            </div>
         </div>
      </footer>
   );
}
