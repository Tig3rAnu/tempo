import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, GraduationCap, Globe, BookOpen, DollarSign, Award,
  Star, Filter, ChevronDown, X, SlidersHorizontal, Plus, Check, Upload,
  History, User, Image, Cloud, Coins, Bus, Bed, Phone, MapPin, Mail, Trophy, FileCheck
} from 'lucide-react';
import { list as fetchUniversities, create as createUniversity } from '../services/universityService.js';

const RANKING_RANGES = [
  { label: 'All Rankings', min: 0, max: 999 },
  { label: 'Top 5', min: 1, max: 5 },
  { label: 'Top 10', min: 1, max: 10 },
  { label: 'Top 25', min: 1, max: 25 },
  { label: 'Top 50', min: 1, max: 50 },
  { label: 'Top 100', min: 1, max: 100 },
  { label: 'Top 500', min: 1, max: 500 },
];
const EXPENDITURE_RANGES = [
  { label: 'All Budgets', min: 0, max: Infinity },
  { label: 'Under $5,000/yr', min: 0, max: 5000 },
  { label: 'Under $10,000/yr', min: 0, max: 10000 },
  { label: 'Under $15,000/yr', min: 0, max: 15000 },
  { label: '$15,000 - $30,000/yr', min: 15000, max: 30000 },
  { label: '$30,000 - $50,000/yr', min: 30000, max: 50000 },
  { label: 'Over $50,000/yr', min: 50000, max: Infinity },
];
const SORT_OPTIONS = [
  { label: 'Ranking (Best)', value: 'ranking-asc' },
  { label: 'Ranking (Lowest)', value: 'ranking-desc' },
  { label: 'Cost (Low → High)', value: 'expenditure-asc' },
  { label: 'Cost (High → Low)', value: 'expenditure-desc' },
  { label: 'Rating (Best)', value: 'rating-desc' },
  { label: 'Name (A-Z)', value: 'name-asc' },
];

const COUNTRY_FLAGS = {
  'Russia': '🇷🇺', 'Kyrgyzstan': '🇰🇬', 'Uzbekistan': '🇺🇿', 'Georgia': '🇬🇪',
  'Tajikistan': '🇹🇯', 'Azerbaijan': '🇦🇿', 'United States': '🇺🇸', 'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦', 'Australia': '🇦🇺', 'Singapore': '🇸🇬', 'Switzerland': '🇨🇭',
  'Japan': '🇯🇵', 'Germany': '🇩🇪', 'India': '🇮🇳', 'China': '🇨🇳', 'France': '🇫🇷',
  'South Korea': '🇰🇷', 'Turkey': '🇹🇷', 'Kazakhstan': '🇰🇿', 'Ukraine': '🇺🇦',
};

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

function UniversityDetailModal({ uni, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('about');
  if (!isOpen || !uni) return null;

  const tabs = [
    { id: 'about', label: 'About & Rector', icon: History },
    { id: 'campus', label: 'Campus & Hostel', icon: Bed },
    { id: 'city', label: 'City & Cost', icon: MapPin },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'info', label: 'Info & Contact', icon: FileCheck },
  ];

  // Defaults for missing data
  const safeAbout = uni.about || { history: 'History not available.', today: 'Information pending.', description: 'Details coming soon.' };
  const safeRector = uni.rector || { name: 'Rector', message: 'Welcome to our university.', image: null };
  const safeCity = uni.cityDetails || { name: uni.country, climate: { summer: '25°C', winter: '5°C' }, currency: { code: 'USD', rateToUSD: 1 }, costOfLiving: [] };
  const safeHostel = uni.hostel || { availability: 'Yes', costPerYear: '$500', studentsPerRoom: '2-4', description: 'Standard hostel accommodation.', images: [] };
  const safeGallery = uni.gallery || [];
  const safeTransport = uni.transport || { options: ['Bus'], details: 'Public transport available.', cost: '$10/month' };
  const safeContact = uni.contact || { address: 'Main Campus', phone: 'Contact University', email: 'admissions@uni.edu', website: '#' };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Header */}
          <div className="relative h-48 sm:h-64 bg-gray-900">
            <img src={uni.image} alt={uni.name} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"><X className="w-6 h-6" /></button>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-orange-500/90 rounded-lg text-xs font-bold">{uni.type}</span>
                    <span className="px-3 py-1 bg-blue-500/90 rounded-lg text-xs font-bold flex items-center gap-1"><Globe className="w-3 h-3" />{uni.country}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">{uni.name}</h2>
                  <p className="text-white/80 text-sm mt-1 max-w-2xl">{safeAbout.description}</p>
                </div>
                <div className="flex gap-3">
                  <div className="text-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <p className="text-xs text-white/60 uppercase font-bold">World Rank</p>
                    <p className="text-xl font-black">#{uni.worldRanking}</p>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <p className="text-xs text-white/60 uppercase font-bold">Rating</p>
                    <p className="text-xl font-black flex items-center justify-center gap-1">{uni.rating}<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white border-b border-gray-100 flex overflow-x-auto custom-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id ? 'border-orange-500 text-orange-600 bg-orange-50/50' : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
              >
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {activeTab === 'about' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><History className="w-5 h-5 text-orange-500" />University History</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{safeAbout.history}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><Building2 className="w-5 h-5 text-blue-500" />University Today</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{safeAbout.today}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 text-center">
                          <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full overflow-hidden border-4 border-white/10 mb-4">
                            {safeRector.image ? <img src={safeRector.image} alt={safeRector.name} className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-gray-400 m-6" />}
                          </div>
                          <h4 className="text-lg font-bold">{safeRector.name}</h4>
                          <p className="text-xs text-white/50 uppercase tracking-wider mb-4">Rector's Word</p>
                          <p className="text-sm text-white/80 italic">"{safeRector.message}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'campus' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Bed className="w-5 h-5 text-orange-500" />Hostel Facilities</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-600">Availability</span>
                            <span className="text-sm font-bold text-green-600">{safeHostel.availability}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-600">Cost per Year</span>
                            <span className="text-sm font-bold text-gray-900">{safeHostel.costPerYear}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-600">Occupancy</span>
                            <span className="text-sm font-bold text-gray-900">{safeHostel.studentsPerRoom} students/room</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{safeHostel.description}</p>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Bus className="w-5 h-5 text-blue-500" />Transport</h3>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {safeTransport.options.map(opt => <span key={opt} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">{opt}</span>)}
                          </div>
                          <p className="text-sm text-gray-600">{safeTransport.details}</p>
                          <div className="p-3 bg-blue-50 rounded-xl flex items-center gap-3">
                            <Coins className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="text-xs text-blue-600 font-bold uppercase">Est. Transport Cost</p>
                              <p className="text-sm font-bold text-gray-900">{safeTransport.cost}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {safeHostel.images && safeHostel.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {safeHostel.images.map((img, i) => (
                          <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-xs">
                            <img src={img} alt="Hostel" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'city' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Cloud className="w-5 h-5 text-blue-400" />Climate: {safeCity.name}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-orange-50 rounded-xl text-center">
                            <p className="text-xs text-orange-600 font-bold uppercase">Summer</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">{safeCity.climate.summer}</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-xl text-center">
                            <p className="text-xs text-blue-600 font-bold uppercase">Winter</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">{safeCity.climate.winter}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">{safeCity.climate.description}</p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Coins className="w-5 h-5 text-yellow-500" />Currency</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-xl">
                          <div>
                            <p className="text-sm font-bold">{safeCity.currency.name}</p>
                            <p className="text-xs text-gray-400">{safeCity.currency.code} ({safeCity.currency.symbol})</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Exchange Rate</p>
                            <p className="text-lg font-bold">1 USD ≈ {Math.round(1/safeCity.currency.rateToUSD)} {safeCity.currency.code}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-500" />Cost of Living (Avg.)</h3>
                      <div className="space-y-3">
                        {safeCity.costOfLiving.map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-sm font-medium text-gray-700">{item.item}</span>
                            <span className="text-sm font-bold text-gray-900">{item.price}</span>
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-center">
                          <p className="text-xs text-emerald-700 font-medium">Prices are estimates for basic student lifestyle</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="space-y-6">
                    {safeGallery.length === 0 ? <p className="text-center text-gray-500 py-10">No images available.</p> : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {safeGallery.map((item, i) => (
                          <div key={i} className="group relative rounded-2xl overflow-hidden shadow-xs aspect-4/3">
                            <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <p className="text-white font-medium text-sm">{item.caption}</p>
                              {item.type === 'certificate' && <span className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm">CERT</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'info' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" />Rankings & Accreditation</h3>
                        <div className="flex gap-4 mb-6">
                          <div className="flex-1 p-4 bg-gray-50 rounded-xl text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold">World Rank</p>
                            <p className="text-2xl font-black text-gray-900">#{uni.worldRanking}</p>
                          </div>
                          <div className="flex-1 p-4 bg-gray-50 rounded-xl text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold">Country Rank</p>
                            <p className="text-2xl font-black text-gray-900">#{uni.countryRanking || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recognitions</p>
                          <div className="flex flex-wrap gap-2">
                            {(uni.accreditation || ['WHO', 'Intl. Recognized']).map(acc => (
                              <span key={acc} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">{acc}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-green-500" />Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">Address</p>
                            <p className="text-sm text-gray-600">{safeContact.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">Phone</p>
                            <p className="text-sm text-gray-600">{safeContact.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">Email</p>
                            <p className="text-sm text-gray-600">{safeContact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">Website</p>
                            <a href={safeContact.website} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Visit Official Site</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-white flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Close</button>
            <button className="px-6 py-2.5 bg-linear-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-orange-500/25">Apply Now</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AddUniversityModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '', country: '', programs: '', tuition: '', tuitionMin: '',
    language: 'English', type: 'Graduate', rating: '4.0', worldRanking: '',
    annualExpenditure: '', image: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.country) {
      setError('University name and country are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        name: formData.name,
        country: formData.country,
        countryCode: COUNTRY_FLAGS[formData.country] || '🏳️',
        image: formData.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
        programs: formData.programs.split(',').map(p => p.trim()).filter(Boolean),
        tuition: formData.tuition || 'Contact University',
        tuitionMin: parseInt(formData.tuitionMin) || 0,
        language: formData.language,
        type: formData.type,
        rating: parseFloat(formData.rating) || 4.0,
        worldRanking: parseInt(formData.worldRanking) || 500,
        annualExpenditure: parseInt(formData.annualExpenditure) || 5000,
      };
      await createUniversity(payload);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '', country: '', programs: '', tuition: '', tuitionMin: '',
          language: 'English', type: 'Graduate', rating: '4.0', worldRanking: '',
          annualExpenditure: '', image: ''
        });
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError('Failed to add university. Please try again.');
    }
    setSubmitting(false);
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add University</h2>
                <p className="text-xs text-gray-500">Manually enter university details</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Close">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">University added successfully!</p>
                  <p className="text-xs text-emerald-600">The listing is now live.</p>
                </div>
              </motion.div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>University Name *</label>
                  <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="e.g. Moscow State University" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Country *</label>
                  <input type="text" value={formData.country} onChange={e => handleChange('country', e.target.value)} placeholder="e.g. Russia" className={inputClass} required />
                  {formData.country && COUNTRY_FLAGS[formData.country] && (
                    <p className="text-xs text-gray-400 mt-1">Flag: {COUNTRY_FLAGS[formData.country]}</p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label className={labelClass}>Programs (comma separated)</label>
                <input type="text" value={formData.programs} onChange={e => handleChange('programs', e.target.value)} placeholder="e.g. Medicine, Engineering, Computer Science" className={inputClass} />
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Tuition Range</label>
                  <input type="text" value={formData.tuition} onChange={e => handleChange('tuition', e.target.value)} placeholder="e.g. $3,000 - $6,000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Min Tuition ($)</label>
                  <input type="number" value={formData.tuitionMin} onChange={e => handleChange('tuitionMin', e.target.value)} placeholder="e.g. 3000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Annual Cost ($)</label>
                  <input type="number" value={formData.annualExpenditure} onChange={e => handleChange('annualExpenditure', e.target.value)} placeholder="e.g. 6000" className={inputClass} />
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className={labelClass}>Language</label>
                  <div className="relative">
                    <select value={formData.language} onChange={e => handleChange('language', e.target.value)} className={inputClass + ' appearance-none pr-8'}>
                      <option value="English">English</option>
                      <option value="Russian">Russian</option>
                      <option value="Uzbek">Uzbek</option>
                      <option value="Tajik">Tajik</option>
                      <option value="Georgian">Georgian</option>
                      <option value="Azerbaijani">Azerbaijani</option>
                      <option value="Kyrgyz">Kyrgyz</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Type</label>
                  <div className="relative">
                    <select value={formData.type} onChange={e => handleChange('type', e.target.value)} className={inputClass + ' appearance-none pr-8'}>
                      <option value="Graduate">Graduate</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Both">Both</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Rating (1-5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={formData.rating} onChange={e => handleChange('rating', e.target.value)} placeholder="4.0" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>World Ranking</label>
                  <input type="number" value={formData.worldRanking} onChange={e => handleChange('worldRanking', e.target.value)} placeholder="e.g. 100" className={inputClass} />
                </div>
              </div>

              {/* Row 5 */}
              <div>
                <label className={labelClass}>Image URL (optional)</label>
                <input type="url" value={formData.image} onChange={e => handleChange('image', e.target.value)} placeholder="https://images.unsplash.com/..." className={inputClass} />
                <p className="text-[10px] text-gray-400 mt-1">Leave empty to use default image</p>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting || success}
                  className="flex-1 py-3 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 gradient-animate disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding...</>
                  ) : success ? (
                    <><Check className="w-4 h-4" /> Added!</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Add University</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function UniversitiesPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'All Countries');
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('course') || 'All Courses');
  const [selectedRanking, setSelectedRanking] = useState('All Rankings');
  const [selectedExpenditure, setSelectedExpenditure] = useState('All Budgets');
  const [sortBy, setSortBy] = useState('ranking-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  // Build query for API
  // build object params instead of query string
  const queryParams = useMemo(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedCountry !== 'All Countries') params.country = selectedCountry;
    if (selectedCourse !== 'All Courses') params.course = selectedCourse;
    const rankRange = RANKING_RANGES.find(r => r.label === selectedRanking);
    if (rankRange && rankRange.label !== 'All Rankings') params.rankingMax = rankRange.max;
    const expRange = EXPENDITURE_RANGES.find(e => e.label === selectedExpenditure);
    if (expRange && expRange.label !== 'All Budgets' && expRange.max !== Infinity) params.expenditureMax = expRange.max;
    params.sortBy = sortBy;
    params._r = refreshKey;
    return params;
  }, [searchQuery, selectedCountry, selectedCourse, selectedRanking, selectedExpenditure, sortBy, refreshKey]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);
    fetchUniversities(queryParams)
      .then(res => {
        if (!canceled) setData(res);
      })
      .catch(err => {
        if (!canceled) setError(err.message || 'Failed to fetch');
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });
    return () => { canceled = true; };
  }, [queryParams]);

  // Apply URL search params on mount
  useEffect(() => {
    const rankMax = searchParams.get('rankingMax');
    if (rankMax) {
      const r = RANKING_RANGES.find(r => r.max === parseInt(rankMax));
      if (r) setSelectedRanking(r.label);
    }
    const expMax = searchParams.get('expenditureMax');
    if (expMax) {
      const e = EXPENDITURE_RANGES.find(e => e.max === parseInt(expMax));
      if (e) setSelectedExpenditure(e.label);
    }
    if (searchParams.toString()) setShowFilters(true);
  }, []);

  const universities = data?.data || [];
  const totalCount = data?.total || 0;
  const countries = data?.countries ? ['All Countries', ...data.countries] : ['All Countries'];
  const courses = data?.courses ? ['All Courses', ...data.courses] : ['All Courses'];

  const clearFilters = () => {
    setSearchQuery(''); setSelectedCountry('All Countries'); setSelectedCourse('All Courses');
    setSelectedRanking('All Rankings'); setSelectedExpenditure('All Budgets'); setSortBy('ranking-asc');
  };

  const hasActiveFilters = selectedCountry !== 'All Countries' || selectedCourse !== 'All Courses' || selectedRanking !== 'All Rankings' || selectedExpenditure !== 'All Budgets' || searchQuery;

  const selectClass = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200";

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerItem} className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Discover Universities</h2>
          <p className="text-gray-500 text-sm mt-0.5">Top institutions worldwide • {totalCount} universities</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:opacity-90 active:scale-[0.97] transition-all duration-200"
          >
            <Plus className="w-4 h-4" />Add University
          </button>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${showFilters ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />Filters
            {hasActiveFilters && <span className="w-2 h-2 bg-yellow-300 rounded-full" />}
          </button>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search universities, programs, or countries..." className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 shadow-xs transition-all duration-200" />
      </motion.div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><Filter className="w-4 h-4 text-orange-500" />Filter & Sort</h3>
                {hasActiveFilters && <button onClick={clearFilters} className="text-xs text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-150 flex items-center gap-1"><X className="w-3 h-3" />Clear All</button>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Ranking</label>
                  <div className="relative"><select value={selectedRanking} onChange={e => setSelectedRanking(e.target.value)} className={selectClass}>{RANKING_RANGES.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Country</label>
                  <div className="relative"><select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className={selectClass}>{countries.map(c => <option key={c} value={c}>{c}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Course</label>
                  <div className="relative"><select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className={selectClass}>{courses.map(c => <option key={c} value={c}>{c}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Budget</label>
                  <div className="relative"><select value={selectedExpenditure} onChange={e => setSelectedExpenditure(e.target.value)} className={selectClass}>{EXPENDITURE_RANGES.map(e => <option key={e.label} value={e.label}>{e.label}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /></div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Sort By</label>
                  <div className="relative"><select value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectClass}>{SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasActiveFilters && (
        <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
          {selectedCountry !== 'All Countries' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"><Globe className="w-3 h-3" />{selectedCountry}<button onClick={() => setSelectedCountry('All Countries')} aria-label="Remove"><X className="w-3 h-3" /></button></span>}
          {selectedCourse !== 'All Courses' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold"><BookOpen className="w-3 h-3" />{selectedCourse}<button onClick={() => setSelectedCourse('All Courses')} aria-label="Remove"><X className="w-3 h-3" /></button></span>}
          {selectedRanking !== 'All Rankings' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold"><Award className="w-3 h-3" />{selectedRanking}<button onClick={() => setSelectedRanking('All Rankings')} aria-label="Remove"><X className="w-3 h-3" /></button></span>}
          {selectedExpenditure !== 'All Budgets' && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold"><DollarSign className="w-3 h-3" />{selectedExpenditure}<button onClick={() => setSelectedExpenditure('All Budgets')} aria-label="Remove"><X className="w-3 h-3" /></button></span>}
        </motion.div>
      )}

      <motion.p variants={staggerItem} className="text-sm text-gray-500">
        {loading ? 'Loading...' : <><span className="font-bold text-gray-900">{universities.length}</span> of {totalCount} universities</>}
      </motion.p>

      {error && (
        <motion.div variants={staggerItem} className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm">
          Failed to load universities. Using cached data.
        </motion.div>
      )}

      {!loading && universities.length === 0 ? (
        <motion.div variants={staggerItem} className="bg-white rounded-3xl p-14 text-center border border-gray-100 shadow-xs">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No universities found</h3>
          <p className="text-gray-500 mb-5">Try adjusting your filters or add one manually</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={clearFilters} className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 active:scale-[0.97] transition-all duration-200">Clear Filters</button>
            <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 active:scale-[0.97] transition-all duration-200 flex items-center gap-1.5"><Plus className="w-4 h-4" />Add University</button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {universities.map(uni => (
            <motion.div key={uni.id} variants={staggerItem} whileHover={{ y: -4 }} className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-100/80 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 group">
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-xs font-semibold text-gray-800 border border-white/30">{uni.countryCode} {uni.country}</div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <div className="bg-yellow-400 px-2 py-1 rounded-lg text-xs font-bold text-yellow-900 flex items-center gap-1 shadow-sm"><Star className="w-3 h-3" />{uni.rating}</div>
                  <div className="bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg text-xs font-bold text-gray-900 flex items-center gap-1 shadow-sm"><Award className="w-3 h-3 text-orange-500" />#{uni.worldRanking}</div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold text-lg drop-shadow-lg">{uni.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-semibold">{uni.type}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{uni.language}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {uni.programs.map(p => <span key={p} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100">{p}</span>)}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Annual Cost</p>
                    <p className="text-base font-bold text-gray-900">~${uni.annualExpenditure.toLocaleString()}<span className="text-xs font-normal text-gray-400">/yr</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedUniversity(uni)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AddUniversityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => setRefreshKey(k => k + 1)}
      />

      <UniversityDetailModal
        uni={selectedUniversity}
        isOpen={!!selectedUniversity}
        onClose={() => setSelectedUniversity(null)}
      />
    </motion.div>
  );
}
