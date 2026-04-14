import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, CheckCircle2, Star, Zap, Shield, Plane, Building2, CreditCard,
  Phone, Smartphone, Landmark, Users, BookOpen, MapPin, Wifi, ArrowRight,
  X, AlertCircle, RefreshCw, Copy, Clock, Award, Heart, Globe, Key,
  User, Mail, ChevronDown, Sparkles
} from 'lucide-react';
import { useAuth } from '../App.jsx';
import { subscribe as doSubscribe, listByUser as fetchUserSubs } from '../services/subscriptionService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const BASIC_FEATURES = [
  { icon: CheckCircle2, text: 'Admission letter processing' },
  { icon: Shield, text: 'Document verification assistance' },
  { icon: Building2, text: 'University application support' },
  { icon: Mail, text: 'Email support during admission' },
  { icon: Clock, text: 'Application status tracking' },
  { icon: Globe, text: 'Basic visa guidance' },
];

const PREMIUM_FEATURES = [
  { icon: Award, text: 'Complete admission process guidance', highlight: true },
  { icon: Plane, text: 'Airport pickup & reception on arrival', highlight: true },
  { icon: MapPin, text: 'Travel assistance to university campus', highlight: true },
  { icon: Building2, text: 'Hostel arrangement & accommodation setup', highlight: true },
  { icon: BookOpen, text: 'Complete university documentation', highlight: true },
  { icon: CreditCard, text: 'Student card registration assistance', highlight: false },
  { icon: BookOpen, text: 'Library card setup', highlight: false },
  { icon: Wifi, text: 'Local SIM card arrangement', highlight: false },
  { icon: Landmark, text: 'Bank account opening assistance', highlight: false },
  { icon: Phone, text: '24/7 dedicated support throughout', highlight: true },
  { icon: Globe, text: 'Visa application full support', highlight: false },
  { icon: Users, text: 'Pre-departure orientation session', highlight: false },
  { icon: MapPin, text: 'Local city orientation tour', highlight: false },
  { icon: Heart, text: 'Emergency contact support', highlight: false },
];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Card', icon: CreditCard, desc: 'Visa / Mastercard' },
  { id: 'gpay', label: 'Google Pay', icon: Smartphone, desc: 'UPI' },
  { id: 'phonepe', label: 'PhonePe', icon: Smartphone, desc: 'UPI' },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: Landmark, desc: 'Wire' },
];

/* ========== SUBSCRIBE MODAL ========== */
function SubscribeModal({ isOpen, onClose, plan, user, onSuccess }) {
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
      const res = await doSubscribe({
        userId: user?.id || null,
        planId: plan.id,
        ...form,
      });
      if (!res.ok) { setError(res.error || 'Subscription failed'); }
      else { setResult(res.subscription); if (onSuccess) onSuccess(); }
    } catch { setError('Server error'); }
    setSubmitting(false);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => { setCopied(code); setTimeout(() => setCopied(''), 2000); });
  };

  if (!isOpen || !plan) return null;

  const isPremium = plan.id === 'premium';

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
                <h2 className="text-xl font-bold text-gray-900 mb-1">Subscription Activated!</h2>
                <p className="text-sm text-gray-500">{result.planName} is now active</p>
              </div>
              <div className={`rounded-2xl p-5 text-white mb-5 ${isPremium ? 'bg-linear-to-br from-amber-500 via-orange-500 to-red-600' : 'bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider">Plan</p>
                    <p className="text-lg font-bold">{result.planName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60 uppercase tracking-wider">Amount</p>
                    <p className="text-2xl font-black">{result.priceDisplay}</p>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-white/60">Status</p><p className="font-semibold capitalize">{result.status}</p></div>
                  <div><p className="text-white/60">Method</p><p className="font-semibold capitalize">{result.paymentMethod.replace('_', ' ')}</p></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-5">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Confirmation Code</p>
                  <p className="text-lg font-mono font-bold text-gray-900 tracking-wider">{result.confirmationCode}</p>
                </div>
                <button onClick={() => copyCode(result.confirmationCode)} className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150" aria-label="Copy">
                  {copied === result.confirmationCode ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              {isPremium && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-5">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-amber-800">Our premium support team will contact you within 24 hours to begin your end-to-end journey. Welcome aboard!</p>
                  </div>
                </div>
              )}
              <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-200">Done</button>
            </div>
          ) : (
            <>
              <div className={`p-6 pb-4 text-white relative overflow-hidden ${isPremium ? 'bg-linear-to-br from-amber-500 via-orange-500 to-red-600' : 'bg-linear-to-br from-blue-500 via-indigo-500 to-purple-600'}`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xs rounded-xl flex items-center justify-center border border-white/30">
                      {isPremium ? <Crown className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Subscribe to {plan.name}</h2>
                      <p className="text-sm text-white/70">{plan.priceDisplay} \u2022 One-time payment</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/20 transition-colors duration-150" aria-label="Close"><X className="w-5 h-5 text-white/70" /></button>
                </div>
              </div>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" /><p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.payerName} onChange={e => setForm(f => ({ ...f, payerName: e.target.value }))} placeholder="Your name" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" value={form.payerEmail} onChange={e => setForm(f => ({ ...f, payerEmail: e.target.value }))} placeholder="email" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="tel" value={form.payerPhone} onChange={e => setForm(f => ({ ...f, payerPhone: e.target.value }))} placeholder="phone" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" />
                      </div>
                    </div>
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
                            <p className={`text-[10px] font-bold text-center ${isActive ? 'text-orange-800' : 'text-gray-500'}`}>{pm.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border ${isPremium ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{plan.name}</p>
                        <p className="text-xs text-gray-500">{plan.paymentTiming}</p>
                      </div>
                      <p className={`text-2xl font-black ${isPremium ? 'text-amber-600' : 'text-blue-600'}`}>{plan.priceDisplay}</p>
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className={`w-full py-3.5 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 ${isPremium ? 'bg-linear-to-r from-amber-500 via-orange-500 to-red-600 shadow-orange-500/25' : 'bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-indigo-500/25'}`}>
                    {submitting ? <><RefreshCw className="w-4 h-4 animate-spin" />Processing...</> : <><Crown className="w-4 h-4" />Subscribe Now \u2022 {plan.priceDisplay}</>}
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

/* ========== MAIN SUBSCRIPTION PAGE ========== */
export default function SubscriptionPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mySubs, setMySubs] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const fetchSubs = useCallback(async () => {
    if (!user?.id) return;
    setLoadingSubs(true);
    try {
      const res = await fetchUserSubs(user.id);
      setMySubs(res.data || []);
    } catch {}
    setLoadingSubs(false);
  }, [user?.id]);

  useEffect(() => { fetchSubs(); }, [fetchSubs]);

  const openSubscribe = (planId) => {
    setSelectedPlan({
      id: planId,
      name: planId === 'basic' ? 'Basic Plan' : 'Premium Plan',
      priceDisplay: planId === 'basic' ? '\u20b910,000' : '$500',
      paymentTiming: planId === 'basic' ? 'One-time payment after receiving Admission Letter' : 'One-time payment for complete end-to-end support',
    });
    setShowModal(true);
  };

  const hasActivePlan = (planId) => mySubs.some(s => s.planId === planId && s.status === 'active');

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      {/* Header */}
      <motion.div variants={staggerItem} className="text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-linear-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200/50">
          <Crown className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">Choose Your Plan</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-3">
          Subscription Plans
        </h1>
        <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
          From admission letter processing to airport pickup and university settlement \u2014 choose the support level that fits your journey.
        </p>
      </motion.div>

      {/* Active Subscriptions */}
      {mySubs.filter(s => s.status === 'active').length > 0 && (
        <motion.div variants={staggerItem} className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200/50">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />Your Active Subscriptions
          </h3>
          <div className="space-y-2">
            {mySubs.filter(s => s.status === 'active').map(sub => (
              <div key={sub.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sub.planId === 'premium' ? 'bg-linear-to-br from-amber-400 to-orange-500' : 'bg-linear-to-br from-blue-400 to-indigo-500'}`}>
                    {sub.planId === 'premium' ? <Crown className="w-5 h-5 text-white" /> : <Star className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{sub.planName}</p>
                    <p className="text-xs text-gray-400">Activated {new Date(sub.createdAt).toLocaleDateString()} \u2022 {sub.confirmationCode}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">Active</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Plans Grid */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BASIC PLAN */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden relative"
        >
          <div className="p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Basic Plan</h3>
                <p className="text-xs text-gray-500">Admission process support</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">\u20b910,000</span>
                <span className="text-sm text-gray-400 font-medium">INR</span>
              </div>
              <p className="text-sm text-blue-600 font-semibold mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Pay once after receiving Admission Letter
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">Pay once after receiving your admission letter to continue the admission process with our guided support.</p>
            </div>

            <div className="space-y-3 mb-6">
              {BASIC_FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <span className="text-sm text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => openSubscribe('basic')}
              disabled={hasActivePlan('basic')}
              className={`w-full py-3.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${hasActivePlan('basic') ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:opacity-90'}`}
            >
              {hasActivePlan('basic') ? <><CheckCircle2 className="w-4 h-4" />Already Subscribed</> : <><Star className="w-4 h-4" />Get Basic Plan \u2022 \u20b910,000</>}
            </button>
          </div>
        </motion.div>

        {/* PREMIUM PLAN */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white rounded-3xl border-2 border-amber-300 shadow-lg shadow-amber-100/50 hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
        >
          {/* Popular badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />MOST POPULAR
            </div>
          </div>

          <div className="p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Premium Plan</h3>
                <p className="text-xs text-gray-500">Complete end-to-end support</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900">$500</span>
                <span className="text-sm text-gray-400 font-medium">USD</span>
              </div>
              <p className="text-sm text-amber-600 font-semibold mt-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                All-inclusive, one-time payment
              </p>
            </div>

            <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">All-inclusive premium support from admission to settling in at your university. We handle everything so you can focus on your studies.</p>
            </div>

            <div className="space-y-3 mb-6">
              {PREMIUM_FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${feature.highlight ? 'bg-amber-100' : 'bg-gray-50'}`}>
                      <Icon className={`w-3.5 h-3.5 ${feature.highlight ? 'text-amber-600' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm ${feature.highlight ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>{feature.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => openSubscribe('premium')}
              disabled={hasActivePlan('premium')}
              className={`w-full py-3.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${hasActivePlan('premium') ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-linear-to-r from-amber-500 via-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 hover:opacity-90 gradient-animate'}`}
            >
              {hasActivePlan('premium') ? <><CheckCircle2 className="w-4 h-4" />Already Subscribed</> : <><Crown className="w-4 h-4" />Get Premium Plan \u2022 $500</>}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Comparison Section */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Award className="w-5 h-5 text-orange-500" />Plan Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                <th className="text-center py-3 px-3 text-[11px] font-semibold text-blue-600 uppercase tracking-wider">Basic \u20b910K</th>
                <th className="text-center py-3 px-3 text-[11px] font-semibold text-amber-600 uppercase tracking-wider">Premium $500</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { feature: 'Admission letter processing', basic: true, premium: true },
                { feature: 'Document verification', basic: true, premium: true },
                { feature: 'Application status tracking', basic: true, premium: true },
                { feature: 'Basic visa guidance', basic: true, premium: true },
                { feature: 'Full visa application support', basic: false, premium: true },
                { feature: 'Airport pickup & reception', basic: false, premium: true },
                { feature: 'Travel to university', basic: false, premium: true },
                { feature: 'Hostel arrangement', basic: false, premium: true },
                { feature: 'University documentation', basic: false, premium: true },
                { feature: 'Student card assistance', basic: false, premium: true },
                { feature: 'Library card setup', basic: false, premium: true },
                { feature: 'SIM card arrangement', basic: false, premium: true },
                { feature: 'Bank account opening', basic: false, premium: true },
                { feature: '24/7 dedicated support', basic: false, premium: true },
                { feature: 'Pre-departure orientation', basic: false, premium: true },
                { feature: 'City orientation tour', basic: false, premium: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="py-3 px-3 text-gray-700 font-medium">{row.feature}</td>
                  <td className="py-3 px-3 text-center">
                    {row.basic ? <CheckCircle2 className="w-4 h-4 text-blue-500 mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {row.premium ? <CheckCircle2 className="w-4 h-4 text-amber-500 mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* FAQ / Info */}
      <motion.div variants={staggerItem} className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Why Choose Premium?</h3>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Studying abroad involves more than just getting admission. With Premium, you get a dedicated support team that handles everything from the moment you land at the airport \u2014 hostel setup, university paperwork, bank account, SIM card, and more. It\u2019s like having a personal assistant for your entire study abroad journey.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />Airport Pickup</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />Hostel Setup</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />24/7 Support</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />Bank Account</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />SIM Card</span>
            </div>
          </div>
        </div>
      </motion.div>

      <SubscribeModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedPlan(null); }}
        plan={selectedPlan}
        user={user}
        onSuccess={fetchSubs}
      />
    </motion.div>
  );
}
