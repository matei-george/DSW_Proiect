# 🌲 CampGround. — Documentație Tehnică de Arhitectură (Extinsă)

## Autori

-  Gradinaru Cosmin Gabriel
-  Murarasu Matei George

---

## 1. Paradigma de Dezvoltare: Next.js 14 Full-Stack

Aplicația utilizează **Next.js 14** cu **App Router**, eliminând separarea tradițională între Frontend și Backend prin integrarea logică a serverului direct în componente.

### ⚛️ React Server Components (RSC) vs. Client Components

-  **Strategie:** Paginile de listare (`/campgrounds`) și paginile de detalii sunt randate exclusiv pe server.
-  **Beneficiu:** Datele sunt interogate direct din MongoDB în momentul randării, trimițând către client un fișier HTML gata populat. Acest lucru reduce bundle-ul JavaScript trimis către browser, elimină problemele de SEO și oferă un timp de încărcare inițial instantaneu.
-  **Client Components:** Folosite strict pentru părțile care necesită interactivitate (formulare, hărți, animații Framer Motion) și sunt marcate cu directiva `"use client"`.

### ⚡ Server Actions (Data Mutations)

Toată logica de scriere a datelor (POST, PUT, DELETE) este mutată în **Server Actions** (`src/app/actions/`).

-  **Integritate:** Fiecare acțiune verifică sesiunea via `getServerSession` înainte de execuție pentru a asigura autorizarea.
-  **Cache Invalidation:** Utilizăm `revalidatePath` pentru a forța Next.js să actualizeze cache-ul paginilor afectate, oferind utilizatorului date "fresh" imediat după o modificare, fără a fi nevoie de un refresh manual de pagină.

---

## 2. Arhitectura Bazei de Date (Persistence Layer)

Utilizăm **MongoDB Atlas** cu **Mongoose** ca ODM (Object Data Modeling) pentru o gestionare structurată a datelor NoSQL.

### 🗄️ Modele și Relații

-  **User Schema:** Gestionează identitatea utilizatorilor. Parolele sunt securizate utilizând **Bcrypt.js** cu un salt de 12. Include un câmp `role` (`tourist` / `owner`) care guvernează accesul la rute și funcționalități.
-  **Campground Schema:** Include date geospațiale (GeoJSON), referințe către `User` (author) și o matrice de ID-uri pentru `Review`.
-  **Booking Schema:** Document tranzacțional critic. Leagă un utilizator de un camping pentru un interval specific de timp (`checkIn`, `checkOut`) și stochează `stripeSessionId` pentru procesul de audit.
-  **Story Schema:** Suportă conținut de tip blog, incluzând suport pentru imagini multiple și legături opționale cu locații de camping pentru context geografic.

### 🛠️ Singleton Connection Pattern

În `lib/mongodb.js`, am implementat modelul **Singleton** pentru conexiunea la baza de date. În mediile Serverless (cum este Vercel), funcțiile pot fi pornite și oprite rapid; Singleton-ul asigură că refolosim conexiunea existentă în loc să creăm una nouă la fiecare apel, prevenind eroarea de _"Too many connections"_ în MongoDB Atlas.

---

## 3. Sistemul de Plăți: Stripe Integration Deep-Dive

Sistemul de plăți este proiectat pentru a fi **stateless** și **asincron**, garantând că nicio rezervare nu este pierdută în baza de date.

### 💳 Fluxul Checkout

1. **Inițiere:** Utilizatorul selectează datele de campare. **Zustand** calculează prețul total instantaneu pe client.
2. **Sesiune Stripe:** Server Action-ul `createCheckoutSession` creează o sesiune securizată pe serverele Stripe.
3. **Metadata Power:** Transmitem ID-urile campingului și utilizatorului, plus datele de check-in/out, în obiectul `metadata` al Stripe.
4. **Webhook Sync:** Endpoint-ul `api/webhook` (singura rută API clasică) ascultă evenimentul `checkout.session.completed`.
   -  **Validare:** Verifică semnătura digitală a Stripe pentru a preveni cererile frauduloase (spoofing).
   -  **Finalizare:** Reconstruiește rezervarea în MongoDB folosind datele extrase din `metadata` doar după ce plata a fost confirmată.

---

## 4. Geolocation & Interactive Maps

### 🗺️ Mapbox Forward Geocoding

La crearea sau editarea unui camping, aplicația nu se bazează pe coordonate introduse manual de utilizator:

-  Adresa introdusă în formular este trimisă automat către **Mapbox Geocoding API**.
-  API-ul returnează un punct geografic precis `[longitudine, latitudine]`.
-  Datele sunt stocate în format standard **GeoJSON**, permițând interogări spațiale avansate și filtrare pe hartă.

### 📍 Cluster Maps

Pagina principală de listare folosește **Mapbox GL JS** pentru a randa un **Cluster Map**. Campingurile apropiate sunt grupate vizual în cercuri de densitate, îmbunătățind performanța de randare pentru volume mari de date și oferind un UX modern.

---

## 5. Managementul Stării și UI/UX

### 📦 Zustand State Management

Am ales **Zustand** în detrimentul Redux pentru simplitate, viteză și dimensiune redusă a bundle-ului.

-  **Persistență:** Store-ul `useBookingStore` folosește middleware-ul `persist`. Dacă un utilizator începe o rezervare și închide browser-ul din greșeală, datele (camping, date, preț) sunt recuperate automat din `localStorage` la redeschidere.

### ✨ Interfața Apple-Style (Tailwind + Framer Motion)

-  **Design System:** O estetică minimalistă bazată pe nuanțe de `Stone` și `Green`, cu margini foarte rotunjite (`rounded-[3rem]`) și umbre difuze.
-  **Micro-interacțiuni:** **Framer Motion** gestionează tranzițiile de pagină și animațiile de tip `AnimatePresence` pentru mesajele de eroare/succes, oferind un feedback vizual premium.
-  **Rich Text:** Integrarea **React-Quill** pentru secțiunea de Povești permite formatarea avansată a textului, păstrând securitatea prin sanitizarea output-ului HTML.

---

## 6. Securitate și Optimizare

### 🛡️ Layer-ul de Securitate

-  **NextAuth Middleware:** Protejează rutele critice precum `/dashboard`, `/campgrounds/new` și `/stories/new`. Dacă sesiunea lipsește, utilizatorul este redirectat automat către `/login`.
-  **Role Validation:** La nivel de backend, Server Action-ul verifică dacă `session.user.id` coincide cu `campground.author` înainte de a permite orice modificare sau ștergere.
-  **CSRF & JWT:** NextAuth gestionează automat token-urile CSRF și utilizează strategii JWT pentru sesiuni stateless, sigure și rapide.

### 🚀 Optimizări de Performanță

-  **Next/Image:** Toate imaginile sunt procesate prin componenta `next/image`, care asigură resize automat, compresie WebP și lazy-loading pentru a reduce consumul de date.
-  **Fonts:** Utilizăm `next/font` pentru a servi fontul **Inter** direct din sistemul de fișiere propriu, eliminând layout shift-ul (CLS) și dependența de servere Google externe.

---

## 7. Ghid de Configurare Mediu (Production-Ready)

Pentru funcționarea corectă a sistemului, sunt necesare următoarele chei în `.env.local`:

-  `MONGODB_URI`: Cluster MongoDB Atlas.
-  `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`: Din dashboard-ul Stripe.
-  `NEXT_PUBLIC_MAPBOX_TOKEN`: Pentru serviciile de hărți și geocoding.
-  `NEXTAUTH_SECRET`: Secret criptografic pentru securizarea token-urilor de sesiune.
