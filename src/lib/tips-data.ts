export interface TipsPertanyaan {
  id: string;
  pertanyaan: string;
  kategori: string;
  tips: string;
  contohJawaban: string;
}

export const kategoriList = [
  "Semua",
  "Tentang Diri",
  "Motivasi & Tujuan",
  "Pengalaman & Kompetensi",
  "Situasional",
  "Penutup",
];

export const bankPertanyaan: TipsPertanyaan[] = [
  {
    id: "1",
    pertanyaan: "Ceritakan tentang diri Anda.",
    kategori: "Tentang Diri",
    tips: "Jawab dengan ringkas (1-2 menit). Fokus pada latar belakang pendidikan, pengalaman relevan, dan keahlian utama. Hindari menceritakan riwayat hidup dari kecil.",
    contohJawaban:
      "Saya Ahmad, lulusan S1 Informatika dari UMSIDA dengan IPK 3.75. Selama kuliah saya aktif magang di bidang web development dan menjadi ketua divisi IT di BEM. Saat ini saya tertarik mengembangkan karir sebagai software engineer karena passion saya dalam membangun solusi teknologi yang bermanfaat.",
  },
  {
    id: "2",
    pertanyaan: "Apa kelebihan dan kekurangan Anda?",
    kategori: "Tentang Diri",
    tips: "Sebutkan kelebihan yang relevan dengan posisi. Untuk kekurangan, pilih yang jujur namun tunjukkan upaya perbaikan. Hindari klise seperti 'perfeksionis'.",
    contohJawaban:
      "Kelebihan saya adalah kemampuan analisis yang kuat dan mampu bekerja di bawah tekanan deadline. Adapun kekurangan saya, kadang terlalu detail dalam mengerjakan sesuatu. Untuk mengatasinya, saya belajar memprioritaskan tugas dan menetapkan time-boxing agar lebih efisien.",
  },
  {
    id: "3",
    pertanyaan: "Mengapa Anda tertarik melamar di perusahaan ini?",
    kategori: "Motivasi & Tujuan",
    tips: "Riset perusahaan terlebih dahulu. Hubungkan visi/misi perusahaan dengan tujuan karir Anda. Tunjukkan antusiasme yang genuine.",
    contohJawaban:
      "Saya mengagumi inovasi yang dilakukan perusahaan ini di bidang fintech, terutama produk pembayaran digital yang sudah menjangkau UMKM di seluruh Indonesia. Nilai perusahaan yang mengutamakan dampak sosial sejalan dengan passion saya. Saya ingin berkontribusi dengan kemampuan teknis saya untuk mengembangkan produk yang lebih inklusif.",
  },
  {
    id: "4",
    pertanyaan: "Di mana Anda melihat diri Anda dalam 5 tahun ke depan?",
    kategori: "Motivasi & Tujuan",
    tips: "Tunjukkan ambisi yang realistis dan selaras dengan jenjang karir di perusahaan. Hindari jawaban yang menunjukkan Anda akan pindah dalam waktu dekat.",
    contohJawaban:
      "Dalam 5 tahun ke depan, saya ingin menjadi senior engineer yang tidak hanya mahir secara teknis, tapi juga mampu membimbing junior dan berkontribusi pada arsitektur sistem. Saya berharap bisa tumbuh bersama perusahaan ini dan mengambil tanggung jawab yang lebih besar seiring pengalaman.",
  },
  {
    id: "5",
    pertanyaan: "Mengapa kami harus menerima Anda?",
    kategori: "Motivasi & Tujuan",
    tips: "Hubungkan keahlian dan pengalaman Anda secara spesifik dengan kebutuhan posisi. Berikan bukti konkret, bukan klaim umum.",
    contohJawaban:
      "Saya memiliki kombinasi keahlian teknis di React dan Node.js yang sesuai dengan tech stack perusahaan, ditambah pengalaman magang yang membuat saya terbiasa bekerja dalam tim agile. Saya juga punya track record menyelesaikan proyek tepat waktu saat magang, dan saya siap memberikan kontribusi nyata sejak hari pertama.",
  },
  {
    id: "6",
    pertanyaan: "Ceritakan pengalaman Anda menghadapi tantangan dan bagaimana mengatasinya.",
    kategori: "Pengalaman & Kompetensi",
    tips: "Gunakan metode STAR (Situation, Task, Action, Result). Pilih pengalaman yang relevan dan tunjukkan kemampuan problem-solving.",
    contohJawaban:
      "Saat magang, saya ditugaskan memperbaiki bug kritis di sistem pembayaran yang mempengaruhi 500+ transaksi. (Situation) Saya harus menemukan dan memperbaikinya dalam 24 jam. (Task) Saya menganalisis log, mereproduksi bug di staging, lalu menemukan race condition di concurrent requests. (Action) Saya implementasi locking mechanism dan deploy fix dalam 8 jam. Hasilnya, zero error dalam 3 bulan berikutnya. (Result)",
  },
  {
    id: "7",
    pertanyaan: "Bagaimana Anda bekerja dalam tim?",
    kategori: "Pengalaman & Kompetensi",
    tips: "Berikan contoh konkret kerja tim. Tunjukkan kemampuan kolaborasi, komunikasi, dan kontribusi Anda dalam tim.",
    contohJawaban:
      "Di organisasi kampus, saya memimpin tim 8 orang untuk acara seminar nasional. Saya membagi tugas sesuai kekuatan masing-masing, mengadakan daily standup singkat, dan membuat shared document untuk tracking progress. Acara berjalan sukses dengan 300 peserta. Pengalaman ini mengajarkan saya pentingnya komunikasi terbuka dan delegasi yang tepat.",
  },
  {
    id: "8",
    pertanyaan: "Apa pencapaian terbesar Anda?",
    kategori: "Pengalaman & Kompetensi",
    tips: "Pilih pencapaian yang relevan dengan pekerjaan. Kuantifikasi jika memungkinkan. Jelaskan proses, bukan hanya hasil.",
    contohJawaban:
      "Pencapaian terbesar saya adalah mengembangkan aplikasi inventaris untuk UKM lokal sebagai proyek akhir. Aplikasi ini mengurangi waktu pencatatan stok dari 2 jam menjadi 15 menit per hari. Saya merancang, develop, dan deploy sendiri dalam 3 bulan, dan sekarang digunakan oleh 3 toko.",
  },
  {
    id: "9",
    pertanyaan: "Jika Anda berselisih pendapat dengan atasan, apa yang akan Anda lakukan?",
    kategori: "Situasional",
    tips: "Tunjukkan kemampuan komunikasi profesional. Jangan menjawab bahwa Anda selalu setuju atau selalu menentang. Fokus pada mencari solusi terbaik.",
    contohJawaban:
      "Saya akan menyampaikan perspektif saya dengan data dan alasan yang jelas secara privat. Saya percaya perbedaan pendapat itu sehat selama dikomunikasikan dengan baik. Namun setelah keputusan dibuat, saya akan mendukung dan menjalankannya sepenuhnya, karena saya menghargai hierarki dan keputusan tim.",
  },
  {
    id: "10",
    pertanyaan: "Bagaimana Anda menangani tekanan kerja atau deadline ketat?",
    kategori: "Situasional",
    tips: "Berikan strategi konkret yang Anda gunakan. Tunjukkan bahwa tekanan justru memotivasi, bukan menghambat Anda.",
    contohJawaban:
      "Saya terbiasa dengan deadline ketat dari pengalaman kuliah dan magang. Strategi saya adalah: pertama, memecah tugas besar menjadi milestone kecil. Kedua, memprioritaskan berdasarkan urgency dan impact. Ketiga, berkomunikasi proaktif jika ada kendala. Dengan cara ini, saya berhasil menyelesaikan semua proyek magang tepat waktu.",
  },
  {
    id: "11",
    pertanyaan: "Jika diterima, apa yang akan Anda lakukan dalam 90 hari pertama?",
    kategori: "Situasional",
    tips: "Tunjukkan bahwa Anda proaktif dan punya rencana. Bagi menjadi 30-60-90 hari. Fokus pada belajar di awal, lalu berkontribusi.",
    contohJawaban:
      "30 hari pertama: memahami codebase, proses tim, dan budaya perusahaan. 60 hari: mulai mengambil task mandiri dan berkontribusi pada sprint. 90 hari: sudah bisa deliver fitur secara independen dan mulai mengidentifikasi area improvement. Saya percaya onboarding yang terstruktur akan membuat saya produktif lebih cepat.",
  },
  {
    id: "12",
    pertanyaan: "Berapa gaji yang Anda harapkan?",
    kategori: "Penutup",
    tips: "Riset range gaji untuk posisi serupa di industri dan lokasi yang sama. Berikan range, bukan angka spesifik. Tunjukkan fleksibilitas.",
    contohJawaban:
      "Berdasarkan riset saya untuk posisi junior software engineer di Surabaya, range yang umum adalah Rp 5-8 juta per bulan. Saya terbuka untuk mendiskusikan angka yang sesuai dengan tanggung jawab posisi dan kompensasi keseluruhan yang ditawarkan perusahaan.",
  },
  {
    id: "13",
    pertanyaan: "Apakah ada pertanyaan yang ingin Anda tanyakan?",
    kategori: "Penutup",
    tips: "SELALU siapkan pertanyaan. Ini menunjukkan minat dan persiapan Anda. Tanyakan tentang tim, proyek, budaya kerja, atau peluang pengembangan.",
    contohJawaban:
      "Ya, saya ingin bertanya: 1) Seperti apa struktur tim engineering dan bagaimana proses development sehari-hari? 2) Apa tantangan terbesar yang dihadapi tim saat ini? 3) Bagaimana perusahaan mendukung pengembangan skill karyawan? Pertanyaan ini penting bagi saya untuk memahami apakah saya bisa berkontribusi optimal.",
  },
  {
    id: "14",
    pertanyaan: "Ceritakan tentang proyek yang pernah Anda kerjakan.",
    kategori: "Pengalaman & Kompetensi",
    tips: "Pilih proyek yang paling relevan. Jelaskan peran Anda, teknologi yang digunakan, tantangan, dan hasilnya. Gunakan angka jika bisa.",
    contohJawaban:
      "Saya mengembangkan sistem informasi akademik berbasis web untuk sekolah menggunakan React dan Express.js. Saya bertanggung jawab pada frontend dan API design. Tantangan terbesarnya adalah menghandle data 1000+ siswa dengan performa tetap baik. Saya implementasi pagination dan caching, hasilnya load time turun 60%.",
  },
  {
    id: "15",
    pertanyaan: "Mengapa Anda meninggalkan pekerjaan sebelumnya?",
    kategori: "Tentang Diri",
    tips: "Jawab dengan positif — fokus pada apa yang Anda cari, bukan apa yang Anda hindari. Jangan menjelek-jelekkan perusahaan atau atasan sebelumnya.",
    contohJawaban:
      "Saya sangat bersyukur atas pengalaman di tempat sebelumnya. Namun, saya merasa sudah mencapai titik di mana saya perlu tantangan baru untuk terus berkembang. Posisi ini menawarkan kesempatan bekerja dengan teknologi yang ingin saya dalami dan skala proyek yang lebih besar.",
  },
];
