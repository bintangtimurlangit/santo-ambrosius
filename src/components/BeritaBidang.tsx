import React from 'react'

interface Article {
  id: number
  title: string
  description: string
  category: string
  date: string
}

interface BeritaBidangProps {
  bidangName: string
  articles: Article[]
}

const BeritaBidang: React.FC<BeritaBidangProps> = ({ bidangName, articles }) => {
  return (
    <div className="max-w-5xl mx-auto mt-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-4xl font-semibold tracking-tight text-slate-700 mb-6">
          Berita Bidang {bidangName}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-4xl mx-auto">
          Ikuti kegiatan dan program terbaru dari Tim Bidang {bidangName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
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

              <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>

              <button className="text-sm font-medium text-slate-700 hover:text-slate-800 transition-colors duration-200 flex items-center gap-1">
                Baca selengkapnya
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200">
          Lihat Semua Berita {bidangName}
        </button>
      </div>
    </div>
  )
}

export default BeritaBidang
