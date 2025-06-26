'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'

export default function Navbar() {
  const [isFloating, setIsFloating] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSaptaBidangDropdownOpen, setIsSaptaBidangDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileTentangKamiOpen, setIsMobileTentangKamiOpen] = useState(false)
  const [isMobileSaptaBidangOpen, setIsMobileSaptaBidangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsFloating(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setIsDropdownOpen(false)
  }

  const handleSaptaBidangMouseEnter = () => {
    setIsSaptaBidangDropdownOpen(true)
  }

  const handleSaptaBidangMouseLeave = () => {
    setIsSaptaBidangDropdownOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleMobileTentangKami = () => {
    // If opening Tentang Kami, close Sapta Bidang
    if (!isMobileTentangKamiOpen) {
      setIsMobileSaptaBidangOpen(false)
    }
    setIsMobileTentangKamiOpen(!isMobileTentangKamiOpen)
  }

  const toggleMobileSaptaBidang = () => {
    // If opening Sapta Bidang, close Tentang Kami
    if (!isMobileSaptaBidangOpen) {
      setIsMobileTentangKamiOpen(false)
    }
    setIsMobileSaptaBidangOpen(!isMobileSaptaBidangOpen)
  }

  return (
    <nav
      className={`
        bg-sky-200 p-4 pr-4 md:pr-12 pl-4 
        ${isFloating ? 'rounded-2xl m-2 top-2 shadow-lg' : 'rounded-t-2xl mt-2 mx-2 border-b border-sky-300'} 
        sticky top-0 z-50 transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/" className="no-underline block">
            <Image
              src="/images/logo.png"
              alt="Santo Ambrosius Logo"
              width={348}
              height={114}
              priority
              className="h-[60px] md:h-[90px] w-auto -my-1 md:-my-2.5"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Invisible bridge for smooth hover */}
            <div className="absolute top-full left-0 right-0 h-1 bg-transparent z-50"></div>

            <Link
              href="/tentang-kami"
              className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor] cursor-pointer"
            >
              Tentang Kami
            </Link>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-700/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.15)] py-3 min-w-[220px] z-50 backdrop-blur-sm animate-[dropdownFadeIn_0.2s_ease-out]">
                <Link
                  href="/tentang-kami/sejarah-paroki"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Sejarah Paroki
                </Link>
                <Link
                  href="/tentang-kami/visi-misi"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Visi Misi
                </Link>
                <Link
                  href="/tentang-kami/profil-santo-pelindung"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Profil Santo Pelindung
                </Link>
                <Link
                  href="/tentang-kami/peta-wilayah"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Peta Wilayah
                </Link>
                <Link
                  href="/tentang-kami/romo-paroki"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Romo Paroki
                </Link>
              </div>
            )}
          </div>

          <div
            className="relative inline-block"
            onMouseEnter={handleSaptaBidangMouseEnter}
            onMouseLeave={handleSaptaBidangMouseLeave}
          >
            {/* Invisible bridge for smooth hover */}
            <div className="absolute top-full left-0 right-0 h-1 bg-transparent z-50"></div>

            <Link
              href="/sapta-bidang"
              className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor] cursor-pointer"
            >
              Sapta Bidang
            </Link>
            {isSaptaBidangDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-700/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.15)] py-3 min-w-[220px] z-50 backdrop-blur-sm animate-[dropdownFadeIn_0.2s_ease-out]">
                <Link
                  href="/sapta-bidang/pewartaan"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Pewartaan
                </Link>
                <Link
                  href="/sapta-bidang/pelayanan"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Pelayanan
                </Link>
                <Link
                  href="/sapta-bidang/persekutuan"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Persekutuan
                </Link>
                <Link
                  href="/sapta-bidang/pitk"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  PITK
                </Link>
                <Link
                  href="/sapta-bidang/pemerhati-monitoring"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Pemerhati / Monitoring
                </Link>
                <Link
                  href="/sapta-bidang/peribadatan"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Peribadatan
                </Link>
                <Link
                  href="/sapta-bidang/okk"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  OKK
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/jadwal"
            className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor]"
          >
            Jadwal
          </Link>

          <Link
            href="/hubungi-kami"
            className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor]"
          >
            Hubungi Kami
          </Link>

          <Link
            href="/porta-sancta"
            className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor]"
          >
            Porta Sancta
          </Link>

          <div className="flex gap-2 items-center">
            <a
              href="https://wa.me/6285810262017"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 rounded-lg p-2 flex items-center justify-center text-white no-underline transition-all duration-200 w-10 h-10 hover:bg-slate-800 hover:transform-none hover:shadow-none"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://maps.app.goo.gl/2tAcDKkcZNb78u8i6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 rounded-lg p-2 flex items-center justify-center text-white no-underline transition-all duration-200 w-10 h-10 hover:bg-slate-800 hover:transform-none hover:shadow-none"
            >
              <FaMapMarkerAlt size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Action Buttons */}
          <div className="hidden sm:flex gap-2">
            <a
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 rounded-lg p-2 flex items-center justify-center text-white no-underline transition-all duration-200 w-8 h-8 hover:bg-slate-800"
            >
              <FaWhatsapp size={14} />
            </a>
            <a
              href="https://maps.google.com/?q=Santo+Ambrosius+Church"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 rounded-lg p-2 flex items-center justify-center text-white no-underline transition-all duration-200 w-8 h-8 hover:bg-slate-800"
            >
              <FaMapMarkerAlt size={14} />
            </a>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="bg-slate-700 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden animate-[mobileMenuSlideDown_0.3s_ease-out]">
          {/* Tentang Kami Section */}
          <div className="border-b border-slate-200">
            <button
              onClick={toggleMobileTentangKami}
              className="w-full px-4 py-3 text-left text-slate-700 font-medium flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
            >
              Tentang Kami
              {isMobileTentangKamiOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </button>
            {isMobileTentangKamiOpen && (
              <div className="bg-slate-50 animate-[mobileDropdownSlide_0.2s_ease-out]">
                <Link
                  href="/tentang-kami/sejarah-paroki"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Sejarah Paroki
                </Link>
                <Link
                  href="/tentang-kami/visi-misi"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Visi Misi
                </Link>
                <Link
                  href="/tentang-kami/profil-santo-pelindung"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Profil Santo Pelindung
                </Link>
                <Link
                  href="/tentang-kami/peta-wilayah"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Peta Wilayah
                </Link>
                <Link
                  href="/tentang-kami/romo-paroki"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Romo Paroki
                </Link>
              </div>
            )}
          </div>

          {/* Sapta Bidang Section */}
          <div className="border-b border-slate-200">
            <button
              onClick={toggleMobileSaptaBidang}
              className="w-full px-4 py-3 text-left text-slate-700 font-medium flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
            >
              Sapta Bidang
              {isMobileSaptaBidangOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </button>
            {isMobileSaptaBidangOpen && (
              <div className="bg-slate-50 animate-[mobileDropdownSlide_0.2s_ease-out]">
                <Link
                  href="/sapta-bidang/pewartaan"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Pewartaan
                </Link>
                <Link
                  href="/sapta-bidang/pelayanan"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Pelayanan
                </Link>
                <Link
                  href="/sapta-bidang/persekutuan"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Persekutuan
                </Link>
                <Link
                  href="/sapta-bidang/pitk"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  PITK
                </Link>
                <Link
                  href="/sapta-bidang/pemerhati-monitoring"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Pemerhati / Monitoring
                </Link>
                <Link
                  href="/sapta-bidang/peribadatan"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Peribadatan
                </Link>
                <Link
                  href="/sapta-bidang/okk"
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  OKK
                </Link>
              </div>
            )}
          </div>

          {/* Regular Menu Items */}
          <Link
            href="/jadwal"
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline border-b border-slate-200"
          >
            Jadwal
          </Link>
          <Link
            href="/hubungi-kami"
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline border-b border-slate-200"
          >
            Hubungi Kami
          </Link>
          <Link
            href="/porta-sancta"
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline"
          >
            Porta Sancta
          </Link>

          {/* Mobile Action Buttons (only on very small screens) */}
          <div className="sm:hidden flex gap-2 p-4 border-t border-slate-200 bg-slate-50">
            <a
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-slate-800 transition-colors duration-200 no-underline"
            >
              WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Santo+Ambrosius+Church"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-slate-800 transition-colors duration-200 no-underline"
            >
              Maps
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileMenuSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileDropdownSlide {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 300px;
          }
        }
      `}</style>
    </nav>
  )
}
