import React from 'react'
import { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import Ribbon from '@/components/Ribbon'
import UndanganAudio from '@/components/UndanganAudio'
import { FaWhatsapp, FaMapMarkerAlt, FaUser, FaClock, FaCalendarAlt } from 'react-icons/fa'

// Elegant display serif used only for the hero title (scoped, does not change the site font).
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Undangan — Peringatan Tahbisan Imamat',
  description:
    'Undangan Perayaan Misa Syukur Peringatan 40, 30 & 25 Tahun Imamat para Romo di Gereja Santo Ambrosius, Paroki Villa Melati Mas. Minggu, 16 Agustus 2026.',
  alternates: {
    canonical: '/undangan',
  },
}

/** Para Romo yang dirayakan peringatan tahbisannya. */
const romos = [
  {
    years: 40,
    name: 'Romo Thomas Aquino Rochadi Widagdo, Pr',
    date: '15 Agustus 1986',
    photo: '/romo-rochadi.png',
    bio: '',
  },
  {
    years: 40,
    name: 'Romo Yohanes Purbo Tamtomo, Pr',
    date: '15 Agustus 1986',
    photo: '',
    bio: '',
  },
  {
    years: 30,
    name: 'Romo Aloysius Susilo Wijoyo, Pr',
    date: '15 Agustus 1996',
    photo: '',
    bio: '',
  },
  {
    years: 30,
    name: 'Romo Yos Bintoro, Pr',
    date: '15 Agustus 1996',
    photo: '',
    bio: '',
  },
  {
    years: 25,
    name: 'Romo Yustinus Ardianto, Pr',
    date: '15 Agustus 2001',
    photo: '',
    bio: '',
  },
]

/** Placeholder avatar used until a real photo is supplied. */
function PhotoAvatar({
  photo,
  alt,
  size = 'lg',
}: {
  photo?: string
  alt: string
  size?: 'lg' | 'sm'
}) {
  const dimension = size === 'lg' ? 'w-32 h-32' : 'w-24 h-24'
  if (photo) {
    return (
      <div className={`${dimension} rounded-full overflow-hidden shadow-md ring-4 ring-sky-100`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt={alt} className="w-full h-full object-cover" />
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
      {/* Background music */}
      <UndanganAudio src="/audio/aku-abdi-tuhan.mp3" />

      {/* ===== Hero ===== */}
      <div className="px-2">
        <section
          className="rounded-b-2xl h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] relative overflow-hidden bg-slate-800"
          style={{
            backgroundImage: 'url("/undangan-hero.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Brand-shaded overlay: deepens toward the bottom to blend into the ribbon below */}
          <div
            className="absolute inset-0 rounded-b-2xl"
            style={{
              background:
                'linear-gradient(to bottom, rgba(15,23,42,0.55) 0%, rgba(30,41,59,0.45) 40%, rgba(51,65,85,0.92) 100%)',
            }}
          ></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center px-8">
              <p
                className={`${display.className} text-sky-200 tracking-[0.45em] uppercase text-base md:text-lg mb-6`}
              >
                Undangan
              </p>
              <h1
                className={`${display.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] m-0 mb-8`}
              >
                Peringatan 40, 30, 25
                <br />
                Tahun Imamat
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Perayaan Misa Syukur — Gereja Santo Ambrosius, Paroki Villa Melati Mas
              </p>
            </div>
          </div>
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
          <Ribbon lightText="Deus Interior Intimo Meo" darkText="Deus Interior Intimo Tuo" />
        </div>

        {/* ===== Invitation body ===== */}
        <section className="px-4 md:px-8 lg:px-12 pt-10 md:pt-16 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 md:px-12 py-10 md:py-14 text-center">
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                Dengan penuh rasa syukur atas kasih setia Tuhan, kami segenap umat dan Panitia
                Peringatan Tahbisan 40, 30 &amp; 25 Tahun Imamat mengundang{' '}
                <span className="font-medium text-slate-800">
                  Pastor, Suster, Biarawan/Biarawati, dan Bapak/Ibu/Saudara/i
                </span>{' '}
                untuk turut mensyukuri Anugerah Tuhan yang telah menyertai:
              </p>

              <div className="my-10 space-y-6">
                {[40, 30, 25].map((year) => (
                  <div key={year}>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-sky-600 mb-3">
                      {year} Tahun Imamat
                    </h3>
                    <ul className="space-y-1.5">
                      {romos
                        .filter((r) => r.years === year)
                        .map((r) => (
                          <li key={r.name} className="text-slate-700">
                            <span className="font-medium text-slate-800">{r.name}</span>{' '}
                            <span className="text-slate-500">({r.date})</span>
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

              <div className="mt-8 flex flex-col items-center">
                <PhotoAvatar alt="Mgr. Ignatius Kardinal Suharyo, Pr" />
                <h4 className="mt-5 text-xl md:text-2xl font-semibold text-slate-800">
                  Mgr. Ignatius Kardinal Suharyo, Pr
                </h4>
                <p className="text-slate-500">Uskup Agung Jakarta</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Para Romo (biodata) ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-3">
                Para Romo
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Mengenang perjalanan panggilan dan pelayanan para Romo yang dirayakan.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {romos.map((r) => (
                <div
                  key={r.name}
                  className="w-full sm:w-[330px] bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center"
                >
                  <PhotoAvatar photo={r.photo} alt={r.name} />
                  <span className="mt-5 inline-block rounded-full bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                    {r.years} Tahun Imamat
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-800 leading-snug">
                    {r.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Tahbisan: {r.date}</p>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                    {r.bio || 'Biodata akan segera ditambahkan.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Detail Acara ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-3">
                Waktu &amp; Tempat
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {/* Waktu */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4 text-sky-500">
                  <FaCalendarAlt size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Waktu Pelaksanaan</h3>
                <p className="text-slate-600">Minggu, 16 Agustus 2026</p>
                <p className="text-slate-600 font-medium">Pukul 17.00 WIB</p>
              </div>

              {/* Acara */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4 text-sky-500">
                  <FaClock size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Acara</h3>
                <p className="text-slate-600">Misa Syukur Peringatan Tahbisan Imamat</p>
                <p className="text-slate-600">Ramah Tamah dan Hiburan</p>
              </div>

              {/* Lokasi */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4 text-sky-500">
                  <FaMapMarkerAlt size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Lokasi</h3>
                <p className="text-slate-600">Gereja Santo Ambrosius</p>
                <p className="text-slate-600">Paroki Villa Melati Mas</p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
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
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://maps.app.goo.gl/2tAcDKkcZNb78u8i6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium no-underline shadow-md"
              >
                <FaMapMarkerAlt size={16} />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* ===== Konfirmasi Kehadiran ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-sky-100 rounded-2xl shadow-sm px-8 py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-2">
                Konfirmasi Kehadiran
              </h2>
              <p className="text-slate-600 mb-8">
                Mohon konfirmasi kehadiran Anda melalui kontak berikut:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Konfirmasi 1</p>
                  <p className="font-medium text-slate-800 mb-3">PIC Undangan</p>
                  <a
                    href="https://wa.me/62XXXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 font-medium underline"
                  >
                    <FaWhatsapp size={18} /> 0xxx-xxxx-xxxx
                  </a>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-slate-500 mb-1">Konfirmasi 2</p>
                  <p className="font-medium text-slate-800 mb-3">Tim Romo Rochadi</p>
                  <a
                    href="https://wa.me/62XXXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 font-medium underline"
                  >
                    <FaWhatsapp size={18} /> 0xxx-xxxx-xxxx
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Penutup / Tanda Tangan ===== */}
        <section className="px-4 md:px-8 lg:px-12 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-600 italic mb-12">
              Atas kehadiran dan doa restu yang diberikan, kami mengucapkan terima kasih.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="flex flex-col items-center">
                <PhotoAvatar
                  photo="/romo-pram.jpeg"
                  alt="Romo Antonius Pramono Wahyu Nugroho, Pr"
                  size="sm"
                />
                <h4 className="mt-4 font-semibold text-slate-800">
                  Romo Antonius Pramono Wahyu Nugroho, Pr
                </h4>
                <p className="text-sm text-slate-500">Pastor Kepala Paroki Villa Melati Mas</p>
              </div>
              <div className="flex flex-col items-center">
                <PhotoAvatar alt="Sonny Aloysius Sumendap" size="sm" />
                <h4 className="mt-4 font-semibold text-slate-800">Sonny Aloysius Sumendap</h4>
                <p className="text-sm text-slate-500">Ketua Panitia Peringatan 40 Tahun Imamat</p>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700">
                Turut Merayakan Peringatan Tahbisan Imamat
              </h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
