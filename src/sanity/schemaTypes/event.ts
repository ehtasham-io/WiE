import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (e.g., October 12, 2024)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category (Workshop / Webinar / Seminar / Bootcamp)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array', 
      of: [{ type: 'block' }], // This enables the Rich Text Editor!
    }),
    defineField({
      name: 'image',
      title: 'Event Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});