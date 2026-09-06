import Image from "next/image";
import { client } from "@/sanity/lib/client";
import type { LegacyMember } from "@/sanity/types";

const getLegacyMembers = async (): Promise<LegacyMember[]> => {
  // 1. Updated the query to ask for 'achievements' instead of 'description'
  const query = `*[_type == "legacyMember"] | order(order asc) {
    _id,
    name,
    role,
    tenure,
    achievements,
    "imageUrl": image.asset->url
  }`;
  
  return await client.fetch<LegacyMember[]>(query, {}, { next: { revalidate: 60 } });
};

export default async function LegacyPage() {
  const members = await getLegacyMembers();

  return (
    <main className="min-h-screen bg-[#FAFAFA] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] relative overflow-hidden pt-32 pb-24">
      
      {/* Ambient Museum Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 rounded-[100%] blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cinematic Header */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h2 className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">Hall of Fame</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">Legacy.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Honoring the visionaries who paved the way for women in engineering at UET Narowal.
          </p>
        </div>

        {/* ALTERNATING SCROLL SECTIONS */}
        <div className="flex flex-col gap-32 md:gap-48">
          
          {members.length > 0 ? (
            members.map((member, index) => (
              <div 
                key={member._id} 
                className={`flex flex-col gap-12 lg:gap-24 items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`} 
              >
                
                {/* HUGE IMAGE SIDE */}
                <div className="w-full lg:w-1/2 group relative">
                  <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200/50">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                    
                    {member.imageUrl ? (
                      <Image 
                        src={member.imageUrl} 
                        alt={member.name} 
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 font-bold uppercase tracking-widest">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Decorative Background Blob behind the image */}
                  <div className={`absolute -inset-10 -z-10 rounded-full blur-[100px] opacity-40 ${
                    index % 2 === 0 ? "bg-amber-400" : "bg-purple-500"
                  }`}></div>
                </div>

                {/* HUGE TYPOGRAPHY SIDE */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-left relative">
                  
                  {/* The Massive Decorative Quotation Mark to fill empty space */}
                  <span className="absolute -top-16 -left-8 text-[180px] text-gray-200/60 font-serif leading-none -z-10 select-none">
                    "
                  </span>

                  <div className="inline-flex items-center gap-4 mb-6 z-10">
                    <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-bold text-sm tracking-wider uppercase shadow-sm">
                      {member.role}
                    </span>
                    <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">
                      {member.tenure}
                    </span>
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter mb-8 leading-none z-10 drop-shadow-sm">
                    {member.name}
                  </h3>
                  
                  {/* 2. Updated this line to render member.achievements */}
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light z-10">
                    {member.achievements}
                  </p>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 font-semibold tracking-widest uppercase">No legacy members found.</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}