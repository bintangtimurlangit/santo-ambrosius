import type { CollectionConfig } from 'payload'

export const SejarahParoki: CollectionConfig = {
  slug: 'sejarah-paroki',
  admin: {
    useAsTitle: 'title',
    description: 'Manage Sejarah Paroki (Parish History) page content',
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
      defaultValue: 'Sejarah Paroki Santo Ambrosius',
      admin: {
        description: 'Page title for the Sejarah Paroki page',
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
          defaultValue: 'Sejarah Paroki\nSanto Ambrosius',
          admin: {
            description: 'Hero section title',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          defaultValue: 'Perjalanan iman yang dimulai sejak tahun yang penuh berkah',
          admin: {
            description: 'Hero section subtitle/description',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background image (church/historical photo)',
          },
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      label: 'Main Content',
      fields: [
        {
          name: 'article',
          type: 'textarea',
          admin: {
            description:
              'Main article content about the parish history (optional - if not provided, timeline will be shown)',
          },
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Featured image for the article',
          },
        },
        {
          name: 'imageCaption',
          type: 'text',
          admin: {
            description: 'Caption for the featured image',
          },
        },
        {
          name: 'quote',
          type: 'group',
          label: 'Featured Quote',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              admin: {
                description: 'Quote text',
              },
            },
            {
              name: 'author',
              type: 'text',
              admin: {
                description: 'Quote author',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'timeline',
      type: 'group',
      label: 'Timeline Section',
      fields: [
        {
          name: 'introTitle',
          type: 'textarea',
          admin: {
            description: 'Timeline introduction title (displays when no article content)',
          },
        },
        {
          name: 'introDescription',
          type: 'textarea',
          admin: {
            description: 'Timeline introduction description (displays when no article content)',
          },
        },
        {
          name: 'events',
          type: 'array',
          label: 'Timeline Events',
          minRows: 1,
          admin: {
            description: 'Add timeline events with years, titles, and descriptions',
          },
          fields: [
            {
              name: 'year',
              type: 'text',
              required: true,
              admin: {
                description: 'Year of the event (e.g., "1979", "2017")',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Title of the timeline event',
              },
            },
            {
              name: 'content',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Detailed description of the event (supports HTML)',
              },
            },
          ],
        },
      ],
    },
  ],
}
