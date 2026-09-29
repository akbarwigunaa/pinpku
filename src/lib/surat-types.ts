export interface SuratLamaranData {
  pengirim: {
    nama: string;
    alamat: string;
    telepon: string;
    email: string;
  };
  tempatTanggal: {
    kota: string;
    tanggal: string;
  };
  tujuan: {
    namaHRD: string;
    jabatanHRD: string;
    namaPerusahaan: string;
    alamatPerusahaan: string;
  };
  perihal: string;
  pembuka: {
    sumberInfo: string;
    posisiDilamar: string;
    kalimatPembuka: string;
  };
  isi: {
    pendidikan: string;
    pengalaman: string;
    keahlian: string;
    motivasi: string;
  };
  penutup: {
    kalimatPenutup: string;
  };
}

export const emptySuratData: SuratLamaranData = {
  pengirim: { nama: "", alamat: "", telepon: "", email: "" },
  tempatTanggal: { kota: "", tanggal: "" },
  tujuan: { namaHRD: "", jabatanHRD: "", namaPerusahaan: "", alamatPerusahaan: "" },
  perihal: "Lamaran Pekerjaan",
  pembuka: {
    sumberInfo: "",
    posisiDilamar: "",
    kalimatPembuka: "",
  },
  isi: {
    pendidikan: "",
    pengalaman: "",
    keahlian: "",
    motivasi: "",
  },
  penutup: {
    kalimatPenutup: "",
  },
};
