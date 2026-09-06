import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'links', title: 'Links & Socials' },
    { name: 'stats', title: 'Homepage Stats' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title (Just type "Main Settings")',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'groupPhoto',
      title: 'About Us - Group Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows them to crop the photo in the dashboard
      },
      group: 'general',
    }),
    defineField({
      name: 'whatsappLink',
      title: 'WhatsApp Group Invite Link',
      description: 'Used for every "Join Chapter" / "Become a Member" button on the site. WhatsApp invite links can expire — update here and it updates everywhere, no redeploy needed.',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'eventsHostedStat',
      title: 'Events Hosted (e.g. "10+")',
      description: 'Shown in the homepage "Who We Are" stat block. Update as your chapter hosts more events.',
      type: 'string',
      group: 'stats',
    }),
    defineField({
      name: 'activeMembersStat',
      title: 'Active Members (e.g. "100+")',
      description: 'Shown in the homepage "Who We Are" stat block.',
      type: 'string',
      group: 'stats',
    }),
  ],
});
