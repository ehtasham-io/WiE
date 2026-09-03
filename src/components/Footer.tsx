import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ieee-dark text-white py-12 border-t-4 border-wie-purple">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Mission (Unchanged) */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-1 rounded-md">
              <Image src="/wie-logo.jpg" alt="WiE Logo" width={40} height={40} className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-wide">IEEE WiE UET Narowal</span>
          </div>
          <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
            Dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in a career in engineering.
          </p>
        </div>

        {/* Quick Links (Unchanged) */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-wie-light">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#events" className="hover:text-white transition-colors">Events</Link></li>
            <li><Link href="#team" className="hover:text-white transition-colors">Our Team</Link></li>
          </ul>
        </div>

        {/* === FINALIZED: Contact & Real Social Details === */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-wie-light">Contact Us</h4>
          <ul className="space-y-3.5 text-sm text-gray-300">
            {/* 1. PHYSICAL ADDRESS - (Locked) */}
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-ieee-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>UET Narowal Campus, Narowal, Punjab, Pakistan</span>
            </li>

            {/* 2. OFFICIAL EMAIL - convention used wiestudentbranchnwl@gmail.com (Verify this is correct) */}
            <li className="flex items-center gap-3 group">
              <svg className="w-5 h-5 text-ieee-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <a href="mailto:wiestudentbranchnwl@gmail.com" className="group-hover:text-white transition-colors truncate" title="Send official email">
                wiestudentbranchnwl@gmail.com
              </a>
            </li>
            
            {/* 3. SOCIAL MEDIA INTEGRATION - Final Real Links */}
            <li className="flex items-center gap-4 pt-3 border-t border-white/10">
              {/* Instagram Profile */}
              <a href="https://www.instagram.com/ieee_wie_unsb" target="_blank" rel="noopener noreferrer" className="hover:text-wie-light transition-colors" title="Follow UNSB on Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.646-.069-4.849 0-3.204.012-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.772-2.618 6.972-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.972-6.98-1.28-.058-1.69-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Facebook Profile */}
              <a href="https://www.facebook.com/profile.php?id=100094065083527" target="_blank" rel="noopener noreferrer" className="hover:text-wie-light transition-colors" title="Follow UNSB on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              {/* LinkedIn Company Page */}
              <a href="https://www.linkedin.com/company/women-in-engineering-unsb/" target="_blank" rel="noopener noreferrer" className="hover:text-wie-light transition-colors" title="Follow UNSB on LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} IEEE WiE UET Narowal Student Branch. All rights reserved.</p>
      </div>
    </footer>
  );
}