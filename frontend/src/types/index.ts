// Register
export interface RegisterData {
   id: number;
   name: string;
   email: string;
   password: string;
   created_at: string;
   updated_at: string;
}

export interface RegisterResponse {
   status: boolean;
   message: string;
   data: RegisterData;
}

// Login
export interface LoginData {
   id: number;
   name: string;
   email: string;
   email_verified_at?: string;
   password: string;
   created_at: string;
   updated_at: string;
}

export interface LoginResponse {
   status: boolean;
   message: string;
   data: LoginData;
   token: string;
}

// Siswa
export interface Siswa {
   id: number;
   nis: string;
   nama: string;
   kelas_id: number;
   jenis_kelamin: string;
   tanggal_lahir: string;
   alamat: string;
}

export interface SiswaResponse {
   status: boolean;
   message: string;
   data: Siswa;
}

// Generic
export interface GenericResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export type MenuItem = {
   href: string;
   label: string;
   description: string;
   icon: any;
}

export interface Dudi {
   id: number;
   nama_perusahaan: string;
   alamat: string;
   telepon: string;
   email: string;
   penanggung_jawab: string;
}

export interface Guru {
   id: number;
   user_id: number;
   nama: string;
   nip: string;
   alamat: string;
   telepon: string;
}

export interface DataMagang {
   id: number;
   siswa: Siswa;
   dudi: Dudi;
   guru: Guru;
   status: string;
   periode_mulai: string;
   periode_selesai: string;
}

export interface DataLogbook {
   id: number;
   magang: DataMagang;
   tanggal: string;
   kegiatan: string;
   kendala: string;
   file: string | null;
   status_verifikasi: string;
   catatan_guru: string | null;
   catatan_dudi: string | null;
}