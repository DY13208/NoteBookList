import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans, M_PLUS_Rounded_1c, Noto_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-rounded",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chiikawa Workbench",
  description: "A flat design Chiikawa-themed workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${nunito.variable} ${plusJakartaSans.variable} ${mPlusRounded1c.variable} ${notoSans.variable} antialiased`}
      >
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-[100] flex justify-around py-2 px-4 shadow-lg">
          <Link href="/" className="flex flex-col items-center gap-1 text-xs font-bold text-gray-600 hover:text-s1-flat-blue transition-colors">
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </Link>
          <Link href="/prompts" className="flex flex-col items-center gap-1 text-xs font-bold text-gray-600 hover:text-s2-primary transition-colors">
            <span className="material-symbols-outlined">description</span>
            <span>Prompts</span>
          </Link>
          <Link href="/shop" className="flex flex-col items-center gap-1 text-xs font-bold text-gray-600 hover:text-s3-primary transition-colors">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span>Shop</span>
          </Link>
          <Link href="/notes/neural-networks" className="flex flex-col items-center gap-1 text-xs font-bold text-gray-600 hover:text-s4-flat-primary transition-colors">
            <span className="material-symbols-outlined">book</span>
            <span>Notes</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-xs font-bold text-gray-600 hover:text-s5-accent-blue transition-colors">
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </Link>
          <Link href="/projects" className="flex flex-col items-center gap-1 text-xs font-bold text-gray-600 hover:text-s6-primary transition-colors">
            <span className="material-symbols-outlined">assignment</span>
            <span>Projects</span>
          </Link>
        </nav>
        <div className="pb-16">
          {children}
        </div>
      </body>
    </html>
  );
}
