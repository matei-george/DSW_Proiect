import { FileText, Scale, AlertTriangle, Hammer, Gavel, ShieldCheck } from "lucide-react";

export default function TermsPage() {
   return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-6">
         <article className="max-w-3xl mx-auto">
            {/* HEADER PAGINĂ */}
            <header className="mb-16">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center text-white">
                     <Scale className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Acord Utilizator</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-6">
                  Termeni & Condiții<span className="text-green-800">.</span>
               </h1>
               <p className="text-xl text-stone-400 font-medium italic font-serif">Regulile comunității noastre pentru o explorare responsabilă.</p>
               <div className="mt-8 text-xs font-bold text-stone-300 uppercase tracking-widest">Ultima actualizare: 13 Ianuarie 2026</div>
            </header>

            {/* NOTĂ INTRODUCTIVĂ */}
            <div className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100 mb-16 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-xl font-black text-orange-900 mb-3 flex items-center gap-2">
                     <AlertTriangle className="w-5 h-5" /> Vă rugăm să citiți cu atenție
                  </h3>
                  <p className="text-orange-800/80 leading-relaxed font-medium text-sm">
                     Prezentul document reprezintă un contract legal între dumneavoastră și platforma <strong>CampGround</strong>. Prin accesarea sau utilizarea serviciilor
                     noastre, confirmați că ați citit, înțeles și acceptat să respectați acești termeni.
                  </p>
               </div>
            </div>

            {/* CONȚINUT JURIDIC DETALIAT */}
            <div className="prose prose-stone prose-lg max-w-none space-y-16 text-stone-600 font-medium">
               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <FileText className="w-6 h-6 text-stone-400" /> 1. Utilizarea Serviciului
                  </h2>
                  <p>Platforma CampGround facilitează conectarea între turiști și proprietarii de terenuri de camping. Pentru a utiliza serviciul, trebuie:</p>
                  <ul className="list-disc pl-6 space-y-2">
                     <li>Să aveți vârsta minimă de 18 ani pentru a crea un cont.</li>
                     <li>Să furnizați informații de înregistrare corecte și complete.</li>
                     <li>Să mențineți securitatea parolei dumneavoastră și să raportați orice utilizare neautorizată.</li>
                  </ul>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <Hammer className="w-6 h-6 text-stone-400" /> 2. Politica de Comportament
                  </h2>
                  <p>Respectul față de natură și față de ceilalți membri ai comunității este obligatoriu. Utilizatorii se angajează să:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 not-prose">
                     <div className="p-6 rounded-[2rem] bg-stone-50 border border-stone-100">
                        <h4 className="font-black text-stone-900 text-xs mb-2 uppercase tracking-widest">Protecția Mediului</h4>
                        <p className="text-xs text-stone-500 leading-relaxed italic">
                           Este interzisă abandonarea deșeurilor, distrugerea florei sau poluarea surselor de apă din proximitatea campingurilor.
                        </p>
                     </div>
                     <div className="p-6 rounded-[2rem] bg-stone-50 border border-stone-100">
                        <h4 className="font-black text-stone-900 text-xs mb-2 uppercase tracking-widest">Respectarea Vecinătății</h4>
                        <p className="text-xs text-stone-500 leading-relaxed italic">
                           Respectarea orelor de liniște și a regulamentului specific stabilit de fiecare proprietar de camping în parte.
                        </p>
                     </div>
                  </div>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <Gavel className="w-6 h-6 text-stone-400" /> 3. Plăți, Rezervări și Daune
                  </h2>
                  <p>
                     Toate plățile sunt procesate prin sistemul nostru securizat. CampGround funcționează ca intermediar, reținând fondurile până la confirmarea serviciului.
                  </p>
                  <ul className="list-none pl-0 space-y-4">
                     <li>
                        <strong>Răspunderea pentru daune:</strong> Turistul este direct responsabil pentru orice daune cauzate proprietății, facilităților sau echipamentelor
                        oferite de proprietarul campingului.
                     </li>
                     <li>
                        <strong>Modificarea prețurilor:</strong> Proprietarii își rezervă dreptul de a modifica tarifele, însă orice rezervare deja confirmată va păstra prețul
                        de la momentul plății.
                     </li>
                  </ul>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     {/* Acum ShieldCheck va funcționa corect */}
                     <ShieldCheck className="w-6 h-6 text-stone-400" /> 4. Limitarea Răspunderii
                  </h2>
                  <p>CampGround depune eforturi constante pentru a verifica calitatea locațiilor listate, însă:</p>
                  <ul className="list-disc pl-6">
                     <li>Nu suntem responsabili pentru calitatea terenului sau evenimentele meteorologice.</li>
                     <li>Nu ne asumăm răspunderea pentru pierderea sau furtul bunurilor personale ale turiștilor.</li>
                     <li>Proprietarii sunt singurii responsabili pentru conformitatea legală și siguranța fizică a locurilor de campare oferite.</li>
                  </ul>
               </section>
               <section className="pt-10 border-t border-stone-100 text-center">
                  <p className="text-sm text-stone-400 italic">
                     Utilizarea în continuare a site-ului reprezintă acceptarea acestor condiții de utilizare. Pentru orice nelămurire juridică, vă rugăm să ne scrieți la{" "}
                     <span className="text-stone-900 font-bold underline">legal@campground.ro</span>.
                  </p>
               </section>
            </div>
         </article>
      </main>
   );
}
