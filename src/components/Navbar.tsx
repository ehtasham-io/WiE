"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // If we are in the Sanity Studio dashboard, DO NOT render the website Navbar.
  if (pathname.startsWith("/studio")) {
    return null;
  }

  // The official WhatsApp Community link
  const whatsAppLink = "https://chat.whatsapp.com/FFMEfVNZrzYLqxesDVWX1V";

  return (
    <nav className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] max-w-7xl z-50 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-wie-purple/5 rounded-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Area */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/wie-logo.png" 
            alt="IEEE WiE UNSB Logo" 
            width={60} 
            height={60} 
            className="object-contain" 
            priority
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-gray-900 leading-tight">IEEE WiE</span>
            <span className="text-xs text-gray-500 font-medium tracking-wide">UET Narowal</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 text-sm tracking-wide">
          <Link href="/" className="hover:text-wie-purple transition-colors">Home</Link>
          <Link href="#about" className="hover:text-wie-purple transition-colors">About Us</Link>
          <Link href="/events" className="hover:text-wie-purple transition-colors">Events</Link>
          <Link href="#team" className="hover:text-wie-purple transition-colors">Our Team</Link>
          <Link href="/legacy" className="text-gray-600 hover:text-amber-500 font-medium transition-colors">Legacy</Link>
        </div>

        {/* Desktop Call to Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a 
            href={whatsAppLink}
            target="_blank" 
            rel="noopener noreferrer" 
            className="hidden md:block px-6 py-2.5 bg-wie-purple text-white text-sm font-semibold rounded-lg hover:bg-fuchsia-900 transition-colors shadow-md hover:shadow-lg"
          >
            Join Chapter
          </a>
          
          <button className="md:hidden text-gray-700 p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium shadow-lg absolute w-full z-20">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/events" onClick={() => setIsOpen(false)}>Events</Link>
          <Link href="#team" onClick={() => setIsOpen(false)}>Our Team</Link>
          <a 
            href={whatsAppLink}
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full px-5 py-3 bg-wie-purple text-white rounded-lg text-center font-semibold mt-2 shadow-sm"
            onClick={() => setIsOpen(false)}
          >
            Join Chapter
          </a>
        </div>
      )}
    </nav>
  );
}