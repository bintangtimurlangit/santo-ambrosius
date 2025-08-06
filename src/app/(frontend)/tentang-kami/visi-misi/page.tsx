export default function VisiMisiPage() {
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
                  Visi Misi
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Arah dan tujuan Gereja Santo Ambrosius dalam melayani umat dan masyarakat.
                </p>
              </div>

              {/* Visi Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-6 text-center">
                  Visi
                </h2>

                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium italic">
                    &ldquo;Gereja Ambrosius sebagai paguyuban umat beriman yang peduli, berbagi dan
                    merakyat.&rdquo;
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Paguyuban Umat Beriman */}
                  <div className="bg-sky-50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-slate-800 mb-4 text-center">
                      Paguyuban Umat Beriman
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Kumpulan Umat Allah yang percaya akan Kristus bersama sama mengelola hidup
                      iman dalam suasana kekeluargaan dan kerukunan. Dalam hal ini, secara khusus
                      Gereja St. Ambrosius membangun habitus gerakan doa dengan kemurahan hati
                      (Gemati).
                    </p>
                    <p className="text-slate-600 leading-relaxed italic text-center">
                      &ldquo;Cintailah keheningan. Keheningan adalah awal dari iman sebab dalam
                      keheningan kita belajar mendengar sabda Allah&rdquo; (St. Ambrosius).
                    </p>
                  </div>

                  {/* Peduli */}
                  <div className="bg-sky-50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-slate-800 mb-4 text-center">Peduli</h4>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Gerakan Umat Allah sebagai komunitas mempunyai rasa peka dan keprihatinan
                      terhadap kebutuhan sesama dan lingkungan hidup.
                    </p>
                    <p className="text-slate-600 leading-relaxed italic text-center">
                      &ldquo;Buah keheningan adalah doa, buah doa adalah iman, buah iman adalah
                      cinta, buah cinta adalah pelayanan dan buah pelayanan adalah damai&rdquo; (St.
                      Teresa dari Kalkuta).
                    </p>
                  </div>

                  {/* Berbagi */}
                  <div className="bg-sky-50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-slate-800 mb-4 text-center">Berbagi</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Umat St. Ambrosius yang murah hati melalui tindakan-tindakan nyata berbagi
                      kepada sesama khususnya mereka yang &ldquo;Kecil, Lemah, Miskin, Tersingkir
                      dan Disable&rdquo; (KLMTD).
                    </p>
                  </div>

                  {/* Merakyat */}
                  <div className="bg-sky-50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-slate-800 mb-4 text-center">
                      Merakyat
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Seperti Allah yang turun ke dunia mengambil rupa manusia, Umat St. Ambrosius
                      berani meninggalkan posisi nyaman dengan turun ke bawah untuk terlibat dan
                      menjadi bagian dari umat dan masyarakat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Misi Section */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-8 text-center">
                  Misi
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                      1
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Meningkatkan habitus doa dalam keluarga dan lingkungan.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                      2
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Meningkatkan kesadaran umat untuk terlibat dalam kehidupan menggereja.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                      3
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Mengembangkan potensi umat dalam membangun semangat persaudaraan sejati dan
                      berbelarasa melalui tata pelayanan gembala baik dan murah hati.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                      4
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Membangun persaudaraan yang erat dalam masyarakat untuk menghadirkan wajah
                      Allah yang penuh kerahiman.
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                      5
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Mengembangkan semangat kepedulian terhadap lingkungan hidup.
                    </p>
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
