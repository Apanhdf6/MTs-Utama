export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Berita' | 'Pengumuman' | 'Prestasi';
  content: string;
  image: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  photo: string;
  bio: string;
}

export interface PPDBApplicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  previousSchool: string;
  status: 'Pending' | 'Diterima' | 'Ditolak';
  submissionDate: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ViewState = 'HOME' | 'PROFILE' | 'ACADEMIC' | 'PPDB' | 'NEWS' | 'CONTACT' | 'LOGIN' | 'ADMIN_DASHBOARD' | 'ADMIN_NEWS' | 'ADMIN_PPDB' | 'ADMIN_STAFF';
