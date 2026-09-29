export interface PersonalInfo {
  namaLengkap: string;
  email: string;
  telepon: string;
  alamat: string;
  linkedIn: string;
  deskripsi: string;
}

export interface Pendidikan {
  id: string;
  institusi: string;
  jurusan: string;
  jenjang: string;
  tahunMasuk: string;
  tahunLulus: string;
  ipk: string;
}

export interface Pengalaman {
  id: string;
  perusahaan: string;
  posisi: string;
  lokasi: string;
  mulai: string;
  selesai: string;
  masihBekerja: boolean;
  deskripsi: string;
}

export interface Keahlian {
  id: string;
  nama: string;
  kategori: string;
}

export interface Organisasi {
  id: string;
  nama: string;
  posisi: string;
  tahunMulai: string;
  tahunSelesai: string;
  deskripsi: string;
}

export interface Sertifikasi {
  id: string;
  nama: string;
  penerbit: string;
  tahun: string;
}

export interface CVData {
  personal: PersonalInfo;
  pendidikan: Pendidikan[];
  pengalaman: Pengalaman[];
  keahlian: Keahlian[];
  organisasi: Organisasi[];
  sertifikasi: Sertifikasi[];
  templateId: string;
}

export const emptyCVData: CVData = {
  personal: {
    namaLengkap: "",
    email: "",
    telepon: "",
    alamat: "",
    linkedIn: "",
    deskripsi: "",
  },
  pendidikan: [],
  pengalaman: [],
  keahlian: [],
  organisasi: [],
  sertifikasi: [],
  templateId: "classic",
};

export function generateId() {
  return Math.random().toString(36).slice(2, 10);
}
