import BeritaBidang from '@/components/BeritaBidang'

export default function PemerhatiPage() {
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
                  Bidang Pemerhati
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Tim Bidang Pemerhati adalah persekutuan orang-orang sebagai sebuah teamwork yang
                  melakukan fungsi perencanaan, pelaksanaan dan monitoring atas semua tata kelola
                  pelayanan di Paroki Villa Melati Mas.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim Bidang Pemerhati adalah persekutuan orang-orang sebagai sebuah teamwork
                      yang melakukan fungsi perencanaan, pelaksanaan dan monitoring atas semua tata
                      kelola pelayanan di Paroki Villa Melati Mas serta melakukan fungsi
                      pemeliharaan atas semua harta benda dan aset Gereja.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Tim Sub Bidang Pemerhati
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          1
                        </span>
                        <div className="text-slate-700 leading-relaxed">
                          <p className="font-semibold mb-2">Tim Bidang Pemerhati Karyawan</p>
                          <p>
                            Membuat pedoman yang menjelaskan tugas, tanggung jawab, kebijakan dan
                            prosedur tata kelola pelayanan, termasuk pelaksanaan internal audit,
                            monitoring dan evaluasi karyawan demi meningkatkan pelayanan pastoral
                            yang lebih baik.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          2
                        </span>
                        <div className="text-slate-700 leading-relaxed">
                          <p className="font-semibold mb-2">Tim Bidang Pemerhati Pastoran</p>
                          <p>
                            Bertanggung jawab memperhatikan dan mengusahakan semua keperluan di
                            rumah tangga pastoran.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          3
                        </span>
                        <div className="text-slate-700 leading-relaxed">
                          <p className="font-semibold mb-2">
                            Tim Bidang Pemeliharaan Bangunan dan Aset Gereja
                          </p>
                          <p>
                            Bertanggung jawab melakukan perencanaan pembangunan, pendataan dan
                            perawatan atas semua aset atau harta benda milik Gereja termasuk
                            perbaikan atau renovasi bangunan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Section for Bidang Pemerhati */}
              <BeritaBidang bidangName="Pemerhati" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
