export interface Article {
  id: number
  title: string
  description: string
  category: string
  date: string
}

export const beritaBidangData: Record<string, Article[]> = {
  Pewartaan: [
    {
      id: 1,
      title: 'Katekisasi Dewasa Semester Baru',
      description:
        'Pendaftaran terbuka untuk program katekisasi dewasa yang akan dimulai pada semester mendatang. Program ini dirancang khusus untuk memperdalam iman Katolik.',
      category: 'Katekisasi',
      date: '15 Januari 2025',
    },
    {
      id: 2,
      title: 'Retret Keluarga Kudus',
      description:
        'Program retret khusus untuk keluarga dalam memperkuat iman dan kebersamaan di dalam Kristus. Kegiatan ini akan dipandu oleh Tim Bidang Pewartaan.',
      category: 'Retret',
      date: '22 Januari 2025',
    },
    {
      id: 3,
      title: 'Bina Iman Remaja Bulanan',
      description:
        'Kegiatan pembinaan iman untuk remaja dengan tema "Menjadi Saksi Kristus di Era Digital". Dilengkapi dengan diskusi dan sharing pengalaman.',
      category: 'Bina Iman',
      date: '28 Januari 2025',
    },
    {
      id: 4,
      title: 'Pendalaman Kitab Suci Adven',
      description:
        'Seri pendalaman Kitab Suci dalam rangka persiapan masa Adven. Materi renungan disediakan oleh Tim Bidang Pewartaan.',
      category: 'Pendalaman',
      date: '5 Februari 2025',
    },
    {
      id: 5,
      title: 'Pelatihan Katekis Lingkungan',
      description:
        'Pembinaan untuk para katekis di lingkungan-lingkungan agar dapat memberikan pengajaran iman yang lebih efektif dan menarik.',
      category: 'Pelatihan',
      date: '12 Februari 2025',
    },
    {
      id: 6,
      title: 'Novena Santo Ambrosius',
      description:
        'Rangkaian doa novena menjelang pesta Santo Ambrosius dengan renungan harian yang disusun khusus oleh Tim Bidang Pewartaan.',
      category: 'Novena',
      date: '20 Februari 2025',
    },
  ],
  Pelayanan: [
    {
      id: 1,
      title: 'Bakti Sosial Lingkungan',
      description:
        'Aksi bersih lingkungan dan penanaman pohon sebagai wujud kepedulian terhadap ciptaan Tuhan dan pelayanan kepada masyarakat.',
      category: 'Bakti Sosial',
      date: '18 Januari 2025',
    },
    {
      id: 2,
      title: 'Kegiatan Sosial Bulan Kasih',
      description:
        'Berbagi kasih kepada sesama melalui program bantuan sosial yang telah berjalan selama bulan ini untuk keluarga membutuhkan.',
      category: 'Sosial',
      date: '25 Januari 2025',
    },
    {
      id: 3,
      title: 'Kunjungan ke Panti Asuhan',
      description:
        'Program kunjungan rutin ke panti asuhan dengan membawa bantuan dan mengadakan kegiatan bersama anak-anak.',
      category: 'Kunjungan',
      date: '2 Februari 2025',
    },
    {
      id: 4,
      title: 'Pelayanan Kesehatan Gratis',
      description:
        'Kegiatan pemeriksaan kesehatan gratis untuk masyarakat kurang mampu bekerja sama dengan tenaga medis.',
      category: 'Kesehatan',
      date: '8 Februari 2025',
    },
    {
      id: 5,
      title: 'Program Beasiswa Pendidikan',
      description:
        'Pemberian beasiswa untuk anak-anak kurang mampu dalam melanjutkan pendidikan sebagai bentuk pelayanan pendidikan.',
      category: 'Pendidikan',
      date: '15 Februari 2025',
    },
    {
      id: 6,
      title: 'Bantuan Korban Bencana',
      description:
        'Koordinasi bantuan untuk korban bencana alam dengan mengumpulkan donasi dan kebutuhan pokok.',
      category: 'Bencana',
      date: '22 Februari 2025',
    },
  ],
  Persekutuan: [
    {
      id: 1,
      title: 'Gathering Keluarga Muda',
      description:
        'Acara kebersamaan untuk keluarga muda dalam mempererat tali persekutuan dan berbagi pengalaman hidup beriman.',
      category: 'Gathering',
      date: '20 Januari 2025',
    },
    {
      id: 2,
      title: 'Festival Talenta Lingkungan',
      description:
        'Pameran dan kompetisi talenta dari berbagai lingkungan untuk menunjukkan keberagaman karunia yang diberikan Tuhan.',
      category: 'Festival',
      date: '27 Januari 2025',
    },
    {
      id: 3,
      title: 'Pertemuan Paguyuban Profesi',
      description:
        'Pertemuan rutin paguyuban berdasarkan profesi untuk saling mendukung dan berbagi dalam kehidupan menggereja.',
      category: 'Paguyuban',
      date: '3 Februari 2025',
    },
    {
      id: 4,
      title: 'Rekreasi Keluarga Besar',
      description:
        'Kegiatan rekreasi bersama seluruh keluarga besar paroki untuk mempererat persekutuan antar umat.',
      category: 'Rekreasi',
      date: '10 Februari 2025',
    },
    {
      id: 5,
      title: 'Perayaan Ulang Tahun Paroki',
      description:
        'Perayaan syukur ulang tahun paroki dengan berbagai kegiatan yang melibatkan seluruh umat.',
      category: 'Perayaan',
      date: '17 Februari 2025',
    },
    {
      id: 6,
      title: 'Sarasehan Antar Generasi',
      description:
        'Dialog dan sharing antar generasi untuk membangun pemahaman dan persekutuan yang lebih erat.',
      category: 'Sarasehan',
      date: '24 Februari 2025',
    },
  ],
  Peribadatan: [
    {
      id: 1,
      title: 'Pelatihan Lektor dan Mazmur',
      description:
        'Pembinaan rutin untuk para lektor dan pemazmur guna meningkatkan kualitas pelayanan liturgi dalam perayaan Ekaristi.',
      category: 'Pelatihan',
      date: '16 Januari 2025',
    },
    {
      id: 2,
      title: 'Persiapan Liturgi Paskah',
      description:
        'Persiapan khusus untuk perayaan liturgi Paskah dengan melibatkan seluruh tim peribadatan dan lingkungan.',
      category: 'Liturgi',
      date: '23 Januari 2025',
    },
    {
      id: 3,
      title: 'Adorasi Sakramen Mahakudus',
      description:
        'Kegiatan adorasi mingguan untuk memperdalam devosi kepada Sakramen Mahakudus dan kehidupan doa umat.',
      category: 'Adorasi',
      date: '30 Januari 2025',
    },
    {
      id: 4,
      title: 'Perayaan Pesta Santo Ambrosius',
      description:
        'Persiapan dan pelaksanaan perayaan pesta Santo Ambrosius sebagai pelindung paroki dengan liturgi khusus.',
      category: 'Pesta',
      date: '6 Februari 2025',
    },
    {
      id: 5,
      title: 'Pembinaan Misdinar',
      description:
        'Program pembinaan untuk misdinar muda agar dapat melayani liturgi dengan baik dan penuh semangat.',
      category: 'Pembinaan',
      date: '13 Februari 2025',
    },
    {
      id: 6,
      title: 'Doa Rosario Bersama',
      description:
        'Undangan untuk bergabung dalam doa rosario bersama setiap hari Kamis sore di gereja untuk memperkuat devosi.',
      category: 'Doa',
      date: '20 Februari 2025',
    },
  ],
  Pemerhati: [
    {
      id: 1,
      title: 'Evaluasi Kinerja Karyawan',
      description:
        'Pelaksanaan evaluasi kinerja tahunan untuk semua karyawan paroki dalam rangka peningkatan pelayanan pastoral.',
      category: 'Evaluasi',
      date: '14 Januari 2025',
    },
    {
      id: 2,
      title: 'Renovasi Gedung Pastoran',
      description:
        'Proyek renovasi gedung pastoran untuk memperbaiki fasilitas dan kenyamanan bagi pastor dan tamu.',
      category: 'Renovasi',
      date: '21 Januari 2025',
    },
    {
      id: 3,
      title: 'Audit Internal Keuangan',
      description:
        'Pelaksanaan audit internal untuk memastikan transparansi dan akuntabilitas pengelolaan keuangan paroki.',
      category: 'Audit',
      date: '28 Januari 2025',
    },
    {
      id: 4,
      title: 'Perawatan Aset Gereja',
      description:
        'Program perawatan rutin untuk semua aset gereja termasuk peralatan liturgi dan fasilitas gedung.',
      category: 'Perawatan',
      date: '4 Februari 2025',
    },
    {
      id: 5,
      title: 'Pelatihan Manajemen SDM',
      description:
        'Pelatihan untuk tim pemerhati karyawan dalam manajemen sumber daya manusia yang efektif.',
      category: 'Pelatihan',
      date: '11 Februari 2025',
    },
    {
      id: 6,
      title: 'Inventarisasi Aset Tahunan',
      description:
        'Kegiatan inventarisasi tahunan untuk pendataan dan pemeliharaan semua harta benda milik gereja.',
      category: 'Inventarisasi',
      date: '18 Februari 2025',
    },
  ],
  PITK: [
    {
      id: 1,
      title: 'Rapat Karya Tahunan',
      description:
        'Rapat karya tahunan untuk evaluasi program dan perencanaan kegiatan PITK tahun mendatang bersama seluruh stakeholder.',
      category: 'Rapat Karya',
      date: '17 Januari 2025',
    },
    {
      id: 2,
      title: 'Retret Kader Lingkungan',
      description:
        'Program retret khusus untuk kader lingkungan dalam pengembangan spiritualitas kepemimpinan dan pelayanan.',
      category: 'Retret',
      date: '24 Januari 2025',
    },
    {
      id: 3,
      title: 'Pelatihan Fasilitator',
      description:
        'Pelatihan untuk calon fasilitator dalam berbagai program pembinaan iman dan pengembangan talenta umat.',
      category: 'Pelatihan',
      date: '31 Januari 2025',
    },
    {
      id: 4,
      title: 'Survey Kebutuhan Umat',
      description:
        'Pelaksanaan survey untuk mengetahui kebutuhan dan harapan umat sebagai dasar penyusunan program pastoral.',
      category: 'Survey',
      date: '7 Februari 2025',
    },
    {
      id: 5,
      title: 'Workshop Pengembangan Talenta',
      description:
        'Workshop untuk mengidentifikasi dan mengembangkan talenta umat dalam berbagai bidang pelayanan.',
      category: 'Workshop',
      date: '14 Februari 2025',
    },
    {
      id: 6,
      title: 'Seminar Spiritualitas Doa',
      description:
        'Seminar tentang pengembangan spiritualitas doa dalam keluarga untuk memperkuat habitus doa keseharian.',
      category: 'Seminar',
      date: '21 Februari 2025',
    },
  ],
  OKK: [
    {
      id: 1,
      title: 'Pelaporan Keuangan Triwulan',
      description:
        'Penyusunan dan presentasi laporan keuangan triwulan kepada Dewan Paroki Harian untuk transparansi keuangan.',
      category: 'Laporan',
      date: '19 Januari 2025',
    },
    {
      id: 2,
      title: 'Rapat Koordinasi Bidang',
      description:
        'Rapat koordinasi dengan semua tim bidang untuk sinkronisasi program dan anggaran kegiatan pastoral.',
      category: 'Koordinasi',
      date: '26 Januari 2025',
    },
    {
      id: 3,
      title: 'Digitalisasi Arsip Paroki',
      description:
        'Program digitalisasi dokumen dan arsip paroki untuk mempermudah akses dan penyimpanan data historis.',
      category: 'Digitalisasi',
      date: '2 Februari 2025',
    },
    {
      id: 4,
      title: 'Pelatihan Administrasi',
      description:
        'Pelatihan administrasi untuk staf dan pengurus dalam meningkatkan efisiensi tata kelola organisasi.',
      category: 'Pelatihan',
      date: '9 Februari 2025',
    },
    {
      id: 5,
      title: 'Evaluasi Sistem Informasi',
      description:
        'Evaluasi dan pengembangan sistem informasi paroki untuk mendukung pelayanan yang lebih baik.',
      category: 'Evaluasi',
      date: '16 Februari 2025',
    },
    {
      id: 6,
      title: 'Penyusunan Anggaran Tahunan',
      description:
        'Proses penyusunan anggaran tahunan paroki dengan melibatkan semua bidang dan unit kerja.',
      category: 'Anggaran',
      date: '23 Februari 2025',
    },
  ],
}
