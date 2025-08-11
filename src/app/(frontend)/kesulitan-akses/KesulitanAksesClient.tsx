'use client'
import React, { useState } from 'react'

export default function KesulitanAksesClient() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitted(false)
    setError(null)

    try {
      const form = e.currentTarget
      const formData = new FormData()

      const getValue = (name: string) =>
        (
          form.elements.namedItem(name) as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
        )?.value || ''

      const namaLengkap = getValue('namaLengkap')
      const email = getValue('email')
      const whatsapp = getValue('whatsapp')
      const jenisPerangkat = getValue('jenisPerangkat')
      const sistemOperasi = getValue('sistemOperasi')
      const browser = getValue('browser')
      const koneksi = getValue('koneksi')
      const mulaiTerjadiRaw = getValue('mulaiTerjadi')
      const halaman = getValue('halaman')
      const deskripsi = getValue('deskripsi')

      const langkahChecked = Array.from(
        form.querySelectorAll('input[name="langkahDicoba"]:checked'),
      ) as HTMLInputElement[]
      const langkahValues = langkahChecked.map((el) => el.value)

      formData.append('namaLengkap', namaLengkap)
      formData.append('email', email)
      if (whatsapp) formData.append('whatsapp', whatsapp)
      formData.append('jenisPerangkat', jenisPerangkat)
      if (sistemOperasi) formData.append('sistemOperasi', sistemOperasi)
      if (browser) formData.append('browser', browser)
      if (koneksi) formData.append('koneksi', koneksi)
      if (mulaiTerjadiRaw) formData.append('mulaiTerjadi', new Date(mulaiTerjadiRaw).toISOString())
      if (halaman) formData.append('halaman', halaman)
      formData.append('deskripsi', deskripsi)
      langkahValues.forEach((val, idx) => formData.append(`langkahDicoba[${idx}]`, val))

      const screenshotInput = form.elements.namedItem('screenshot') as HTMLInputElement | null
      const file = screenshotInput?.files?.[0]
      if (file) {
        formData.append('screenshot', file)
      }

      const res = await fetch('/api/kesulitan-akses', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message || 'Gagal mengirim laporan')
      }

      setSubmitted(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Gradient Container */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 4%, white 30%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Title Section */}
        <div className="text-center mb-16 pt-16 px-6 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-4">
            Kesulitan Mengakses Situs?
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Sampaikan kendala yang Anda alami melalui formulir di bawah ini. Informasi ini akan
            membantu kami mendiagnosis dan memperbaiki masalah lebih cepat.
          </p>
        </div>

        {/* Form Section */}
        <div className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  Terima kasih! Laporan Anda telah terkirim.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Informasi Kontak */}
                <div>
                  <h2 className="text-lg md:text-xl font-medium text-slate-800 mb-4">
                    Informasi Kontak
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="namaLengkap"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="namaLengkap"
                        name="namaLengkap"
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap Anda"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="nama@contoh.com"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Nomor WhatsApp (opsional)
                      </label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="contoh: 62812xxxxxxx"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Detail Perangkat & Browser */}
                <div>
                  <h2 className="text-lg md:text-xl font-medium text-slate-800 mb-4">
                    Detail Perangkat & Browser
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="jenisPerangkat"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Jenis Perangkat
                      </label>
                      <select
                        id="jenisPerangkat"
                        name="jenisPerangkat"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Pilih jenis perangkat
                        </option>
                        <option value="desktop">Desktop / Laptop</option>
                        <option value="ponsel">Ponsel</option>
                        <option value="tablet">Tablet</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="sistemOperasi"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Sistem Operasi
                      </label>
                      <input
                        id="sistemOperasi"
                        name="sistemOperasi"
                        type="text"
                        placeholder="mis: Windows 11, macOS 14, Android 14, iOS 17"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="browser"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Browser
                      </label>
                      <input
                        id="browser"
                        name="browser"
                        type="text"
                        placeholder="mis: Chrome 126, Safari 17, Firefox 127, Edge 126"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="koneksi"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Koneksi Internet (opsional)
                      </label>
                      <input
                        id="koneksi"
                        name="koneksi"
                        type="text"
                        placeholder="mis: Wi‑Fi Indihome, Telkomsel 4G"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Detail Masalah */}
                <div>
                  <h2 className="text-lg md:text-xl font-medium text-slate-800 mb-4">
                    Detail Masalah
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="mulaiTerjadi"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Sejak Kapan Terjadi
                        </label>
                        <input
                          id="mulaiTerjadi"
                          name="mulaiTerjadi"
                          type="datetime-local"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="halaman"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Halaman/URL yang Bermasalah
                        </label>
                        <input
                          id="halaman"
                          name="halaman"
                          type="url"
                          placeholder="mis: https://santoambrosius.org/jadwal"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="deskripsi"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Jelaskan Masalahnya
                      </label>
                      <textarea
                        id="deskripsi"
                        name="deskripsi"
                        required
                        rows={5}
                        placeholder="Ceritakan apa yang terjadi, pesan error (jika ada), kapan muncul, dan langkah yang Anda lakukan sebelum masalah terjadi."
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="screenshot"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Tangkapan Layar (opsional)
                      </label>
                      <input
                        id="screenshot"
                        name="screenshot"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-700 file:text-white hover:file:bg-slate-800"
                      />
                      <p className="mt-2 text-xs text-slate-500">
                        Jika memungkinkan, unggah gambar yang menunjukkan masalahnya.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Langkah yang Sudah Dicoba */}
                <div>
                  <h2 className="text-lg md:text-xl font-medium text-slate-800 mb-4">
                    Langkah yang Sudah Dicoba
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Muat ulang halaman', value: 'reload' },
                      { label: 'Hapus cache/cookies', value: 'clear-cache' },
                      { label: 'Coba browser lain', value: 'other-browser' },
                      { label: 'Mode penyamaran/incognito', value: 'incognito' },
                      { label: 'Coba perangkat lain', value: 'other-device' },
                      { label: 'Matikan ekstensi browser', value: 'disable-extensions' },
                    ].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-xl px-4 py-3"
                      >
                        <input
                          type="checkbox"
                          name="langkahDicoba"
                          value={item.value}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-700"
                        />
                        <span className="text-sm text-slate-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Consent */}
                <div className="bg-gray-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs text-slate-500">
                    Data yang Anda kirimkan hanya akan digunakan untuk membantu kami mengatasi
                    kendala akses situs.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="reset"
                    className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 transition-colors duration-200"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-5 py-2.5 rounded-lg text-white font-medium transition-colors duration-200 ${
                      submitting
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {submitting ? 'Mengirim...' : 'Kirim Laporan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
