"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

interface NavbarProps {
  whatsappLink: string | null;
}

export default function Navbar({ whatsappLink }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // The engine that detects scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // If scrolling down and past 150px, hide the navbar. Otherwise, show it.
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            {/* Assuming your logo is in public folder. Adjust src if needed! */}
            <div className="w-12 h-12 relative flex-shrink-0">
               <Image src="/wie-logo.png" alt="IEEE WIE Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 leading-none">IEEE WIE</span>
              <span className="text-xs text-gray-500 leading-tight">UET Narowal</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
            <Link href="/#about" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">About Us</Link>
            <Link href="/#events" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">Events</Link>
            <Link href="/#team" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">Our Team</Link>
            <Link href="/legacy" className="text-sm font-medium text-gray-600 hover:text-amber-500 transition-colors">Legacy</Link>
          </div>

          {/* JOIN BUTTON */}
          {whatsappLink && (
            <div className="hidden md:block">
              <a 
    href={whatsappLink} 
    target="_blank" 
    rel="noopener noreferrer"
    className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
  >
    Join Chapter
  </a>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">Home</Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">About Us</Link>
            <Link href="/events" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">Events</Link>
            <Link href="/#team" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">Our Team</Link>
            <Link href="/legacy" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md">Legacy</Link>
            {whatsappLink && (
              <a 
    href={whatsappLink} 
    target="_blank" 
    rel="noopener noreferrer"
    onClick={() => setIsMobileMenuOpen(false)} 
    className="mt-4 block text-center px-4 py-3 border border-transparent text-base font-bold rounded-full text-white bg-purple-700 hover:bg-purple-800"
  >
    Join Chapter
  </a>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}