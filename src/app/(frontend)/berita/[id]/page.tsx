'use client'

import React from 'react'
import Link from 'next/link'
import { beritaBidangData } from '@/data/beritaBidang'
import { notFound } from 'next/navigation'
import {
  FaFacebook,
  FaWhatsapp,
  FaLink,
  FaCalendarAlt,
  FaBuilding,
  FaChevronLeft,
} from 'react-icons/fa'

interface Article {
  id: number
  title: string
  description: string
  category: string
  date: string
  bidang: string
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

// Generate all articles with deterministic dates and IDs
function getAllArticles(): Article[] {
  const articles: Article[] = []
  Object.entries(beritaBidangData).forEach(([bidangName, bidangArticles]) => {
    bidangArticles.forEach((article) => {
      articles.push({
        ...article,
        bidang: bidangName,
        id: articles.length + 1,
      })
    })
  })

  // Duplicate articles 3 times for demo
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

  return duplicatedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Helper to get deterministic date for SSR consistency
function getDeterministicDate(index: number) {
  const baseDate = new Date('2025-01-01')
  const daysToAdd = (index * 7) % 90 // Vary within ~3 months
  baseDate.setDate(baseDate.getDate() + daysToAdd)
  return baseDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Generate expanded content for the article
function generateExpandedContent(article: Article): string {
  const introductions = {
    Pewartaan:
      'Dalam rangka memperkuat iman dan memperdalam pengetahuan spiritual, Tim Bidang Pewartaan menghadirkan',
    Pelayanan: 'Sebagai wujud kepedulian kepada sesama, Tim Bidang Pelayanan menyelenggarakan',
    Persekutuan: 'Untuk mempererat tali persaudaraan antar umat, Tim Bidang Persekutuan mengundang',
    Peribadatan:
      'Dalam upaya meningkatkan kualitas pelayanan liturgi, Tim Bidang Peribadatan mengadakan',
    Pemerhati: 'Sebagai bagian dari tata kelola yang baik, Tim Bidang Pemerhati melaksanakan',
    PITK: 'Dalam rangka pengembangan sumber daya manusia, Tim Bidang PITK menyelenggarakan',
    OKK: 'Untuk meningkatkan efisiensi organisasi, Tim Bidang OKK mengadakan',
  }

  const details = {
    Katekisasi:
      'Program ini dirancang khusus untuk memperdalam pemahaman ajaran Katolik dan mempersiapkan umat untuk menjalani hidup beriman yang lebih bermakna.',
    Retret:
      'Kegiatan ini bertujuan untuk memberikan kesempatan kepada peserta merenungkan panggilan hidup dan memperkuat hubungan dengan Tuhan.',
    'Bina Iman':
      'Melalui diskusi kelompok dan sharing pengalaman, peserta akan diajak untuk memahami tantangan hidup beriman di era modern.',
    Pelatihan:
      'Materi pelatihan disusun secara komprehensif dengan melibatkan narasumber yang berpengalaman di bidangnya.',
    'Bakti Sosial':
      'Kegiatan ini merupakan implementasi nyata dari ajaran Kristus untuk melayani sesama, terutama mereka yang membutuhkan.',
    Gathering:
      'Acara ini diharapkan dapat mempererat hubungan antar keluarga dan menciptakan suasana persekutuan yang hangat.',
    Default:
      'Kegiatan ini merupakan bagian dari program rutin yang bertujuan untuk meningkatkan kualitas hidup menggereja di paroki.',
  }

  const intro =
    introductions[article.bidang as keyof typeof introductions] || introductions.Pewartaan
  const detail = details[article.category as keyof typeof details] || details.Default

  return `${intro} program ${article.category.toLowerCase()} yang akan dilaksanakan dalam waktu dekat. ${detail}

Kegiatan ini terbuka untuk seluruh umat paroki tanpa terbatas usia maupun latar belakang. Para peserta akan mendapatkan kesempatan untuk belajar, berbagi pengalaman, dan membangun komunitas iman yang lebih kuat bersama-sama.

Tim penyelenggara telah mempersiapkan segala sesuatunya dengan matang, mulai dari materi yang akan disampaikan, fasilitas pendukung, hingga konsumsi untuk para peserta. Diharapkan kegiatan ini dapat memberikan manfaat yang nyata bagi perkembangan spiritual dan sosial seluruh peserta.

Selain itu, kegiatan ini juga menjadi wadah untuk mempererat tali silaturahmi antar umat, membangun jejaring yang positif, dan menciptakan lingkungan paroki yang semakin harmonis dan penuh kasih.

Para peserta juga akan mendapatkan sertifikat keikutsertaan sebagai bentuk apresiasi atas partisipasi aktif dalam kegiatan ini. Sertifikat tersebut dapat menjadi bukti komitmen dalam mengembangkan diri dan berkontribusi bagi kemajuan paroki.

Bagi yang berminat untuk mengikuti kegiatan ini, diharapkan untuk mendaftar melalui sekretariat paroki atau menghubungi koordinator Tim Bidang ${article.bidang}. Informasi lebih lanjut dapat diperoleh melalui pengumuman resmi di gereja atau melalui grup WhatsApp lingkungan masing-masing.

Mari bersama-sama membangun komunitas iman yang kuat dan saling mendukung dalam perjalanan spiritual kita menuju Tuhan Yang Maha Esa.`
}

export default function BeritaDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  const articleId = parseInt(resolvedParams.id)
  const allArticles = getAllArticles()
  const article = allArticles.find((a) => a.id === articleId)

  if (!article) {
    notFound()
  }

  const expandedContent = generateExpandedContent(article)
  const relatedArticles = allArticles
    .filter((a) => a.bidang === article.bidang && a.id !== article.id)
    .slice(0, 3)

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
                    Berita Terkini
                  </Link>
                </li>
                <li className="text-slate-400">/</li>
                <li className="text-slate-800 font-medium truncate">{article.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-sky-200 rounded-full">
                  {article.category}
                </span>
                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-slate-600 rounded-full">
                  {article.bidang}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-8">
                <time dateTime={article.date} className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  {article.date}
                </time>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-2">
                  <FaBuilding className="w-4 h-4" />
                  Tim Bidang {article.bidang}
                </span>
              </div>

              {/* Featured Image Placeholder */}
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
            </header>

            {/* Article Content */}
            <article className="prose prose-lg prose-slate max-w-none mb-16">
              {expandedContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Share Section */}
            <div className="border-t border-slate-200 pt-8 mb-16">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Bagikan Berita</h3>
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

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-slate-800 mb-8">
                  Berita Terkait dari Bidang {article.bidang}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-1">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle.id} className="h-full">
                      <Link
                        href={`/berita/${relatedArticle.id}`}
                        className="group no-underline block h-full"
                      >
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                          <div className="w-full h-32 bg-gradient-to-br from-sky-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                            <div className="text-center text-gray-400">
                              <div className="w-8 h-8 mx-auto mb-1 bg-gray-300 rounded flex items-center justify-center">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col min-h-0">
                            <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                              <span className="inline-block px-2 py-1 text-xs font-medium text-slate-700 bg-sky-200 rounded-full">
                                {relatedArticle.category}
                              </span>
                              <span className="text-xs text-gray-500">{relatedArticle.date}</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors line-clamp-2 mb-2 flex-shrink-0">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2 flex-1">
                              {relatedArticle.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Back to News List */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium no-underline"
              >
                <FaChevronLeft className="w-4 h-4" />
                Kembali ke Berita Terkini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
