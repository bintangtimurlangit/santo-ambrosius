import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
    description: 'Manage homepage content including hero section',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Homepage Content',
      admin: {
        description: 'Internal title for this content (not displayed on frontend)',
      },
    },
    {
      name: 'heroSection',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'textarea',
          required: true,
          defaultValue: 'Paguyuban umat beriman\nyang peduli, berbagi dan merakyat.',
          admin: {
            description: 'The main hero title displayed on the homepage',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Hero background video (MP4 format recommended)',
          },
        },
        {
          name: 'videoAlt',
          type: 'text',
          admin: {
            description: 'Alternative text for the video (for accessibility)',
          },
        },
      ],
    },
  ],
}
