import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Building2, HelpCircle } from 'lucide-react';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={staggerItem} className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
          Get in Touch
        </h1>
        <p className="text-gray-500 text-lg">We're here to help you on your journey. Reach out to us for any queries or support.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <motion.div variants={staggerItem} className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">General Inquiries</h3>
            <p className="text-sm text-gray-500 mb-4">For partnerships, media, and general questions.</p>
            <a href="mailto:admin@shiksha.study" className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-2">
              <Mail className="w-4 h-4" /> admin@shiksha.study
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-orange-600">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Student Support</h3>
            <p className="text-sm text-gray-500 mb-4">Need help with your application or account?</p>
            <a href="mailto:contact@shiksha.study" className="text-orange-600 font-semibold text-sm hover:underline flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@shiksha.study
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Headquarters</h3>
            <p className="text-sm text-gray-500">
              Shiksha International Private Limited<br/>
              Tech Park, Sector 5<br/>
              Gurugram, India 122002
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 bg-emerald-50 rounded-2xl text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Message Sent!</h3>
                <p className="text-emerald-600">We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all">
                    <option>General Inquiry</option>
                    <option>Admission Help</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none" required></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-linear-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
