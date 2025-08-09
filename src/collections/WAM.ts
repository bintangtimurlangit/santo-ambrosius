import type { CollectionConfig } from 'payload'

export const WAM: CollectionConfig = {
  slug: 'wam',
  admin: {
    useAsTitle: 'title',
    description: 'Manage Warta Ambrosius Mingguan (Weekly Newsletter) PDF files',
    defaultColumns: ['title', 'publishedDate', 'updatedAt'],
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
        description: 'The title of the WAM newsletter (e.g., "WAM Edisi 15 Januari 2024")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly slug for the article (e.g., "kegiatan-wam-desember-2024")',
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
        description: 'Short description of the WAM newsletter content',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Cover image for the WAM newsletter (shown in card previews)',
      },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'PDF file of the WAM newsletter',
      },
    },
    {
      name: 'issueNumber',
      type: 'number',
      required: true,
      admin: {
        description: 'Issue number of the WAM newsletter',
      },
    },
    {
      name: 'edition',
      type: 'text',
      required: true,
      admin: {
        description: 'Edition/period of the newsletter (e.g., "Januari 2024")',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'Date when the WAM article was first published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'fileSize',
      type: 'number',
      admin: {
        description: 'File size in KB (auto-calculated)',
        readOnly: true,
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
        description: 'Publication status of the WAM article',
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
