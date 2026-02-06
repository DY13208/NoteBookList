import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans, M_PLUS_Rounded_1c, Noto_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "../components/AppShell";

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
