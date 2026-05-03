import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans, DM_Mono } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://shemilkumar.vercel.app"),
  title: "Shemilkumar | Senior Frontend Developer | Angular & React",
  description:
    "Shemilkumar is a senior frontend developer in Bengaluru specializing in Angular, React, and Next.js. Explore projects, case studies, and modern web architecture.",
  alternates: {
    canonical: "/",
  },
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
        <body>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Shemilkumar",
                url: "https://shemilkumar.vercel.app",
                jobTitle: "Senior Frontend Developer",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bengaluru",
                  addressCountry: "India",
                },
                sameAs: [
                  "https://github.com/shemilkumar",
                  "https://linkedin.com/in/shemilkumar",
                ],
              }),
            }}
          />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}