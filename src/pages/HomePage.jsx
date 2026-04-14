import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, GraduationCap, Globe, Users, TrendingUp, Building2,
  Mic, ClipboardList, BookOpen, CreditCard, Plane, Sparkles
} from 'lucide-react';

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } }
};
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

export default function HomePage() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Universities', value: '500+', icon: Building2, color: 'from-orange-400 to-red-500' },
    { label: 'Students Placed', value: '25K+', icon: Users, color: 'from-blue-400 to-indigo-500' },
    { label: 'Countries', value: '30+', icon: Globe, color: 'from-emerald-400 to-teal-500' },
    { label: 'Success Rate', value: '96%', icon: TrendingUp, color: 'from-purple-400 to-pink-500' },
  ];

  const features = [
    { title: 'AI Voice Search', desc: 'Find your perfect university by speaking', icon: Mic, gradient: 'from-orange-400 to-red-500', path: '/universities' },
    { title: 'Mock Tests', desc: 'IELTS, TOEFL, GRE preparation', icon: ClipboardList, gradient: 'from-blue-400 to-indigo-500', path: '/tests' },
    { title: 'Study Materials', desc: 'Free guides & resources', icon: BookOpen, gradient: 'from-emerald-400 to-teal-500', path: '/materials' },
    { title: 'Easy Payments', desc: 'Fees, hostel & card top-ups', icon: CreditCard, gradient: 'from-purple-400 to-pink-500', path: '/payments' },
    { title: 'Flight Booking', desc: 'Best student flight deals', icon: Plane, gradient: 'from-sky-400 to-blue-500', path: '/flights' },
    { title: 'Visa Assistance', desc: 'Step-by-step guidance', icon: Globe, gradient: 'from-amber-400 to-orange-500', path: '/visa' },
  ];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      {/* Hero */}
      <motion.div variants={staggerItem} className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 via-red-500 to-pink-600 p-8 md:p-14 text-white card-shimmer gradient-animate">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        <div className="absolute top-10 right-10 opacity-10">
          <GraduationCap className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-white/15 backdrop-blur-xs rounded-full border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/90">AI-Powered Platform</span>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-[1.1] tracking-tight">
            Your Journey to<br />
            <span className="text-yellow-200">World-Class</span> Education
          </h1>
          <p className="text-white/75 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
            Discover top universities, prepare for exams, and manage your entire study abroad journey in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/universities')}
              className="px-6 py-3.5 bg-white text-orange-600 font-bold rounded-2xl hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-xl shadow-black/10 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />Explore Universities
            </button>
            <button className="px-6 py-3.5 bg-white/15 backdrop-blur-xs text-white font-bold rounded-2xl hover:bg-white/25 active:scale-[0.97] transition-all duration-200 border border-white/25 flex items-center gap-2">
              <Mic className="w-4 h-4" />Try Voice Search
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} whileHover={{ y: -3, scale: 1.02 }} className="bg-white rounded-2xl p-5 border border-gray-100/80 shadow-xs shadow-gray-200/50 hover:shadow-lg transition-shadow duration-300">
              <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Features */}
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Everything You Need</h2>
        <p className="text-gray-500 mb-6">One platform for your entire study abroad journey</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                whileHover={{ y: -3 }}
                onClick={() => navigate(f.path)}
                className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-200">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
