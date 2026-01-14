import { Eye, ShieldCheck, Database, Trash2, Mail } from "lucide-react";

export default function PrivacyPage() {
   return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-6">
         <article className="max-w-3xl mx-auto">
            {/* HEADER PAGINĂ */}
            <header className="mb-16">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center text-white">
                     <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Transparență Totală</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-6">
                  Confidențialitate<span className="text-green-800">.</span>
               </h1>
               <p className="text-xl text-stone-400 font-medium italic font-serif">Protecția datelor tale este fundamentul încrederii pe care o construim.</p>
            </header>

            {/* CARD GDPR (DESIGN APPLE) */}
            <div className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100 mb-16 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform text-green-900">
                  <ShieldCheck className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-2xl font-black text-stone-900 mb-4 tracking-tight italic font-serif">Angajamentul nostru</h3>
                  <p className="text-stone-600 leading-relaxed font-medium">
                     La <strong>CampGround</strong>, nu colectăm date doar de dragul de a le avea. Fiecare informație pe care o cerem are scopul unic de a-ți îmbunătăți
                     experiența de călătorie sau de a asigura securitatea tranzacțiilor tale.
                  </p>
               </div>
            </div>

            {/* CONȚINUT EXTINS */}
            <div className="prose prose-stone prose-lg max-w-none space-y-12 text-stone-600 font-medium">
               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <Database className="w-6 h-6 text-stone-400" /> 1. Ce date colectăm?
                  </h2>
                  <p>Pentru a funcționa corect, platforma noastră colectează următoarele categorii de date:</p>
                  <ul className="list-disc pl-6 space-y-3">
                     <li>
                        <strong>Informații de Identitate:</strong> Numele de utilizator și adresa de e-mail furnizate la înregistrare.
                     </li>
                     <li>
                        <strong>Date de Tranzacționare:</strong> Detalii despre rezervările tale, istoricul plăților și preferințele de camping.
                     </li>
                     <li>
                        <strong>Date Tehnice:</strong> Adresa IP, tipul de browser și date despre modul în care interacționezi cu platforma (prin cookie-uri esențiale).
                     </li>
                     <li>
                        <strong>Geolocație:</strong> Doar cu permisiunea ta, pentru a-ți arăta campingurile din proximitate pe hartă.
                     </li>
                  </ul>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <ShieldCheck className="w-6 h-6 text-stone-400" /> 2. Utilizarea datelor
                  </h2>
                  <p>Datele tale sunt folosite strict pentru:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
                     <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100">
                        <h4 className="font-black text-stone-900 text-sm mb-2 uppercase tracking-widest">Procesare</h4>
                        <p className="text-sm text-stone-500">Pentru a genera rezervări valide și a asigura comunicarea cu proprietarii de camping.</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100">
                        <h4 className="font-black text-stone-900 text-sm mb-2 uppercase tracking-widest">Securitate</h4>
                        <p className="text-sm text-stone-500">Pentru a preveni fraudele și a valida autenticitatea recenziilor postate.</p>
                     </div>
                  </div>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <Trash2 className="w-6 h-6 text-stone-400" /> 3. Drepturile tale (GDPR)
                  </h2>
                  <p>Conform Regulamentului General privind Protecția Datelor (GDPR), beneficiezi de următoarele drepturi:</p>
                  <ul className="list-none pl-0 space-y-4">
                     <li className="flex gap-4">
                        <span className="text-green-800 font-black">01.</span>
                        <span>
                           <strong>Dreptul de acces:</strong> Poți solicita o copie a tuturor datelor pe care le deținem despre tine.
                        </span>
                     </li>
                     <li className="flex gap-4">
                        <span className="text-green-800 font-black">02.</span>
                        <span>
                           <strong>Dreptul la rectificare:</strong> Poți modifica orice informație incorectă din profilul tău.
                        </span>
                     </li>
                     <li className="flex gap-4">
                        <span className="text-green-800 font-black">03.</span>
                        <span>
                           <strong>Dreptul de a fi uitat:</strong> Poți solicita ștergerea definitivă a contului tău din baza noastră de date.
                        </span>
                     </li>
                  </ul>
               </section>

               <section className="pt-10 border-t border-stone-100">
                  <div className="flex items-center gap-4 bg-stone-900 text-white p-8 rounded-[2rem] shadow-xl">
                     <Mail className="w-10 h-10 text-green-400" />
                     <div>
                        <h4 className="font-black text-lg m-0">Solicitări privind datele</h4>
                        <p className="text-stone-400 text-sm m-0">
                           Pentru orice cerere legată de confidențialitate, scrie-ne la <span className="text-white font-bold">privacy@campground.ro</span>. Răspundem în
                           maximum 24 de ore.
                        </p>
                     </div>
                  </div>
               </section>
            </div>
         </article>
      </main>
   );
}
