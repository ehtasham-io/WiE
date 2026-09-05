import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Reveal from "@/components/Reveal";

export const revalidate = 10;

export default async function LegacyPage() {
  const legends = await client.fetch(`*[_type == "legacyMember"] | order(order asc) {
    _id,
    name,
    role,
    tenure,
    achievements,
    "imageUrl": image.asset->url
  }`);

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24 px-6 selection:bg-wie-purple selection:text-white overflow-hidden relative">
      
      {/* Premium Background Effects */}
      <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-multiply opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-wie-purple/10 rounded-full blur-[120px] mix-blend-multiply opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-wie-purple font-bold tracking-widest uppercase text-sm md:text-base">Our Heritage</h2>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Founders & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">Legends</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Honoring the visionaries and exceptional leaders who laid the foundation for the IEEE WiE UET Narowal chapter.</p>
          </div>
        </Reveal>

        {legends.length === 0 ? (
          <p className="text-center text-gray-500">Legacy members will be added soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* @ts-ignore */}
            {legends.map((legend: any, index: number) => (
              <Reveal key={legend._id} delay={index * 0.15}>
                <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] group h-full flex flex-col">
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md ring-4 ring-amber-500/20 group-hover:ring-amber-500/50 transition-all">
                      {legend.imageUrl ? (
                        <Image src={legend.imageUrl} alt={legend.name} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{legend.name}</h3>
                      <p className="text-wie-purple font-semibold">{legend.role}</p>
                      {legend.tenure && (
                        <span className="inline-block mt-1 text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wider">{legend.tenure}</span>
                      )}
                    </div>
                  </div>

                  {legend.achievements && (
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed italic">"{legend.achievements}"</p>
                    </div>
                  )}

                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}