import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const revalidate = 10; 

export default async function Home() {
  
  // 1. Fetch Real Team Data from Sanity
  const team = await client.fetch(`*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    "imageUrl": image.asset->url
  }`);

  // 2. Fetch Real Event Data (Limited to Latest 3)
  const events = await client.fetch(`*[_type == "event"] | order(date desc)[0...3] {
    _id,
    title,
    date,
    category,
    description,
    "imageUrl": image.asset->url
  }`);

  // 3. Fetch Site Settings (Group Photo)
  const settings = await client.fetch(`*[_type == "siteSettings"][0] {
    "groupPhotoUrl": groupPhoto.asset->url
  }`);

  return (
    <main className="min-h-screen bg-white flex-grow selection:bg-wie-purple selection:text-white overflow-hidden">
      
      {/* === HERO SECTION === */}
      {/* Added a subtle dotted tech-grid pattern to the background */}
      <section className="relative w-full min-h-[100svh] md:min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 md:pt-0 md:pb-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]">   <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-ieee-blue/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-wie-purple/20 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
        
        <Reveal>
          <div className="relative z-10 max-w-4xl bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 className="text-wie-purple font-bold tracking-widest uppercase text-sm md:text-base mb-6">
              IEEE UET Narowal Student Branch
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Building Leaders <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-wie-purple">
                For Tomorrow
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
              Empowering women in engineering, fostering innovation, and building a stronger, more inclusive tech community at UET Narowal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/events" className="px-8 py-3.5 bg-gradient-to-r from-ieee-blue to-blue-700 text-white font-semibold rounded-full hover:shadow-[0_8px_30px_rgba(0,98,155,0.3)] hover:-translate-y-1 transition-all duration-300">
                Explore Events
              </Link>
              <a href="#team" className="px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full border-2 border-transparent hover:border-gray-200 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                Meet the Team
              </a>
            </div>
          </div>
        </Reveal>
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
              {/* @ts-ignore */}
              {events.map((event: any, index: number) => (
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
                      <span className="text-sm text-wie-purple font-bold tracking-wide uppercase">{event.date || 'TBA'}</span>
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
              {/* @ts-ignore */}
              {team.map((member: any, index: number) => (
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