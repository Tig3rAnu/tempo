import React, { useState, useCallback, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Bell, LogOut, Home, Building2, ClipboardList, BookOpen,
  CreditCard, FileText, Plane, Globe, Mail, Shield, Eye, EyeOff,
  GraduationCap, Briefcase, Heart, Sparkles, Inbox, Phone, AlertCircle,
  CheckCircle2, Users, Upload, ArrowRight, Crown, Newspaper
} from 'lucide-react';

import { register, login, verifyEmail, verifyPhone, uploadDocuments, resendCode } from './services/authService.js';

import HomePage from './pages/HomePage.jsx';
import UniversitiesPage from './pages/UniversitiesPage.jsx';
import MockTestsPage from './pages/MockTestsPage.jsx';
import MaterialsPage from './pages/MaterialsPage.jsx';
import PaymentsPage from './pages/PaymentsPage.jsx';
import DocumentsPage from './pages/DocumentsPage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import VisaPage from './pages/VisaPage.jsx';
import InboxPage from './pages/InboxPage.jsx';
import MyApplicationsPage from './pages/MyApplicationsPage.jsx';
import UploadDocsPage from './pages/UploadDocsPage.jsx';
import UniDashboardPage from './pages/UniDashboardPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import SubscriptionPage from './pages/SubscriptionPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { ShikshaLogo } from './components/ShikshaLogo.jsx';
import VoiceAIAssistant from './components/VoiceAIAssistant.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import SEOHashtags from './components/SEOHashtags.jsx';
import { useLanguage } from './i18n/LanguageContext.jsx';

// Auth Context
export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap, color: 'blue' },
  { id: 'university', label: 'University', icon: Building2, color: 'purple' },
  { id: 'agent', label: 'Agent', icon: Briefcase, color: 'green' },
  { id: 'parent', label: 'Parent', icon: Heart, color: 'pink' },
];

const NAV_ITEMS_BASE = [
  { id: 'home', labelKey: 'home', icon: Home, path: '/', roles: ['all'] },
  { id: 'universities', labelKey: 'universities', icon: Building2, path: '/universities', roles: ['all'] },
  { id: 'news', labelKey: 'news', icon: Newspaper, path: '/news', roles: ['all'] },
  { id: 'subscription', labelKey: 'subscription', icon: Crown, path: '/subscription', roles: ['all'] },
  { id: 'tests', labelKey: 'mockTests', icon: ClipboardList, path: '/tests', roles: ['all'] },
  { id: 'materials', labelKey: 'materials', icon: BookOpen, path: '/materials', roles: ['all'] },
  { id: 'upload-docs', labelKey: 'uploadDocs', icon: FileText, path: '/upload-docs', roles: ['student'] },
  { id: 'my-applications', labelKey: 'myApplications', icon: ClipboardList, path: '/my-applications', roles: ['student', 'agent'] },
  { id: 'uni-dashboard', labelKey: 'applications', icon: Users, path: '/uni-dashboard', roles: ['university'] },
  { id: 'inbox', labelKey: 'inbox', icon: Inbox, path: '/inbox', roles: ['student', 'agent', 'university'] },
  { id: 'payments', labelKey: 'payments', icon: CreditCard, path: '/payments', roles: ['all'] },
  { id: 'flights', labelKey: 'flights', icon: Plane, path: '/flights', roles: ['all'] },
  { id: 'visa', labelKey: 'visa', icon: Globe, path: '/visa', roles: ['all'] },
];

const REG_DOC_TYPES = [
  { id: 'identity_proof', label: 'Aadhar Card / Passport', desc: 'Upload your Aadhar Card or Passport as identity proof' },
  { id: 'senior_secondary_marksheet', label: 'Senior Secondary Marksheet', desc: '10+2 / Higher Secondary marksheet' },
];

function AuthModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('India');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingPhone, setPendingPhone] = useState('');
  const [demoEmailCode, setDemoEmailCode] = useState('');
  const [demoPhoneCode, setDemoPhoneCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [regDocs, setRegDocs] = useState({});
  const [uploadingDocs, setUploadingDocs] = useState(false);

  const resetForm = () => {
    setEmail(''); setPhone(''); setPassword(''); setName(''); setCountry('India');
    setError(''); setInfo(''); setEmailCode(''); setPhoneCode('');
    setDemoEmailCode(''); setDemoPhoneCode('');
    setEmailVerified(false); setPhoneVerified(false);
    setRegDocs({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !phone) { setError('All fields required'); return; }
    setLoading(true); setError('');
    try {
      const res = await register({ email, phone, password, role: selectedRole, name, country });
      if (!res.ok) { setError(res.error); setLoading(false); return; }
      setPendingEmail(email);
      setPendingPhone(phone);
      setDemoEmailCode(res.demoEmailCode || '');
      setDemoPhoneCode(res.demoPhoneCode || '');
      setEmailVerified(false);
      setPhoneVerified(false);
      setMode('verify');
      setInfo('Verification codes sent to your email and phone!');
    } catch {
      setError('Server unavailable');
    }
    setLoading(false);
  };

  const handleVerifyEmail = async () => {
    if (!emailCode) { setError('Enter the email verification code'); return; }
    setVerifyingEmail(true); setError('');
    try {
      const res = await verifyEmail(pendingEmail, emailCode);
      if (!res.ok) { setError(res.error); setVerifyingEmail(false); return; }
      setEmailVerified(true);
      if (res.bothVerified) {
        if (res.needsAdminApproval) {
          setInfo('Both verified! Your account needs admin approval.');
          setTimeout(() => { resetForm(); setMode('login'); }, 3000);
        } else if (selectedRole === 'student') {
          setMode('documents');
          setInfo('Both verified! Please upload required documents.');
        } else {
          setInfo('Both verified! You can now login.');
          setTimeout(() => { resetForm(); setMode('login'); }, 1500);
        }
      } else {
        setInfo('Email verified! Now verify your phone.');
      }
    } catch { setError('Server unavailable'); }
    setVerifyingEmail(false);
  };

  const handleVerifyPhone = async () => {
    if (!phoneCode) { setError('Enter the phone verification code'); return; }
    setVerifyingPhone(true); setError('');
    try {
      const res = await verifyPhone(pendingEmail, phoneCode);
      if (!res.ok) { setError(res.error); setVerifyingPhone(false); return; }
      setPhoneVerified(true);
      if (res.bothVerified) {
        if (res.needsAdminApproval) {
          setInfo('Both verified! Your account needs admin approval.');
          setTimeout(() => { resetForm(); setMode('login'); }, 3000);
        } else if (selectedRole === 'student') {
          setMode('documents');
          setInfo('Both verified! Please upload required documents.');
        } else {
          setInfo('Both verified! You can now login.');
          setTimeout(() => { resetForm(); setMode('login'); }, 1500);
        }
      } else {
        setInfo('Phone verified! Now verify your email.');
      }
    } catch { setError('Server unavailable'); }
    setVerifyingPhone(false);
  };

  const handleDocFileUpload = (docId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegDocs(prev => ({ ...prev, [docId]: { type: docId, name: file.name, size: file.size, uploaded: true } }));
    }
  };

  const handleSubmitDocuments = async () => {
    const missing = REG_DOC_TYPES.filter(d => !regDocs[d.id]);
    if (missing.length > 0) {
      setError(`Please upload: ${missing.map(d => d.label).join(', ')}`);
      return;
    }
    setUploadingDocs(true); setError('');
    try {
      const docList = Object.values(regDocs);
      const res = await uploadDocuments(pendingEmail, docList);
      if (!res.ok) { setError(res.error); setUploadingDocs(false); return; }
      setInfo('Registration complete! You can now login.');
      setTimeout(() => { resetForm(); setMode('login'); }, 2000);
    } catch { setError('Server unavailable'); }
    setUploadingDocs(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Email and password required'); return; }
    setLoading(true); setError('');
    try {
      const res = await login({ email, password, role: selectedRole });
      if (!res.ok) {
        if (res.needsVerification) {
          setPendingEmail(email);
          setPendingPhone(res.phone || phone);
          setEmailVerified(res.emailVerified || false);
          setPhoneVerified(res.phoneVerified || false);
          setMode('verify');
          const d2 = await resendCode(email);
          setDemoEmailCode(d2.demoEmailCode || '');
          setDemoPhoneCode(d2.demoPhoneCode || '');
          setInfo('Please verify both email and phone to continue.');
        } else if (res.needsDocuments) {
          setPendingEmail(res.email || email);
          setMode('documents');
          setInfo('Please upload required documents to complete registration.');
        } else {
          setError(res.error);
        }
        setLoading(false); return;
      }
      onLogin(data);
      resetForm();
    } catch {
      setError('Server unavailable. Using demo mode.');
      onLogin({ email, role: selectedRole, token: 'demo', id: 'demo-' + Date.now(), name: email.split('@')[0] });
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <ShikshaLogo size="small" showText={false} />
                <h2 className="text-xl font-bold text-gray-900">
                  {mode === 'verify' ? 'Verify Email & Phone' : mode === 'register' ? 'Create Account' : mode === 'documents' ? 'Upload Documents' : 'Welcome back'}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Close"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <p className="text-sm text-gray-500 ml-[46px]">
              {mode === 'verify' ? 'Enter codes sent to your email and phone' : mode === 'register' ? 'Sign up for Shiksha' : mode === 'documents' ? 'Upload required documents' : 'Sign in to your account'}
            </p>
          </div>

          {(mode === 'register' || mode === 'verify' || mode === 'documents') && (
            <div className="px-6 pb-3">
              <div className="flex items-center gap-2">
                {['register', 'verify', 'documents'].map((step, i) => {
                  const stepLabels = ['Details', 'Verify OTP', 'Documents'];
                  const current = ['register', 'verify', 'documents'].indexOf(mode);
                  const done = i < current;
                  const active = i === current;
                  return (
                    <React.Fragment key={step}>
                      <div className={`flex items-center gap-1.5 ${active ? 'text-orange-600' : done ? 'text-emerald-600' : 'text-gray-300'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${done ? 'bg-emerald-500 text-white' : active ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        <span className="text-[10px] font-semibold hidden sm:inline">{stepLabels[i]}</span>
                      </div>
                      {i < 2 && <div className={`flex-1 h-0.5 rounded-full ${i < current ? 'bg-emerald-500' : 'bg-gray-100'}`} />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          <div className="px-6 pb-6">
            {mode !== 'verify' && mode !== 'documents' && (
              <div className="grid grid-cols-4 gap-2 mb-5">
                {ROLES.map(role => {
                  const Icon = role.icon;
                  const isActive = selectedRole === role.id;
                  return (
                    <button key={role.id} onClick={() => setSelectedRole(role.id)} className={`flex flex-col items-center p-2.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-linear-to-br from-orange-50 to-red-50 border-2 border-orange-400 shadow-xs' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'}`}>
                      <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                      <span className={`text-[10px] font-semibold ${isActive ? 'text-orange-700' : 'text-gray-500'}`}>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
            {(selectedRole === 'agent' || selectedRole === 'university') && mode === 'register' && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">Agent and University accounts require admin approval after verification.</p>
              </div>
            )}
            {error && <p className="text-sm text-red-500 mb-3 text-center bg-red-50 p-2 rounded-xl">{error}</p>}
            {info && <p className="text-sm text-emerald-600 mb-3 text-center bg-emerald-50 p-2 rounded-xl">{info}</p>}

            {mode === 'documents' ? (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-2">
                  <FileText className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700">Upload your identity proof and Senior Secondary Marksheet to complete registration.</p>
                </div>
                <div className="space-y-3">
                  {REG_DOC_TYPES.map(doc => (
                    <div key={doc.id} className={`flex items-center justify-between p-4 rounded-xl border-2 border-dashed transition-all duration-200 ${regDocs[doc.id] ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-orange-300'}`}>
                      <div className="flex items-center gap-3 min-w-0">
                        {regDocs[doc.id] ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <Upload className="w-5 h-5 text-gray-400 shrink-0" />}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{doc.label}</p>
                          {regDocs[doc.id] ? <p className="text-xs text-emerald-600 truncate">{regDocs[doc.id].name}</p> : <p className="text-xs text-gray-400">{doc.desc}</p>}
                        </div>
                      </div>
                      <label className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-150 shrink-0">
                        {regDocs[doc.id] ? 'Change' : 'Upload'}
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocFileUpload(doc.id, e)} />
                      </label>
                    </div>
                  ))}
                </div>
                <button onClick={handleSubmitDocuments} disabled={uploadingDocs} className="w-full py-3 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 disabled:opacity-60 flex items-center justify-center gap-2">
                  {uploadingDocs ? 'Uploading...' : <><Upload className="w-4 h-4" />Complete Registration</>}
                </button>
              </div>
            ) : mode === 'verify' ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${emailVerified ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className={`w-4 h-4 ${emailVerified ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <span className="text-sm font-bold text-gray-900">Email Verification</span>
                    {emailVerified && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />}
                  </div>
                  {emailVerified ? <p className="text-xs text-emerald-600 font-medium">Email verified!</p> : (
                    <>
                      <p className="text-xs text-gray-500 mb-2">Enter the 6-digit code sent to <strong>{pendingEmail}</strong></p>
                      <div className="flex gap-2">
                        <input type="text" value={emailCode} onChange={(e) => setEmailCode(e.target.value)} placeholder="Email OTP" className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-center tracking-[0.2em] font-mono focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" maxLength={6} />
                        <button onClick={handleVerifyEmail} disabled={verifyingEmail || !emailCode} className="px-4 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-50">{verifyingEmail ? '...' : 'Verify'}</button>
                      </div>
                      {demoEmailCode && <p className="text-[10px] text-gray-400 mt-1.5">Demo code: <span className="font-mono font-bold text-orange-600">{demoEmailCode}</span></p>}
                    </>
                  )}
                </div>
                <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${phoneVerified ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className={`w-4 h-4 ${phoneVerified ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <span className="text-sm font-bold text-gray-900">Phone Verification</span>
                    {phoneVerified && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />}
                  </div>
                  {phoneVerified ? <p className="text-xs text-emerald-600 font-medium">Phone verified!</p> : (
                    <>
                      <p className="text-xs text-gray-500 mb-2">Enter the 6-digit code sent to <strong>{pendingPhone}</strong></p>
                      <div className="flex gap-2">
                        <input type="text" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} placeholder="Phone OTP" className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-center tracking-[0.2em] font-mono focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" maxLength={6} />
                        <button onClick={handleVerifyPhone} disabled={verifyingPhone || !phoneCode} className="px-4 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-50">{verifyingPhone ? '...' : 'Verify'}</button>
                      </div>
                      {demoPhoneCode && <p className="text-[10px] text-gray-400 mt-1.5">Demo code: <span className="font-mono font-bold text-orange-600">{demoPhoneCode}</span></p>}
                    </>
                  )}
                </div>
                {emailVerified && phoneVerified && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <p className="text-sm font-semibold text-emerald-700">Both verified! Proceeding...</p>
                  </div>
                )}
              </div>
            ) : mode === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Email</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Phone Number</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91-XXXXXXXXXX" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Country</label><input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="India" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Password</label><div className="relative"><Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="w-full pl-11 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /><button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Toggle">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 disabled:opacity-60 flex items-center justify-center gap-2">{loading ? 'Creating...' : <><ArrowRight className="w-4 h-4" />Continue to Verification</>}</button>
                <p className="text-center text-sm text-gray-500">Already have an account? <button type="button" onClick={() => { setMode('login'); setError(''); setInfo(''); }} className="text-orange-600 font-semibold hover:underline">Sign In</button></p>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label><div className="relative"><Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /><button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Toggle">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign In'}</button>
                <p className="text-center text-sm text-gray-500">New here? <button type="button" onClick={() => { setMode('register'); setError(''); setInfo(''); }} className="text-orange-600 font-semibold hover:underline">Create Account</button></p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const { t } = useLanguage();
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setShowAuth(false);
    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('/');
  }, [navigate]);

  const handleNavigate = useCallback((path) => {
    navigate(path);
    setMobileMenuOpen(false);
  }, [navigate]);

  const navItems = NAV_ITEMS_BASE.filter(item => {
    if (item.roles.includes('all')) return true;
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  const activeNavId = navItems.find(n => {
    if (n.path === '/') return location.pathname === '/';
    return location.pathname.startsWith(n.path);
  })?.id || 'home';

  if (isAdminRoute) {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-[#f8f9fc] font-sans">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="glass border-b border-gray-200/50 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileMenuOpen(o => !o)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Menu">
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <button onClick={() => handleNavigate('/')}>
                  <ShikshaLogo size="default" />
                </button>
              </div>
              <nav className="hidden lg:flex items-center gap-0.5">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeNavId === item.id;
                  return (
                    <button key={item.id} onClick={() => handleNavigate(item.path)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-150 ${isActive ? 'bg-linear-to-r from-orange-50 to-red-50 text-orange-700 shadow-xs' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                      <Icon className="w-4 h-4" />{t(item.labelKey)}
                    </button>
                  );
                })}
              </nav>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                {user ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleNavigate('/inbox')} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150 relative" aria-label="Inbox">
                      <Bell className="w-5 h-5 text-gray-500" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-xs">
                        <span className="text-white text-xs font-bold">{(user.name || user.email)[0].toUpperCase()}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-900 truncate max-w-[100px]">{user.name || user.email}</p>
                        <p className="text-[10px] text-orange-600 font-semibold capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors duration-150" aria-label="Logout">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setShowAuth(true)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-150 hidden sm:block">{t('login')}</button>
                    <button onClick={() => setShowAuth(true)} className="px-4 py-2.5 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20 gradient-animate">{t('getStarted')}</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-100 lg:hidden">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
              <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }} className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
                <div className="p-5 border-b border-gray-100"><ShikshaLogo /></div>
                <nav className="p-3 space-y-0.5">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeNavId === item.id;
                    return (
                      <button key={item.id} onClick={() => handleNavigate(item.path)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${isActive ? 'bg-linear-to-r from-orange-50 to-red-50 text-orange-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                        <Icon className="w-5 h-5" />{t(item.labelKey)}
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/universities" element={<UniversitiesPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/tests" element={<MockTestsPage />} />
                <Route path="/materials" element={<MaterialsPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/visa" element={<VisaPage />} />
                <Route path="/inbox" element={user ? <InboxPage /> : <Navigate to="/" />} />
                <Route path="/upload-docs" element={user?.role === 'student' ? <UploadDocsPage /> : <Navigate to="/" />} />
                <Route path="/my-applications" element={user ? <MyApplicationsPage /> : <Navigate to="/" />} />
                <Route path="/uni-dashboard" element={user?.role === 'university' ? <UniDashboardPage /> : <Navigate to="/" />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="bg-white border-t border-gray-100 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <ShikshaLogo size="default" />
                <p className="text-sm text-gray-500 mt-4 max-w-sm">
                  Democratizing access to global medical education through transparency, technology, and trust.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><button onClick={() => handleNavigate('/about')} className="hover:text-orange-600 transition-colors">About Us</button></li>
                  <li><button onClick={() => handleNavigate('/news')} className="hover:text-orange-600 transition-colors">News & Updates</button></li>
                  <li><button onClick={() => handleNavigate('/contact')} className="hover:text-orange-600 transition-colors">Contact Us</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><button className="hover:text-orange-600 transition-colors">Privacy Policy</button></li>
                  <li><button className="hover:text-orange-600 transition-colors">Terms of Service</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
              <p>© {new Date().getFullYear()} Shiksha International Private Limited. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="mailto:admin@shiksha.study" className="hover:text-orange-600">admin@shiksha.study</a>
                <a href="mailto:contact@shiksha.study" className="hover:text-orange-600">contact@shiksha.study</a>
              </div>
            </div>
          </div>
        </footer>

        {/* SEO Hashtags - Hidden content for search engines */}
        <SEOHashtags />

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={handleLogin} />
        <VoiceAIAssistant />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
