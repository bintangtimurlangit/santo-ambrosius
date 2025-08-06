export default function JadwalPage() {
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
                  Jadwal Misa
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Jadwal perayaan Ekaristi di Gereja Santo Ambrosius.
                </p>
              </div>

              {/* Schedule Content */}
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Misa Mingguan */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-6 text-center">
                      Misa Mingguan
                    </h2>

                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="bg-sky-50 rounded-xl p-4 mb-3">
                          <h3 className="text-lg font-medium text-slate-700 mb-2">Sabtu</h3>
                          <p className="text-slate-600 text-lg">17.00 WIB</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="bg-sky-50 rounded-xl p-4">
                          <h3 className="text-lg font-medium text-slate-700 mb-2">Minggu</h3>
                          <div className="space-y-1">
                            <p className="text-slate-600 text-lg">08.00 WIB</p>
                            <p className="text-slate-600 text-lg">11.00 WIB</p>
                            <p className="text-slate-600 text-lg">17.00 WIB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Misa Harian */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                    <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-6 text-center">
                      Misa Harian
                    </h2>

                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="bg-sky-50 rounded-xl p-4 mb-3">
                          <h3 className="text-lg font-medium text-slate-700 mb-2">Senin - Sabtu</h3>
                          <p className="text-slate-600 text-lg">07.00 WIB</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="bg-sky-50 rounded-xl p-4">
                          <h3 className="text-lg font-medium text-slate-700 mb-2">Jumat Pertama</h3>
                          <div className="space-y-1">
                            <p className="text-slate-600 text-lg">07.00 WIB</p>
                            <p className="text-slate-600 text-lg">19.30 WIB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <p className="text-slate-600 leading-relaxed">
                      Untuk informasi lebih lanjut, silakan hubungi sekretariat paroki.
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
