import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getNewsBySlug,
  formatDate,
  getSaptaBidangColor,
  getSaptaBidangLabel,
} from '@/lib/getNewsData'
import RichTextRenderer from '@/components/RichTextRenderer'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  console.log('Looking for article with slug:', slug)

  // Fetch the article by slug
  const article = await getNewsBySlug(slug)

  console.log('Found article:', article)

  if (!article) {
    console.log('Article not found, showing 404')
    notFound()
  }

  console.log('Article content:', article.content)

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <Link href="/berita" className="hover:text-slate-800 transition-colors">
                    Berita
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="text-slate-800 font-medium truncate">{article.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-slate-600 rounded-full">
                  {getSaptaBidangLabel(article.saptaBidang)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-8">
                <time dateTime={article.publishedDate} className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatDate(article.publishedDate)}
                </time>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tim Bidang {getSaptaBidangLabel(article.saptaBidang)}
                </span>
              </div>

              {/* Featured Image */}
              {article.featuredImage ? (
                <div className="w-full rounded-2xl overflow-hidden mb-8">
                  <img
                    src={article.featuredImage.url}
                    alt={article.title}
                    className="w-full h-auto object-contain"
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
                    <p className="text-sm">Gambar Utama Berita</p>
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
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Bagikan Berita</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Salin Link
                </button>
              </div>
            </div>

            {/* Back to News List */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium no-underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Kembali ke Berita Terkini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
