import ArtikelBidang from '@/components/ArtikelBidang'
import PeribadatanOrganizationalChart from '@/components/organizational-chart/peribadatan'

export default function PeribadatanPage() {
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
                  Bidang Peribadatan
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Tim Bidang Peribadatan adalah persekutuan orang-orang sebagai sebuah teamwork yang
                  memiliki tugas dan tanggungjawab untuk menyelenggarakan liturgi Gereja.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Dimulai dari persiapan, pelaksanaan hingga evaluasi perayaan liturgi, meliputi
                      liturgi rutin (misa harian, mingguan dan tahunan) dan liturgi khusus (Sakramen
                      Perkawinan, Perayaan Pesta Nama Pelindung Gereja dan perayaan khusus lainnya).
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Pengembangan Pelayan Pastoral
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Sebagai sebuah teamwork, Tim Bidang Peribadatan perlu melakukan mengembangkan
                      iman dan kemampuan para pelayan pastoral, melalui retret, rekoleksi dan
                      pengembangan softskill sesuai fungsi dan tugasnya, sehingga pelayanan yang
                      dilakukan kepada umat semakin baik dengan semangat ketulusan dan kerendahan
                      hati.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Koordinasi dan Sinergi
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim Bidang Peribadatan melakukan rapat koordinasi bersama seluruh Sub Tim
                      Bidang yang berada di bawahnya secara berkala untuk membuat rencana dan
                      anggaran kegiatan dan mengkoordinasikan dengan kegiatan bidang lainnya dalam
                      rapat bersama Dewan Paroki Harian.
                    </p>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Dalam pelaksanaan karya pelayanannya, Tim Bidang Peribadatan bersinergi dengan
                      Tim/Sub Tim Bidang lainnya, seperti Tim Bidang Orang Muda Katolik, Tim Bidang
                      Hubungan Antar Agama dan Kepercayaan, Tim Bidang Komunikasi Sosial, Tim Bidang
                      Pelayanan, Tim Bidang Keuangan Paroki, Tim Pemerhati Karyawan hingga Tim Aset
                      Gereja.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Gerakan Partisipasi Liturgi
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Melalui Gerakan Partisipasi Liturgi yang Hidup dan Memerdekakan, Tim Bidang
                      Peribadatan melakukan pendampingan kepada Tim Liturgi Lingkungan, baik dalam
                      pelaksanaan misa lingkungan, maupun melalui jadwal tugas lingkungan dalam
                      perayaan ekaristi, sehingga lebih banyak umat dapat berpartisipasi dalam
                      pelayanan liturgi secara berkala dengan semangat solidaritas dan
                      subsidiaritas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Organizational Structure Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16">
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight">
                      Struktur Organisasi Bidang Peribadatan
                    </h2>
                    <p className="text-slate-600 mt-2 text-lg">Periode 2024-2027</p>
                    <div className="mt-4 mb-8 flex justify-center">
                      <span className="h-1 w-20 md:w-24 bg-sky-100 rounded-full"></span>
                    </div>
                  </div>

                  <PeribadatanOrganizationalChart />
                </div>
              </div>

              {/* Artikel Section for Bidang Peribadatan */}
              <ArtikelBidang bidangName="Peribadatan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
