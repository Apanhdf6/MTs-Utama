import React, { useState } from 'react';
import { NewsItem, PPDBApplicant, Teacher } from '../types';
import { generateNewsContent } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Trash, Edit, Sparkles, Save, X, Search, CheckCircle, Clock, XCircle } from 'lucide-react';

// --- Dashboard Home ---

interface DashboardProps {
  ppdbCount: number;
  newsCount: number;
  applicants: PPDBApplicant[];
}

export const AdminDashboardHome: React.FC<DashboardProps> = ({ ppdbCount, newsCount, applicants }) => {
  const data = [
    { name: 'Gelombang 1', applicants: 45 },
    { name: 'Gelombang 2', applicants: 15 },
    { name: 'Kuota', applicants: 100 },
  ];

  const statusData = [
    { name: 'Diterima', value: applicants.filter(a => a.status === 'Diterima').length },
    { name: 'Pending', value: applicants.filter(a => a.status === 'Pending').length },
    { name: 'Ditolak', value: applicants.filter(a => a.status === 'Ditolak').length },
  ];
  const COLORS = ['#22c55e', '#eab308', '#ef4444'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Total Pendaftar</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{ppdbCount}</div>
          <div className="text-green-500 text-xs mt-1 flex items-center"><Plus size={12}/> 5 hari ini</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Artikel Berita</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{newsCount}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">Pengunjung Website</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">1,245</div>
          <div className="text-gray-400 text-xs mt-1">Minggu ini</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold mb-4 dark:text-white">Statistik Pendaftar</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }} />
                <Bar dataKey="applicants" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold mb-4 dark:text-white">Status Seleksi</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs dark:text-gray-300">
            {statusData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{backgroundColor: COLORS[index]}}></div>
                {entry.name}: {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- News Manager with AI ---

interface NewsManagerProps {
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

export const AdminNewsManager: React.FC<NewsManagerProps> = ({ news, setNews }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem>>({});
  
  // AI State
  const [aiTopic, setAiTopic] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handleSave = () => {
    if (currentNews.title && currentNews.content) {
      if (currentNews.id) {
        setNews(news.map(n => n.id === currentNews.id ? currentNews as NewsItem : n));
      } else {
        const newItem: NewsItem = {
          ...currentNews as NewsItem,
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          image: currentNews.image || 'https://picsum.photos/800/600'
        };
        setNews([newItem, ...news]);
      }
      setIsEditing(false);
      setCurrentNews({});
    }
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const content = await generateNewsContent(aiTopic, aiKeywords);
    setCurrentNews(prev => ({ ...prev, content: content }));
    setIsGenerating(false);
    setShowAiModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manajemen Berita</h2>
        <button onClick={() => { setCurrentNews({}); setIsEditing(true); }} className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700">
          <Plus size={18} /> Tambah Berita
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-4xl mx-auto animate-fade-in">
          <div className="flex justify-between mb-4">
             <h3 className="font-bold text-lg dark:text-white">{currentNews.id ? 'Edit Berita' : 'Tulis Berita Baru'}</h3>
             <button onClick={() => setIsEditing(false)}><X size={20} className="text-gray-400 hover:text-red-500"/></button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul</label>
              <input type="text" className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2" value={currentNews.title || ''} onChange={e => setCurrentNews({...currentNews, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
                <select className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2" value={currentNews.category || 'Berita'} onChange={e => setCurrentNews({...currentNews, category: e.target.value as any})}>
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Prestasi">Prestasi</option>
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Gambar</label>
                <input type="text" className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2" value={currentNews.image || ''} placeholder="https://..." onChange={e => setCurrentNews({...currentNews, image: e.target.value})} />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konten</label>
              <div className="absolute top-0 right-0 mt-7 mr-2">
                 <button onClick={() => setShowAiModal(true)} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded flex items-center hover:bg-purple-200">
                   <Sparkles size={12} className="mr-1"/> AI Writer
                 </button>
              </div>
              <textarea className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2 h-64" value={currentNews.content || ''} onChange={e => setCurrentNews({...currentNews, content: e.target.value})} />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"><Save size={18}/> Simpan</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {news.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex justify-between items-center transition-colors duration-300">
              <div className="flex items-center gap-4">
                <img src={item.image} alt="" className="w-16 h-16 rounded object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.date} • {item.category}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentNews(item); setIsEditing(true); }} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"><Edit size={18}/></button>
                <button onClick={() => setNews(news.filter(n => n.id !== item.id))} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"><Trash size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 flex items-center dark:text-white"><Sparkles className="mr-2 text-purple-600"/> AI Content Assistant</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Topik Berita</label>
                <input type="text" className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded p-2" placeholder="Misal: Kunjungan ke Museum" value={aiTopic} onChange={e => setAiTopic(e.target.value)}/>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Kata Kunci Utama</label>
                <input type="text" className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded p-2" placeholder="Misal: edukatif, sejarah, siswa antusias" value={aiKeywords} onChange={e => setAiKeywords(e.target.value)}/>
              </div>
              <button 
                onClick={handleGenerateAI} 
                disabled={isGenerating}
                className={`w-full py-2 rounded text-white font-medium ${isGenerating ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                {isGenerating ? 'Sedang Menulis...' : 'Buat Artikel'}
              </button>
              <button onClick={() => setShowAiModal(false)} className="w-full py-2 text-gray-500 dark:text-gray-400 text-sm hover:underline">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- PPDB Admin ---

export const AdminPPDB: React.FC<{ applicants: PPDBApplicant[], setApplicants: React.Dispatch<React.SetStateAction<PPDBApplicant[]>> }> = ({ applicants, setApplicants }) => {
  const updateStatus = (id: string, status: 'Diterima' | 'Ditolak') => {
    setApplicants(applicants.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Data Pendaftar PPDB</h2>
        <div className="relative">
          <input type="text" placeholder="Cari nama..." className="pl-10 pr-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg" />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Siswa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asal Sekolah</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kontak</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {applicants.map(applicant => (
              <tr key={applicant.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{applicant.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{applicant.previousSchool}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  <div className="text-xs">{applicant.email}</div>
                  <div className="text-xs">{applicant.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${applicant.status === 'Diterima' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      applicant.status === 'Ditolak' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {applicant.status === 'Pending' && (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => updateStatus(applicant.id, 'Diterima')} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"><CheckCircle size={20}/></button>
                      <button onClick={() => updateStatus(applicant.id, 'Ditolak')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"><XCircle size={20}/></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};