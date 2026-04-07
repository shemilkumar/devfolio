import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans, DM_Mono } from "next/font/google";


export const metadata: Metadata = {
  title: "DevFolio",
  description: "My developer portfolio",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}