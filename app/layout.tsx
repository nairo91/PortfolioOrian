import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orian Mirona | Développeur Fullstack",
  description:
    "Portfolio de MIRONA Orian — Développeur Fullstack passionné par React, Next.js, Node.js et l'architecture logicielle. Disponible pour missions et opportunités.",
  keywords: ["développeur", "fullstack", "react", "nextjs", "nodejs", "typescript", "portfolio"],
  authors: [{ name: "MIRONA Orian" }],
  openGraph: {
    title: "Orian Mirona | Développeur Fullstack",
    description: "Développeur Fullstack passionné par React, Next.js et l'architecture logicielle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
