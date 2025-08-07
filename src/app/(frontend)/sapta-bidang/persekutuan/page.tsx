import BeritaBidang from '@/components/BeritaBidang'

export default function PersekutuanPage() {
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
                  Bidang Persekutuan
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Gereja sebagai persekutuan umat beriman menerima setiap pribadi dengan beragam
                  potensi, bakat dan talenta masing-masing, dan bersama-sama meneruskan Cahaya
                  Kristus.
                </p>
              </div>

              {/* Main Content Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Gereja sebagai persekutuan umat beriman menerima setiap pribadi dengan beragam
                      potensi, bakat dan talenta masing-masing, dan bersama-sama meneruskan Cahaya
                      Kristus yang diwujudnyatakan dalam perbuatan atau amal yang baik dan berguna
                      bagi sesama.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Peran Lingkungan dalam Persekutuan
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Peran Lingkungan diharapkan dapat menciptakan kesatuan dan persekutuan antar
                      umat, baik umat dengan Paroki maupun umat dengan masyarakat. Persekutuan ini
                      diwujudkan sebagai bagian penghayatan hidup menggereja baik secara teritorial
                      (keluarga-lingkungan-Paroki) maupun paguyuban di dalamnya.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Sinergi dengan Bidang Lain
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Dalam melaksanakan karya pelayanan, Tim Bidang Persekutuan senantiasa
                      bersinergi dengan Tim Bidang lain sebagai bidang karyanya, seperti Tim
                      Pengembangan Iman, Talenta dan Kaderisasi, Tim Peribadatan, Tim Pewartaan, Tim
                      Pelayanan dll. Pertemuan secara berkala dilakukan baik internal Bidang
                      Persekutuan, maupun lintas bidang karya, dimaksudkan agar setiap rencana dan
                      anggaran kegiatan dapat terintegrasi dengan baik di bawah rapat koordinasi
                      dengan Dewan Paroki Harian.
                    </p>

                    <h3 className="text-2xl font-semibold text-slate-800 mb-6 mt-12">
                      Pembinaan dan Kaderisasi
                    </h3>

                    <p className="text-lg leading-relaxed mb-8 text-slate-700">
                      Pembinaan iman, pembaruan keanggotaan, kaderisasi para pelayan pastoral Bidang
                      Persekutuan senantiasa dilakukan agar setiap pribadi yang terlibat dapat
                      memahami gerak bersama Paroki Villa Melati Mas dan melayani dengan semangat
                      kerendahan hati.
                    </p>
                  </div>
                </div>
              </div>

              {/* News Section for Bidang Persekutuan */}
              <BeritaBidang bidangName="Persekutuan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
