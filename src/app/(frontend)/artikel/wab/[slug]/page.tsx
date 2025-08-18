import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWABBySlug } from '@/lib/getWABData'
import FlipbookViewer from '@/components/FlipbookViewer'
import Link from 'next/link'
import { FaChevronLeft, FaCalendarAlt, FaFilePdf } from 'react-icons/fa'
import { formatDate } from '@/lib/getWABData'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const article = await getWABBySlug(slug)

  if (!article) {
    return {
      title: 'WAB Tidak Ditemukan',
      description: 'WAB yang Anda cari tidak ditemukan.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = article.title
  const description = article.description
  const publishedDate = new Date(article.publishedDate).toISOString()

  return {
    title,
    description,
    keywords: ['wab', 'warta ambrosius bulanan', 'santo ambrosius', 'gereja katolik'],
    authors: [{ name: 'Tim Redaksi Santo Ambrosius' }],
    openGraph: {
      title,
      description,
      url: `/artikel/wab/${slug}`,
      type: 'article',
      publishedTime: publishedDate as string,
      authors: ['Tim Redaksi Santo Ambrosius'],
      images: article.coverImage
        ? [
            {
              url: article.coverImage.url,
              width: article.coverImage.width,
              height: article.coverImage.height,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: article.coverImage ? [article.coverImage.url] : undefined,
    },
    alternates: {
      canonical: `/artikel/wab/${slug}`,
    },
  }
}

export default async function WABDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  const article = await getWABBySlug(slug)

  if (!article) {
    notFound()
  }

  if (!article.pdfFile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-2 rounded-b-2xl shadow-sm bg-white">
          <div className="py-16 md:py-20 lg:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">PDF Tidak Tersedia</h1>
                <p className="text-slate-600 mb-8">Maaf, file PDF untuk WAB ini belum tersedia.</p>
                <Link
                  href="/artikel"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                >
                  <FaChevronLeft className="w-4 h-4" />
                  Kembali ke Artikel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Integrated Header with PDF Viewer */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 3%, white 20%, rgb(249 250 251) 100%)',
        }}
      >
        <div className="py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"
              >
                <FaChevronLeft className="w-4 h-4" />
                Kembali ke Artikel
              </Link>
            </nav>

            {/* Article Info */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
                <FaFilePdf className="w-4 h-4" />
                Warta Ambrosius Bulanan
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-4">
                {article.title}
              </h1>

              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">{article.description}</p>

              <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-8">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  {formatDate(article.publishedDate)}
                </div>
                <span>•</span>
                <span>Edisi {article.edition}</span>
                <span>•</span>
                <span>No. {article.issueNumber}</span>
              </div>
            </div>

            {/* Integrated Flipbook Viewer */}
            <div className="pb-16">
              <FlipbookViewer
                pdfUrl={article.pdfFile.url}
                title={article.title}
                className="w-full shadow-none border-0"
                showHeader={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
