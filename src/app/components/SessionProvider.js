"use client";
import { SessionProvider } from "next-auth/react";
export default ({ children }) => <SessionProvider>{children}</SessionProvider>;
