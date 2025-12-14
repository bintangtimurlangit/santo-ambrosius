import React from 'react'
import PengumumanCarousel from '@/components/PengumumanCarousel'
import YubileumRibbon from '@/components/YubileumRibbon'
import BlogArtikel from '@/components/BlogArtikel'
import SnowEffect from '@/components/SnowEffect'
import { getHomepageData, getMediaURL } from '@/lib/getHomepageData'
import '@/styles/global.css'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const homepageData = await getHomepageData()

  return (
    <div className="min-h-screen">
      <section className="bg-sky-200 mx-2 mb-12 rounded-b-2xl lg:min-h-screen pt-8 sm:pt-12 md:pt-8 lg:pt-16 pb-0 md:pb-8 pl-12 flex flex-col gap-12 relative min-h-[calc(240px+56.25vw-8px)] sm:min-h-[calc(280px+56.25vw-2px)] md:min-h-[410px] lg:min-h-screen overflow-hidden">
        <SnowEffect />
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
          <div className="hidden lg:flex flex-1 justify-end items-center relative">
            {/* Luce Mascot Image */}
            <div className="absolute -top-32 -right-6 w-48 h-48 z-0">
              <Image
                src="/luce-mascot-alt.png"
                alt="Luce Mascot"
                width={256}
                height={256}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="bg-sky-100 rounded-2xl shadow-sm px-6 py-6 max-w-xs w-full text-right flex flex-col items-end relative z-10">
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
        <div
          className="lg:flex-1 aspect-video lg:aspect-auto lg:min-h-[600px] rounded-b-2xl lg:rounded-3xl overflow-hidden lg:mr-12 absolute top-[240px] sm:top-[280px] left-0 right-0 md:relative md:top-auto md:left-auto md:right-auto md:mb-4 md:mx-12 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:mb-4 md:-ml-2"
          style={{ bottom: 0 }}
        >
          <video
            className="w-full h-full object-cover object-center rounded-b-2xl md:rounded-2xl lg:rounded-3xl"
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
          <h2 className="text-4xl sm:text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-3 sm:mb-6">
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
