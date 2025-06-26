import React from 'react'
import PengumumanCarousel from '@/components/PengumumanCarousel'
import YubileumRibbon from '@/components/YubileumRibbon'
import BlogArtikel from '@/components/BlogArtikel'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-sky-200 mx-2 mb-12 rounded-b-2xl lg:min-h-screen pt-16 pb-8 pl-12 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-12 lg:flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight pr-8">
            Paguyuban umat beriman
            <br />
            yang peduli, berbagi dan merakyat.
          </h1>
          <div className="lg:flex-1 aspect-video lg:aspect-auto lg:min-h-[600px] rounded-3xl overflow-hidden mr-12">
            <video
              className="w-full h-full object-cover object-center rounded-3xl"
              src="/videos/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-t from-slate-700 to-white py-20 px-4 sm:px-8 md:px-12 pb-64 m-0">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-6">
            Pengumuman
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-4xl mx-auto mb-12">
            Simak pengumuman terbaru dari Gereja Santo Ambrosius.
          </p>
          <PengumumanCarousel />
        </div>
      </section>

      <div className="relative -mt-24">
        <YubileumRibbon />
      </div>

      <BlogArtikel />

      <Footer />
    </div>
  )
}
