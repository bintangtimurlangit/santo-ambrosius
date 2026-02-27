import Image from 'next/image'

export default function RomoParokiPage() {
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
                  Romo Paroki
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Berikut para romo yang melayani di Gereja St. Ambrosius - Paroki Villa Melati Mas:
                </p>
              </div>

              {/* Pastor 1 - Rm. Antonius Pramono Wahyu Nugroho (Romo Pram) */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Pastor Photo */}
                  <div className="lg:col-span-1">
                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/romo-pram.jpeg"
                        alt="Rm. Antonius Pramono Wahyu Nugroho"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h2 className="text-lg md:text-xl font-medium text-slate-800">
                        Rm. Antonius Pramono Wahyu Nugroho, Pr
                      </h2>
                      <p className="text-slate-600 text-sm mt-1">Romo Pram</p>
                    </div>
                  </div>

                  {/* Pastor Information */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-medium text-slate-800 mb-2">
                          Tempat & Tanggal Lahir
                        </h3>
                        <p className="text-slate-600">Yogyakarta, 30 Mei 1974</p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Tahbisan Imam</h3>
                        <p className="text-slate-600">
                          22 Agustus 2013, Paroki Bekasi, Gereja St. Arnoldus Janssen
                        </p>
                      </div>
                    </div>

                    {/* Pastoral Assignment */}
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-4">
                        Riwayat Perutusan Pastoral
                      </h3>
                      <div className="space-y-3 text-slate-600 leading-relaxed">
                        <p>
                          <strong>2013 – 2014:</strong> Menyelesaikan Studi S2 di Fakultas Teologi Wedabhakti Yogyakarta
                        </p>
                        <p>
                          <strong>2014 – 2015:</strong> Pastor Rekan Paroki Ciputat – Gereja St. Nikodemus
                        </p>
                        <p>
                          <strong>2015 – 2018:</strong> Pastor Rekan Paroki Harapan Indah Bekasi – Gereja St. Albertus Agung
                        </p>
                        <p>
                          <strong>2018 – 2019:</strong> Pastor Rekan Paroki Pasar Minggu – Gereja Keluarga Kudus
                        </p>
                        <p>
                          <strong>2019 – 2026:</strong> Pastor Kepala Paroki Pasar Minggu – Gereja Keluarga Kudus
                        </p>
                        <p>
                          <strong>2026 – sekarang:</strong> Pastor Kepala Paroki Villa Melati Mas – Gereja St. Ambrosius
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pastor 2 - Rm. Rochadi Widagdo */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Pastor Photo */}
                  <div className="lg:col-span-1">
                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg bg-slate-100">
                      <Image
                        src="/romo-rochadi.png"
                        alt="Rm. Rochadi Widagdo, Pr."
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h2 className="text-lg md:text-xl font-medium text-slate-800">
                        Rm. Rochadi Widagdo, Pr.
                      </h2>
                    </div>
                  </div>

                  {/* Pastor Information */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-medium text-slate-800 mb-2">
                          Tempat & Tanggal Lahir
                        </h3>
                        <p className="text-slate-600">Bantul, 15 Mei 1958</p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Tahbisan Imam</h3>
                        <p className="text-slate-600">
                          15 Agustus 1986 di Jakarta oleh Mgr. Leo Soekoto
                        </p>
                      </div>
                    </div>

                    {/* Pastoral Assignment */}
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 mb-4">
                        Perutusan Pastoral
                      </h3>
                      <div className="space-y-3 text-slate-600 leading-relaxed">
                        <p>
                          <strong>1986 – 1990:</strong> Pastor Rekan Paroki Mangga Besar – Gereja St. Petrus Paulus
                        </p>
                        <p>
                          <strong>1990 – 1994:</strong> Pastor Kepala Paroki Pulo Mas – Gereja St. Bonaventura
                        </p>
                        <p>
                          <strong>1994 – 1999:</strong> Pastor Kepala Paroki Bojong Indah – Gereja St. Thomas Rasul
                        </p>
                        <p>
                          <strong>1999 – 2004:</strong> Pastor Rekan Paroki Cijantung – Gereja St. Aloysius Gonzaga
                        </p>
                        <p>
                          <strong>2004 – 2005:</strong> Pastor Rekan Paroki Pejompongan – Gereja Kristus Raja
                        </p>
                        <p>
                          <strong>2005:</strong> Sabatical di Philipina
                        </p>
                        <p>
                          <strong>2005 – 2014:</strong> Pastor Kepala Paroki Pejompongan – Gereja Kristus Raja
                        </p>
                        <p>
                          <strong>2015 – 2026:</strong> Pastor Kepala Paroki Cilangkap – Gereja Anak Domba St. Yohanes Maria Vianney
                        </p>
                        <p>
                          <strong>2026 – sekarang:</strong> Pastor Rekan Paroki Villa Melati Mas – Gereja St. Ambrosius
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
