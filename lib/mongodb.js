import mongoose from "mongoose";

/** * Definim URL-ul de conexiune din variabilele de mediu.
 * Specificațiile tehnice cer utilizarea MongoDB (cu Mongoose).
 */
const MONGODB_URI = process.env.DB_URL;

if (!MONGODB_URI) {
   throw new Error("Te rugăm să definești variabila DB_URL în fișierul .env.local");
}

/**
 * Global este utilizat aici pentru a menține o conexiune cache-uită
 * în timpul dezvoltării (hot reload), prevenind epuizarea conexiunilor în Atlas.
 */
let cached = global.mongoose;

if (!cached) {
   cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
   if (cached.conn) {
      return cached.conn;
   }

   if (!cached.promise) {
      const opts = {
         bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
         console.log("✅ Conexiune reușită la MongoDB Atlas");
         return mongoose;
      });
   }

   try {
      cached.conn = await cached.promise;
   } catch (e) {
      cached.promise = null;
      throw e;
   }

   return cached.conn;
}

export default dbConnect;
