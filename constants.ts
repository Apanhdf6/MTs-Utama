import { FAQ, NewsItem, Teacher, GalleryItem } from './types';

// Bagian 1: Konten yang Perlu Dihasilkan

export const SCHOOL_NAME = "MTs Utama";
export const SCHOOL_TAGLINE = "Membangun Generasi Cerdas, Berakhlak, dan Berprestasi.";

export const SCHOOL_VISION = "Menjadi madrasah unggulan yang mencetak generasi Islami yang kompetitif, berwawasan global, dan berakhlakul karimah pada tahun 2030.";

export const SCHOOL_MISSION = [
  "Menyelenggarakan pendidikan yang mengintegrasikan nilai-nilai keislaman dan ilmu pengetahuan umum.",
  "Mengembangkan potensi siswa melalui kegiatan akademik dan non-akademik yang inovatif.",
  "Mewujudkan lingkungan sekolah yang asri, ramah anak, dan kondusif untuk pembelajaran.",
  "Meningkatkan profesionalisme tenaga pendidik dan kependidikan.",
  "Membangun kemitraan strategis dengan orang tua dan masyarakat."
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: "Siswa MTs Utama Raih Emas di Olimpiade Sains Nasional",
    date: "2026-05-15",
    category: "Prestasi",
    content: "Alhamdulillah, siswa kami Budi Santoso berhasil mengharumkan nama sekolah dengan meraih medali emas pada ajang OSN tingkat nasional bidang Matematika.",
    image: "https://picsum.photos/800/600?random=1"
  },
  {
    id: '2',
    title: "Kunjungan Edukatif ke Museum Nasional",
    date: "2026-05-10",
    category: "Berita",
    content: "Kelas 8 melakukan kunjungan belajar ke Museum Nasional untuk mempelajari sejarah nusantara secara langsung.",
    image: "https://picsum.photos/800/600?random=2"
  },
  {
    id: '3',
    title: "Peringatan Maulid Nabi Muhammad SAW",
    date: "2026-04-20",
    category: "Berita",
    content: "Acara dimeriahkan dengan lomba hadroh dan ceramah agama yang diikuti oleh seluruh warga sekolah.",
    image: "https://picsum.photos/800/600?random=3"
  },
  {
    id: '4',
    title: "Sosialisasi PPDB Tahun Ajaran Baru Dimulai",
    date: "2026-04-01",
    category: "Pengumuman",
    content: "Penerimaan Peserta Didik Baru (PPDB) telah resmi dibuka. Segera daftarkan putra-putri Anda melalui website atau datang langsung ke sekolah.",
    image: "https://picsum.photos/800/600?random=4"
  },
  {
    id: '5',
    title: "Pelatihan Guru: Implementasi Kurikulum Merdeka",
    date: "2026-03-15",
    category: "Berita",
    content: "Guru-guru MTs Utama mengikuti workshop intensif selama 3 hari untuk mematangkan persiapan Kurikulum Merdeka.",
    image: "https://picsum.photos/800/600?random=5"
  }
];

export const PPDB_FAQS: FAQ[] = [
  {
    question: "Kapan pendaftaran siswa baru dibuka?",
    answer: "Pendaftaran gelombang pertama dibuka mulai 1 Maret hingga 30 April. Gelombang kedua akan dibuka jika kuota masih tersedia."
  },
  {
    question: "Apa saja syarat berkas yang harus dibawa?",
    answer: "Berkas yang diperlukan meliputi fotokopi KK, Akta Kelahiran, Ijazah/SKL SD/MI yang dilegalisir, dan pas foto 3x4 sebanyak 4 lembar."
  },
  {
    question: "Apakah ada beasiswa untuk siswa berprestasi?",
    answer: "Ya, MTs Utama menyediakan beasiswa bebas SPP selama 6 bulan bagi siswa yang memiliki prestasi akademik (ranking 1-3 di SD) atau prestasi non-akademik tingkat kota/kabupaten."
  }
];

export const INITIAL_STAFF: Teacher[] = [
  { id: '1', name: 'Ahmad Dahlan, S.Pd', subject: 'Matematika', photo: 'https://picsum.photos/200/200?random=10', bio: 'Guru teladan tahun 2025.' },
  { id: '2', name: 'Siti Aminah, M.Ag', subject: 'Fiqih', photo: 'https://picsum.photos/200/200?random=11', bio: 'Lulusan terbaik UIN Jakarta.' },
  { id: '3', name: 'Budi Prakoso, S.Or', subject: 'PJOK', photo: 'https://picsum.photos/200/200?random=12', bio: 'Pelatih futsal berlisensi nasional.' },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', type: 'image', url: 'https://picsum.photos/600/400?random=20', caption: 'Kegiatan Upacara Senin' },
  { id: '2', type: 'image', url: 'https://picsum.photos/600/400?random=21', caption: 'Laboratorium Komputer' },
  { id: '3', type: 'image', url: 'https://picsum.photos/600/400?random=22', caption: 'Ekskul Pramuka' },
  { id: '4', type: 'image', url: 'https://picsum.photos/600/400?random=23', caption: 'Perpustakaan Digital' },
];