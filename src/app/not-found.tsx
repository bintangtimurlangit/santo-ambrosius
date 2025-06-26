import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 3%, white 60%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Content Section */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {/* Page Content */}
              <div className="text-center mb-20 pt-16 px-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-8">
                  Halaman Tidak
                  <br />
                  Ditemukan
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
                  Maaf, halaman yang Anda cari masih dalam tahap pengembangan atau belum tersedia.
                </p>
              </div>

              {/* Modern 404 Design */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-block bg-slate-700 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors duration-200"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
