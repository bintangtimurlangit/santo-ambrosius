import BeritaBidang from '@/components/BeritaBidang'
import { beritaBidangData } from '@/data/beritaBidang'

export default function PewartaanPage() {
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
                  Bidang Pewartaan
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Bidang Pewartaan bertugas untuk membawa kabar gembira dan mewujudnyatakan Kerajaan
                  Allah di tengah umat dan masyarakat.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Melalui Bidang Pewartaan diharapkan umat di Paroki Villa Melati Mas mendalami
                      dan mewartakan kebenaran Firman Allah, menumbuhkembangkan semangat untuk
                      menghayati hidup berdasarakan semangat injili, dan mengusahakan pengenalan
                      yang semakin mendalam akan pokok pokok iman Katolik agar tetap setia dan tidak
                      goyah melalui melalui pembinaan, pemahaman, penghayatan dan perwujudan iman
                      Katolik yang dialogis.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Tugas Tim Bidang Pewartaan
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Tim Bidang Pewartaan memiliki tugas ke dalam dan keluar, yaitu:
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          1
                        </span>
                        <div className="text-slate-700 leading-relaxed">
                          <p className="font-semibold mb-2">
                            Mengadakan berbagai bentuk pembinaan iman untuk anak/orang muda/dewasa:
                          </p>
                          <ul className="list-disc ml-4 space-y-1">
                            <li>
                              Katekese persiapan Sakramen Inisiasi (Baptis, Komuni Pertama dan
                              Krisma)
                            </li>
                            <li>
                              Pembinaan iman berkelanjutan: Bina Iman Anak, Bina Iman Remaja, Bina
                              Iman Orangtua dan Dewasa, Bina Iman Lansia
                            </li>
                            <li>
                              Pendalaman Iman, dengan menyediakan materi renungan bulanan secara
                              berkelanjutan bagi umat dalam berbagai kesempatan: Adven, PraPaskah,
                              Novena Santo Ambrosius, Bulan Kitab Suci, Devosi Santo Ambrosius
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          2
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          Mensosialisasikan implementasi Gerakan Paroki ke Lingkungan-lingkungan
                          dengan menggunakan sarana audio visual yang ada di gereja.
                        </p>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <span className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          3
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          Melaksanakan reksa pastoral kepada kaum awam, agar dapat berdialog dan
                          bekerjasama secara bijaksana dan penuh kasih dengan para penganut
                          agama-agama lain sebagai wujud kesaksian tentang iman kristiani, dan juga
                          memberi kesaksian tentang Kristus dalam setiap tugas keduniaan.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Pembinaan Para Pegiat
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Begitu luas dan berjenjang tugas Bidang Pewartaan, maka pembinaan para pegiat
                      Tim Bidang Pewartaan perlu diadakan secara berkala, baik pengembangan iman
                      melalui retret dan rekoleksi, hingga pendampingan dan pembekalan para
                      fasilitator yang akan membawakan bahan renungan agar mereka dapat mewartakan
                      kabar sukacita Injili secara benar, baik dan menarik bagi umat.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Koordinasi dan Sinergi
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Pertemuan antar Tim dan Sub Tim BIdang Pewartaan dilakukan secara berkala
                      untuk membuat rencana dan anggaran kegiatan yang akan dilakukan, bersinergi
                      dengan bidang karya yang terkait seperti Tim Bidang Peribadatan, Tim Bidang
                      Pelayanan, Tim Bidang Pengembangan Iman, Talenta dan Kaderisasi yang
                      terintegrasi dalam rapat bersama Dewan Paroki Harian.
                    </p>
                  </div>
                </div>
              </div>

              {/* News Section for Bidang Pewartaan */}
              <BeritaBidang bidangName="Pewartaan" articles={beritaBidangData.Pewartaan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
