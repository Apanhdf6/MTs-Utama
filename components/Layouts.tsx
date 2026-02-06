import React from 'react';
import { ViewState } from '../types';
import { Menu, X, Facebook, Instagram, Youtube, Phone, MapPin, Mail, LogIn, LayoutDashboard, FileText, Users, Settings, LogOut, Moon, Sun } from 'lucide-react';

// --- Public Layout Components ---

interface PublicNavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ currentView, onNavigate, isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItemClass = (view: ViewState) => 
    `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentView === view 
        ? 'bg-primary-600 text-white' 
        : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('HOME')}>
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2">M</div>
              <span className="font-display font-bold text-xl text-primary-900 dark:text-white">MTs Utama</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <a onClick={() => onNavigate('HOME')} className={navItemClass('HOME')}>Beranda</a>
            <a onClick={() => onNavigate('PROFILE')} className={navItemClass('PROFILE')}>Profil</a>
            <a onClick={() => onNavigate('ACADEMIC')} className={navItemClass('ACADEMIC')}>Akademik</a>
            <a onClick={() => onNavigate('NEWS')} className={navItemClass('NEWS')}>Berita</a>
            <a onClick={() => onNavigate('PPDB')} className={`ml-2 px-4 py-2 rounded-full font-bold shadow-md transition-transform transform hover:scale-105 ${currentView === 'PPDB' ? 'bg-secondary-600 text-white' : 'bg-secondary-500 text-white hover:bg-secondary-600'}`}>PPDB 2026</a>
            <a onClick={() => onNavigate('CONTACT')} className={navItemClass('CONTACT')}>Kontak</a>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="ml-2 p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button onClick={() => onNavigate('LOGIN')} className="ml-2 p-2 text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"><LogIn size={20}/></button>
          </div>

          <div className="-mr-2 flex md:hidden items-center">
             <button 
              onClick={toggleDarkMode} 
              className="p-2 mr-2 rounded-full text-gray-500 dark:text-gray-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a onClick={() => { onNavigate('HOME'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Beranda</a>
            <a onClick={() => { onNavigate('PROFILE'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Profil</a>
            <a onClick={() => { onNavigate('ACADEMIC'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Akademik</a>
            <a onClick={() => { onNavigate('NEWS'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Berita</a>
            <a onClick={() => { onNavigate('PPDB'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium bg-secondary-500 text-white">PPDB</a>
            <a onClick={() => { onNavigate('CONTACT'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Kontak</a>
            <a onClick={() => { onNavigate('LOGIN'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export const PublicFooter: React.FC = () => (
  <footer className="bg-primary-900 dark:bg-gray-900 text-white pt-10 pb-6 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div data-aos="fade-up">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary-900 font-bold mr-2">M</div>
          <span className="font-display font-bold text-xl">MTs Utama</span>
        </div>
        <p className="text-primary-100 text-sm mb-4">
          Membangun generasi cerdas, berakhlak, dan berprestasi untuk masa depan yang gemilang.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-primary-200 hover:text-white"><Facebook size={20} /></a>
          <a href="#" className="text-primary-200 hover:text-white"><Instagram size={20} /></a>
          <a href="#" className="text-primary-200 hover:text-white"><Youtube size={20} /></a>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <h3 className="font-bold text-lg mb-4">Kontak Kami</h3>
        <ul className="space-y-2 text-sm text-primary-100">
          <li className="flex items-center"><MapPin size={16} className="mr-2" /> Jl. Pendidikan No. 123, Jakarta</li>
          <li className="flex items-center"><Phone size={16} className="mr-2" /> (021) 555-0123</li>
          <li className="flex items-center"><Mail size={16} className="mr-2" /> info@mtsutama.sch.id</li>
        </ul>
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <h3 className="font-bold text-lg mb-4">Jam Operasional</h3>
        <ul className="space-y-2 text-sm text-primary-100">
          <li>Senin - Jumat: 07:00 - 15:00</li>
          <li>Sabtu: 07:00 - 12:00</li>
          <li>Minggu: Libur</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-primary-800 text-center text-sm text-primary-300">
      &copy; 2026 MTs Utama. All rights reserved.
    </div>
  </footer>
);

// --- Admin Layout Components ---

interface AdminSidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, onNavigate, isDarkMode, toggleDarkMode }) => {
  const menuItemClass = (view: ViewState) =>
    `flex items-center w-full px-4 py-3 text-sm font-medium transition-colors ${
      currentView === view
        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-r-4 border-primary-600'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen sticky top-0 transition-colors duration-300">
      <div className="p-6 border-b dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold mr-2">A</div>
          <span className="font-bold text-gray-800 dark:text-gray-100">Admin</span>
        </div>
         <button 
          onClick={toggleDarkMode} 
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
      <nav className="flex-1 pt-4">
        <button onClick={() => onNavigate('ADMIN_DASHBOARD')} className={menuItemClass('ADMIN_DASHBOARD')}>
          <LayoutDashboard size={20} className="mr-3" /> Dashboard
        </button>
        <button onClick={() => onNavigate('ADMIN_NEWS')} className={menuItemClass('ADMIN_NEWS')}>
          <FileText size={20} className="mr-3" /> Manajemen Konten
        </button>
        <button onClick={() => onNavigate('ADMIN_PPDB')} className={menuItemClass('ADMIN_PPDB')}>
          <Users size={20} className="mr-3" /> Data PPDB
        </button>
        <button onClick={() => onNavigate('ADMIN_STAFF')} className={menuItemClass('ADMIN_STAFF')}>
          <Users size={20} className="mr-3" /> Guru & Staf
        </button>
      </nav>
      <div className="p-4 border-t dark:border-gray-700">
        <button onClick={() => onNavigate('HOME')} className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
          <LogOut size={20} className="mr-3" /> Keluar
        </button>
      </div>
    </div>
  );
};