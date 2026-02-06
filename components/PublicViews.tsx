import React, { useState } from 'react';
import { SCHOOL_MISSION, SCHOOL_VISION, SCHOOL_TAGLINE, PPDB_FAQS, SCHOOL_NAME } from '../constants';
import { NewsItem, Teacher, GalleryItem, PPDBApplicant } from '../types';
import { Calendar, CheckCircle, ChevronRight, GraduationCap, Trophy, Users, MapPin, Send, ShieldCheck, UserCheck, ChevronLeft } from 'lucide-react';

// --- Home ---
export const Home: React.FC<{ news: NewsItem[], onNavigate: any }> = ({ news, onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <div className="relative bg-primary-900 h-[500px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/1920/1080?random=99')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto" data-aos="zoom-in" data-aos-duration="1000">
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
            Selamat Datang di <br/> {SCHOOL_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 font-light">
            "{SCHOOL_TAGLINE}"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button onClick={() => onNavigate('PPDB')} className="px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full font-bold shadow-lg transition transform hover:-translate-y-1">
              Daftar PPDB Sekarang
            </button>
            <button onClick={() => onNavigate('PROFILE')} className="px-8 py-3 bg-white hover:bg-gray-100 text-primary-900 rounded-full font-bold shadow-lg transition">
              Profil Sekolah
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats/Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex items-center transition-colors duration-300" data-aos="fade-up" data-aos-delay="0">
            <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full mr-4 text-primary-600 dark:text-primary-400">
              <GraduationCap size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg dark:text-white">Kurikulum Terpadu</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Integrasi IPTEK dan IMTAQ</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex items-center transition-colors duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-full mr-4 text-secondary-600 dark:text-secondary-400">
              <Trophy size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg dark:text-white">Berprestasi</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Juara Tingkat Provinsi & Nasional</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex items-center transition-colors duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4 text-blue-600 dark:text-blue-400">
              <Users size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg dark:text-white">Ekstrakurikuler</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">20+ Pilihan Pengembangan Diri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8" data-aos="fade-right">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Kabar Terbaru</h2>
            <div className="h-1 w-20 bg-secondary-500 mt-2 rounded-full"></div>
          </div>
          <button onClick={() => onNavigate('NEWS')} className="text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 flex items-center">
            Lihat Semua <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.slice(0, 3).map((item, index) => (
            <div key={item.id} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-xs font-semibold text-secondary-600 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-900/50 px-2 py-1 rounded-full">{item.category}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{item.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{item.content}</p>
                <div className="mt-4 text-gray-400 dark:text-gray-500 text-xs">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Profile ---
export const Profile: React.FC<{ staff: Teacher[] }> = ({ staff }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
    <div className="text-center" data-aos="fade-down">
      <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Profil Sekolah</h2>
      <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Mengenal lebih dekat {SCHOOL_NAME}, tempat di mana karakter dibentuk dan prestasi diukir.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div data-aos="fade-right">
        <img src="https://picsum.photos/800/600?random=100" alt="Gedung Sekolah" className="rounded-2xl shadow-2xl" />
      </div>
      <div className="space-y-6" data-aos="fade-left">
        <div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-3">Visi</h3>
          <p className="text-gray-700 dark:text-gray-300 italic border-l-4 border-secondary-500 pl-4 bg-gray-50 dark:bg-gray-800 py-2 rounded-r">"{SCHOOL_VISION}"</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-3">Misi</h3>
          <ul className="space-y-2">
            {SCHOOL_MISSION.map((m, idx) => (
              <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                <CheckCircle size={20} className="text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-primary-900 dark:text-white mb-8 text-center" data-aos="fade-up">Guru & Staf Pengajar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staff.map((teacher, index) => (
          <div key={teacher.id} data-aos="flip-left" data-aos-delay={index * 100} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
            <img src={teacher.photo} alt={teacher.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-50 dark:border-primary-900" />
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{teacher.name}</h4>
            <p className="text-secondary-600 dark:text-secondary-400 font-medium">{teacher.subject}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{teacher.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- PPDB ---
export const PPDB: React.FC<{ onSubmit: (data: Omit<PPDBApplicant, 'id' | 'status' | 'submissionDate'>) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', previousSchool: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center" data-aos="zoom-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pendaftaran Berhasil!</h2>
        <p className="text-gray-600 dark:text-gray-300">Terima kasih telah mendaftar di {SCHOOL_NAME}. Panitia kami akan segera menghubungi Anda melalui WhatsApp/Email untuk tahapan selanjutnya.</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-primary-600 dark:text-primary-400 font-medium hover:underline">Kembali ke formulir</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12" data-aos="fade-up">
        <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-sm font-bold px-3 py-1 rounded-full">Tahun Ajaran 2026/2027</span>
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-4">Penerimaan Peserta Didik Baru</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Bergabunglah menjadi bagian dari keluarga besar MTs Utama.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div data-aos="fade-right">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-t-4 border-primary-500 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-6 flex items-center dark:text-white"><Calendar className="mr-2" /> Informasi Penting</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold text-primary-700 dark:text-primary-300 text-sm">Gelombang 1</h4>
                <p className="text-gray-600 dark:text-gray-300">1 Maret - 30 April 2026</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold text-primary-700 dark:text-primary-300 text-sm">Gelombang 2</h4>
                <p className="text-gray-600 dark:text-gray-300">1 Mei - 30 Juni 2026</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 mt-8 dark:text-white">FAQ</h3>
            <div className="space-y-4">
              {PPDB_FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 dark:border-gray-700 pb-2">
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{faq.question}</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-aos="fade-left">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Formulir Pendaftaran Online</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap Siswa</label>
                <input required type="text" className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asal Sekolah (SD/MI)</label>
                <input required type="text" className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" value={formData.previousSchool} onChange={e => setFormData({...formData, previousSchool: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Orang Tua</label>
                <input required type="email" className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor WhatsApp</label>
                <input required type="tel" className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full mt-8 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg shadow-lg transition flex items-center justify-center">
              <Send size={18} className="mr-2" /> Kirim Pendaftaran
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Contact ---
export const Contact: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center" data-aos="fade-down">Hubungi Kami</h2>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row" data-aos="zoom-in-up">
      <div className="w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-700 relative">
         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
           {/* Placeholder for Google Maps iframe */}
           <div className="text-center">
             <MapPin size={48} className="mx-auto mb-2 text-primary-500"/>
             <p>Google Maps Preview</p>
             <p className="text-xs">Jl. Pendidikan No. 123, Jakarta</p>
           </div>
         </div>
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-12 bg-primary-900 dark:bg-gray-900 text-white flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-6">Datang Berkunjung</h3>
        <p className="mb-6 text-primary-100">Kami sangat senang menyambut kedatangan Anda. Silakan hubungi kami untuk menjadwalkan kunjungan sekolah.</p>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="mr-4 mt-1 text-secondary-500" />
            <span>Jl. Pendidikan No. 123, Kelurahan Maju Jaya, Jakarta Selatan, 12345</span>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-secondary-500">📞</div>
            <span>(021) 555-0123</span>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-secondary-500">✉️</div>
            <span>info@mtsutama.sch.id</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Login View ---

interface LoginViewProps {
  onLogin: (role: 'admin' | 'guru' | 'siswa') => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'guru' | 'siswa' | null>(null);

  const RoleCard: React.FC<{ role: 'admin' | 'guru' | 'siswa', icon: React.ReactNode, title: string, desc: string }> = ({ role, icon, title, desc }) => (
    <div 
      onClick={() => setSelectedRole(role)}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-primary-500 flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );

  if (!selectedRole) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12" data-aos="fade-up">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Selamat Datang</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">Silakan pilih peran Anda untuk masuk ke sistem</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <RoleCard 
            role="siswa" 
            icon={<GraduationCap size={32} />} 
            title="Siswa / Wali" 
            desc="Akses nilai, jadwal, dan informasi akademik siswa." 
          />
          <RoleCard 
            role="guru" 
            icon={<UserCheck size={32} />} 
            title="Guru & Staf" 
            desc="Manajemen kelas, penilaian, dan administrasi sekolah." 
          />
          <RoleCard 
            role="admin" 
            icon={<ShieldCheck size={32} />} 
            title="Administrator" 
            desc="Pengaturan sistem, website, dan manajemen user." 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4" data-aos="flip-right">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full transition-colors duration-300 relative">
        <button 
          onClick={() => setSelectedRole(null)} 
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title="Kembali"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center mb-6 mt-2">
          <div className="inline-block p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-3">
             {selectedRole === 'admin' && <ShieldCheck size={32} />}
             {selectedRole === 'guru' && <UserCheck size={32} />}
             {selectedRole === 'siswa' && <GraduationCap size={32} />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">Login {selectedRole}</h2>
        </div>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder={selectedRole === 'siswa' ? 'NISN' : selectedRole === 'guru' ? 'NIP' : 'Username'} 
            className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all" 
          />
          <button 
            onClick={() => onLogin(selectedRole)} 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};