import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, PlayCircle, BookOpen, Lock, Eye, Shield, AlertCircle, Search, X, ChevronDown } from 'lucide-react';
import { list as fetchMaterials } from '../services/materialService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const FMGE_SUBJECTS = [
  'All FMGE', 'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology',
  'Microbiology', 'Forensic Medicine', 'Community Medicine (PSM)', 'General Medicine',
  'General Surgery', 'Obstetrics & Gynecology', 'Pediatrics', 'Ophthalmology',
  'ENT', 'Orthopedics', 'Dermatology', 'Psychiatry', 'Radiology', 'Anesthesia'
];

export default function MaterialsPage() {
  const [filter, setFilter] = useState('All');
  const [fmgeSubject, setFmgeSubject] = useState('All FMGE');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const categories = ['All', 'FMGE', 'IELTS', 'TOEFL', 'GRE', 'SAT', 'GMAT'];

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    fetchMaterials(filter === 'All' ? '' : filter)
      .then(res => {
        if (!canceled) setMaterials(res.data || []);
      })
      .catch(() => {})
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, [filter]);

  // build filtered list based on FMGE subject and search
  let filteredMaterials = [...materials];
  if (filter === 'FMGE' && fmgeSubject !== 'All FMGE') {
    filteredMaterials = filteredMaterials.filter(m => m.subject === fmgeSubject);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredMaterials = filteredMaterials.filter(m =>
      m.title.toLowerCase().includes(q) ||
      (m.subject || '').toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    );
  }

  // Prevent screenshots
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p') || (e.ctrlKey && e.shiftKey && (e.key === 's' || e.key === 'S'))) {
        e.preventDefault();
        alert('Screenshots and printing are not allowed for study materials.');
        return false;
      }
    };
    const handleContextMenu = (e) => {
      if (selectedMaterial) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [selectedMaterial]);

  const fmgeCount = materials.filter(m => m.category === 'FMGE').length;
  // use filteredMaterials for rendering

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5 no-screenshot no-print">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Study Materials</h2>
        <p className="text-gray-500 text-sm mt-0.5">Free resources to ace your exams \u2022 View online only \u2022 Downloads not available</p>
      </motion.div>

      {/* Security Notice */}
      <motion.div variants={staggerItem} className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Protected Content</p>
          <p className="text-xs text-amber-700">Materials are view-only. Downloads, screenshots, and printing are prohibited to protect content integrity.</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={staggerItem} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search materials by title, subject..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 shadow-xs transition-all duration-200"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-150" aria-label="Clear">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </motion.div>

      {/* Category Filters */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => { setFilter(c); setFmgeSubject('All FMGE'); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === c ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {c}
            {c === 'FMGE' && <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-sm text-[10px] font-bold">{fmgeCount}</span>}
          </button>
        ))}
      </motion.div>

      {/* FMGE Subject Filter */}
      <AnimatePresence>
        {filter === 'FMGE' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">FMGE Subjects (19 Subjects)</p>
              <div className="flex flex-wrap gap-1.5">
                {FMGE_SUBJECTS.map(sub => (
                  <button
                    key={sub}
                    onClick={() => setFmgeSubject(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${fmgeSubject === sub ? 'bg-orange-500 text-white shadow-xs' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <motion.div variants={staggerItem}>
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{filteredMaterials.length}</span> material{filteredMaterials.length !== 1 ? 's' : ''} available
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading materials...</div>
      ) : filteredMaterials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No materials found</h3>
          <p className="text-sm text-gray-500">Try a different filter or search term</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMaterials.map(mat => (
            <motion.div
              key={mat.id}
              variants={staggerItem}
              whileHover={{ x: 3 }}
              className="bg-white rounded-2xl p-5 border border-gray-100/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mat.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-purple-50 text-purple-500'}`}>
                {mat.type === 'PDF' ? <FileText className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate">{mat.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                  <span>{mat.type}</span>
                  <span>{mat.size}</span>
                  <span>{mat.downloads.toLocaleString()} views</span>
                  {mat.subject && (
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-sm text-[10px] font-bold">{mat.subject}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedMaterial(mat)}
                className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-lg shadow-orange-500/20"
              >
                {mat.type === 'Video' ? <PlayCircle className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {mat.type === 'Video' ? 'Watch' : 'View'}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* View Material Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={() => setSelectedMaterial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] no-screenshot flex flex-col"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedMaterial.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-purple-50 text-purple-500'}`}>
                    {selectedMaterial.type === 'PDF' ? <FileText className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedMaterial.title}</h3>
                    <p className="text-xs text-gray-400">{selectedMaterial.category} {selectedMaterial.subject ? `\u2022 ${selectedMaterial.subject}` : ''} \u2022 {selectedMaterial.size}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMaterial(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Close">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                {selectedMaterial.type === 'Video' && selectedMaterial.videoUrl ? (
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={selectedMaterial.videoUrl.replace('watch?v=', 'embed/')}
                      title={selectedMaterial.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                      <Eye className="w-8 h-8 text-orange-500" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">View-Only Content</h4>
                    <p className="text-sm text-gray-500 max-w-sm mb-6">This content is protected and available for online viewing only. Screenshots and downloads are disabled.</p>

                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                        <Lock className="w-3 h-3" />No Downloads
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-100">
                        <Shield className="w-3 h-3" />Protected
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-amber-800">Content Protection</p>
                    <p className="text-xs text-amber-700 mt-1">This material is intellectual property protected. Any attempt to record, download, or distribute this content is strictly prohibited.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
