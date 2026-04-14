import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Clock, CheckCircle2, PlayCircle, Lock, Crown, CreditCard,
  Shield, AlertCircle, X, User, Mail, Phone, Smartphone, Landmark,
  RefreshCw, Copy, Sparkles, Eye, ChevronDown, Star, Calendar
} from 'lucide-react';
import { list as fetchTests } from '../services/testService.js';
import { useAuth } from '../App.jsx';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'gpay', label: 'GPay', icon: Smartphone },
  { id: 'phonepe', label: 'PhonePe', icon: Smartphone },
  { id: 'bank_transfer', label: 'Bank', icon: Landmark },
];

/* ========== SUBSCRIPTION MODAL ========== */
function MockTestPayModal({ isOpen, onClose, user, onSuccess }) {
  const [form, setForm] = useState({ payerName: '', payerEmail: '', payerPhone: '', paymentMethod: 'card' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (user && isOpen) {
      setForm(prev => ({ ...prev, payerName: user.name || '', payerEmail: user.email || '', payerPhone: user.phone || '' }));
    }
    if (!isOpen) { setResult(null); setError(''); }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.payerName || !form.payerEmail) { setError('Name and email are required'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await subscribeMockTest({ userId: user?.id || null, ...form });
      if (!res.ok) { setError(res.error || 'Payment failed'); }
      else { setResult(res.subscription); if (onSuccess) onSuccess(); }
    } catch { setError('Server error'); }
    setSubmitting(false);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => { setCopied(code); setTimeout(() => setCopied(''), 2000); });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {result ? (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Payment Successful!</h2>
                <p className="text-sm text-gray-500">Full mock test access is now active</p>
              </div>
              <div className="bg-linear-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl p-5 text-white mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div><p className="text-xs text-white/60 uppercase">Plan</p><p className="text-lg font-bold">Full Mock Test Access</p></div>
                  <div className="text-right"><p className="text-xs text-white/60 uppercase">Amount</p><p className="text-2xl font-black">\u20b92,100</p></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-5">
                <div><p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Confirmation Code</p><p className="text-lg font-mono font-bold text-gray-900 tracking-wider">{result.confirmationCode}</p></div>
                <button onClick={() => copyCode(result.confirmationCode)} className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150" aria-label="Copy">
                  {copied === result.confirmationCode ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-200">Start Taking Tests</button>
            </div>
          ) : (
            <>
              <div className="bg-linear-to-br from-orange-500 via-red-500 to-pink-600 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-xl flex items-center justify-center border border-white/30">
                      <Crown className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Unlock All Mock Tests</h2>
                      <p className="text-sm text-white/70">\u20b92,100 \u2022 One-time payment \u2022 Lifetime access</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/20 transition-colors duration-150" aria-label="Close"><X className="w-5 h-5 text-white/70" /></button>
                </div>
              </div>
              <div className="p-6">
                {/* Features */}
                <div className="mb-5 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-sm font-bold text-gray-900 mb-2">What you get:</p>
                  <div className="space-y-1.5">
                    {['All FMGE full-length subject tests (19 subjects)', 'FMGE comprehensive mock tests (300 questions)', 'All IELTS, TOEFL, GRE, SAT, GMAT tests', 'Detailed answer explanations', 'Unlimited attempts \u2022 Lifetime access'].map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-xs text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" /><p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" value={form.payerName} onChange={e => setForm(f => ({ ...f, payerName: e.target.value }))} placeholder="Your name" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={form.payerEmail} onChange={e => setForm(f => ({ ...f, payerEmail: e.target.value }))} placeholder="email" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div></div>
                    <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="tel" value={form.payerPhone} onChange={e => setForm(f => ({ ...f, payerPhone: e.target.value }))} placeholder="phone" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" /></div></div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Payment Method</label>
                    <div className="grid grid-cols-4 gap-2">
                      {PAYMENT_METHODS.map(pm => {
                        const Icon = pm.icon;
                        const isActive = form.paymentMethod === pm.id;
                        return (
                          <button type="button" key={pm.id} onClick={() => setForm(f => ({ ...f, paymentMethod: pm.id }))} className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all duration-200 ${isActive ? 'border-orange-400 bg-orange-50 shadow-xs' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}>
                            <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                            <p className={`text-[10px] font-bold ${isActive ? 'text-orange-800' : 'text-gray-500'}`}>{pm.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-4 bg-linear-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900">Total Amount</p>
                      <p className="text-2xl font-black text-orange-600">\u20b92,100</p>
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full py-3.5 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 disabled:opacity-60 flex items-center justify-center gap-2">
                    {submitting ? <><RefreshCw className="w-4 h-4 animate-spin" />Processing...</> : <><Crown className="w-4 h-4" />Pay \u20b92,100 & Unlock All Tests</>}
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ========== MAIN PAGE ========== */
export default function MockTestsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [showPayModal, setShowPayModal] = useState(false);
  const [hasFullAccess, setHasFullAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const categories = ['All', 'FMGE', 'IELTS', 'TOEFL', 'GRE', 'SAT', 'GMAT'];
  const diffColor = { Easy: 'bg-emerald-50 text-emerald-700', Medium: 'bg-amber-50 text-amber-700', Hard: 'bg-red-50 text-red-700' };

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    fetchTests(filter === 'All' ? '' : filter)
      .then(res => { if (!canceled) setTests(res.data || []); })
      .catch(() => {})
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, [filter]);
  // Check if user has mock test subscription
  const checkAccess = useCallback(async () => {
    if (!user?.id) { setHasFullAccess(false); return; }
    setCheckingAccess(true);
    try {
      const res = await checkMockSubscription(user.id);
      setHasFullAccess(res.hasAccess || false);
    } catch { setHasFullAccess(false); }
    setCheckingAccess(false);
  }, [user?.id]);

  useEffect(() => { checkAccess(); }, [checkAccess]);

  // Prevent screenshots
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
        e.preventDefault();
        alert('Screenshots and printing are not allowed for mock tests.');
        return false;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const canAccessTest = (test) => {
    // Sample tests are always free
    if (test.isSample) return true;
    // If user has paid, all tests are accessible
    if (hasFullAccess) return true;
    // Non-sample tests require payment
    return false;
  };

  const handleTestClick = (test) => {
    if (!canAccessTest(test)) {
      if (!user) {
        alert('Please register and login first, then purchase full access to take this test.');
      } else {
        setShowPayModal(true);
      }
      return;
    }
    // In production, navigate to test
    alert(`Starting test: ${test.name}`);
  };

  const fmgeTestCount = tests.filter(t => t.category === 'FMGE').length;
  const fmgeSampleCount = tests.filter(t => t.category === 'FMGE' && t.isSample).length;
  const fmgePaidCount = tests.filter(t => t.category === 'FMGE' && !t.isSample).length;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5 no-screenshot no-print">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Mock Tests</h2>
        <p className="text-gray-500 text-sm mt-0.5">Practice for your exams \u2022 FMGE, IELTS, TOEFL, GRE, SAT, GMAT</p>
      </motion.div>

      {/* Access Status Banner */}
      <motion.div variants={staggerItem}>
        {hasFullAccess ? (
          <div className="p-4 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg"><Crown className="w-5 h-5 text-white" /></div>
            <div>
              <p className="text-sm font-bold text-emerald-800">Full Access Active</p>
              <p className="text-xs text-emerald-600">You have access to all mock tests including FMGE full-length tests</p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-linear-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"><Lock className="w-5 h-5 text-white" /></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Unlock All Mock Tests</p>
                  <p className="text-xs text-gray-500">Sample tests are free \u2022 Pay \u20b92,100 for full access to all tests</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    alert('Please register and login first to purchase mock test access.');
                    return;
                  }
                  setShowPayModal(true);
                }}
                className="px-5 py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/25 flex items-center gap-2 shrink-0"
              >
                <Crown className="w-4 h-4" />Pay \u20b92,100
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />All FMGE 19 subject tests
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />Full-length mock tests
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />Lifetime access
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Security Notice */}
      <motion.div variants={staggerItem} className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Protected Content</p>
          <p className="text-xs text-amber-700">Mock tests cannot be downloaded. Screenshots and printing are prohibited.</p>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div variants={staggerItem} className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === c ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {c}
            {c === 'FMGE' && <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-sm text-[10px] font-bold">{filter === 'FMGE' ? fmgeTestCount : ''}</span>}
          </button>
        ))}
      </motion.div>

      {/* FMGE Info */}
      {filter === 'FMGE' && (
        <motion.div variants={staggerItem} className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-900 mb-1">FMGE Mock Tests</p>
              <p className="text-xs text-gray-600 mb-2">
                <span className="font-semibold text-emerald-600">{fmgeSampleCount} free sample tests</span> available without registration.
                <span className="font-semibold text-orange-600"> {fmgePaidCount} full tests</span> available with paid access (\u20b92,100).
              </p>
              <p className="text-xs text-gray-500">Covers all 19 subjects: Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology, Forensic Medicine, PSM, Medicine, Surgery, OBG, Pediatrics, Ophthalmology, ENT, Orthopedics, Dermatology, Psychiatry, Radiology, Anesthesia.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tests count */}
      <motion.div variants={staggerItem}>
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{tests.length}</span> test{tests.length !== 1 ? 's' : ''} available
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading tests...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map(test => {
            const accessible = canAccessTest(test);
            const isSample = test.isSample;
            return (
              <motion.div
                key={test.id}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                className={`bg-white rounded-2xl p-5 border shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden ${!accessible ? 'border-gray-200' : 'border-gray-100/80'}`}
              >
                {/* Lock overlay for paid tests */}
                {!accessible && (
                  <div className="absolute inset-0 bg-gray-50/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-xs font-bold text-gray-500">Paid Access Required</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">\u20b92,100 for all tests</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">{test.category}</span>
                    {isSample && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-sm text-[10px] font-bold uppercase">Free Sample</span>
                    )}
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${diffColor[test.difficulty] || ''}`}>{test.difficulty}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{test.name}</h3>
                {test.scheduledFor && (
                  <div className="flex items-center gap-1.5 text-xs text-orange-600 font-medium mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Scheduled: {new Date(test.scheduledFor).toLocaleString()}
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><ClipboardList className="w-3.5 h-3.5" />{test.questions} Qs</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{test.duration}</span>
                </div>
                <button
                  onClick={() => handleTestClick(test)}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5 ${
                    !accessible
                      ? 'bg-gray-100 text-gray-400 border border-gray-200'
                      : test.completed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20'
                  }`}
                >
                  {!accessible ? (
                    <><Lock className="w-4 h-4" />Unlock to Access</>
                  ) : test.completed ? (
                    <><CheckCircle2 className="w-4 h-4" />Retake</>
                  ) : (
                    <><PlayCircle className="w-4 h-4" />Start Test</>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      <MockTestPayModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        user={user}
        onSuccess={checkAccess}
      />
    </motion.div>
  );
}
