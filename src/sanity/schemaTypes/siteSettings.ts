import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title (Just type "Main Settings")',
      type: 'string',
    }),
    defineField({
      name: 'groupPhoto',
      title: 'About Us - Group Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows them to crop the photo in the dashboard
      },
    }),
  ],
});