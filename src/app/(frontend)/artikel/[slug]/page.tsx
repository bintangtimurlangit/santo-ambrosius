import React from 'react'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebook,
  FaWhatsapp,
  FaLink,
  FaChevronLeft,
  FaCalendarAlt,
  FaUser,
} from 'react-icons/fa'
import {
  type BeritaArticle,
  getBeritaBySlug,
  formatDate,
  getSaptaBidangColor,
  getSaptaBidangLabel,
} from '@/lib/getBeritaData'
import {
  type RenunganArticle,
  getRenunganBySlug,
  formatDate as formatDateRenungan,
} from '@/lib/getRenunganData'
import RichTextRenderer from '@/components/RichTextRenderer'

// Union type for articles that can be displayed on this page
type Article = BeritaArticle | RenunganArticle

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Check if we're in draft mode for live preview
  const { isEnabled: isDraftMode } = await draftMode()

  console.log('Looking for article with slug:', slug, 'Draft mode:', isDraftMode)

  // Try to fetch from both Berita and Renungan collections
  let article: Article | null = null
  let articleType: 'berita' | 'renungan' | null = null

  // First try Berita collection
  try {
    article = await getBeritaBySlug(slug, isDraftMode)
    if (article) {
      articleType = 'berita'
      console.log('Found berita article:', article)
    }
  } catch (error) {
    console.log('Error fetching from berita collection:', error)
  }

  // If not found in Berita, try Renungan collection
  if (!article) {
    try {
      article = await getRenunganBySlug(slug, isDraftMode)
      if (article) {
        articleType = 'renungan'
        console.log('Found renungan article:', article)
      }
    } catch (error) {
      console.log('Error fetching from renungan collection:', error)
    }
  }

  if (!article) {
    console.log('Article not found in any collection, showing 404')
    notFound()
  }

  console.log('Article content:', article.content)
  console.log('Article type:', articleType)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Draft Mode Indicator */}
      {isDraftMode && (
        <div className="bg-yellow-400 text-yellow-900 text-center py-2 px-4 font-medium">
          🚧 DRAFT MODE - This is a preview of unpublished content
        </div>
      )}
      {/* Hero Section */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 3%, white 20%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Content Section */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-slate-600">
                <li>
                  <Link href="/" className="hover:text-slate-800 transition-colors">
                    Beranda
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li>
                  <Link href="/artikel" className="hover:text-slate-800 transition-colors">
                    Artikel
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="text-slate-800 font-medium truncate">{article.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-3 mb-4">
                {/* Show Sapta Bidang badge only for Berita articles */}
                {articleType === 'berita' && 'saptaBidang' in article && (
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getSaptaBidangColor(article.saptaBidang)}`}
                  >
                    {getSaptaBidangLabel(article.saptaBidang)}
                  </span>
                )}
                {/* Show category badge for Renungan articles */}
                {articleType === 'renungan' && (
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-200 text-slate-700">
                    Renungan
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-8">
                <time dateTime={article.publishedDate} className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  {articleType === 'berita'
                    ? formatDate(article.publishedDate)
                    : formatDateRenungan(article.publishedDate)}
                </time>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  {articleType === 'berita' && 'saptaBidang' in article
                    ? `Tim Bidang ${getSaptaBidangLabel(article.saptaBidang)}`
                    : article.author || 'Tim Redaksi'}
                </span>
              </div>

              {/* Featured Image */}
              {article.featuredImage ? (
                <div className="w-full rounded-2xl overflow-hidden mb-8 relative">
                  <Image
                    src={article.featuredImage.url}
                    alt={article.title}
                    width={article.featuredImage.width}
                    height={article.featuredImage.height}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-sky-100 to-slate-200 rounded-2xl flex items-center justify-center mb-8">
                  <div className="text-center text-gray-400">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      {articleType === 'berita' ? 'Gambar Utama Berita' : 'Gambar Utama Artikel'}
                    </p>
                  </div>
                </div>
              )}
            </header>

            {/* Article Content */}
            <article className="prose prose-lg prose-slate max-w-none mb-16">
              <RichTextRenderer content={article.content} />
            </article>

            {/* Share Section */}
            <div className="border-t border-slate-200 pt-8 mb-16">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {articleType === 'berita' ? 'Bagikan Berita' : 'Bagikan Artikel'}
              </h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <FaFacebook className="w-4 h-4" />
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                  <FaLink className="w-4 h-4" />
                  Salin Link
                </button>
              </div>
            </div>

            {/* Back to Artikel List */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium no-underline"
              >
                <FaChevronLeft className="w-4 h-4" />
                Kembali ke Artikel Terkini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
