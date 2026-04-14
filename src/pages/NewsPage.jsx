import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Search, Tag, ExternalLink, ChevronRight, Bookmark } from 'lucide-react';
import { list as fetchNews } from '../services/newsService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

const CATEGORIES = ['All', 'University', 'Exam', 'Regulation'];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    let canceled = false;
    const query = `?category=${activeCategory}&search=${searchQuery}`;
    setLoading(true);
    fetchNews(query)
      .then(res => { if (!canceled) setNews(res.data || []); })
      .catch(() => {})
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, [activeCategory, searchQuery]);

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={staggerItem} className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
          <Newspaper className="w-4 h-4" />
          <span>Latest Updates</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
          News & Announcements
        </h1>
        <p className="text-gray-500">Stay informed with the latest updates from universities, exam boards, and regulatory bodies worldwide.</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={staggerItem} className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto custom-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeCategory === cat ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}ஓம்
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search news..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* News Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading news...</div>
      ) : news.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No news found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(item => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white shadow-xs ${
                    item.category === 'Exam' ? 'bg-purple-500' :
                    item.category === 'University' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span className="font-medium text-gray-700">{item.subcategory}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">{item.summary}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xs font-semibold text-gray-400">Source: {item.source}</span>
                  <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Read More <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
