import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | DevFolio',
    default: 'DevFolio'
  },
  description: "My Developer Portfolio and Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <body>{children}</body>
    </html>
  );
}
