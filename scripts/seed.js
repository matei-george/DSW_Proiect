const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

// Definirea temporară a schemei pentru a evita erorile de import în scripturi externe
const CampgroundSchema = new mongoose.Schema({
   title: String,
   location: String,
   price: Number,
   description: String,
   geometry: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
   },
   images: [{ url: String, filename: String }],
});

const Campground = mongoose.models.Campground || mongoose.model("Campground", CampgroundSchema);

const dbUrl = process.env.DB_URL;

const sampleCamps = [
   {
      title: "Camping Bâlea Lac",
      location: "Transfăgărășan, Sibiu",
      price: 45,
      description: "Experiență unică la peste 2000m altitudine, lângă cel mai spectaculos drum din lume.",
      geometry: { type: "Point", coordinates: [24.6167, 45.6022] },
      images: [{ url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4", filename: "balea" }],
   },
   {
      title: "Vama Veche Beach Camp",
      location: "Vama Veche, Constanța",
      price: 30,
      description: "Dormi sub stele cu sunetul valurilor și atmosfera libertății de la malul mării.",
      geometry: { type: "Point", coordinates: [28.5742, 43.7554] },
      images: [{ url: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03", filename: "vama" }],
   },
   {
      title: "Cheile Nerei Eco-Park",
      location: "Sasca Montană, Caraș-Severin",
      price: 35,
      description: "Liniște deplină lângă apele turcoaz ale Beușniței. Ideal pentru iubitorii de drumeții.",
      geometry: { type: "Point", coordinates: [21.7139, 44.8914] },
      images: [{ url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7", filename: "nerei" }],
   },
   {
      title: "Camping Bucegi-Zănoaga",
      location: "Moroeni, Dâmbovița",
      price: 40,
      description: "Poarta de intrare către Sfinx și Babele. Peisaje montane care îți taie respirația.",
      geometry: { type: "Point", coordinates: [25.4385, 45.3347] },
      images: [{ url: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce", filename: "bucegi" }],
   },
   {
      title: "Delta Dunării Wild Camp",
      location: "Sfântu Gheorghe, Tulcea",
      price: 25,
      description: "Unde Dunărea întâlnește Marea Neagră. Paradisul păsărilor și al liniștii absolute.",
      geometry: { type: "Point", coordinates: [29.6019, 44.8944] },
      images: [{ url: "https://images.unsplash.com/photo-1533873984035-25970ab07461", filename: "delta" }],
   },
   {
      title: "Cazanele Dunării View",
      location: "Dubova, Mehedinți",
      price: 50,
      description: "Vedere directă către Chipul lui Decebal și spectacolul oferit de fluviul Dunărea.",
      geometry: { type: "Point", coordinates: [22.2561, 44.6083] },
      images: [{ url: "https://images.unsplash.com/photo-1508873696983-2dfd5898f01b", filename: "cazane" }],
   },
   {
      title: "Apuseni Glade",
      location: "Padiș, Bihor",
      price: 30,
      description: "Inima Munților Apuseni. Peșteri, ghețari și platouri carstice verzi.",
      geometry: { type: "Point", coordinates: [22.7303, 46.5919] },
      images: [{ url: "https://images.unsplash.com/photo-1517824806704-9040b037703b", filename: "apuseni" }],
   },
   {
      title: "Retezat Lake Side",
      location: "Cârnic, Hunedoara",
      price: 35,
      description: "Baza de plecare pentru cele mai frumoase lacuri glaciare din România.",
      geometry: { type: "Point", coordinates: [22.8464, 45.4208] },
      images: [{ url: "https://images.unsplash.com/photo-1487730116645-74489c95b41b", filename: "retezat" }],
   },
   {
      title: "Durău Mountain Camp",
      location: "Durău, Neamț",
      price: 38,
      description: "La poalele masivului Ceahlău. Aer curat de munte și trasee pentru orice nivel.",
      geometry: { type: "Point", coordinates: [25.9221, 46.9994] },
      images: [{ url: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7", filename: "durau" }],
   },
   {
      title: "Bran Castle Forest",
      location: "Bran, Brașov",
      price: 55,
      description: "Campare cu vedere către castel, într-o pădure de brazi misterioasă.",
      geometry: { type: "Point", coordinates: [25.3704, 45.5151] },
      images: [{ url: "https://images.unsplash.com/photo-1452362723122-174246179901", filename: "bran" }],
   },
];

const seedDB = async () => {
   try {
      await mongoose.connect(dbUrl);
      console.log("Conectat la DB pentru seeding...");

      await Campground.deleteMany({});
      console.log("Date vechi șterse.");

      await Campground.insertMany(sampleCamps);
      console.log("✅ Cele 10 locații din România au fost adăugate!");

      await mongoose.connection.close();
   } catch (err) {
      console.error("Eroare la seeding:", err);
   }
};

seedDB();
