import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
   return (
      <html lang="ro">
         <body className={inter.className}>
            <SessionProvider>
               <Navbar />
               <main>{children}</main>
            </SessionProvider>
         </body>
      </html>
   );
}
