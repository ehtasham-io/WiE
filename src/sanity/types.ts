// Shared shapes for data fetched from Sanity via GROQ in the pages below.
// Keep these in sync with the field selections in each `client.fetch(...)` query
// and with the schema definitions in `./schemaTypes`.

import type { PortableTextBlock } from "sanity";

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  imageUrl: string | null;
}

export interface EventItem {
  _id: string;
  title: string;
  date: string | null; // ISO "YYYY-MM-DD" from Sanity's `date` field, or null
  category: string | null;
  description: PortableTextBlock[] | null;
  imageUrl: string | null;
}

export interface LegacyMember {
  _id: string;
  name: string;
  role: string;
  tenure: string | null;
  achievements: string | null;
  imageUrl: string | null;
}

export interface SiteSettings {
  groupPhotoUrl: string | null;
  whatsappLink: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
  contactEmail: string | null;
  eventsHostedStat: string | null;
  activeMembersStat: string | null;
}
