'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  type BeritaArticle,
  getBeritaData,
  getSaptaBidangLabel,
  getSaptaBidangColor,
  formatDate,
} from '@/lib/getBeritaData'

interface ArtikelBidangProps {
  bidangName: string
}

const ArtikelBidang: React.FC<ArtikelBidangProps> = ({ bidangName }) => {
  const [articles, setArticles] = useState<BeritaArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Map bidang name to sapta bidang value
        const bidangMap: Record<string, string> = {
          Pewartaan: 'pewartaan',
          Pelayanan: 'pelayanan',
          Persekutuan: 'persekutuan',
          Peribadatan: 'peribadatan',
          Pemerhati: 'pemerhati',
          PITK: 'pitk',
          OKK: 'okk',
        }

        const saptaBidang = bidangMap[bidangName]
        if (!saptaBidang) {
          setLoading(false)
          return
        }

        const data = await getBeritaData({
          status: 'published',
          saptaBidang,
          limit: 6,
        })
        setArticles(data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [bidangName])

  // If no articles, don't render anything
  if (loading || articles.length === 0) {
    return null
  }

  return (
    <div className="max-w-5xl mx-auto mt-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-6">
          Artikel Bidang {bidangName}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-4xl mx-auto">
          Ikuti kegiatan dan program terbaru dari Tim Bidang {bidangName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link key={article.id} href={`/artikel/${article.slug}`} className="group">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Article Image */}
              {article.featuredImage ? (
                <div className="w-full h-48 overflow-hidden relative">
                  <Image
                    src={article.featuredImage.url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200"
        >
          Lihat Semua Artikel {bidangName}
        </Link>
      </div>
    </div>
  )
}

export default ArtikelBidang
