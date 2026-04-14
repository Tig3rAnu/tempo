import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Globe, Heart, Shield, Users, Trophy, Sparkles } from 'lucide-react';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

export default function AboutPage() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-12 pb-12">
      {/* Hero Section */}
      <motion.div variants={staggerItem} className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-12 md:p-20 text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-xs"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>About Shiksha Platform</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Bridging Talent with <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">Global Opportunity</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            We are on a mission to democratize access to world-class medical education. Shiksha is more than a platform; it's a bridge to your future.
          </p>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={staggerItem} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To democratize access to global medical education for aspiring doctors worldwide through transparency, technology, and trust. We strive to eliminate barriers to entry, simplify complex admission processes, and provide students with the accurate, unbiassed information they need to make life-changing decisions.
            </p>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Lightbulb className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the world's most trusted platform for international education, bridging the gap between talent and opportunity across borders. We envision a world where every deserving student, regardless of their background, has access to quality medical education and the opportunity to heal the world.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Core Values */}
      <motion.div variants={staggerItem}>
        <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Why Choose Shiksha?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Transparency', text: 'No hidden fees, no false promises. Just direct, honest guidance.', color: 'emerald' },
            { icon: Globe, title: 'Global Network', text: 'Partnerships with 500+ top medical universities worldwide.', color: 'blue' },
            { icon: Users, title: 'Student First', text: 'Every feature and service is designed with student success in mind.', color: 'orange' },
            { icon: Trophy, title: 'Excellence', text: 'Commitment to high standards in support and service delivery.', color: 'purple' }
          ].map((val, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-${val.color}-50 text-${val.color}-600 flex items-center justify-center mb-4`}>
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
              <p className="text-sm text-gray-500">{val.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Strip */}
      <motion.div variants={staggerItem} className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
          <div>
            <p className="text-3xl md:text-4xl font-black text-orange-500 mb-1">500+</p>
            <p className="text-sm text-gray-400">Universities</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-blue-500 mb-1">25k+</p>
            <p className="text-sm text-gray-400">Students Placed</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-emerald-500 mb-1">30+</p>
            <p className="text-sm text-gray-400">Countries</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-purple-500 mb-1">24/7</p>
            <p className="text-sm text-gray-400">Support</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
