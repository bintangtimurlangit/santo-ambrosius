'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { beritaBidangData } from '@/data/beritaBidang'

interface Article {
  id: number
  title: string
  description: string
  category: string
  date: string
  bidang: string
}

export default function BeritaTerkiniPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage, setArticlesPerPage] = useState(9) // Default for lg screens

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

  // Flatten all articles from all bidang and add bidang field
  const allArticles: Article[] = useMemo(() => {
    const articles: Article[] = []
    Object.entries(beritaBidangData).forEach(([bidangName, bidangArticles]) => {
      bidangArticles.forEach((article) => {
        articles.push({
          ...article,
          bidang: bidangName,
          id: articles.length + 1, // Ensure unique IDs
        })
      })
    })

    // Duplicate articles to have more content for pagination demo
    const duplicatedArticles: Article[] = []
    for (let i = 0; i < 3; i++) {
      articles.forEach((article, index) => {
        duplicatedArticles.push({
          ...article,
          id: duplicatedArticles.length + 1,
          date: getDeterministicDate(duplicatedArticles.length),
        })
      })
    }

    // Sort by date (newest first)
    return duplicatedArticles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }, [])

  // Get deterministic date based on article index for SSR consistency
  function getDeterministicDate(index: number) {
    const baseDate = new Date('2025-01-01')
    // Create deterministic but varied dates by adding different days based on index
    const daysToAdd = (index * 7) % 90 // Vary within ~3 months
    baseDate.setDate(baseDate.getDate() + daysToAdd)
    return baseDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allArticles.forEach((article) => cats.add(article.category))
    return ['Semua', ...Array.from(cats).sort()]
  }, [allArticles])

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.bidang.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [allArticles, searchTerm, selectedCategory])

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)

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
                        Kategori
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

                  {/* Results Info */}
                  <div className="mt-6 text-sm text-slate-600">
                    Menampilkan {currentArticles.length} dari {filteredArticles.length} berita
                    {searchTerm && <span> untuk pencarian &ldquo;{searchTerm}&rdquo;</span>}
                    {selectedCategory !== 'Semua' && (
                      <span> dalam kategori &ldquo;{selectedCategory}&rdquo;</span>
                    )}
                  </div>
                </div>

                {/* Articles Grid */}
                {currentArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentArticles.map((article) => (
                      <div
                        key={article.id}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Placeholder Image */}
                        <div className="w-full h-48 bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center">
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

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-sky-200 rounded-full">
                              {article.category}
                            </span>
                            <span className="text-xs text-gray-500">{article.date}</span>
                          </div>

                          <div className="mb-2">
                            <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-slate-600 rounded">
                              {article.bidang}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                            {article.description}
                          </p>

                          <Link
                            href={`/berita/${article.id}`}
                            className="text-sm font-medium text-slate-700 hover:text-slate-800 transition-colors duration-200 flex items-center gap-1 no-underline"
                          >
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
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
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
                    <h3 className="text-lg font-medium text-slate-700 mb-2">
                      Tidak ada berita ditemukan
                    </h3>
                    <p className="text-slate-500">
                      Coba ubah kata kunci pencarian atau filter kategori
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                    {/* Mobile: Simple Previous/Next with page info */}
                    <div className="flex sm:hidden items-center gap-4">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        ← Sebelumnya
                      </button>

                      <span className="text-sm text-slate-600 font-medium">
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Selanjutnya →
                      </button>
                    </div>

                    {/* Desktop: Full pagination */}
                    <div className="hidden sm:flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Sebelumnya
                      </button>

                      <div className="flex gap-1">
                        {(() => {
                          const pages = []
                          const maxVisiblePages = 7

                          if (totalPages <= maxVisiblePages) {
                            // Show all pages if total is small
                            for (let i = 1; i <= totalPages; i++) {
                              pages.push(i)
                            }
                          } else {
                            // Show smart pagination with ellipsis
                            if (currentPage <= 3) {
                              // Near the beginning
                              pages.push(1, 2, 3, 4, '...', totalPages)
                            } else if (currentPage >= totalPages - 2) {
                              // Near the end
                              pages.push(
                                1,
                                '...',
                                totalPages - 3,
                                totalPages - 2,
                                totalPages - 1,
                                totalPages,
                              )
                            } else {
                              // In the middle
                              pages.push(
                                1,
                                '...',
                                currentPage - 1,
                                currentPage,
                                currentPage + 1,
                                '...',
                                totalPages,
                              )
                            }
                          }

                          return pages.map((page, index) =>
                            page === '...' ? (
                              <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">
                                ...
                              </span>
                            ) : (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page as number)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  currentPage === page
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                {page}
                              </button>
                            ),
                          )
                        })()}
                      </div>

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
