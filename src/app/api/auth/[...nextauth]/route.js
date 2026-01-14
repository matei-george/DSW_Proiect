import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            try {
               await dbConnect();

               if (!credentials?.email || !credentials?.password) {
                  return null; // NextAuth preferă null pentru a semnala eșecul fără crash
               }

               // Căutăm utilizatorul - folosim .toLowerCase() pentru a evita erorile de tastare
               const user = await User.findOne({
                  email: credentials.email.toLowerCase(),
               });

               console.log("DEBUG LOGIN: Utilizator găsit în DB?", !!user);

               if (!user) {
                  return null;
               }

               // Verificăm parola
               const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

               console.log("DEBUG LOGIN: Parola este corectă?", isPasswordCorrect);

               if (!isPasswordCorrect) {
                  return null;
               }

               // Returnăm datele conform specificațiilor de roluri
               return {
                  id: user._id.toString(),
                  name: user.username,
                  email: user.email,
                  role: user.role,
               };
            } catch (error) {
               console.error("DEBUG LOGIN: Eroare critică în authorize:", error);
               return null;
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.role = user.role;
            token.id = user.id;
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
            session.user.role = token.role;
            session.user.id = token.id;
         }
         return session;
      },
   },
   pages: {
      signIn: "/login",
      error: "/login", // Redirecționăm erorile tot la pagina de login
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
