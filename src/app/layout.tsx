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
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1a0c11]/95 backdrop-blur-md border-t-2 border-gray-100 dark:border-white/10 z-[100] px-6 py-4 pb-8 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <div className="flex w-full max-w-lg justify-around items-center">
            <Link href="/" className="flex flex-col items-center gap-1 text-[#8a6072] hover:text-[#f4257b] transition-all group">
              <span className="material-symbols-outlined text-[28px] group-hover:-translate-y-1 transition-transform">home</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">首页</span>
            </Link>

            <Link href="/notes/neural-networks" className="flex flex-col items-center gap-1 text-[#8a6072] hover:text-[#f4257b] transition-all group">
              <span className="material-symbols-outlined text-[28px] group-hover:-translate-y-1 transition-transform">school</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">学习</span>
            </Link>

            <Link href="/trophy-room" className="flex flex-col items-center gap-1 text-[#f4257b] transition-all group">
              <div className="bg-[#f4257b]/10 rounded-full px-4 py-1 mb-0.5">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">荣誉室</span>
            </Link>

            <Link href="/profile" className="flex flex-col items-center gap-1 text-[#8a6072] hover:text-[#f4257b] transition-all group">
              <span className="material-symbols-outlined text-[28px] group-hover:-translate-y-1 transition-transform">person</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">我的</span>
            </Link>
          </div>
        </nav>

        <div className="pb-24">
          {children}
        </div>
      </body>
    </html>
  );
}
