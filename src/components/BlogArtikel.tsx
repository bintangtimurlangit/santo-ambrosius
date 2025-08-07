'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  type NewsArticle,
  getNewsData,
  getSaptaBidangLabel,
  getSaptaBidangColor,
  formatDate,
} from '@/lib/getNewsData'

const BlogArtikel = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const data = await getNewsData({
          limit: 8,
          status: 'published',
          featured: true,
        })
        setArticles(data)
      } catch (error) {
        console.error('Error fetching featured articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedArticles()
  }, [])

  return (
    <section className="bg-white py-20 px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-6">
            Blog Artikel
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-4xl mx-auto">
            Baca artikel terbaru disini!
          </p>
        </div>

        {loading ? (
          // Loading State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
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
            <p className="text-gray-600">Memuat artikel unggulan...</p>
          </div>
        ) : articles.length === 0 ? (
          // Empty State
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
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              Belum Ada Artikel Unggulan
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Saat ini belum ada artikel unggulan yang tersedia. Silakan kembali lagi nanti untuk
              membaca artikel terbaru dari paroki.
            </p>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200"
            >
              Lihat Semua Artikel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/berita/${article.slug}`} className="group">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Article Image */}
                  {article.featuredImage ? (
                    <div className="w-full h-48 overflow-hidden relative">
                      <Image
                        src={article.featuredImage.url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
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
                  )}

                  {/* Content */}
                  <div className="p-6">
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

                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {article.description}
                    </p>

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
              </Link>
            ))}
          </div>
        )}

        {/* View All Button - only show if there are articles */}
        {articles.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/berita">
              <button className="px-8 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200">
                Lihat Semua Artikel
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogArtikel
