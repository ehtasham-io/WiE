import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'legacyMember',
  title: 'Legacy & Founders',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Title (e.g., Founder, Ex-Chairperson)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tenure',
      title: 'Tenure (e.g., 2022-2023)',
      type: 'string',
    }),
    defineField({
      name: 'achievements',
      title: 'Remarkable Stats / Achievements',
      type: 'text',
      description: 'Keep it to 2-3 sentences max for a clean UI.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show up first (1, 2, 3...)',
    }),
  ],
})