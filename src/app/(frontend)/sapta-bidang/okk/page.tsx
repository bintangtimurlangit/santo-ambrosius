export default function OkkPage() {
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
                  Organisasi Kesekretariatan
                  <br />
                  dan Keuangan
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Tim Bidang OKK bertanggung jawab dalam tata kelola administrasi, pengelolaan
                  keuangan Paroki dan tata kelola kekaryawanan.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim Bidang Organisasi Kesekretariatan dan Keuangan (OKK) Paroki Villa Melati
                      Mas bertanggung jawab dalam tata kelola administrasi, pengelolaan keuangan
                      Paroki dan tata kelola kekaryawanan, di bawah koordinasi Sekretaris dan
                      Bendahara Paroki, berdasarkan Pedoman Rumah Tangga & Tata Kelola Pelayanan
                      Paroki Villa Melati Mas-Gereja St. Ambrosius.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Maksud dan Tugas Tim Bidang OKK
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          1
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          Menciptakan tertib administrasi dan keuangan, baik perencanaan, persiapan,
                          pelaksanaan, pertanggungjawaban di lingkungan maupun Paroki.
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          2
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          Mengarsipkan seluruh dokumen sebagai bagian dari sejarah Paroki.
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          3
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          Mengarahkan agar kegiatan yang dilakukan dapat berjalan secara sinergis
                          antara Lingkungan, Tim, Sub Tim Bidang dan Dewan Paroki/PGDP.
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          4
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          Mengarahkan supaya kegiatan yang dilakukan sejalan dengan pencapaian Visi
                          Paroki (dengan tetap mengindahkan maksud dan tujuan pendirian Badan Gereja
                          dan peraturan-peraturan Anggaran Dasar dan Anggaran Rumah Tangga).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
