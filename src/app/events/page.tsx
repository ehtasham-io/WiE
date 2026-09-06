import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { formatEventDate } from "@/lib/formatDate";
import type { EventItem } from "@/sanity/types";

export const revalidate = 60; // was 10 — matches /legacy's cadence, no reason to hit Sanity's CDN this often

export default async function EventsPage() {
  // Fetch ALL events (No limit applied here)
  const events = await client.fetch<EventItem[]>(`*[_type == "event"] | order(date desc) {
    _id,
    title,
    date,
    category,
    description,
    "imageUrl": image.asset->url
  }`);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-24 flex-grow">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Our <span className="text-wie-purple">Events</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our complete archive of workshops, seminars, and bootcamps.
        </p>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">More events coming soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} id={event._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden flex items-center justify-center text-gray-400">
                  {event.imageUrl ? (
                    <Image src={event.imageUrl} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-ieee-blue z-10">
                    {event.category || 'Event'}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-wie-purple font-semibold">{formatEventDate(event.date)}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 tracking-tight">{event.title}</h3>
                  
                  {/* Updated PortableText Renderer */}
                  <div className="text-gray-600 text-sm leading-relaxed mb-6">
                    {event.description ? (
                      <PortableText value={event.description} />
                    ) : (
                      <p>No description provided.</p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}