/**
 * Generate a URL-friendly slug from a title
 * Handles Indonesian characters and special cases
 */
export function slugify(text: string): string {
  if (!text) return ''

  return (
    text
      .toLowerCase()
      // Handle Indonesian special characters
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      // Remove all non-alphanumeric characters except spaces and hyphens
      .replace(/[^a-z0-9\s-]/g, '')
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Trim spaces
      .trim()
      // Replace spaces with hyphens
      .replace(/\s/g, '-')
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
  )
}

/**
 * Generate a unique slug by appending a number if needed
 * This would be used in a Payload hook with access to the collection
 */
export function createSlugField(fieldName: string = 'title') {
  return {
    name: 'slug',
    type: 'text' as const,
    required: true,
    unique: true,
    admin: {
      description: 'URL-friendly slug (auto-generated from title)',
      hidden: true,
    },
    hooks: {
      beforeValidate: [
        ({ value, data }: { value?: string; data?: Record<string, unknown> }) => {
          // If slug is already provided and not empty, use it
          if (value && value.trim()) {
            return slugify(value)
          }

          // Auto-generate from title if no slug provided
          if (data?.[fieldName] && typeof data[fieldName] === 'string') {
            return slugify(data[fieldName] as string)
          }

          return value
        },
      ],
    },
  }
}
