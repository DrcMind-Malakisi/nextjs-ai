import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/context/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next AI",
  description: "Integration de l'IA dans une application web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <CartProvider>{children}</CartProvider>

          <footer className="border-t  py-6 px-4 mt-10">
            <p className="text-center text-sm">
              © 2025 - <a href="https://x.com/BahigaTacite">Aksanti Bahiga</a>
            </p>
            <p className="text-center text-sm">
              Ce projet est un exemple d'intégration de l'IA dans une
              application web. Il utilise Next.js et l'API de Google Gemini.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
