import ArtikelBidang from '@/components/ArtikelBidang'
import PITKOrganizationalChart from '@/components/organizational-chart/pitk'

export default function PitkPage() {
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
                  Bidang Pengembangan Iman,
                  <br />
                  Talenta, dan Kaderisasi
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Tim Bidang PITK adalah persekutuan dan gerakan orang-orang sebagai sebuah teamwork
                  yang berkarya untuk membangun umat Paroki Villa Melati Mas menjadi bagian dari
                  komunitas alternatif atau pengharapan.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim PITK berkarya untuk mengejawantahkan visi dan misi Paroki Villa Melati Mas
                      dalam berbagai karya yang nyata demi mewujudkan kesejahteraan bersama. Tim
                      PITK bertugas membuat dan menyelenggarakan berbagai kegiatan yang berguna bagi
                      peningkatan Iman, Talenta dan Kaderisasi bagi semua umat termasuk di dalamnya
                      Pengurus Lingkungan, Pengurus Tim Bidang dan Pengurus Dewan Paroki Harian.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      7 Kerangka Utama Kegiatan Tim PITK
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          1
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">Pengembangan Spiritualitas Doa</span>
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          2
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">
                            Pengembangan Spiritualitas Kepemimpinan
                          </span>
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          3
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">
                            Pengembangan Spiritualitas Fungsional
                          </span>
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          4
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">
                            Pengembangan Spiritualitas Kehidupan
                          </span>
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          5
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">
                            Pengembangan Spiritualitas Pendukung
                          </span>
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          6
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">Riset & Pengembangan</span>
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          7
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold">Animasi & Sosialisasi</span>
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Pengembangan Spiritualitas
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      <span className="font-semibold">Pengembangan spiritualitas doa</span>{' '}
                      dilakukan dengan membangun habitus doa dalam keluarga melalui doa keseharian
                      yang diupayakan secara terus-menerus, iman umat akan bertumbuh dan berbuah
                      menjadi pribadi yang penuh syukur dan sukacita menjawab panggilan Tuhan. Dan
                      dengan talenta yang dimilikinya ia mau membuka dirinya, terlibat untuk
                      berkarya nyata dalam berbagai karya pelayanan sehari-hari.
                    </p>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      <span className="font-semibold">Pengembangan spiritualitas kepemimpinan</span>{' '}
                      dilakukan melalui retret dan rekoleksi para pelayan pastoral dan kader awam,
                      baik di Lingkungan maupun Paroki, yang bertujuan untuk mengembangkan iman dan
                      meningkatkan kualitas pelayanan para pelayan pastoral yang lebih baik kepada
                      umat.
                    </p>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Pembinaan kemampuan baik secara pribadi maupun fungsional menjadi salah satu
                      tugas Tim agar setiap pribadi dapat tumbuh dan berkembang sesuai potensi dan
                      talentanya. Penyediaan berbagai materi seminar, pelatihan dan modul bina iman
                      berkelanjutan dilakukan oleh Tim PITK disusun bersinergi dengan Bidang
                      Pewartaan dan bidang lainnya yang terkait.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Rapat Karya dan Evaluasi
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Setiap tahun, Tim PITK beserta Dewan Paroki Harian menyelenggarakan Rapat
                      Karya sebagai refleksi dan evaluasi program karya yang telah dilakukan, serta
                      duduk bersama dengan para Pengurus Lingkungan dan Tim/Sub Tim Bidang dalam
                      terang Roh Kudus ber-communal dicernment berdasarkan hasil survei yang telah
                      dilakukan, menemukan program-program karya pastoral yang akan dilakukan di
                      tahun mendatang agar harapan dan kebutuhan umat dapat diwujudnyatakan demi
                      kebaikan bersama.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Koordinasi dan Sinergi
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Dalam pelaksanaan kegiatan karyanya, Tim PITK bersinergi dengan berbagai
                      bidang lainnya, melakukan rapat secara berkala untuk menyusun rencana dan
                      anggaran kegiatan yang dikoordinasikan dalam rapat bersama Dewan Paroki
                      Harian. Evaluasi kegiatan dan pendokumentasian seluruh kegiatan dilakukan
                      sebagai bagian dari kehidupan menggereja.
                    </p>
                  </div>
                </div>
              </div>

              {/* Organizational Structure Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16">
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight">
                      Struktur Organisasi Bidang PITK
                    </h2>
                    <p className="text-slate-600 mt-2 text-lg">Periode 2024-2027</p>
                    <div className="mt-4 mb-8 flex justify-center">
                      <span className="h-1 w-20 md:w-24 bg-sky-100 rounded-full"></span>
                    </div>
                  </div>

                  <PITKOrganizationalChart />
                </div>
              </div>

              {/* Artikel Section for Bidang PITK */}
              <ArtikelBidang bidangName="PITK" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
