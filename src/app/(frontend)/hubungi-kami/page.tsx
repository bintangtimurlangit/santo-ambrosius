import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Footer from '@/components/Footer'

export default function HubungiKamiPage() {
  return (
    <div className="min-h-screen">
      {/* Gradient Container */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 4%, white 30%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Title Section */}
        <div className="text-center mb-20 pt-16 px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-8">
            Hubungi
            <br />
            Kami
          </h1>
        </div>

        {/* Contact Content */}
        <div className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Main Contact Information - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Contact Details */}
              <div className="space-y-6">
                {/* Alamat */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-slate-700 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-medium text-slate-800">Alamat</h2>
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    <p className="text-lg">Villa Melati Mas</p>
                    <p className="text-lg">Blok O6 No. 26</p>
                    <p className="text-lg">Kecamatan Serpong Utara</p>
                    <p className="text-lg">Kota Tangerang Selatan</p>
                    <p className="text-lg font-medium">15323</p>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-slate-700 p-2.5 rounded-full mr-3">
                        <FaEnvelope className="text-white text-lg" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-800">Email</h3>
                    </div>
                    <div className="space-y-2">
                      <a
                        href="mailto:sekretariat.stambrosius@gmail.com"
                        className="text-slate-600 hover:text-slate-900 transition-colors duration-200 block whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        sekretariat.stambrosius@gmail.com
                      </a>
                      <a
                        href="mailto:info@santoambrosius.org"
                        className="text-slate-600 hover:text-slate-900 transition-colors duration-200 block whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        info@santoambrosius.org
                      </a>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center mb-4">
                      <div className="bg-slate-700 p-2.5 rounded-full mr-3">
                        <FaPhone className="text-white text-lg" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-800">Telepon</h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Landline</p>
                        <a
                          href="tel:+622153864233"
                          className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                        >
                          +62 21 538 6423
                        </a>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-800 mb-1">Call Center</p>
                        <a
                          href="tel:+6285810262017"
                          className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                        >
                          +62 858 1026 2017
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Google Maps */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center mb-6">
                  <div className="bg-slate-700 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-medium text-slate-800">Lokasi Kami</h2>
                </div>
                <div className="w-full h-96 bg-gray-100 rounded-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.969430668367!2d106.66186467602921!3d-6.2677507937209205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb061e18d241%3A0x5d1b87a4deeae527!2sGereja%20Katolik%20Santo%20Ambrosius%20Villa%20Melati%20Mas!5e0!3m2!1sen!2sid!4v1750992249224!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '0.75rem' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* TPKA Section - Full Width */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center mb-8">
                <div className="bg-slate-700 p-3 rounded-full mr-4">
                  <FaPhone className="text-white text-xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-medium text-slate-800">
                  TPKA (Team Pelayanan Kedukaan Ambrosius)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <p className="text-slate-800 mb-3 font-medium">Moni</p>
                  <a
                    href="tel:+6281808946662"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm block"
                  >
                    (+62) 818 0894 6662
                  </a>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <p className="text-slate-800 mb-3 font-medium">Lie</p>
                  <a
                    href="tel:+6282299503400"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm block"
                  >
                    (+62) 822 9950 3400
                  </a>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <p className="text-slate-800 mb-3 font-medium">Lussy</p>
                  <a
                    href="tel:+6281292972120"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm block"
                  >
                    (+62) 812 9297 212
                  </a>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <p className="text-slate-800 mb-3 font-medium">Johanes</p>
                  <a
                    href="tel:+6287808053810"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm block"
                  >
                    (+62) 878 0805 3810
                  </a>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <p className="text-slate-800 mb-3 font-medium">Wenx</p>
                  <a
                    href="tel:+6285778908899"
                    className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm block"
                  >
                    (+62) 857 7890 8899
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
