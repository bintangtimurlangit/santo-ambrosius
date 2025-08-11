// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomePage } from './collections/HomePage'
import { SejarahParoki } from './collections/SejarahParoki'
import { Berita } from './collections/Berita'
import { Renungan } from './collections/Renungan'
import { WAM } from './collections/WAM'
import { WAB } from './collections/WAB'
import { KesulitanAkses } from './collections/KesulitanAkses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, HomePage, SejarahParoki, Berita, Renungan, WAM, WAB, KesulitanAkses],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['berita', 'renungan', 'homepage', 'sejarah-paroki'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${doc?.title?.value || doc?.title || ''} | Gereja Santo Ambrosius`,
      generateDescription: ({ doc }) =>
        doc?.description?.value ||
        doc?.description ||
        'Gereja Santo Ambrosius - Paguyuban umat beriman yang peduli, berbagi dan merakyat.',
    }),
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
