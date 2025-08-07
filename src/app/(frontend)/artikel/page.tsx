'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  type ArtikelArticle,
  getArtikelData,
  getSaptaBidangLabel,
  getSaptaBidangColor,
  formatDate,
} from '@/lib/getArtikelData'

export default function ArtikelTerkiniPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage, setArticlesPerPage] = useState(9) // Default for lg screens
  const [allArticles, setAllArticles] = useState<ArtikelArticle[]>([])
  const [loading, setLoading] = useState(true)

  // Update articles per page based on screen size
  React.useEffect(() => {
    const updateArticlesPerPage = () => {
      if (window.innerWidth >= 1024) {
        // lg and above: 3 columns, so 9 articles (3 rows × 3)
        setArticlesPerPage(9)
      } else if (window.innerWidth >= 768) {
        // md: 2 columns, so 10 articles (5 rows × 2)
        setArticlesPerPage(10)
      } else {
        // sm and below: 1 column, so 8 articles for better mobile experience
        setArticlesPerPage(8)
      }
    }

    // Set initial value
    updateArticlesPerPage()

    // Add event listener for window resize
    window.addEventListener('resize', updateArticlesPerPage)

    // Cleanup
    return () => window.removeEventListener('resize', updateArticlesPerPage)
  }, [])

  // Get all available Sapta Bidang categories
  const categories = useMemo(() => {
    const allSaptaBidang = [
      'pewartaan',
      'pelayanan',
      'persekutuan',
      'peribadatan',
      'pemerhati',
      'pitk',
      'okk',
    ]

    return ['Semua', ...allSaptaBidang.map((cat) => getSaptaBidangLabel(cat))]
  }, [])

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getSaptaBidangLabel(article.saptaBidang).toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'Semua' ||
        getSaptaBidangLabel(article.saptaBidang) === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [allArticles, searchTerm, selectedCategory])

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArtikelData({ status: 'published' })
        setAllArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Reset to page 1 when search, filter, or articles per page changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, articlesPerPage])

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 3%, white 20%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Content Section */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {/* Page Introduction */}
              <div className="text-center mb-20 pt-16 px-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-8">
                  Berita Terkini
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Ikuti perkembangan terbaru dan kegiatan-kegiatan dari seluruh bidang di Gereja
                  Santo Ambrosius
                </p>
              </div>

              {/* Search and Filter Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Search Bar */}
                    <div className="flex-1">
                      <label
                        htmlFor="search"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Cari Berita
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="search"
                          placeholder="Cari berdasarkan judul, deskripsi, atau bidang..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                        />
                        <svg
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="lg:w-64">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Sapta Bidang
                      </label>
                      <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {loading ? (
                // Loading State
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-600">Memuat artikel...</p>
                </div>
              ) : allArticles.length === 0 ? (
                // Empty State - No articles at all
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 012-2h2M9 7v4a2 2 0 002 2h2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">Belum Ada Artikel</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Saat ini belum ada artikel yang tersedia. Silakan kembali lagi nanti untuk
                    membaca artikel terbaru dari paroki.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200"
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              ) : filteredArticles.length === 0 ? (
                // Empty State - No articles for selected category/search
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">
                    Tidak Ada Artikel Ditemukan
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {selectedCategory !== 'Semua'
                      ? `Belum ada artikel untuk bidang "${selectedCategory}". Silakan coba bidang lain atau hapus filter.`
                      : searchTerm
                        ? `Tidak ada artikel yang cocok dengan pencarian "${searchTerm}". Silakan coba kata kunci lain.`
                        : 'Tidak ada artikel yang sesuai dengan filter yang dipilih.'}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('Semua')
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200"
                    >
                      Hapus Filter
                    </button>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="text-center mb-8">
                    <p className="text-slate-600">
                      Menampilkan {filteredArticles.length} dari {allArticles.length} artikel
                    </p>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/artikel/${article.slug}`}
                        className="group h-full"
                      >
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                          {/* Article Image */}
                          {article.featuredImage ? (
                            <div className="w-full h-48 overflow-hidden flex-shrink-0">
                              <img
                                src={article.featuredImage.url}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                              <div className="text-center text-gray-400">
                                <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <p className="text-xs">Gambar Artikel</p>
                              </div>
                            </div>
                          )}

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <div className="mb-3">
                              <span
                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getSaptaBidangColor(article.saptaBidang)}`}
                              >
                                {getSaptaBidangLabel(article.saptaBidang)}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-slate-600 transition-colors">
                              {article.title}
                            </h3>

                            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                              {article.description}
                            </p>

                            <div className="mt-auto">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                <span>{formatDate(article.publishedDate)}</span>
                                <span>{article.readingTime} menit baca</span>
                              </div>

                              <div className="text-sm font-medium text-slate-700 group-hover:text-slate-800 transition-colors duration-200 flex items-center gap-1">
                                Baca selengkapnya
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Sebelumnya
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg ${
                              currentPage === page
                                ? 'bg-slate-700 text-white'
                                : 'text-slate-500 bg-white border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Selanjutnya
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
