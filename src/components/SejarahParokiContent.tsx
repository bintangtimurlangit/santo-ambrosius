'use client'

import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { getMediaURL } from '@/lib/getSejarahParokiData'
import type { Media } from '@/payload-types'

// Type for Payload's Lexical rich text format
interface LexicalRichText {
  root: {
    type: string
    children: {
      type: string
      version: number
      text?: string
      [k: string]: unknown
    }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

interface ContentData {
  article?: LexicalRichText | string | null // Rich text content
  featuredImage?: Media | string | null
  imageCaption?: string
  quote?: {
    text?: string
    author?: string
  }
}

interface SejarahParokiContentProps {
  data?: ContentData | null
}

const SejarahParokiContent = ({ data }: SejarahParokiContentProps) => {
  const timelineEvents = [
    {
      year: '1979',
      title: 'Awal Mula Umat Perdana',
      content: `
        <p>Awal mula umat perdana di daerah Serpong adalah permintaan dari Pastor Paroki St. Maria Hati Tak Bernoda, Tangerang, Pastor Tan Soe Ie, SJ pada tahun 1979 kepada Ketua Lingkungan St. Yohanes IV, Bp. Goh untuk merintis pengembangan umat Katolik di wilayah Serpong dengan membuat sub lingkungan yang mempunyai area mulai dari jembatan Kebon Nanas, Tangerang hingga ujung Serpong dan Parung Panjang yang ketika itu sebagian besar adalah hutan karet.</p>
        
        <br><p>Bp. Joko yang ditunjuk oleh ketua lingkungan sebagai koordinator, dengan kendaraan sepeda atau berjalan kaki sepulangnya bekerja di Damatex, tekun mencari umat-umat Katolik di perkebunan karet dan markas tentara Arhanud yang sudah ada di tahun 1979 ini. Lima orang umat perdana yaitu Bp. Joko, istrinya Ibu Lies dan pembantunya yang beragama Katolik serta Bp. Karjono dan Bp. Hutapea yang bekerja di perkebunan karet PTP mulai membangun komunitas Katolik dan menjadi umat perdana di Sub Lingkungan St. Yohanes IV, Paroki St. Maria, Tangerang.</p>
        
        <p>Kepindahan keluarga Bp. Joko ke perumahan Pondok Jagung (yang saat ini masih ada di samping Mal WTC Matahari) pada tahun 1982 semakin mendekatkan diri pada komunitas Katolik yang terbangun dan semakin mengembangkan jumlah umat Katolik. Mereka berkumpul secara rutin dengan para tentara yang beragama Katolik di markas Arhanud untuk saling menguatkan dan bertumbuh dalam iman.</p>
      `,
    },
    {
      year: '1983',
      title: 'Pembangunan Villa Melati Mas',
      content: `
        <p>Pembangunan Perumahan Villa Melati Mas di tahun 1983 yang memiliki area cukup luas, menambah jumlah umat-umat Katolik baru. Sekolah Strada yang berada di Blok F dalam sejarah pertumbuhan umat perdana menjadi tempat penting dimana umat melakukan misa rutin setiap minggunya selama beberapa tahun.</p>
      `,
    },
    {
      year: '1989',
      title: 'Pembentukan Stasi Ascensio',
      content: `
        <p>Tahun 1989, mewakili KAJ, Pastor Bintarto, SJ selaku Pastor Paroki St. Perawan Maria Hati Tak Bernoda, Tangerang menentukan batas wilayah pelayanan baru yaitu mulai jembatan Kebon Nanas hingga ujung Serpong dan Parung Panjang menjadi bagian dari Paroki St. Agustinus, Karawaci. Pastor Putranto, OSC yang berkarya di Paroki St. Agustinus mendampingi umat yang sudah cukup banyak ini, hingga terbentuknya Stasi Ascensio pada tahun 1989 yang diresmikan oleh Pastor Paroki St. Agustinus, Chris Tukiyat, OSC pada tanggal 5 Juni 1990.</p>
      `,
    },
    {
      year: '2008',
      title: 'Pembangunan Gereja',
      content: `
        <p>Mengingat luas tanah sekitar 2100 m2, sejak awal memang tanah fasos ini direncanakan untuk dijadikan kapel. PPG yang didukung KAJ melihat bahwa jumlah umat yang akan terus bertumbuh, mendorong pencarian tanah tambahan agar bisa terbangun gereja yang bisa menampung umat lebih banyak. Berkat bantuan KAJ dan sejumlah dana umat, tanah seluas 5665 m2 yang terletak di blok O akhirnya dapat di beli dan menjadi bangunan Gereja saat ini.</p>
      `,
    },
    {
      year: '2015',
      title: 'Penetapan Stasi Villa Melati Mas',
      content: `
        <p>Setelah kunjungan Tim Kunjungan Karya Pastoral (TKKP) KAJ medio November 2015 dan melihat kesiapan fasilitas gereja serta umat, KAJ merekomendasikan Stasi Villa Melati Mas menjadi paroki. Untuk itulah diutus Romo Yosef Natalis Kurnianto, Pr sebagai Pastor Rekan Paroki St. Monika dengan tugas khusus mempersiapkan Stasi Villa Melati Mas menjadi Paroki.</p>
      `,
    },
    {
      year: '2017',
      title: 'Menjadi Paroki Mandiri',
      content: `
        <p>Dari pertemuan antara DPH Paroki Serpong dengan Dewan Paroki Administratif Villa Melati Mas pada tanggal 11 Februari 2017 dan serangkaian pertemuan lainnya dengan KAJ menghasilkan kesepakatan yang dituangkan dalam surat Bapak Uskup dengan nomor : 076 A/3.16.60/2017, tertanggal 21 Februari 2017. Dalam surat tersebut menetapkan Paroki Administratif Villa Melati Mas menjadi Paroki Mandiri dengan batas dan wilayah Paroki seperti pada saat ini.</p>
        
        <p>Misa Perayaan penetapan Paroki Villa Melati Mas menjadi Paroki Mandiri dirayakan pada tanggal 26 Februari 2017 dipimpin oleh Mgr. Ignatius Suharyo selaku Uskup KAJ.</p>
      `,
    },
  ]

  const featuredImageUrl = data?.featuredImage ? getMediaURL(data.featuredImage) : ''

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-12">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={featuredImageUrl}
                alt={data?.imageCaption || 'Sejarah Paroki Santo Ambrosius'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
              />
            </div>
            {data?.imageCaption && (
              <p className="text-sm text-gray-600 text-center mt-4 italic">{data.imageCaption}</p>
            )}
          </div>
        )}

        {/* Main Article Content */}
        {data?.article ? (
          <div className="prose prose-lg prose-slate max-w-none">
            <RichText content={data.article} />
          </div>
        ) : (
          <div className="space-y-16">
            {/* Page Introduction */}
            <div className="text-center mb-20 pt-16 px-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-8">
                Sejarah Paroki
                <br />
                Villa Melati Mas
              </h1>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Perjalanan iman Paroki Villa Melati Mas dimulai dari hutan karet di Serpong hingga
                menjadi paroki mandiri yang melayani ribuan umat.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-700 rounded-full hidden md:block shadow-sm"></div>

              <div className="space-y-12 md:space-y-16">
                {timelineEvents.map((event, index) => {
                  const isEven = index % 2 === 0

                  return (
                    <div
                      key={event.year}
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-slate-700 shadow-lg z-10 hidden md:flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                      </div>

                      {/* Content */}
                      <div
                        className={`flex-1 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}
                      >
                        <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                          {/* Year badge */}
                          <div className="absolute -top-3 right-4">
                            <span className="inline-flex items-center bg-slate-700 text-white px-4 py-2 rounded-xl text-lg font-medium shadow-lg">
                              {event.year}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-medium text-slate-800 mb-4 text-left leading-tight pt-4">
                            {event.title}
                          </h3>

                          <div
                            className="prose prose-slate max-w-none text-left leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: event.content }}
                          />
                        </div>
                      </div>

                      {/* Spacer for desktop layout */}
                      <div className="hidden md:block flex-1"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Featured Quote */}
        {data?.quote?.text && (
          <div className="mt-16 p-8 bg-gray-100 rounded-lg border-l-4 border-slate-700">
            <blockquote className="text-xl md:text-2xl font-light text-slate-700 italic leading-relaxed">
              &ldquo;{data.quote.text}&rdquo;
            </blockquote>
            {data.quote.author && (
              <cite className="block mt-4 text-lg font-medium text-slate-800 not-italic">
                — {data.quote.author}
              </cite>
            )}
          </div>
        )}

        {/* Default Quote if no custom quote */}
        {!data?.quote?.text && (
          <div className="mt-20 relative">
            <div className="bg-gray-100 rounded-2xl p-8 md:p-12 border border-slate-700/10 shadow-lg relative">
              <blockquote className="text-xl md:text-2xl font-light text-slate-700 leading-relaxed text-center mb-6 italic">
                &ldquo;Paroki dibuat sebagai pusat pelayanan dimana kehadirannya dapat membuat umat
                semakin terlayani. Program karya yang dibuat oleh Paroki dapat membuat umat
                mempunyai gambaran dan pengalaman tentang Allah Yang Murah Hati, semakin beriman,
                semakin bersaudara dan semakin berbelarasa.&rdquo;
              </blockquote>

              <div className="text-center">
                <cite className="text-lg font-semibold text-slate-800 not-italic">
                  — Mgr. Ign. Suharyo
                </cite>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SejarahParokiContent
