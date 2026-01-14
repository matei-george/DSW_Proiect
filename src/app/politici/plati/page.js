import { ShieldCheck, Lock, CreditCard, RefreshCcw } from "lucide-react";

export default function PaymentsPage() {
   return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-6">
         <article className="max-w-3xl mx-auto">
            {/* HEADER PAGINĂ */}
            <header className="mb-16">
               <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-900 rounded-lg flex items-center justify-center text-white">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Siguranță Garantată</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-6">
                  Plăți & Securitate<span className="text-green-800">.</span>
               </h1>
               <p className="text-xl text-stone-400 font-medium italic font-serif">Transparență totală în procesarea tranzacțiilor tale.</p>
            </header>

            {/* CARDUL STRIPE (DESIGN APPLE) */}
            <div className="bg-stone-50 p-10 rounded-[3rem] border border-stone-100 mb-16 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Lock className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-900 mb-4 tracking-tight">Parteneriatul cu Stripe</h3>
                  <p className="text-stone-600 leading-relaxed font-medium">
                     Toate tranzacțiile de pe platforma <strong>CampGround</strong> sunt procesate prin infrastructura Stripe, lider mondial în plăți online. Acest lucru
                     garantează că datele cardului tău nu ating niciodată serverele noastre, fiind criptate direct de Stripe.
                  </p>
                  <div className="mt-8 flex gap-4 items-center">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-60" />
                     <div className="h-4 w-[1px] bg-stone-200" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">PCI DSS Level 1 Certified</span>
                  </div>
               </div>
            </div>

            {/* CONȚINUT EXTINS (PROSE STYLE) */}
            <div className="prose prose-stone prose-lg max-w-none space-y-12 text-stone-600 font-medium">
               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <Lock className="w-6 h-6 text-stone-400" /> 1. Securitatea Datelor
                  </h2>
                  <p>
                     Folosim protocolul <strong>SSL (Secure Sockets Layer)</strong> de 256 de biți pentru a cripta toate comunicațiile dintre browserul tău și procesatorul de
                     plăți. Suplimentar, implementăm <strong>3D Secure 2.0</strong>, care adaugă un strat de verificare prin aplicația ta bancară pentru a preveni utilizarea
                     neautorizată a cardului.
                  </p>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <CreditCard className="w-6 h-6 text-stone-400" /> 2. Procesul de Rezervare
                  </h2>
                  <p>
                     În momentul în care apeși butonul "Rezervă acum", suma totală este debitată de pe cardul tău. Această sumă este păstrată într-un cont securizat (escrow)
                     și este transferată către proprietarul campingului doar după ce procesul de check-in a fost inițiat cu succes. Această metodă protejează atât turistul,
                     cât și proprietarul.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                     <li>
                        Sumele sunt afișate și procesate în <strong>RON</strong>.
                     </li>
                     <li>Taxele de procesare sunt incluse în prețul afișat, cu excepția cazurilor specificate clar.</li>
                     <li>Vei primi o confirmare prin e-mail și o factură digitală imediat după plată.</li>
                  </ul>
               </section>

               <section>
                  <h2 className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                     <RefreshCcw className="w-6 h-6 text-stone-400" /> 3. Politica de Rambursare
                  </h2>
                  <p>Înțelegem că planurile se pot schimba. Rambursările sunt gestionate automat conform politicii de anulare a fiecărei locații:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                     <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100">
                        <h4 className="font-black text-stone-900 mb-2">Anulare Gratuită</h4>
                        <p className="text-sm">Rambursare 100% dacă anularea se face cu cel puțin 48 de ore înainte de data sosirii.</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-stone-50 border border-stone-100">
                        <h4 className="font-black text-stone-900 mb-2">Anulare Tardivă</h4>
                        <p className="text-sm">Se poate reține costul primei nopți de cazare dacă anularea are loc sub pragul de 48 de ore.</p>
                     </div>
                  </div>
                  <p className="mt-6">
                     Odată aprobată, rambursarea va apărea pe extrasul tău bancar în termen de <strong>5-10 zile lucrătoare</strong>, în funcție de instituția bancară
                     emitentă.
                  </p>
               </section>

               <section className="pt-10 border-t border-stone-100">
                  <p className="text-sm text-stone-400 italic">
                     Dacă ai întrebări suplimentare legate de tranzacții, ne poți contacta oricând la{" "}
                     <span className="text-stone-900 font-bold underline">plati@campground.ro</span>.
                  </p>
               </section>
            </div>
         </article>
      </main>
   );
}
