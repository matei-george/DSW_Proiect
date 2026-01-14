import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      await dbConnect();
      const { username, email, password, role } = await req.json();

      // 1. Verificăm dacă utilizatorul există deja
      const userExists = await User.findOne({ $or: [{ email }, { username }] });
      if (userExists) {
         return NextResponse.json({ message: "Email-ul sau utilizatorul există deja." }, { status: 400 });
      }

      // 2. Criptăm parola (Hashing)
      const hashedPassword = await bcrypt.hash(password, 12);

      // 3. Creăm utilizatorul
      const newUser = await User.create({
         username,
         email,
         password: hashedPassword,
         role,
      });

      return NextResponse.json({ message: "Utilizator creat cu succes!" }, { status: 201 });
   } catch (error) {
      console.error("Eroare la înregistrare:", error);
      return NextResponse.json({ message: "A apărut o eroare la server." }, { status: 500 });
   }
}
