import { defineType, defineField } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Executive Committee Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order (1 for Mentor, 2 for Chair, etc.)',
      type: 'number',
      description: 'Used to sort the team on the website',
    }),
    defineField({
      name: 'image',
      title: 'Headshot Image',
      type: 'image',
      options: {
        hotspot: true, // This allows future ExCom to crop the image inside the dashboard!
      },
    }),
  ],
});