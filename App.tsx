import React, { useState, useEffect } from 'react';
import { ViewState, NewsItem, PPDBApplicant } from './types';
import { INITIAL_NEWS, INITIAL_STAFF } from './constants';
import { PublicNavbar, PublicFooter, AdminSidebar } from './components/Layouts';
import { Home, Profile, PPDB, Contact, LoginView } from './components/PublicViews';
import { AdminDashboardHome, AdminNewsManager, AdminPPDB } from './components/AdminViews';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize AOS and Dark Mode
  useEffect(() => {
    // Check local storage or system preference for dark mode
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Initialize AOS
    // @ts-ignore
    if (typeof window.AOS !== 'undefined') {
       // @ts-ignore
      window.AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        duration: 800, // values from 0 to 3000, with step 50ms
      });
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Application Data State (Acting as a mock database)
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [applicants, setApplicants] = useState<PPDBApplicant[]>([
    { id: '1', name: 'Rina Aulia', previousSchool: 'SDN 01 Pagi', email: 'rina@mail.com', phone: '0812345678', status: 'Pending', submissionDate: '2024-03-01' },
    { id: '2', name: 'Dimas Anggara', previousSchool: 'MI Al-Huda', email: 'dimas@mail.com', phone: '0812999888', status: 'Diterima', submissionDate: '2024-02-28' },
    { id: '3', name: 'Siti Nurhaliza', previousSchool: 'SD Pelita', email: 'siti@mail.com', phone: '0856777111', status: 'Ditolak', submissionDate: '2024-02-25' },
  ]);

  const isAdmin = currentView.startsWith('ADMIN');

  const handlePPDBSubmit = (data: Omit<PPDBApplicant, 'id' | 'status' | 'submissionDate'>) => {
    const newApplicant: PPDBApplicant = {
      ...data,
      id: Date.now().toString(),
      status: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0]
    };
    setApplicants([newApplicant, ...applicants]);
    // Simulate notification in Admin console logic (would use Toast in real app)
    console.log("New Applicant Notification:", newApplicant.name);
  };

  const handleLogin = (role: 'admin' | 'guru' | 'siswa') => {
    if (role === 'admin' || role === 'guru') {
      // Untuk demo, guru juga masuk ke dashboard admin dulu
      setCurrentView('ADMIN_DASHBOARD');
    } else {
      alert("Portal Siswa saat ini sedang dalam pengembangan. Silakan hubungi tata usaha untuk informasi akademik.");
    }
  };

  const renderPublicContent = () => {
    switch (currentView) {
      case 'HOME': return <Home news={news} onNavigate={setCurrentView} />;
      case 'PROFILE': return <Profile staff={staff} />;
      case 'ACADEMIC': return <div className="p-20 text-center text-gray-500 dark:text-gray-400">Halaman Akademik (Kurikulum & Fasilitas) - Sedang dalam pengembangan</div>;
      case 'NEWS': return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Berita & Pengumuman</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
                <div key={item.id} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <span className="text-xs font-semibold text-secondary-600 dark:text-secondary-400 bg-secondary-50 dark:bg-secondary-900/50 px-2 py-1 rounded-full">{item.category}</span>
                    <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{item.content}</p>
                    <div className="mt-4 text-gray-400 dark:text-gray-500 text-xs">{item.date}</div>
                </div>
                </div>
            ))}
            </div>
        </div>
      );
      case 'PPDB': return <PPDB onSubmit={handlePPDBSubmit} />;
      case 'CONTACT': return <Contact />;
      case 'LOGIN': return <LoginView onLogin={handleLogin} />;
      default: return <Home news={news} onNavigate={setCurrentView} />;
    }
  };

  const renderAdminContent = () => {
    switch (currentView) {
      case 'ADMIN_DASHBOARD': return <AdminDashboardHome ppdbCount={applicants.length} newsCount={news.length} applicants={applicants} />;
      case 'ADMIN_NEWS': return <AdminNewsManager news={news} setNews={setNews} />;
      case 'ADMIN_PPDB': return <AdminPPDB applicants={applicants} setApplicants={setApplicants} />;
      case 'ADMIN_STAFF': return <div className="p-6 dark:text-white">Halaman Manajemen Guru (Demo Mode)</div>;
      default: return <AdminDashboardHome ppdbCount={applicants.length} newsCount={news.length} applicants={applicants} />;
    }
  };

  if (isAdmin) {
    return (
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <AdminSidebar currentView={currentView} onNavigate={setCurrentView} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 overflow-y-auto h-screen">
          {/* Admin Mobile Header could go here */}
          <div className="md:hidden p-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center sticky top-0 z-20">
             <span className="font-bold dark:text-white">Admin Panel</span>
             <button onClick={() => setCurrentView('HOME')} className="text-red-500 text-sm">Keluar</button>
          </div>
          {renderAdminContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar currentView={currentView} onNavigate={setCurrentView} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        {renderPublicContent()}
      </main>
      <PublicFooter />
    </div>
  );
};

export default App;