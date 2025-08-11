import React from 'react'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Porta Sancta - Pintu Suci Yubileum 2025',
  description:
    'Porta Sancta (Pintu Suci) di Gereja Santo Ambrosius untuk Tahun Yubileum 2025. Pelajari makna, tradisi, dan cara mendaftar untuk berziarah.',
  keywords: [
    'porta sancta',
    'pintu suci',
    'yubileum 2025',
    'jubilee',
    'indulgensi',
    'ziarah',
    'gereja katolik',
  ],
  openGraph: {
    title: 'Porta Sancta - Pintu Suci Yubileum 2025',
    description:
      'Porta Sancta (Pintu Suci) di Gereja Santo Ambrosius untuk Tahun Yubileum 2025. Pelajari makna, tradisi, dan cara mendaftar untuk berziarah.',
    url: '/porta-sancta',
    images: [
      {
        url: '/porta-sancta.jpg',
        width: 1200,
        height: 630,
        alt: 'Porta Sancta - Pintu Suci Gereja Santo Ambrosius',
      },
    ],
  },
  twitter: {
    title: 'Porta Sancta - Pintu Suci Yubileum 2025',
    description:
      'Porta Sancta (Pintu Suci) di Gereja Santo Ambrosius untuk Tahun Yubileum 2025. Pelajari makna, tradisi, dan cara mendaftar untuk berziarah.',
    images: ['/porta-sancta.jpg'],
  },
  alternates: {
    canonical: '/porta-sancta',
  },
}

export default function PortaSanctaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="px-2 pb-2">
        <section
          className="rounded-b-2xl h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] relative overflow-hidden"
          style={{
            backgroundImage: 'url("/porta-sancta.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs rounded-b-2xl"></div>

          {/* Content Overlay */}
          <div className="relative z-10 flex items-center justify-center h-[calc(100vh-60px)] md:h-[calc(100vh-90px)]">
            <div className="text-center px-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight m-0 tracking-tight mb-8">
                Porta Sancta
              </h1>
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
                Pintu Suci yang dibuka khusus pada Tahun Yubileum 2025 untuk para peziarah yang
                ingin memperoleh indulgensi dan rahmat khusus dari Tuhan.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section - article style, not cards */}
        <div className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Article Content */}
            <article className="prose prose-slate max-w-none text-slate-700 mx-auto mb-12 px-4 md:px-8 py-8 rounded-2xl bg-white/80 [&_h2]:pt-8 [&_h2]:pb-4">
              <h2 className="text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-6">
                Apa itu Porta Sancta?
              </h2>
              <p>
                <b>Porta Sancta</b> atau <b>Pintu Suci</b> adalah sebuah pintu khusus yang dibuka
                hanya pada Tahun Yubileum (Jubilee) di gereja-gereja utama Katolik. Tradisi ini
                bermula sejak tahun 1300 oleh Paus Bonifasius VIII di Roma. Membuka dan melintasi
                Porta Sancta melambangkan perjalanan rohani dari dosa menuju rahmat, pembaruan
                hidup, dan pengampunan. Dalam tradisi Katolik, melintasi Pintu Suci pada Tahun
                Yubileum memberikan kesempatan untuk memperoleh indulgensi penuh, yaitu penghapusan
                hukuman atas dosa-dosa yang telah diampuni.
              </p>
              <p>
                Dalam Injil Yohanes 10:9, Yesus berkata:{' '}
                <i>“Akulah pintu; barangsiapa masuk melalui Aku, ia akan selamat.”</i> Melalui
                simbolisme ini, Porta Sancta menjadi undangan untuk memperbarui iman, bertobat, dan
                menerima rahmat Allah secara istimewa.
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-700 mb-6">
                Makna & Tradisi Porta Sancta
              </h2>
              <p>
                Setiap Tahun Yubileum, Porta Sancta dibuka secara seremonial sebagai tanda
                dimulainya masa rahmat dan pengampunan. Melintasi Pintu Suci bukan sekadar tindakan
                fisik, tetapi juga perjalanan batin menuju pertobatan, pembaruan, dan persatuan
                dengan Allah. Tradisi ini mengingatkan umat akan kasih dan kerahiman Tuhan yang
                selalu terbuka bagi siapa saja yang ingin kembali kepada-Nya.
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-700 mb-6">
                Porta Sancta di Gereja St. Ambrosius
              </h2>
              <p>
                Dalam rangka Tahun Yubileum 2025, Porta Sancta di <b>Gereja St. Ambrosius</b> akan
                dibuka secara khusus bagi para peziarah yang ingin memperoleh rahmat dan indulgensi.
                Ini adalah kesempatan langka dan penuh makna untuk memperdalam iman, mengalami
                pembaruan rohani, serta merasakan kasih dan pengampunan Allah secara nyata.
              </p>
            </article>

            {/* CTA Section - modern, matches main page design language */}
            <div className="my-16 flex justify-center">
              <div className="bg-sky-100 rounded-2xl shadow-sm px-8 py-12 w-full max-w-4xl text-center flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">
                  Ingin Berziarah ke Porta Sancta?
                </h3>
                <p className="text-base text-slate-600 mb-6">
                  Daftarkan diri Anda atau kelompok untuk berziarah ke Porta Sancta di <br></br>
                  Gereja St. Ambrosius dengan mengisi formulir online berikut:
                </p>
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLScQE7emBkDgsPyu8AsWkM_1njsFYcvw8_L2iKqBf5i83v3nPQ/viewform"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium no-underline shadow-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 5l6 6m0 0l-6 6m6-6H3"
                    />
                  </svg>
                  Isi Formulir Pendaftaran
                </Link>
              </div>
            </div>

            {/* Contact Info Section - match site design language, use react-icons */}
            <div className="mt-16 flex justify-center">
              <div className="bg-sky-100 rounded-2xl shadow-sm px-8 py-10 w-full max-w-4xl text-center">
                <h4 className="text-lg font-semibold mb-4 text-slate-800">Informasi & Kontak</h4>
                <p className="text-base text-slate-600 mb-6">
                  Untuk informasi lebih lanjut, silakan hubungi kami:
                </p>
                <ul className="text-base text-slate-700 flex flex-col items-center gap-3">
                  <li className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-600" size={18} />
                    <span>Sekretariat Paroki – </span>
                    <a
                      href="https://wa.me/6285810262017"
                      className="text-green-600 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      0858-1026-2017
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-600" size={18} />
                    <span>Bapak Rudy – </span>
                    <a
                      href="https://wa.me/6281280988298"
                      className="text-green-600 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      0812-8098-8298
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
