import Footer from '@/components/Footer'

export default function PetaWilayahPage() {
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
                  Peta Wilayah
                </h1>
                <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  Peta wilayah pelayanan Gereja Santo Ambrosius dan area sekitarnya.
                </p>
              </div>

              {/* Google Maps Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                  {/* Map Container */}
                  <div className="w-full">
                    <div className="relative w-full h-0 pb-[75%] md:pb-[56.25%] rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.google.com/maps/d/embed?mid=1C9wJNxdY1xtFOtbm0W0JxUoohy2JLR0&ehbc=2E312F"
                        className="absolute top-0 left-0 w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Peta Wilayah Pelayanan Gereja Santo Ambrosius"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
