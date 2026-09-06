import Image from "next/image";
import MagneticWrapper from "@/components/MagneticWrapper";
import TiltWrapper from "@/components/TiltWrapper";
// TiltWrapper wraps the "Innovation First" glass card below for a subtle
// 3D tilt-on-hover effect (desktop only, matches the hero's interactive feel).
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { formatEventDate } from "@/lib/formatDate";
import type { TeamMember, EventItem, SiteSettings } from "@/sanity/types";

export const revalidate = 60; // was 10 — no reason to re-check Sanity's CDN every 10s for content that changes maybe weekly

export default async function Home() {
  
  // 1. Fetch Real Team Data from Sanity
  const team = await client.fetch<TeamMember[]>(`*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    "imageUrl": image.asset->url
  }`);

  // 2. Fetch Real Event Data (Limited to Latest 3)
  const events = await client.fetch<EventItem[]>(`*[_type == "event"] | order(date desc)[0...3] {
    _id,
    title,
    date,
    category,
    description,
    "imageUrl": image.asset->url
  }`);

  // 3. Fetch Site Settings (Group Photo, WhatsApp link, homepage stats)
  const settings = await client.fetch<Partial<SiteSettings> | null>(`*[_type == "siteSettings"][0] {
    "groupPhotoUrl": groupPhoto.asset->url,
    whatsappLink,
    eventsHostedStat,
    activeMembersStat
  }`);
  const whatsappLink = settings?.whatsappLink ?? "https://chat.whatsapp.com/FFMEfVNZrzYLqxesDVWX1V";
  const eventsHostedStat = settings?.eventsHostedStat ?? "10+";
  const activeMembersStat = settings?.activeMembersStat ?? "100+";

  return (
    <main className="min-h-screen bg-white flex-grow selection:bg-wie-purple selection:text-white overflow-hidden">
      
      {/* === HERO SECTION === */}
      {/* Added a subtle dotted tech-grid pattern to the background */}
      {/* === 100X HERO SECTION === */}
    <section className="relative w-full min-h-[100svh] md:min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-16 md:pt-0 md:pb-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] overflow-hidden">

      {/* Premium Background Orbs (Kept intact) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex justify-center items-center">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-amber-400/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* ASYMMETRICAL GRID LAYOUT */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT SIDE: Typography */}
        <div className="flex flex-col items-start text-left space-y-6">
          <h2 className="text-purple-600 font-bold tracking-[0.2em] uppercase text-sm md:text-xs">
          </h2>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tighter leading-[1.05]">
            Building <br />
            Leaders <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              For Tomorrow
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed">
            Empowering women in engineering, fostering innovation, and building a stronger, more inclusive tech community.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticWrapper>
  <Link 
    href="#events" 
    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-[0_10px_40px_rgba(147,51,234,0.3)] hover:shadow-[0_10px_40px_rgba(147,51,234,0.6)] transition-all duration-300 block"
  >
    Explore Events
  </Link>
</MagneticWrapper>
            <Link 
              href="#team" 
              className="px-8 py-4 bg-white/70 backdrop-blur-md text-gray-900 font-bold rounded-full border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 hover:-translate-y-1 transition-all duration-300"
            >
              Meet the Team
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: Floating Glass Composition */}
        <div className="relative w-full h-[500px] hidden lg:block">
          
          {/* Back Glass Card */}
          <div className="absolute top-10 right-0 w-72 h-80 bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl animate-blob animation-delay-2000 flex flex-col justify-end p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/5 -z-10"></div>
            {/* UI Placeholder elements to look like an app */}
            <div className="w-12 h-12 rounded-full bg-white/60 mb-4 shadow-sm"></div>
            <div className="w-3/4 h-4 rounded-full bg-white/70 mb-2 shadow-sm"></div>
            <div className="w-1/2 h-4 rounded-full bg-white/50 shadow-sm"></div>
          </div>

          {/* Front Glass Card */}
          <TiltWrapper>
            <div className="absolute bottom-10 left-10 w-80 h-64 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] animate-blob flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-pink-500/10 -z-10"></div>
              <div className="text-center">
                 <span className="text-6xl block mb-4 drop-shadow-md">🚀</span>
                 <h3 className="font-bold text-gray-800 text-2xl tracking-tight">Innovation First</h3>
              </div>
            </div>
          </TiltWrapper>
          
        </div>

      </div>
    </section>

      {/* === ABOUT US SECTION === */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-snug">
                Empowering Women, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wie-purple to-purple-500">Engineering the Future.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                IEEE Women in Engineering (WiE) is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in engineering.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed pb-4">
                At UET Narowal, our student branch bridges the gap between academia and the professional world. We provide a platform for networking, skill development, and leadership, ensuring our members are equipped to tackle tomorrow's technical challenges.
              </p>
              <a 
                href="https://wie.ieee.org/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-wie-purple/10 text-wie-purple font-bold rounded-full hover:bg-wie-purple hover:text-white transition-all duration-300 group"
              >
                Learn More About WiE Global
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(107,33,168,0.15)] border-[8px] border-white/80 bg-white/50 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-500">
               {settings?.groupPhotoUrl ? (
                 <Image 
                    src={settings.groupPhotoUrl} 
                    alt="IEEE WiE UNSB Community group photo"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 100vw"
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                   No group photo uploaded yet.
                 </div>
               )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* === 100X BENTO BOX ABOUT SECTION === */}
    <section id="mission" className="py-32 relative w-full px-6 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:pl-4">
          <h2 className="text-purple-600 font-bold tracking-widest uppercase text-sm mb-3">Who We Are</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">Engineering.</span>
          </h3>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          
          {/* Box 1: The Mission (Spans 2 Columns) */}
          <div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(147,51,234,0.12)] transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
            <h4 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Our Mission</h4>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              To inspire, engage, and empower students in engineering and technology at UET Narowal. We break barriers and build leaders through hands-on workshops, mentorship, and a relentless drive for innovation.
            </p>
          </div>

          {/* Box 2: High Impact Stat (Gradient Block) */}
          <div className="bg-gradient-to-br from-purple-700 to-pink-500 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-7xl font-extrabold text-white tracking-tighter mb-2">{eventsHostedStat}</span>
            <span className="text-purple-100 font-semibold text-sm uppercase tracking-widest">Events Hosted</span>
          </div>

          {/* Box 3: Community Stat (Glassmorphism) */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.12)] transition-all duration-500 flex flex-col justify-center items-center text-center group">
            <span className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500 tracking-tighter mb-2 group-hover:scale-105 transition-transform duration-500">{activeMembersStat}</span>
            <span className="text-gray-600 font-semibold text-sm uppercase tracking-widest">Active Members</span>
          </div>

          {/* Box 4: Dark Mode Call to Action (Spans 2 Columns) */}
          <div className="md:col-span-2 bg-[#0F172A] rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between group">
            <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-600/30 rounded-full blur-[80px] group-hover:bg-pink-600/30 transition-all duration-700"></div>
            
            <div className="relative z-10 md:w-2/3 text-center md:text-left mb-8 md:mb-0">
              <h4 className="text-3xl font-bold text-white mb-4 tracking-tight">Join the Movement</h4>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Whether you are a coder, a hardware enthusiast, or a future CEO, there is a place for you to grow here.
              </p>
              <a 
  href={whatsappLink} 
  target="_blank" 
  rel="noopener noreferrer"
  className="px-8 py-3.5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors inline-block"
>
  Become a Member
</a>
            </div>
            
            {/* Floating Graphic Element */}
            <div className="relative z-10 w-32 h-32 flex items-center justify-center animate-blob">
               <span className="text-8xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">✨</span>
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* === RECENT HIGHLIGHTS SECTION (Events) === */}
      <section id="events" className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-wie-purple/[0.02] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Recent Highlights</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the latest workshops, bootcamps, and seminars we've organized.</p>
            </div>
          </Reveal>
          
          {events.length === 0 ? (
            <p className="text-center text-gray-500">More events coming soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Reveal key={event._id} delay={index * 0.15}>
                  <Link 
                    href={`/events#${event._id}`} 
                    className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(107,33,168,0.12)] hover:-translate-y-2 transition-all duration-500 group flex flex-col cursor-pointer h-full"
                  >
                    <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden flex items-center justify-center text-gray-400 m-2 rounded-[1.25rem]">
                      {event.imageUrl ? (
                        <Image src={event.imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                      ) : (
                        <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-ieee-blue shadow-sm">{event.category || 'Event'}</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-sm text-wie-purple font-bold tracking-wide uppercase">{formatEventDate(event.date)}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 tracking-tight group-hover:text-ieee-blue transition-colors">{event.title}</h3>
                      
                      <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {event.description ? (
                          <PortableText value={event.description} />
                        ) : (
                          <p>No description provided.</p>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 text-wie-purple font-bold text-sm flex items-center gap-2">
                        Read Full Details 
                        <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <Link 
                href="/events" 
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-wie-purple font-bold rounded-full border-2 border-wie-purple/20 hover:border-wie-purple hover:bg-wie-purple hover:text-white transition-all shadow-sm hover:shadow-[0_8px_30px_rgba(107,33,168,0.2)]"
              >
                View More Events
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* === OUR TEAM SECTION (DARK MODE UPGRADE) === */}
      <section id="team" className="py-32 px-6 relative bg-slate-900 mt-12 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        
        {/* Dark Mode Tech Grid & Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-ieee-blue/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-wie-purple/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Meet the Executive Committee</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">The dedicated leaders driving the IEEE WiE UET Narowal chapter forward.</p>
            </div>
          </Reveal>
          
          {team.length === 0 ? (
            <p className="text-center text-gray-500">Team members will be announced soon.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
              {team.map((member, index) => (
                <Reveal key={member._id} delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center w-36 md:w-44 group cursor-pointer">
                    
                    {/* Dark Glassmorphism Avatar */}
                    <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-white/5 backdrop-blur-md border-[6px] border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] mb-5 flex items-center justify-center overflow-hidden text-white/20 group-hover:border-wie-purple/50 group-hover:shadow-[0_15px_40px_rgba(107,33,168,0.3)] transition-all duration-500 group-hover:-translate-y-2">
                        {member.imageUrl ? (
                          <Image src={member.imageUrl} alt={member.name} fill className="object-cover rounded-full group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 144px, 176px" />
                        ) : (
                          <svg className="w-full h-full p-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white leading-tight tracking-tight group-hover:text-wie-purple transition-colors">{member.name}</h3>
                    <p className="text-ieee-blue font-bold text-xs mt-1.5 tracking-wider uppercase bg-ieee-blue/20 px-3 py-1 rounded-full border border-ieee-blue/20">{member.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}