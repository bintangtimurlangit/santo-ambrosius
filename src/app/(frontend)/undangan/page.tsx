import React from 'react'
import { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import Ribbon from '@/components/Ribbon'
import UndanganAudio from '@/components/UndanganAudio'
import EnvelopeIntro from '@/components/EnvelopeIntro'
import Reveal from '@/components/Reveal'
import { FaWhatsapp, FaMapMarkerAlt, FaUser, FaClock, FaCalendarAlt } from 'react-icons/fa'

// Readable display serif used only for the hero title (scoped, does not change the site font).
const display = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Undangan Peringatan Tahbisan Imamat',
  description:
    'Undangan Perayaan Misa Syukur Peringatan 40, 35, 30 & 25 Tahun Imamat para Romo di Gereja Santo Ambrosius, Paroki Villa Melati Mas. Minggu, 16 Agustus 2026.',
  alternates: {
    canonical: '/undangan',
  },
}

type Romo = {
  years: number
  name: string
  date: string
  photo: string
  birth: string
  parents: string
  career: [string, string][]
  /** Optional extra classes for the biodata photo (e.g. a slight zoom). */
  imgClassName?: string
}

/** Para Romo yang dirayakan peringatan tahbisannya. */
const romos: Romo[] = [
  {
    years: 40,
    name: 'Romo Thomas Aquinas Murdjanto Rochadi Widagdo, Pr',
    date: '15 Agustus 1986',
    photo: '/romo/thomas-rochadi.webp',
    imgClassName: 'scale-110 origin-top',
    birth: 'Kalimundu, Bantul — 15 Mei 1958',
    parents: 'Raden Sebastianus Brotosudibyo dan Roro Sebastiana Siti Rochialun',
    career: [
      ['1986 - 1990', 'Sebagai Pastor Rekan di Paroki Mangga Besar, Gereja St. Petrus Paulus'],
      ['1990 - 1994', 'Pastur Kepala di Paroki Pulomas, Gereja St. Bonaventura'],
      ['1994 - 1999', 'Pastur Kepala di Paroki Bojong Indah, Gereja  St. Thomas Rasul'],
      ['1999 - 2004', 'Pastur Rekan di Paroki Cijantung, St. Aloysius Gonzaga'],
      ['2004 - 2005', 'Pastur Rekan di Paroki Pejompongan, Gereja Kristus Raja'],
      ['Mei 2025 - Sept 2005', 'Sabatical Years di Filipina'],
      ['Okt 2005 - 2014', 'Bertugas kembali Paroki Pejompongan, Gereja Kristus Raja'],
      ['2014 - 2026', 'Bertugas di Paroki Cilangkap, Gereja St. Maria Vianney'],
      ['2026 - sekarang', 'Bertugas sebagai Pastor Rekan di Paroki Villa Melati Mas, Gereja St. Ambrosius'],
    ],
  },
  {
    years: 40,
    name: 'Romo Yohanes Purbo Tamtomo, Pr',
    date: '15 Agustus 1986',
    photo: '/romo/yohanes-purbo.webp',
    birth: 'Yogyakarta, 1959',
    parents: 'JS Hadisuprapto dan Maria Norbentin Praptini',
    career: [
      ['1986', 'Pastor Rekan di Paroki Pulomas, Gereja St. Bonaventura'],
      ['1988', 'Belajar ke Roma'],
      ['1992', 'Pelayanan di KAJ sebagai Sekretaris Bapak Uskup Leo Sukoto'],
      ['2017 - sekarang', 'Pelayanan di Seminari Tinggi JP II KAJ'],
    ],
  },
  {
    years: 35,
    name: 'Romo Yustinus Sulistiadi, Pr',
    date: '15 Agustus 1991',
    photo: '/romo/yustinus-sulistiadi.jpeg',
    birth: 'Solo, 14 Agustus 1964',
    parents: 'Ignatius Soenardjo dan Hedwigis Srimulyati',
    career: [
      ['1991 - 1994', 'Pamong Seminari Menengah Wacana Bhakti, Anggota Komisi Liturgi'],
      ['1994 - 2006', 'Studi Fim & Televisi di Roma'],
      ['2006 - 2011', 'Pastor Rekan di Paroki Menteng, Gereja St. Ignatius Loyola'],
      ['2011 - 2012', 'Skriptor & Kategorial di Wisma Samadi'],
      ['2012 - 2016', 'Pastor Rekan di Paroki Pejompongan, Gereja St. Kristus Raja'],
      ['2016 - 2021', 'Pastor Kepala Paroki Sukabumi, Gereja St. Gregorius Agung'],
      ['2021 - 2025', 'Pastor Rekan di Paroki Cilangkap, Gereja St. Yohanes Maria Vianney'],
      ['2025 - 2026', 'Pastor Rekan di Paroki Pulo Gebang, Gereja St. Gabriel'],
    ],
  },
  {
    years: 30,
    name: 'Romo Aloysius Susilo Wijoyo, Pr',
    date: '15 Agustus 1996',
    photo: '/romo/aloysius-susilo.webp',
    birth: 'Yogyakarta, 11 Februari 1968',
    parents: 'Blasius Supardi KA dan Christina Sijam',
    career: [
      ['1996 - 1998', 'Pastor Rekan di Paroki Kelapa Gading, Gereja St. Yakobus'],
      ['1998 - 2001', 'Pastor Unika Atma Jaya, Jakarta'],
      ['2001 - 2005', 'Pastor Staff Seminari Tinggi Keuskupan Agung Jakarta (KAJ)'],
      ['2005 - 2008', 'Pastor Kepala Paroki Pejompongan, Gereja St. Kristus Raja'],
      ['2008 - 2017', 'Pastor Kepala Kosambi Baru, Gereja St. Matias Rasul'],
      ['2017 - 2022', 'Pastor Kepala Paroki Pulo Gebang, Gereja St. Gabriel'],
      ['2022 - sekarang', 'Pastor Kepala Paroki Ciputat, Gereja St. Nikodemus'],
    ],
  },
  {
    years: 30,
    name: 'Romo Yoseph Maria Marcelinus Bintoro, Pr.',
    date: '15 Agustus 1996',
    photo: '/romo/yos-bintoro-2026.png',
    birth: 'Jakarta, 30 November 1967',
    parents:
      'KRT RI Martokusumo, SE & RAy Maria Dolores Mursjanti Soerjomursandi',
    career: [
      ['1992 - 1993', 'Frater orientasi Pastoral di Paroki Tangerang, Gereja Santa Perawan Maria Berhati Tak Bernoda'],
      [
        '1996',
        'Ditahbiskan jadi Imam di Paroki Blok B, Gereja St Yohanes Penginjil. Mengikuti Pendidikan Perwira Karier di Akademi Militer Magelang',
      ],
      [
        '1997 - 2018',
        'Bertugas di Akademi Angkatan Udara Yogyakarta dan mendirikan Paroki Lanud Adisutjipto, Gereja St. Mikael',
      ],
      [
        '2019',
        'Diangkat sebagai Wakil Uskup Ordinariatus Castrensis Indonesia Yang melahirkan Pusat Studi Perdamaian dan Resolusi Konflik Memprakarsai kaderisasi imam-imam muda sebagai perwira Organik di TNI AD, TNI AL, TNI AU dan POLRI',
      ],
      ['2020', 'Kembali ke KAJ dan ditempatkan di Paroki Halim Perdana Kusuma, Gereja St. Agustinus'],
      [
        '2020 - sekarang',
        'Mengembangkan tata kelola Ordinariatus Cartensis Indonesia sebagai model pastoral militer yang kontekstual bagi Gereja Universal yang rencananya akan dipresentasikan kepada Bapa Suci Paul Leo XIV dalam audiensi khusus Ordinariatus Castrensis Indonesia di Vatikan serta pada Pilgrimage Militaire International di Lourdes',
      ],
    ],
  },
  {
    years: 25,
    name: 'Romo Yustinus Ardianto, Pr',
    date: '15 Agustus 2001',
    photo: '/romo/yustinus-ardianto.webp',
    birth: 'Jakarta, 9 Mei 1974',
    parents: 'Yohanes Doemeri dan Maria Laurensia Suwarsiatun',
    career: [
      [
        '2001',
        'Pastor di Paroki Tangerang, Gereja Santa Perawan Maria Berhati Tak Bernoda',
      ],
      [
        '2001 - 2009',
        'Ketua Komisi KomSos KAK; Paroki Bojong Indah, Gereja St. Thomas Rasul dan Paroki Jalan Malang, Gereja St. Ignatius Loyola',
      ],
      ['2009 - 2012', 'Studi di Ateneo De Manila University, Filipina'],
      ['2012 - 2017', 'Pastor Paroki Lubang Buaya, Gereja Kalvari'],
      ['2017 - sekarang', 'Direktur Pusat Pastoral Samadi'],
    ],
  },
]

/** Circular avatar used for the celebrant and the signatures. */
function PhotoAvatar({
  photo,
  alt,
  size = 'lg',
  imgClassName,
}: {
  photo?: string
  alt: string
  size?: 'lg' | 'sm'
  imgClassName?: string
}) {
  const dimension = size === 'lg' ? 'w-32 h-32' : 'w-24 h-24'
  if (photo) {
    return (
      <div className={`${dimension} rounded-full overflow-hidden shadow-md ring-4 ring-sky-100`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName ?? ''}`}
        />
      </div>
    )
  }
  return (
    <div
      className={`${dimension} rounded-full bg-sky-50 ring-4 ring-sky-100 shadow-md flex items-center justify-center text-sky-300`}
    >
      <FaUser size={size === 'lg' ? 44 : 32} />
    </div>
  )
}

export default function UndanganPage() {
  return (
    <div className="min-h-screen">
      {/* Tap-to-open envelope intro (covers the page until opened) */}
      <EnvelopeIntro />

      {/* Background music */}
      <UndanganAudio src="/audio/musik-undangan.mp3" />

      {/* ===== Hero ===== */}
      <div className="px-2">
        <section className="rounded-b-2xl h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] relative overflow-hidden bg-slate-900">
          {/* Interior of Gereja Santo Ambrosius */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 w-full h-full object-cover object-center rounded-b-2xl"
            src="/undangan-hero.webp"
            alt="Interior Gereja Santo Ambrosius"
          />
          {/* Top blend (mirrors the bottom) */}
          <div
            className="absolute inset-x-0 top-0 h-1/3"
            style={{ background: 'linear-gradient(to top, transparent, rgba(51,65,85,0.9))' }}
          ></div>
          {/* Bottom blend into the slate ribbon below */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(51,65,85,0.9))' }}
          ></div>

          {/* Eyebrow label near the top */}
          <p
            className={`${display.className} absolute inset-x-0 top-6 md:top-8 z-10 text-center text-white uppercase tracking-[0.45em] text-base md:text-lg drop-shadow-lg`}
          >
            Undangan
          </p>

          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center px-8">
              <h1
                className={`${display.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] m-0 drop-shadow-xl`}
              >
                Peringatan 40, 35, 30, 25
                <br />
                Tahun Imamat
              </h1>
            </div>
          </div>

          {/* Subtitle anchored near the bottom of the hero (kept on one line) */}
          <p className="absolute inset-x-0 bottom-8 md:bottom-10 z-10 text-center px-2 whitespace-nowrap font-medium text-white/90 leading-relaxed drop-shadow-2xl text-[clamp(0.5rem,2.5vw,1.25rem)]">
            Perayaan Misa Syukur — Gereja Santo Ambrosius, Paroki Villa Melati Mas
          </p>
        </section>
      </div>

      {/* ===== Shaded content area (sky → white → gray) ===== */}
      <div
        className="mt-2 overflow-hidden"
        style={{
          background:
            'linear-gradient(to bottom, #ffffff 0px, #ffffff 90px, rgb(186 230 253) 150px, rgb(224 242 254) 300px, #ffffff 540px, rgb(249 250 251) 100%)',
        }}
      >
        {/* Ribbon (motto) */}
        <div className="relative">
          <Ribbon lightText="Deus Intimior Intimo Tuo" darkText="Deus Intimior Intimo Meo" />
        </div>

        {/* ===== Ayat Suci ===== */}
        <section className="px-6 md:px-8 pt-10 md:pt-16">
          <Reveal variant="scale" className="max-w-3xl mx-auto text-center">
            <p
              className={`${display.className} text-lg md:text-xl lg:text-2xl italic text-slate-700 leading-relaxed`}
            >
              &ldquo;Sembuhkanlah orang sakit; bangkitkanlah orang mati; tahirkanlah orang kusta;
              usirlah setan-setan. Kamu telah memperolehnya dengan cuma-cuma, karena itu berikanlah
              pula dengan cuma-cuma.&rdquo;
            </p>
            <p className="mt-5 text-sm md:text-base font-semibold uppercase tracking-widest text-sky-600">
              Matius 10:8
            </p>
          </Reveal>
        </section>

        {/* ===== Invitation body ===== */}
        <section className="px-4 md:px-8 lg:px-12 pt-10 md:pt-16 pb-16">
          <div className="max-w-4xl mx-auto">
            <Reveal
              variant="scale"
              className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 md:px-12 py-10 md:py-14 text-center"
            >
              <p className="text-base md:text-lg italic text-slate-700 leading-relaxed">
                Dengan penuh rasa syukur atas kasih setia Tuhan, kami segenap umat dan Panitia
                Peringatan Tahbisan 40, 35, 30 &amp; 25 Tahun Imamat mengundang{' '}
                <span className="font-medium text-slate-800">
                  Pastor, Suster, Biarawan/Biarawati, dan Bapak/Ibu/Saudara/i
                </span>{' '}
                untuk turut mensyukuri Anugerah Tuhan yang telah menyertai:
              </p>

              <div className="my-10 space-y-6">
                {[40, 35, 30, 25].map((year) => (
                  <div key={year}>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-sky-600 mb-3">
                      {year} Tahun Imamat
                    </h3>
                    <ul className="space-y-1.5">
                      {romos
                        .filter((r) => r.years === year)
                        .map((r) => (
                          <li key={r.name} className="text-slate-700">
                            <span className="font-medium text-slate-800">{r.name}</span>
                            {r.date && <span className="text-slate-500"> ({r.date})</span>}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                dalam perjalanan Imamat mereka selama ini, dengan Perayaan Misa Syukur yang akan
                dipersembahkan oleh:
              </p>

              <Reveal variant="scale" delay={120} className="mt-8 flex flex-col items-center">
                <PhotoAvatar photo="/romo/suharyo.webp" alt="Mgr. Ignatius Kardinal Suharyo, Pr" />
                <h4 className="mt-5 text-xl md:text-2xl font-semibold text-slate-800">
                  Mgr. Ignatius Kardinal Suharyo, Pr
                </h4>
                <p className="text-slate-500">Uskup Agung Jakarta</p>
              </Reveal>
            </Reveal>
          </div>
        </section>

        {/* ===== Para Romo (biodata) ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-3">
                Imam yang Merayakan
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Refleksi perjalanan, syukur atas pelayanan, dan doa untuk Imam yang merayakan tahbisan
              </p>
            </Reveal>

            <div className="space-y-8">
              {romos.map((r, i) => (
                <Reveal
                  key={r.name}
                  variant={i % 2 === 0 ? 'left' : 'right'}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row"
                >
                  {/* Photo — fixed 4:5 frame so every Romo is shown at the same scale */}
                  <div className="sm:w-56 md:w-64 flex-shrink-0 bg-sky-50 overflow-hidden">
                    {r.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.photo}
                        alt={r.name}
                        className={`w-full h-full aspect-[4/5] sm:aspect-auto object-cover object-top ${r.imgClassName ?? ''}`}
                      />
                    ) : (
                      <div className="w-full aspect-[4/5] flex items-center justify-center text-sky-300">
                        <FaUser size={56} />
                      </div>
                    )}
                  </div>

                  {/* Biodata */}
                  <div className="flex-1 p-6 md:p-8">
                    <span className="inline-block rounded-full bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                      {r.years} Tahun Imamat
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-slate-800 leading-snug">
                      {r.name}
                    </h3>
                    {r.date && <p className="text-sm text-slate-500 mt-1">Tahbisan: {r.date}</p>}

                    {(r.birth || r.parents) && (
                      <div className="mt-4 text-sm text-slate-600 space-y-1">
                        {r.birth && (
                          <p>
                            <span className="text-slate-400">Lahir:</span> {r.birth}
                          </p>
                        )}
                        {r.parents && (
                          <p>
                            <span className="text-slate-400">Orang Tua:</span> {r.parents}
                          </p>
                        )}
                      </div>
                    )}

                    {r.career.length > 0 ? (
                      <div className="mt-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                          Riwayat Karya
                        </p>
                        <ul className="space-y-1.5">
                          {r.career.map(([yr, desc]) => (
                            <li
                              key={yr + desc}
                              className="flex gap-4 text-sm text-slate-600 leading-relaxed"
                            >
                              <span className="font-semibold text-sky-700 shrink-0 w-32 whitespace-nowrap">
                                {yr}
                              </span>
                              <span className="flex-1">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-slate-500 italic">Biodata akan menyusul.</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Detail Acara ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-3">
                Waktu &amp; Tempat
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Waktu */}
              <Reveal className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4 text-sky-500">
                  <FaCalendarAlt size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Waktu Pelaksanaan</h3>
                <p className="text-slate-600">Minggu, 16 Agustus 2026</p>
                <p className="text-slate-600 font-medium">Pukul 17.00 WIB</p>
              </Reveal>

              {/* Acara */}
              <Reveal
                delay={120}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center"
              >
                <div className="flex justify-center mb-4 text-sky-500">
                  <FaClock size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Acara</h3>
                <p className="text-slate-600">Misa Syukur Peringatan Tahbisan Imamat</p>
                <p className="text-slate-600">Ramah Tamah dan Hiburan</p>
              </Reveal>

              {/* Lokasi */}
              <Reveal
                delay={240}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center"
              >
                <div className="flex justify-center mb-4 text-sky-500">
                  <FaMapMarkerAlt size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Lokasi</h3>
                <p className="text-slate-600">Gereja Santo Ambrosius</p>
                <p className="text-slate-600">Paroki Villa Melati Mas</p>
              </Reveal>
            </div>

            {/* Map */}
            <Reveal className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <iframe
                title="Lokasi Gereja Santo Ambrosius"
                src="https://www.google.com/maps?q=Gereja+Santo+Ambrosius+Villa+Melati+Mas&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
            <Reveal delay={120} className="mt-6 text-center">
              <a
                href="https://maps.app.goo.gl/2tAcDKkcZNb78u8i6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium no-underline shadow-md"
              >
                <FaMapMarkerAlt size={16} />
                Buka di Google Maps
              </a>
            </Reveal>
          </div>
        </section>

        {/* ===== Konfirmasi Kehadiran ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <Reveal variant="scale" className="bg-sky-100 rounded-2xl shadow-sm px-8 py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-2">
                Konfirmasi Kehadiran
              </h2>
              <p className="text-slate-600 mb-8">
                Mohon konfirmasi kehadiran Anda melalui kontak berikut:
              </p>
              <div className="flex justify-center max-w-2xl mx-auto">
                <Reveal
                  variant="left"
                  delay={120}
                  className="bg-white rounded-xl p-6 shadow-sm w-full max-w-xs"
                >
                  <p className="font-medium text-slate-800 mb-3">RSVP</p>
                  <a
                    href="https://wa.me/6285195559488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 font-medium underline"
                  >
                    <FaWhatsapp size={18} /> 0851-9555-9488
                  </a>
                  <p className="text-sm text-slate-500 mt-3">
                    Konfirmasi paling lambat tanggal 13 Agustus 2026
                  </p>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Penutup / Tanda Tangan ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-24">
          <Reveal className="max-w-4xl mx-auto text-center">
            <p className="text-slate-600 italic mb-12">
              Atas kehadiran dan doa restu yang diberikan, kami mengucapkan terima kasih.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <Reveal variant="left" className="flex flex-col items-center">
                <PhotoAvatar
                  photo="/romo-pram.jpeg"
                  alt="Romo Antonius Pramono Wahyu Nugroho, Pr"
                  size="sm"
                  imgClassName="object-top scale-[1.45] origin-top"
                />
                <h4 className="mt-4 font-semibold text-slate-800">
                  Romo Antonius Pramono Wahyu Nugroho, Pr
                </h4>
                <p className="text-sm text-slate-500">Pastor Kepala Paroki Villa Melati Mas</p>
              </Reveal>
              <Reveal variant="right" delay={120} className="flex flex-col items-center">
                <PhotoAvatar photo="/romo/sonny.webp" alt="Sonny Aloysius Sumendap" size="sm" />
                <h4 className="mt-4 font-semibold text-slate-800">Sonny Aloysius Sumendap</h4>
                <p className="text-sm text-slate-500">Ketua Panitia Peringatan 40 Tahun Imamat</p>
              </Reveal>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
