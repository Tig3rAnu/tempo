import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Eye, EyeOff, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { ShikshaLogo } from '../components/ShikshaLogo.jsx';
import { adminLogin } from '../services/authService.js';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true); setError('');
    try {
      const res = await adminLogin({ email, password });
      console.log({res});
      if (!res.ok) { setError(res.error || 'Invalid credentials'); setLoading(false); return; }
      sessionStorage.setItem('adminUser', JSON.stringify(res));
      navigate('/admin/dashboard');
    } catch {
      setError('Server unavailable');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/3 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to main site</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex justify-center mb-5"
              >
                <div className="w-20 h-20 bg-linear-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30 border border-white/10">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <h1 className="text-2xl font-black tracking-tight">Admin Control Panel</h1>
                <p className="text-white/50 text-sm mt-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  Shiksha Platform Administration
                </p>
              </motion.div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mb-4 text-center bg-red-50 p-3 rounded-xl font-medium"
              >
                {error}
              </motion.p>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@shiksha.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 transition-all duration-200"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-linear-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:from-gray-800 hover:to-gray-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-gray-900/30 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                {loading ? 'Signing in...' : 'Sign In as Admin'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Demo Credentials</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Email: <span className="font-mono font-semibold text-gray-700">admin@shiksha.com</span></p>
                <p className="text-xs text-gray-500">Password: <span className="font-mono font-semibold text-gray-700">admin123</span></p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          \u00a9 2024 Shiksha Administration \u2022 Secure Access Only
        </p>
      </motion.div>
    </div>
  );
}
