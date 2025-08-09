import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'title',
    description: 'Manage homepage content including hero section',
    group: 'Pages',
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
    {
      name: 'pengumumanSection',
      type: 'group',
      label: 'Pengumuman Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Pengumuman',
          admin: {
            description: 'Section title for the announcements carousel',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          defaultValue: 'Simak pengumuman terbaru dari Gereja Santo Ambrosius.',
          admin: {
            description: 'Section subtitle/description',
          },
        },
        {
          name: 'images',
          type: 'array',
          label: 'Carousel Images',
          minRows: 1,
          maxRows: 10,
          admin: {
            description: 'Upload images for the pengumuman carousel',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Title/name for this announcement image',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Upload the announcement image',
              },
            },
            {
              name: 'alt',
              type: 'text',
              admin: {
                description: 'Alternative text for accessibility',
              },
            },
            {
              name: 'link',
              type: 'text',
              admin: {
                description: 'Optional link when image is clicked',
              },
            },
          ],
        },
      ],
    },
  ],
}
