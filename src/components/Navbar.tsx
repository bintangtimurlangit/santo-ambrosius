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
    // Throttle updates with rAF and avoid state churn if value doesn't change
    let rafId = 0
    const threshold = 100
    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        const next = window.scrollY > threshold
        setIsFloating((prev) => (prev === next ? prev : next))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileTentangKamiOpen(false)
    setIsMobileSaptaBidangOpen(false)
  }

  return (
    <nav
      className={`
        bg-sky-200 p-4 pr-4 md:pr-12 pl-4 mx-2 mt-2 sticky top-2 z-50
        ${isFloating ? 'rounded-2xl -translate-y-0 shadow-lg top-2 m-2' : 'rounded-t-2xl translate-y-0 border-b border-sky-300'}
        transition-[border-radius,transform,box-shadow] duration-200 ease-out motion-reduce:transition-none
        will-change-[transform,border-radius]
      `}
    >
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/" className="no-underline block">
            <Image
              src="/logo.png"
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
          <Link
            href="/artikel"
            className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor]"
          >
            Artikel Terkini
          </Link>
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Invisible bridge for smooth hover */}
            <div className="absolute top-full left-0 right-0 h-1 bg-transparent z-50"></div>

            <span className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor] cursor-pointer">
              Tentang Kami
            </span>
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

            <span className="no-underline text-black font-light text-base transition-all duration-200 hover:drop-shadow-[0.5px_0_0_currentColor] cursor-pointer">
              Sapta Bidang
            </span>
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
                  href="/sapta-bidang/pemerhati"
                  className="block py-3.5 px-6 no-underline text-slate-700 text-sm font-normal transition-all duration-200 border-b border-slate-700/5 leading-tight hover:bg-slate-700/8 hover:text-slate-700 hover:pl-7 last:border-b-0"
                >
                  Pemerhati
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
          <Link
            href="/artikel"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline border-b border-slate-200"
          >
            Artikel Terkini
          </Link>
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
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Sejarah Paroki
                </Link>
                <Link
                  href="/tentang-kami/visi-misi"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Visi Misi
                </Link>
                <Link
                  href="/tentang-kami/profil-santo-pelindung"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Profil Santo Pelindung
                </Link>
                <Link
                  href="/tentang-kami/peta-wilayah"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Peta Wilayah
                </Link>
                <Link
                  href="/tentang-kami/romo-paroki"
                  onClick={closeMobileMenu}
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
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Pewartaan
                </Link>
                <Link
                  href="/sapta-bidang/pelayanan"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Pelayanan
                </Link>
                <Link
                  href="/sapta-bidang/persekutuan"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Persekutuan
                </Link>
                <Link
                  href="/sapta-bidang/pitk"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  PITK
                </Link>
                <Link
                  href="/sapta-bidang/pemerhati-monitoring"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Pemerhati / Monitoring
                </Link>
                <Link
                  href="/sapta-bidang/peribadatan"
                  onClick={closeMobileMenu}
                  className="block px-8 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-200 no-underline"
                >
                  Peribadatan
                </Link>
                <Link
                  href="/sapta-bidang/okk"
                  onClick={closeMobileMenu}
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
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline border-b border-slate-200"
          >
            Jadwal
          </Link>
          <Link
            href="/hubungi-kami"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline border-b border-slate-200"
          >
            Hubungi Kami
          </Link>
          <Link
            href="/porta-sancta"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-200 no-underline"
          >
            Porta Sancta
          </Link>

          {/* Mobile Action Buttons (only on very small screens) */}
          <div className="flex gap-2 p-4 border-t border-slate-200 bg-slate-50">
            <a
              href="https://wa.me/6285810262017"
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
