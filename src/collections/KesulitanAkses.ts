import type { CollectionConfig } from 'payload'

export const KesulitanAkses: CollectionConfig = {
  slug: 'kesulitan-akses',
  labels: {
    singular: 'Kesulitan Akses',
    plural: 'Kesulitan Akses',
  },
  admin: {
    useAsTitle: 'namaLengkap',
    description:
      'Form laporan kendala akses situs. Data ini hanya untuk diagnosa dan perbaikan akses.',
    defaultColumns: ['namaLengkap', 'email', 'jenisPerangkat', 'createdAt'],
    group: 'Support',
  },
  access: {
    // Visible only to authenticated users in admin
    read: ({ req }) => Boolean(req?.user),
    // Allow public/local API submissions from website (no req.user), but block admin-created entries
    create: ({ req }) => !req?.user,
    // Disallow modifications entirely
    update: () => false,
    // Allow authenticated users (admin) to delete
    delete: ({ req }) => Boolean(req?.user),
  },
  timestamps: true,
  fields: [
    {
      name: 'namaLengkap',
      type: 'text',
      required: true,
      admin: { description: 'Nama lengkap pelapor', readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'whatsapp',
      type: 'text',
      required: false,
      admin: { description: 'Nomor WhatsApp (opsional), mis: 62812xxxxxxx', readOnly: true },
    },
    {
      name: 'jenisPerangkat',
      type: 'select',
      required: true,
      admin: { readOnly: true },
      options: [
        { label: 'Desktop / Laptop', value: 'desktop' },
        { label: 'Ponsel', value: 'ponsel' },
        { label: 'Tablet', value: 'tablet' },
      ],
    },
    {
      name: 'sistemOperasi',
      type: 'text',
      required: false,
      admin: { description: 'Contoh: Windows 11, macOS 14, Android 14, iOS 17', readOnly: true },
    },
    {
      name: 'browser',
      type: 'text',
      required: false,
      admin: {
        description: 'Contoh: Chrome 126, Safari 17, Firefox 127, Edge 126',
        readOnly: true,
      },
    },
    {
      name: 'koneksi',
      type: 'text',
      required: false,
      admin: { description: 'Contoh: Wi‑Fi Indihome, Telkomsel 4G', readOnly: true },
    },
    {
      name: 'mulaiTerjadi',
      type: 'date',
      required: false,
      admin: {
        description: 'Waktu mulai terjadinya masalah',
        date: { pickerAppearance: 'dayAndTime' },
        readOnly: true,
      },
    },
    {
      name: 'halaman',
      type: 'text',
      required: false,
      admin: { description: 'URL halaman yang bermasalah (opsional)', readOnly: true },
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      admin: { description: 'Jelaskan masalah secara detail', readOnly: true },
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { description: 'Unggah tangkapan layar (opsional)', readOnly: true },
    },
    {
      name: 'langkahDicoba',
      type: 'select',
      hasMany: true,
      required: false,
      admin: { description: 'Centang langkah-langkah yang sudah dicoba', readOnly: true },
      options: [
        { label: 'Muat ulang halaman', value: 'reload' },
        { label: 'Hapus cache/cookies', value: 'clear-cache' },
        { label: 'Coba browser lain', value: 'other-browser' },
        { label: 'Mode penyamaran/incognito', value: 'incognito' },
        { label: 'Coba perangkat lain', value: 'other-device' },
        { label: 'Matikan ekstensi browser', value: 'disable-extensions' },
      ],
    },
  ],
}
