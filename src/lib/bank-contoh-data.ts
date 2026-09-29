export interface ContohDokumen {
  id: string;
  judul: string;
  tipe: "CV" | "Surat Lamaran";
  bidang: string;
  ringkasan: string;
  poin: string[];
  mengapaBarik: string[];
}

export const bankContoh: ContohDokumen[] = [
  {
    id: "cv-1",
    judul: "CV Fresh Graduate Informatika",
    tipe: "CV",
    bidang: "Teknologi Informasi",
    ringkasan: "CV fresh graduate S1 Informatika yang menonjolkan proyek kuliah, magang, dan keahlian teknis.",
    poin: [
      "Profil singkat 2-3 kalimat yang langsung ke inti",
      "Pendidikan dengan IPK dan mata kuliah relevan",
      "Pengalaman magang dengan pencapaian terukur",
      "Proyek kuliah yang menunjukkan kemampuan teknis",
      "Keahlian dikelompokkan: Bahasa Pemrograman, Framework, Tools",
      "Sertifikasi online yang relevan (Google, AWS, dsb)",
    ],
    mengapaBarik: [
      "Menggunakan angka dan metrik untuk menunjukkan dampak",
      "Struktur yang jelas dan mudah di-scan oleh ATS",
      "Fokus pada keahlian yang sesuai dengan posisi target",
      "Tidak ada informasi yang tidak relevan (hobi umum, foto informal)",
    ],
  },
  {
    id: "cv-2",
    judul: "CV Lulusan Manajemen Bisnis",
    tipe: "CV",
    bidang: "Bisnis & Manajemen",
    ringkasan: "CV untuk lulusan manajemen yang menonjolkan pengalaman organisasi, magang, dan kemampuan leadership.",
    poin: [
      "Profil menonjolkan soft skill: leadership, komunikasi, analisis",
      "Pengalaman organisasi kampus dengan peran kepemimpinan",
      "Magang di perusahaan FMCG dengan tanggung jawab nyata",
      "Keahlian: analisis data (Excel, SPSS), presentasi, negosiasi",
      "Prestasi: juara kompetisi bisnis plan tingkat nasional",
    ],
    mengapaBarik: [
      "Balance antara hard skill dan soft skill",
      "Pengalaman organisasi ditampilkan setara dengan pengalaman kerja",
      "Setiap poin pengalaman ada hasil/dampak yang jelas",
      "Layout bersih, tidak lebih dari 1 halaman",
    ],
  },
  {
    id: "cv-3",
    judul: "CV Lulusan Pendidikan",
    tipe: "CV",
    bidang: "Pendidikan",
    ringkasan: "CV untuk fresh graduate FKIP yang menonjolkan pengalaman mengajar, PPL, dan kompetensi pedagogik.",
    poin: [
      "Profil fokus pada passion mendidik dan pendekatan pembelajaran",
      "Pengalaman PPL (Praktik Pengalaman Lapangan) lengkap dengan durasi dan sekolah",
      "Pengalaman mengajar privat atau bimbel",
      "Pelatihan dan workshop pendidikan yang pernah diikuti",
      "Keahlian: metode pembelajaran aktif, media digital, classroom management",
    ],
    mengapaBarik: [
      "Fokus pada kompetensi yang dicari sekolah/institusi pendidikan",
      "Menunjukkan pengalaman praktis, bukan hanya teori",
      "Menyebutkan jenjang dan mata pelajaran yang dikuasai",
      "Format formal sesuai standar lamaran guru/dosen",
    ],
  },
  {
    id: "cv-4",
    judul: "CV Lulusan Teknik Mesin",
    tipe: "CV",
    bidang: "Teknik & Industri",
    ringkasan: "CV lulusan teknik mesin dengan fokus pada pengalaman praktikum, proyek, dan sertifikasi teknis.",
    poin: [
      "Profil menekankan keahlian teknis dan pengalaman industri",
      "Pengalaman kerja praktik / KP di perusahaan manufaktur",
      "Proyek tugas akhir dengan deskripsi metode dan hasil",
      "Keahlian: AutoCAD, SolidWorks, CNC programming, welding inspection",
      "Sertifikasi: K3, ISO awareness, atau sertifikasi profesi lainnya",
    ],
    mengapaBarik: [
      "Keahlian teknis spesifik yang dicari industri",
      "Proyek dan magang ditampilkan dengan detail teknis",
      "Menunjukkan pemahaman standar industri dan keselamatan",
      "Cocok untuk melamar di perusahaan manufaktur dan oil & gas",
    ],
  },
  {
    id: "sl-1",
    judul: "Surat Lamaran IT / Software Engineer",
    tipe: "Surat Lamaran",
    bidang: "Teknologi Informasi",
    ringkasan: "Surat lamaran untuk posisi software engineer yang menghubungkan keahlian teknis dengan kebutuhan perusahaan.",
    poin: [
      "Pembuka: menyebutkan sumber info lowongan dan posisi spesifik",
      "Paragraf isi 1: latar belakang pendidikan + IPK relevan",
      "Paragraf isi 2: pengalaman magang + proyek dengan tech stack yang cocok",
      "Paragraf isi 3: motivasi bergabung yang spesifik ke perusahaan",
      "Penutup: harapan wawancara + terima kasih",
    ],
    mengapaBarik: [
      "Menyebutkan tech stack yang sesuai job description",
      "Setiap klaim didukung contoh konkret (proyek, magang)",
      "Menunjukkan riset tentang perusahaan, bukan template generik",
      "Panjang ideal: 1 halaman, 3-4 paragraf isi",
    ],
  },
  {
    id: "sl-2",
    judul: "Surat Lamaran Management Trainee",
    tipe: "Surat Lamaran",
    bidang: "Bisnis & Manajemen",
    ringkasan: "Surat lamaran untuk program MT yang menonjolkan kepemimpinan, adaptabilitas, dan potensi berkembang.",
    poin: [
      "Pembuka yang menunjukkan antusiasme terhadap program MT",
      "Pengalaman organisasi yang menunjukkan leadership dan teamwork",
      "Kemampuan analisis dan problem-solving dengan contoh nyata",
      "Kesiapan untuk rotasi dan penempatan di berbagai divisi",
      "Visi jangka panjang yang sejalan dengan perusahaan",
    ],
    mengapaBarik: [
      "Fokus pada potensi dan kemauan belajar, bukan hanya pengalaman",
      "Menunjukkan karakter yang cocok untuk program pengembangan",
      "Bahasa formal tapi tetap menunjukkan kepribadian",
      "Tidak mengulang isi CV, tapi memberikan konteks dan cerita",
    ],
  },
  {
    id: "sl-3",
    judul: "Surat Lamaran Guru / Pengajar",
    tipe: "Surat Lamaran",
    bidang: "Pendidikan",
    ringkasan: "Surat lamaran formal untuk posisi guru yang menonjolkan kompetensi pedagogik dan dedikasi mendidik.",
    poin: [
      "Pembuka menyebutkan posisi dan jenjang yang dilamar",
      "Latar belakang pendidikan keguruan dan relevansi bidang studi",
      "Pengalaman mengajar (PPL, privat, bimbel) dengan durasi",
      "Pendekatan mengajar yang digunakan dan alasannya",
      "Komitmen terhadap pengembangan siswa dan institusi",
    ],
    mengapaBarik: [
      "Bahasa sangat formal sesuai budaya institusi pendidikan",
      "Menekankan panggilan jiwa mendidik, bukan sekadar mencari kerja",
      "Menyebutkan kompetensi spesifik yang relevan dengan sekolah tujuan",
      "Memasukkan referensi/rekomendasi jika ada",
    ],
  },
];
