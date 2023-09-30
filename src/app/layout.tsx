import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const maragsa = localFont({
  src: "./../fonts/Maragsa.woff2",
  variable: "--font-maragsa",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["200", "300", "400", "600"],
});

export const metadata: Metadata = {
  title: "PerkiHub",
  description: "Register yourself to Perki Aachen events!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, maragsa.variable, unbounded.variable)}>
        <NextAuthProvider>
          <TrpcProvider>
            {children}
            <Toaster />
          </TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
