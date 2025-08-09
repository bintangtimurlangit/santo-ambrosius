import type { CollectionConfig } from 'payload'
import { createSlugField } from '@/lib/slugify'

export const Renungan: CollectionConfig = {
  slug: 'renungan',
  admin: {
    useAsTitle: 'title',
    description: 'Manage spiritual reflection articles',
    defaultColumns: ['title', 'author', 'publishedDate', 'updatedAt'],
    group: 'Articles',
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
        description: 'The title of the reflection article',
      },
    },
    createSlugField('title'),
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description/excerpt of the reflection article (used in previews)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Main image for the reflection article (will be shown in previews and at the top of the article)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description:
          'Main content of the reflection article (supports rich text formatting and images)',
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
        description: 'Date when the reflection article was first published',
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
        hidden: true,
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
        description: 'Publication status of the reflection article',
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
