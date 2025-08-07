import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    description: 'Manage news articles for the parish website',
    defaultColumns: ['title', 'saptaBidang', 'author', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the news article',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly slug for the article (e.g., "perayaan-misa-natal-2024")',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              // Auto-generate slug from title
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single
                .trim('-') // Remove leading/trailing hyphens
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description/excerpt of the article (used in previews)',
      },
    },
    {
      name: 'saptaBidang',
      type: 'select',
      required: true,
      options: [
        { label: 'Pewartaan', value: 'pewartaan' },
        { label: 'Pelayanan', value: 'pelayanan' },
        { label: 'Persekutuan', value: 'persekutuan' },
        { label: 'Peribadatan', value: 'peribadatan' },
        { label: 'Pemerhati', value: 'pemerhati' },
        { label: 'PITK', value: 'pitk' },
        { label: 'OKK', value: 'okk' },
      ],
      admin: {
        description: 'Choose which Sapta Bidang this news belongs to',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Main image for the article (will be shown in previews and at the top of the article)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main content of the article (supports rich text formatting and images)',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the article author',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Date when the article was first published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        description: 'Estimated reading time in minutes (auto-calculated based on content length)',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.content) {
              // Calculate reading time based on content
              // Average reading speed: 200 words per minute
              const contentText = JSON.stringify(data.content)
                .replace(/<[^>]*>/g, '') // Remove HTML tags
                .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
                .replace(/\s+/g, ' ') // Normalize whitespace
                .trim()

              const wordCount = contentText.split(' ').filter((word) => word.length > 0).length
              const readingTime = Math.max(1, Math.ceil(wordCount / 200)) // Minimum 1 minute

              return readingTime
            }
            return 1
          },
        ],
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as featured article (will appear prominently on homepage)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description: 'Publication status of the article',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Set publishedDate on first publish
        if (operation === 'update' && data.status === 'published' && !data.publishedDate) {
          data.publishedDate = new Date().toISOString()
        }
        return data
      },
    ],
  },
  timestamps: true, // This will automatically add createdAt and updatedAt fields
}
