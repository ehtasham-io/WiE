import SmoothScrolling from "@/components/SmoothScrolling";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IEEE WiE | UET Narowal Student Branch",
  description: "Empowering women in engineering, fostering innovation, and building a stronger, more inclusive tech community at UET Narowal.",
  keywords: ["IEEE", "WIE", "UET Narowal", "Women in Engineering", "Technology", "Student Branch"],
  openGraph: {
    title: "IEEE WiE | UET Narowal",
    description: "Empowering women in engineering, fostering innovation, and building a stronger tech community.",
    url: "https://uet-narowal-wie.vercel.app", // This will be your Vercel URL
    siteName: "IEEE WiE UET Narowal",
    images: [
      {
        url: "/images/group.jpg", // Uses your local group photo for the WhatsApp/LinkedIn preview card
        width: 1200,
        height: 630,
        alt: "IEEE WiE UET Narowal Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* The Smooth Scrolling Engine wraps your entire app */}
        <SmoothScrolling>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}