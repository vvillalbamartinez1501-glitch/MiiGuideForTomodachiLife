import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Guía de Miis | Estilo Tomodachi Life",
  description: "Una guía interactiva de creación de Miis",
};

import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} antialiased h-full`}>
      <body className="min-h-full font-sans text-tomodachi-text bg-tomodachi-bg flex flex-col relative overflow-x-hidden selection:bg-tomodachi-accent selection:text-white">
        <AuthProvider>
          {/* Subtle dot pattern background to mimic the game's interface feel */}
        <div 
          className="fixed inset-0 pointer-events-none z-[-1]" 
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 2px, transparent 2px)",
            backgroundSize: "32px 32px"
          }}
        />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
