import React from 'react'
import PengumumanCarousel from '@/components/PengumumanCarousel'
import YubileumRibbon from '@/components/YubileumRibbon'
import BlogArtikel from '@/components/BlogArtikel'
import { getHomepageData, getMediaURL } from '@/lib/getHomepageData'
import '@/styles/global.css'
import Link from 'next/link'

export default async function HomePage() {
  const homepageData = await getHomepageData()

  return (
    <div className="min-h-screen">
      <section className="bg-sky-200 mx-2 mb-12 rounded-b-2xl lg:min-h-screen pt-16 pb-8 pl-12 flex flex-col gap-12">
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:items-center lg:justify-between lg:flex-1 pr-12">
          {homepageData?.heroSection?.title && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight pr-8 flex-1">
              {homepageData.heroSection.title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < homepageData.heroSection.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          )}
          {/* Porta Sancta CTA Box */}
          <div className="hidden lg:flex flex-1 justify-end items-center">
            <div className="bg-sky-100 rounded-2xl shadow-sm px-6 py-6 max-w-xs w-full text-right flex flex-col items-end">
              <div>
                <p className="text-base font-normal text-slate-700 mb-2 leading-snug">
                  Ingin mengunjungi
                  <br />
                  Porta Sancta Gereja St. Ambrosius?
                </p>
                <Link
                  href="/porta-sancta"
                  className="inline-flex items-center text-base font-semibold underline underline-offset-4 text-slate-800 hover:text-sky-700 transition-colors"
                >
                  Cari Tahu Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-1 aspect-video lg:aspect-auto lg:min-h-[600px] rounded-3xl overflow-hidden mr-12 mb-4">
          <video
            className="w-full h-full object-cover object-center rounded-3xl"
            src={
              homepageData?.heroSection?.video
                ? getMediaURL(homepageData.heroSection.video)
                : '/videos/hero-video.mp4'
            }
            autoPlay
            muted
            loop
            playsInline
            aria-label={homepageData?.heroSection?.videoAlt || 'Hero video'}
          />
        </div>
      </section>

      <section className="bg-gradient-to-t from-slate-700 to-white py-20 px-4 sm:px-8 md:px-12 pb-64 m-0">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-6">
            {homepageData?.pengumumanSection?.title || 'Pengumuman'}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-4xl mx-auto mb-12">
            {homepageData?.pengumumanSection?.subtitle ||
              'Simak pengumuman terbaru dari Gereja Santo Ambrosius.'}
          </p>
          <PengumumanCarousel images={homepageData?.pengumumanSection?.images} />
        </div>
      </section>

      <div className="relative -mt-24">
        <YubileumRibbon />
      </div>

      <BlogArtikel />
    </div>
  )
}
