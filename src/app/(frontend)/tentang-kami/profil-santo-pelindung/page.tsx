import React from 'react'
import Image from 'next/image'

export default function ProfilSantoPelindungPage() {
  return (
    <div className="min-h-screen">
      {/* Gradient Container */}
      <div
        className="mx-2 rounded-b-2xl shadow-sm"
        style={{
          background:
            'linear-gradient(to bottom, rgb(186 230 253) 5%, rgb(186 230 253) 3%, white 20%, rgb(249 250 251) 100%)',
        }}
      >
        {/* Title Section */}
        <div className="text-center mb-20 pt-16 px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-8">
            Profil Santo
            <br />
            Pelindung
          </h1>
        </div>

        {/* Content Section */}
        <div className="px-4 md:px-8 lg:px-12 pb-16">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Saint Image and Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Saint Image */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="text-center">
                  <div className="relative aspect-[3/4] w-full max-w-sm mx-auto mb-6 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/St Ambrose.jpg"
                      alt="Santo Ambrosius"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="text-sm text-slate-500 italic mb-4">Sumber: Preaching Friars</p>
                  <p className="text-slate-600 leading-relaxed">
                    Ambrosius adalah uskup kota Milan, salah satu keuskupan terpenting pada abad
                    ke-4. Santo Ambrosius bersama-sama dengan Santo Augustinus Hippo, Santo
                    Hieronimus, dan Santo Gregorius Agung, dianggap sebagai empat doktor Gereja
                    Barat dalam Sejarah Gereja kuno.
                  </p>
                </div>
              </div>

              {/* Saint Details */}
              <div className="space-y-6">
                {/* Arti Nama */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-medium text-slate-800 mb-3">Arti Nama</h3>
                  <p className="text-slate-600">
                    Berasal dari kata Yunani <em>Αμβροσιος (Ambrosios)</em> yang berarti{' '}
                    <strong>&ldquo;abadi&rdquo;</strong>
                  </p>
                </div>

                {/* Key Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Informasi Utama</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-slate-700">Perayaan</span>
                      <span className="text-slate-600">7 Desember</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-slate-700">Lahir</span>
                      <span className="text-slate-600">Tahun 339</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-slate-700">Kota Asal</span>
                      <span className="text-slate-600">Trier, Gaul Selatan</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium text-slate-700">Wilayah Karya</span>
                      <span className="text-slate-600">Milan, Roma</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">Wafat</span>
                      <span className="text-slate-600">4 April 397, Milan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-8 text-center">
                Biografi Santo Ambrosius
              </h2>

              <div className="prose prose-slate max-w-none leading-relaxed text-slate-600">
                <div className="space-y-6">
                  <p>
                    Santo Ambrosius lahir di wilayah Galia (Perancis aktual) tahun 340, di kota
                    Trier, Arles atau Lion. Ayahnya yang bernama Ambrosius juga adalah Wakil Kaisar
                    Roma untuk wilayah Galia yang meliputi Perancis, Inggris, Spanyol dan sebagian
                    Afrika Utara. Ambrosius adalah anak bungsu dari tiga bersaudara. Ibunya seorang
                    perempuan yang taat beribadah dan mengajarkan hidup rohani yang kuat kepada
                    ketiga anaknya.
                  </p>

                  <p>
                    Pendidikan iman dalam keluarga inilah yang menyumbangkan intuisi iman dalam diri
                    Ambrosius. Dari orang tuanya, Ambrosius belajar berdisiplin untuk menghidupi
                    iman Kristen. Dari kakak tertuanya, Marcellina, Ambrosius belajar mencintai
                    kemurnian dan dari Satyrus, Ambrosius belajar tentang kerendahan hati dan
                    pelayanan. Setelah ayahnya meninggal, Ambrosius kembali ke Roma bersama Ibu dan
                    kedua kakaknya. Di Roma, Ambrosius belajar ilmu hukum yang kemudian membuka
                    praktek sebagai pengacara bersama Satyrus di Sirmium.
                  </p>

                  <p>
                    Keberhasilannya di bidang hukum ditambah keterampilannya berbahasa Latin dan
                    Yunani menarik perhatian Kaisar Valentinianus, sehingga pada tahun 370
                    menobatkannya menjadi Gubernur Milano. Ketika Uskup Dionisius dari golongan
                    Arianisme wafat, Ambrosius, sebagai pejabat publik kota Milan diutus oleh Kaisar
                    Valentinianus untuk menyelesaikan perkara pergantian pimpinan di sana.
                  </p>

                  <div className="bg-sky-50 p-6 rounded-xl my-8">
                    <p className="italic text-slate-700 font-medium">
                      &ldquo;Ketika Ambrosius datang untuk menengahi kedua kelompok yang berbeda,
                      menurut legenda, terdengarlah suara anak kecil yang berseru:{' '}
                      <strong>Ambrosius Uskup!</strong> Dari sana, seluruh hadirin yang hadir
                      menyerukan hal yang sama.&rdquo;
                    </p>
                  </div>

                  <p>
                    Semula sang Santo menolak, tetapi karena intuisi iman dan semangat
                    pengabdiannya, ia pun menerima tugas pelayanan itu. Ada dua hal yang sebenarnya
                    menghambat pemilihannya sebagai Uskup: pertama, dia belum dibaptis dan kedua,
                    dia belum belajar tentang tata pemerintahan Gerejawi. Namun demikian ia tetap
                    bersiap sedia juga menerimanya.
                  </p>

                  <p>
                    Dalam bukunya, <em>De Oficiis</em>, tentang para klerus, ia mengakui bahwa
                    biasanya orang belajar untuk persiapan mengajar. Tetapi dirinya, karena
                    penunjukan yang mendadak, terpaksa mengajar sambil belajar: tidak ada manusia
                    yang mengajar tanpa belajar. Hanya Tuhan yang mengajar tanpa terlebih dahulu
                    belajar.
                  </p>

                  <p>
                    Ketika menjadi Uskup Milan, intuisi iman inilah yang membantu Ambrosius untuk
                    berani mengambil keputusan sulit, seperti berani berseberangan dengan Ratu
                    Yustina, isteri kedua Kaisar Valentinianus yang mencoba menyebarkan ajaran
                    Arianisme ke wilayah Barat kekaisaran Roma. Intuisi iman yang sama yang membuat
                    Ambrosius tidak ragu menuntut kaisar Theodosius untuk melakukan laku tobat
                    setelah membantai seluruh penduduk Tesalonika.
                  </p>

                  <p>
                    Disamping mengajarkan nilai hidup kristianinya yang saleh, Santo Ambrosius juga
                    memiliki peranan dalam pertobatan St. Agustinus, putra St. Monika. Dalam
                    pengakuan St. Agustinus, penerimaan penuh kehangatan dari St. Ambrosius dan cara
                    hidupnya telah membuat St. Agustinus meninggalkan cara hidup yang lama, memberi
                    diri dibaptis dan akhirnya menyerahkan seluruh hidup kepada Tuhan.
                  </p>

                  <div className="bg-sky-50 p-6 rounded-xl my-8">
                    <h4 className="text-lg font-medium text-slate-800 mb-3">
                      Cinta akan Keheningan
                    </h4>
                    <p className="italic">
                      &ldquo;Cintailah keheningan. Keheningan adalah awal dari iman sebab dalam
                      keheningan kita belajar mendengar sabda Allah. Lebih dari itu, hening berarti
                      berjaga-jaga: menjaga hati dan budi dari jebakan musuh. Hening berarti menjaga
                      lidah dan kata agar tidak keluar segala hal yang membuat diri sendiri dan
                      orang lain jatuh dalam dosa.&rdquo;
                    </p>
                  </div>

                  <p>
                    Uskup Ambrosius menghembuskan nafasnya yang terakhir pada saat Jumat Agung, 4
                    April 397. Jenasahnya dimakamkan dalam gereja yang kini dikenal dengan nama
                    Gereja Santo Ambrogio di Milan. Tubuhnya masih tetap utuh, sekarang disemayamkan
                    di Basilica of Milan.
                  </p>
                </div>
              </div>
            </div>

            {/* Source */}
            <div className="text-center">
              <p className="text-sm text-slate-500">
                Sumber: <em>Katakombe.Org</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
