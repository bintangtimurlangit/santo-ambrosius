'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-8 md:px-12 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 text-center md:text-left">
            {/* Navigasi */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-600 pb-2 inline-block">
                Navigasi
              </h3>
              <ul className="space-y-3 mt-4">
                <li>
                  <Link
                    href="/tentang-kami"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline block py-1"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sapta-bidang"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline block py-1"
                  >
                    Sapta Bidang
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jadwal"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline block py-1"
                  >
                    Jadwal Misa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hubungi-kami"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline block py-1"
                  >
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/porta-sancta"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline block py-1"
                  >
                    Porta Sancta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kontak */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-600 pb-2 inline-block">
                Kontak
              </h3>
              <div className="space-y-4 mt-4">
                <div className="text-gray-300 text-sm flex items-center justify-center md:justify-start gap-2">
                  <FaMapMarkerAlt className="text-white" size={14} />
                  <span>Jl. Villa Melati Mas, Serpong</span>
                </div>
                <div className="text-gray-300 text-sm flex items-center justify-center md:justify-start gap-2">
                  <FaPhone className="text-white" size={14} />
                  <span>+62 858-1026-2017</span>
                </div>
                <div className="text-gray-300 text-sm flex items-center justify-center md:justify-start gap-2">
                  <FaEnvelope className="text-white" size={14} />
                  <span>info@santoambrosius.org</span>
                </div>
              </div>
            </div>

            {/* Ikuti Kami */}
            <div className="mb-8 md:mb-0">
              <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-600 pb-2 inline-block">
                Ikuti Kami
              </h3>
              <div className="flex gap-3 justify-center md:justify-start mt-4">
                <a
                  href="https://www.facebook.com/santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-blue-600 rounded-lg p-3 text-white no-underline transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-pink-600 rounded-lg p-3 text-white no-underline transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://www.youtube.com/@santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-red-600 rounded-lg p-3 text-white no-underline transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube size={18} />
                </a>
                <a
                  href="https://twitter.com/santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-blue-400 rounded-lg p-3 text-white no-underline transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>

            {/* Empty right column */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>

      {/* Bottom Bar */}
      <div className="bg-slate-900 px-4 sm:px-8 md:px-12 py-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2024 Gereja Santo Ambrosius. All rights reserved.
            </p>

            {/* Luce Mascot standing on copyright bar */}
            <div className="hidden xl:block absolute right-8 xl:right-20 2xl:right-44 -top-56">
              <Image
                src="/images/Luce_mascot.png"
                alt="Luce - Vatican Mascot for Jubilee 2025"
                width={150}
                height={200}
                className="h-[180px] xl:h-[200px] 2xl:h-[220px] w-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
