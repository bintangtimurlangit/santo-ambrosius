'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-8 md:px-12 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Navigasi */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Navigasi</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/tentang-kami"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sapta-bidang"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline"
                  >
                    Sapta Bidang
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jadwal"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline"
                  >
                    Jadwal Misa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hubungi-kami"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline"
                  >
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/porta-sancta"
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm no-underline"
                  >
                    Porta Sancta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Kontak</h3>
              <div className="space-y-3">
                <div className="text-gray-300 text-sm">📍 Jl. Villa Melati Mas, Serpong</div>
                <div className="text-gray-300 text-sm">📞 +62 858-1026-2017</div>
                <div className="text-gray-300 text-sm">✉️ info@santoambrosius.org</div>
              </div>
            </div>

            {/* Ikuti Kami */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Ikuti Kami</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-blue-600 rounded-lg p-2 text-white no-underline transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-pink-600 rounded-lg p-2 text-white no-underline transition-all duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://www.youtube.com/@santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-red-600 rounded-lg p-2 text-white no-underline transition-all duration-200"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  href="https://twitter.com/santoambrosius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-blue-400 rounded-lg p-2 text-white no-underline transition-all duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} />
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
