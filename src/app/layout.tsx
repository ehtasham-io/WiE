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
        url: "/wie-logo.png", // TODO(Phase 6/SEO): swap for the Sanity group photo once OG metadata is made dynamic
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
import { client } from "@/sanity/lib/client";
import type { SiteSettings } from "@/sanity/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fallbacks match what used to be hardcoded in Navbar/Footer/page.tsx.
// Once these fields are filled in on the Site Settings doc in Studio,
// the CMS values take over automatically — no redeploy needed.
const SETTINGS_FALLBACK: SiteSettings = {
  groupPhotoUrl: null,
  whatsappLink: "https://chat.whatsapp.com/FFMEfVNZrzYLqxesDVWX1V",
  instagramUrl: "https://www.instagram.com/ieee_wie_unsb",
  facebookUrl: "https://www.facebook.com/profile.php?id=100094065083527",
  linkedinUrl: "https://www.linkedin.com/company/women-in-engineering-unsb/",
  contactEmail: "wiestudentbranchnwl@gmail.com",
  eventsHostedStat: "10+",
  activeMembersStat: "100+",
};

async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await client.fetch<Partial<SiteSettings> | null>(
    `*[_type == "siteSettings"][0]{
      whatsappLink,
      instagramUrl,
      facebookUrl,
      linkedinUrl,
      contactEmail,
      eventsHostedStat,
      activeMembersStat
    }`
  );
  // Merge field-by-field (not a blind spread): GROQ returns unset Studio
  // fields as `null`, not omitted, so a blind spread would let an empty
  // field silently override a good fallback with null.
  return {
    groupPhotoUrl: SETTINGS_FALLBACK.groupPhotoUrl,
    whatsappLink: settings?.whatsappLink ?? SETTINGS_FALLBACK.whatsappLink,
    instagramUrl: settings?.instagramUrl ?? SETTINGS_FALLBACK.instagramUrl,
    facebookUrl: settings?.facebookUrl ?? SETTINGS_FALLBACK.facebookUrl,
    linkedinUrl: settings?.linkedinUrl ?? SETTINGS_FALLBACK.linkedinUrl,
    contactEmail: settings?.contactEmail ?? SETTINGS_FALLBACK.contactEmail,
    eventsHostedStat: settings?.eventsHostedStat ?? SETTINGS_FALLBACK.eventsHostedStat,
    activeMembersStat: settings?.activeMembersStat ?? SETTINGS_FALLBACK.activeMembersStat,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* The Smooth Scrolling Engine wraps your entire app */}
        <SmoothScrolling>
          <Navbar whatsappLink={settings.whatsappLink} />
          {children}
          <Footer settings={settings} />
        </SmoothScrolling>
      </body>
    </html>
  );
}