import ArtikelBidang from '@/components/ArtikelBidang'
import PelayananOrganizationalChart from '@/components/organizational-chart/pelayanan'

export default function PelayananPage() {
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
                  Bidang Pelayanan
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Tim Bidang Pelayanan Paroki merupakan persekutuan orang-orang sebagai sebuah
                  teamwork yang bertugas mempersiapkan, menyelenggarakan dan mengevaluasi
                  kegiatan-kegiatan pelayanan.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim Bidang Pelayanan Paroki merupakan persekutuan orang-orang sebagai sebuah
                      teamwork yang bertugas mempersiapkan, menyelenggarakan dan mengevaluasi
                      kegiatan-kegiatan pelayanan baik di dalam Paroki maupun di lingkup masyarakat
                      sekitar Paroki.
                    </p>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim Bidang Pelayanan bertanggung jawab atas koordinasi kegiatan-kegiatan yang
                      bertujuan untuk memberikan pertolongan atau bantuan kepada umat dan masyarakat
                      sekitar paroki yang membutuhkan.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Sinergi dan Kerjasama
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Dalam karya pelayanan yang dilakukan, Tim Bidang Pelayanan selalu bersinergi
                      dengan bidang lainnya, seperti Tim Bidang Hubungan Antar Agama dan
                      Kepercayaan, Tim Bidang Komunikasi Sosial dll. Pertemuan secara berkala, baik
                      internal antar Tim dan Sub Tim Bidang Pelayanan maupun bersinergi dengan
                      bidang lain dilakukan untuk menyusun rangkaian rencana dan anggaran kegiatan
                      serta mengusulkannya ke dalam rapat koordinasi dengan Dewan Paroki Harian.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Pembekalan dan Semangat Pelayanan
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Pembekalan iman dan semangat pelayanan dilakukan kepada para pegiat Bidang
                      Pelayanan, agar semua yang terlibat memiliki semangat kepedulian kepada
                      sesama, belarasa, ketulusan dan kerendahan hati dalam melayani sesama.
                    </p>
                  </div>
                </div>
              </div>

              {/* Organizational Structure Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16">
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight">
                      Struktur Organisasi Bidang Pelayanan
                    </h2>
                    <p className="text-slate-600 mt-2 text-lg">Periode 2024-2027</p>
                    <div className="mt-4 mb-8 flex justify-center">
                      <span className="h-1 w-20 md:w-24 bg-sky-100 rounded-full"></span>
                    </div>
                  </div>

                  <PelayananOrganizationalChart />
                </div>
              </div>

              {/* Artikel Section for Bidang Pelayanan */}
              <ArtikelBidang bidangName="Pelayanan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
