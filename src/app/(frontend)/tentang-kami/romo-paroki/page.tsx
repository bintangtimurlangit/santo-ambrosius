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

              {/* Pastor 1 - Rm. Yosef Natalis Kurnianto */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Pastor Photo */}
                  <div className="lg:col-span-1">
                    <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/romo-nat.jpg"
                        alt="Rm. Yosef Natalis Kurnianto"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <h2 className="text-lg md:text-xl font-medium text-slate-800">
                        Rm. Yosef Natalis Kurnianto, Pr
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
                        <p className="text-slate-600">Cilandak - Jakarta, 31 Desember 1979</p>
                      </div>

                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Tahbisan Imam</h3>
                        <p className="text-slate-600">
                          15 Agustus 2008 di Paroki St. Matias - Kosambi Baru
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
                          <strong>2004:</strong> Tahun Orientasi Pastoral di Paroki St. Maria,
                          Tangerang
                        </p>
                        <p>
                          <strong>2007 - 2008:</strong> Diakonat di Paroki St. Fransiskus Xaverius,
                          Tanjung Priok dan Paroki Regina Caeli, Pantai Indah Kapuk
                        </p>
                        <p>
                          <strong>2008 - 2012:</strong> Pastor Rekan di Gereja Ibu Teresa - Paroki
                          Cikarang
                        </p>
                        <p>
                          <strong>2012 - 2013:</strong> Pastor Rekan di Gereja Gregorius Agung -
                          Paroki Kutabumi, Tangerang
                        </p>
                        <p>
                          <strong>2013 - 2016:</strong> Pastor Rekan di Gereja St. Bonaventura -
                          Paroki Pulomas
                        </p>
                        <p>
                          <strong>12 Sep - 7 Des 2016:</strong> Pastor Rekan di Gereja St. Monika -
                          Paroki Serpong, dengan tugas khusus mempersiapkan pendirian Paroki Villa
                          Melati Mas
                        </p>
                        <p>
                          <strong>7 Des 2016 - 25 Feb 2017:</strong> Pastor Paroki Administratif di
                          Gereja St. Ambrosius - Paroki Villa Melati Mas
                        </p>
                        <p>
                          <strong>26 Feb 2017 - sekarang:</strong> Pastor Paroki di Gereja St.
                          Ambrosius - Paroki Villa Melati Mas
                        </p>
                        <p>
                          <strong>2015 - sekarang:</strong> Wakil Ketua Tim Karya Kunjungan Pastoral
                          (TKKP - KAJ)
                        </p>
                        <p>
                          <strong>2019 - sekarang:</strong> Wakil Deken Dekenat Tangerang II
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
