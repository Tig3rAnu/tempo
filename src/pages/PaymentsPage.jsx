import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Building2, Wallet, CreditCard, Search, CheckCircle2,
  Copy, ArrowRight, X, AlertCircle, Smartphone, Banknote, Globe,
  Clock, DollarSign, ChevronDown, User, Mail, Phone, FileText,
  RefreshCw, ArrowUpRight, Eye, EyeOff, Landmark, Send, History
} from 'lucide-react';
import { useAuth } from '../App.jsx';
import { searchUniversities, getUniversityAccount, createTransfer, createTranswireTransfer, historyByEmail } from '../services/transferService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const PAYMENT_METHODS = [
  { id: 'card', label: 'Debit/Credit Card', icon: CreditCard, color: 'from-blue-500 to-indigo-600', desc: 'Visa, Mastercard, RuPay' },
  { id: 'gpay', label: 'Google Pay', icon: Smartphone, color: 'from-green-500 to-emerald-600', desc: 'Pay via GPay UPI' },
  { id: 'phonepe', label: 'PhonePe', icon: Smartphone, color: 'from-purple-500 to-indigo-600', desc: 'Pay via PhonePe UPI' },
  { id: 'upi', label: 'UPI Transfer', icon: ArrowUpRight, color: 'from-orange-500 to-red-600', desc: 'Any UPI app' },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: Landmark, color: 'from-gray-600 to-gray-800', desc: 'Wire/SWIFT transfer' },
];

const PURPOSE_OPTIONS = [
  'Tuition Fee', 'Hostel Fee', 'Admission Fee', 'Exam Fee',
  'Library Fee', 'Accommodation Deposit', 'Visa Processing Fee', 'Other'
];

/* ========== UNIVERSITY ACCOUNT DETAILS CARD ========== */
function UniversityAccountCard({ bankDetails, universityName, onCopy, copiedField }) {
  const [showFull, setShowFull] = useState(false);
  if (!bankDetails) return null;

  const fields = [
    { label: 'Bank Name', value: bankDetails.bankName, key: 'bankName', icon: Landmark },
    { label: 'Account Name', value: bankDetails.accountName, key: 'accountName', icon: User },
    { label: 'Account Number', value: bankDetails.accountNumber, key: 'accountNumber', icon: FileText, sensitive: true },
    { label: 'SWIFT Code', value: bankDetails.swiftCode, key: 'swiftCode', icon: Globe },
    { label: 'Currency', value: bankDetails.currency, key: 'currency', icon: DollarSign },
    { label: 'UPI ID', value: bankDetails.upiId, key: 'upiId', icon: ArrowUpRight },
    { label: 'GPay Number', value: bankDetails.gpayNumber, key: 'gpayNumber', icon: Smartphone },
    { label: 'PhonePe Number', value: bankDetails.phonePeNumber, key: 'phonePeNumber', icon: Smartphone },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-gray-50 to-blue-50/30 rounded-2xl p-5 border border-gray-200/80"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">Account Details</h4>
            <p className="text-xs text-gray-500">{universityName}</p>
          </div>
        </div>
        <button
          onClick={() => setShowFull(!showFull)}
          className="p-2 rounded-lg hover:bg-white/80 transition-colors duration-150"
          aria-label={showFull ? 'Hide details' : 'Show details'}
        >
          {showFull ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {fields.map(field => {
          if (!field.value || field.value === 'N/A') return null;
          const Icon = field.icon;
          const displayValue = field.sensitive && !showFull
            ? field.value.substring(0, 8) + '****' + field.value.slice(-4)
            : field.value;
          return (
            <div key={field.key} className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-gray-100 group">
              <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{field.label}</p>
                <p className="text-xs font-medium text-gray-800 truncate font-mono">{displayValue}</p>
              </div>
              <button
                onClick={() => onCopy(field.value, field.key)}
                className="p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
                aria-label={`Copy ${field.label}`}
              >
                {copiedField === field.key
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  : <Copy className="w-3.5 h-3.5 text-gray-400" />
                }
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ========== TRANSFER RESULT ========== */
function TransferResult({ transfer, onClose }) {
  const [copiedField, setCopiedField] = useState('');
  const copyValue = (val, key) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopiedField(key);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Transfer Initiated!</h3>
        <p className="text-sm text-gray-500">Your payment is being processed</p>
      </div>

      <div className="bg-linear-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl p-5 text-white mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-wider">Amount</p>
            <p className="text-2xl font-black">${transfer.amount.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60 uppercase tracking-wider">Status</p>
            <p className="text-sm font-bold capitalize">{transfer.status}</p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-3 grid grid-cols-2 gap-3 text-xs">
          <div><p className="text-white/60">Method</p><p className="font-semibold capitalize">{transfer.paymentMethod.replace('_', ' ')}</p></div>
          <div><p className="text-white/60">Purpose</p><p className="font-semibold">{transfer.purpose}</p></div>
          <div><p className="text-white/60">ETA</p><p className="font-semibold">{transfer.estimatedCompletion}</p></div>
          <div><p className="text-white/60">Currency</p><p className="font-semibold">{transfer.currency}</p></div>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Confirmation Code</p>
            <p className="text-lg font-mono font-bold text-gray-900 tracking-wider">{transfer.confirmationCode}</p>
          </div>
          <button onClick={() => copyValue(transfer.confirmationCode, 'conf')} className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150" aria-label="Copy">
            {copiedField === 'conf' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Transaction ID</p>
            <p className="text-sm font-mono font-bold text-gray-900">{transfer.id}</p>
          </div>
          <button onClick={() => copyValue(transfer.id, 'txnId')} className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150" aria-label="Copy">
            {copiedField === 'txnId' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
        {transfer.universityName && (
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Recipient</p>
            <p className="text-sm font-bold text-gray-900">{transfer.universityName}</p>
            {transfer.bankName && <p className="text-xs text-gray-500">{transfer.bankName} • {transfer.accountName}</p>}
          </div>
        )}
      </div>

      <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-200">
        Done
      </button>
    </motion.div>
  );
}

/* ========== MAIN PAYMENTS PAGE ========== */
export default function PaymentsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('transfer'); // transfer, history
  const [recipientType, setRecipientType] = useState('university'); // university, self_local

  // University search
  const [uniSearch, setUniSearch] = useState('');
  const [uniResults, setUniResults] = useState([]);
  const [selectedUni, setSelectedUni] = useState(null);
  const [uniAccountDetails, setUniAccountDetails] = useState(null);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [showUniDropdown, setShowUniDropdown] = useState(false);

  // Self account
  const [selfAccountName, setSelfAccountName] = useState('');
  const [selfBankName, setSelfBankName] = useState('');
  const [selfAccountNumber, setSelfAccountNumber] = useState('');
  const [selfIfscCode, setSelfIfscCode] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [purpose, setPurpose] = useState('Tuition Fee');
  const [notes, setNotes] = useState('');
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerPhone, setPayerPhone] = useState('');

  // Card details (visual only)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // State
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [transferResult, setTransferResult] = useState(null);
  const [copiedField, setCopiedField] = useState('');

  // History
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Pre-fill user info
  useEffect(() => {
    if (user) {
      setPayerName(user.name || '');
      setPayerEmail(user.email || '');
      setPayerPhone(user.phone || '');
    }
  }, [user]);

  // Search universities
  const searchUnis = async (q) => {
    setUniSearch(q);
    if (q.length < 2) { setUniResults([]); setShowUniDropdown(false); return; }
    try {
      const res = await searchUniversities(q);
      setUniResults(res.data || []);
      setShowUniDropdown(true);
    } catch { setUniResults([]); }
  };

  // Select university
  const selectUniversity = async (uni) => {
    setSelectedUni(uni);
    setUniSearch(uni.name);
    setShowUniDropdown(false);
    setLoadingAccount(true);
    try {
      const res = await getUniversityAccount(uni.id);
      if (res.ok) {
        setUniAccountDetails(res);
      } else {
        setUniAccountDetails(null);
      }
    } catch { setUniAccountDetails(null); }
    setLoadingAccount(false);
  };

  // Copy helper
  const copyValue = (val, key) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopiedField(key);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  // Fetch history
  const fetchHistory = useCallback(async () => {
    if (!user?.email) return;
    setLoadingHistory(true);
    try {
      const res = await historyByEmail(user.email);
      setHistory(res.data || []);
    } catch {}
    setLoadingHistory(false);
  }, [user?.email]);

  useEffect(() => {
    if (activeTab === 'history' && user?.email) fetchHistory();
  }, [activeTab, user?.email, fetchHistory]);

  // Submit transfer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) { setError('Please enter a valid amount'); return; }
    if (!payerName || !payerEmail) { setError('Payer name and email are required'); return; }
    if (recipientType === 'university' && !selectedUni) { setError('Please select a university'); return; }
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) { setError('Please enter card details'); return; }

    setSubmitting(true); setError('');
    try {
      const body = {
        userId: user?.id || null,
        payerName, payerEmail, payerPhone,
        recipientType,
        universityId: selectedUni?.id || null,
        universityName: selectedUni?.name || null,
        selfAccountName, selfBankName, selfAccountNumber, selfIfscCode,
        paymentMethod, amount: parseFloat(amount),
        currency, purpose, notes
      };
      // switch to transwire backend when available; fall back to in-memory stub
      let res;
      if (typeof createTranswireTransfer === 'function') {
        res = await createTranswireTransfer(body);
      } else {
        res = await createTransfer(body);
      }
      if (res.error || (res.ok === false)) {
        setError(res.error || 'Transfer failed');
      } else {
        // transwire returns data directly or under `transfer`
        setTransferResult(res.transfer || res.data || res);
      }
    } catch { setError('Server error. Please try again.'); }
    setSubmitting(false);
  };

  const resetForm = () => {
    setTransferResult(null);
    setAmount('');
    setNotes('');
    setCardNumber(''); setCardExpiry(''); setCardCvv('');
  };

  const tabs = [
    { id: 'transfer', label: 'Make Payment', icon: Send },
    { id: 'history', label: 'Transaction History', icon: History },
  ];

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-orange-500" />Payments & Transfers
        </h2>
        <p className="text-gray-500 text-sm mt-0.5">Transfer fees to universities via Card, GPay, PhonePe, or Bank Transfer</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={staggerItem} className="flex gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}>
              <Icon className="w-4 h-4" />{tab.label}
              {tab.id === 'history' && history.length > 0 && activeTab !== 'history' && (
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-md text-[10px] font-bold">{history.length}</span>
              )}
            </button>
          );
        })}
      </motion.div>

      {/* TRANSFER TAB */}
      {activeTab === 'transfer' && (
        <AnimatePresence mode="wait">
          {transferResult ? (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TransferResult transfer={transferResult} onClose={resetForm} />
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
              {error && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                  <button onClick={() => setError('')} className="ml-auto p-1 hover:bg-red-100 rounded-lg transition-colors duration-150" aria-label="Dismiss"><X className="w-3.5 h-3.5 text-red-400" /></button>
                </motion.div>
              )}

              {/* Step 1: Recipient Type */}
              <motion.div variants={staggerItem} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">1</span>
                  Transfer To
                </h3>
                <div className="flex gap-3">
                  <button onClick={() => { setRecipientType('university'); setSelectedUni(null); setUniAccountDetails(null); setUniSearch(''); }} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${recipientType === 'university' ? 'border-orange-400 bg-orange-50 shadow-xs' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${recipientType === 'university' ? 'bg-orange-500 shadow-lg' : 'bg-gray-100'}`}>
                      <Building2 className={`w-5 h-5 ${recipientType === 'university' ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${recipientType === 'university' ? 'text-orange-800' : 'text-gray-700'}`}>University Account</p>
                      <p className="text-xs text-gray-500">Pay tuition & fees directly</p>
                    </div>
                  </button>
                  <button onClick={() => { setRecipientType('self_local'); setSelectedUni(null); setUniAccountDetails(null); }} className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${recipientType === 'self_local' ? 'border-orange-400 bg-orange-50 shadow-xs' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${recipientType === 'self_local' ? 'bg-orange-500 shadow-lg' : 'bg-gray-100'}`}>
                      <Wallet className={`w-5 h-5 ${recipientType === 'self_local' ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-bold ${recipientType === 'self_local' ? 'text-orange-800' : 'text-gray-700'}`}>Self / Local Account</p>
                      <p className="text-xs text-gray-500">Transfer to your bank</p>
                    </div>
                  </button>
                </div>

                {/* University Search */}
                {recipientType === 'university' && (
                  <div className="mt-4 space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={uniSearch}
                        onChange={(e) => searchUnis(e.target.value)}
                        onFocus={() => uniResults.length > 0 && setShowUniDropdown(true)}
                        placeholder="Search university by name or country..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200"
                      />
                      {showUniDropdown && uniResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto custom-scrollbar">
                          {uniResults.map(uni => (
                            <button key={uni.id} onClick={() => selectUniversity(uni)} className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors duration-150 border-b border-gray-50 last:border-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{uni.name}</p>
                                  <p className="text-xs text-gray-400">{uni.countryCode} {uni.country} • {uni.tuition}</p>
                                </div>
                                {uni.hasBankDetails && (
                                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-sm text-[10px] font-bold">Bank Details Available</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedUni && (
                      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-emerald-800 truncate">{selectedUni.name}</p>
                          <p className="text-xs text-emerald-600">{selectedUni.countryCode} {selectedUni.country} • ~${selectedUni.annualExpenditure?.toLocaleString()}/yr</p>
                        </div>
                        <button onClick={() => { setSelectedUni(null); setUniAccountDetails(null); setUniSearch(''); }} className="p-1 hover:bg-emerald-100 rounded-lg transition-colors duration-150" aria-label="Clear"><X className="w-3.5 h-3.5 text-emerald-500" /></button>
                      </div>
                    )}
                    {loadingAccount && (
                      <div className="flex items-center justify-center py-4 gap-2">
                        <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
                        <span className="text-sm text-gray-400">Loading account details...</span>
                      </div>
                    )}
                    {uniAccountDetails?.bankDetails && (
                      <UniversityAccountCard
                        bankDetails={uniAccountDetails.bankDetails}
                        universityName={uniAccountDetails.universityName}
                        onCopy={copyValue}
                        copiedField={copiedField}
                      />
                    )}
                  </div>
                )}

                {/* Self account details */}
                {recipientType === 'self_local' && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className={labelClass}>Account Holder Name</label><input type="text" value={selfAccountName} onChange={e => setSelfAccountName(e.target.value)} placeholder="Your name" className={inputClass} /></div>
                    <div><label className={labelClass}>Bank Name</label><input type="text" value={selfBankName} onChange={e => setSelfBankName(e.target.value)} placeholder="SBI, HDFC, etc." className={inputClass} /></div>
                    <div><label className={labelClass}>Account Number</label><input type="text" value={selfAccountNumber} onChange={e => setSelfAccountNumber(e.target.value)} placeholder="Account number" className={inputClass} /></div>
                    <div><label className={labelClass}>IFSC Code</label><input type="text" value={selfIfscCode} onChange={e => setSelfIfscCode(e.target.value)} placeholder="SBIN0001234" className={inputClass} /></div>
                  </div>
                )}
              </motion.div>

              {/* Step 2: Payment Method */}
              <motion.div variants={staggerItem} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">2</span>
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {PAYMENT_METHODS.map(pm => {
                    const Icon = pm.icon;
                    const isActive = paymentMethod === pm.id;
                    return (
                      <button key={pm.id} onClick={() => setPaymentMethod(pm.id)} className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${isActive ? 'border-orange-400 bg-orange-50 shadow-xs' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 ${isActive ? `bg-linear-to-br ${pm.color} shadow-lg` : 'bg-gray-200'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <p className={`text-[11px] font-bold text-center ${isActive ? 'text-orange-800' : 'text-gray-600'}`}>{pm.label}</p>
                        <p className="text-[9px] text-gray-400 text-center mt-0.5">{pm.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Card details */}
                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-hidden">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim())} placeholder="4242 4242 4242 4242" maxLength={19} className={inputClass + ' pl-11 font-mono'} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={labelClass}>Expiry</label><input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} className={inputClass + ' font-mono text-center'} /></div>
                      <div><label className={labelClass}>CVV</label><input type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value)} placeholder="•••" maxLength={4} className={inputClass + ' font-mono text-center'} /></div>
                    </div>
                  </motion.div>
                )}

                {/* UPI/GPay/PhonePe info */}
                {(paymentMethod === 'gpay' || paymentMethod === 'phonepe' || paymentMethod === 'upi') && uniAccountDetails?.bankDetails && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200 overflow-hidden">
                    <p className="text-sm font-bold text-blue-800 mb-2">
                      {paymentMethod === 'gpay' ? 'Google Pay' : paymentMethod === 'phonepe' ? 'PhonePe' : 'UPI'} Details
                    </p>
                    <div className="space-y-2">
                      {paymentMethod === 'gpay' && uniAccountDetails.bankDetails.gpayNumber && (
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-lg">
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">GPay Number</p><p className="text-sm font-mono font-bold text-gray-900">{uniAccountDetails.bankDetails.gpayNumber}</p></div>
                          <button onClick={() => copyValue(uniAccountDetails.bankDetails.gpayNumber, 'gpay')} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="Copy">
                            {copiedField === 'gpay' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                          </button>
                        </div>
                      )}
                      {paymentMethod === 'phonepe' && uniAccountDetails.bankDetails.phonePeNumber && (
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-lg">
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">PhonePe Number</p><p className="text-sm font-mono font-bold text-gray-900">{uniAccountDetails.bankDetails.phonePeNumber}</p></div>
                          <button onClick={() => copyValue(uniAccountDetails.bankDetails.phonePeNumber, 'phonepe')} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="Copy">
                            {copiedField === 'phonepe' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                          </button>
                        </div>
                      )}
                      {uniAccountDetails.bankDetails.upiId && (
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-lg">
                          <div><p className="text-[10px] text-gray-400 uppercase font-semibold">UPI ID</p><p className="text-sm font-mono font-bold text-gray-900">{uniAccountDetails.bankDetails.upiId}</p></div>
                          <button onClick={() => copyValue(uniAccountDetails.bankDetails.upiId, 'upiId')} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="Copy">
                            {copiedField === 'upiId' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Step 3: Amount & Details */}
              <motion.div variants={staggerItem} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">3</span>
                  Amount & Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="sm:col-span-1">
                    <label className={labelClass}>Amount *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" min="0" step="0.01" className={inputClass + ' pl-11 text-lg font-bold'} required />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Currency</label>
                    <div className="relative">
                      <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputClass + ' appearance-none pr-8'}>
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="RUB">RUB (₽)</option>
                        <option value="AUD">AUD (A$)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Purpose</label>
                    <div className="relative">
                      <select value={purpose} onChange={e => setPurpose(e.target.value)} className={inputClass + ' appearance-none pr-8'}>
                        {PURPOSE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div><label className={labelClass}>Your Name *</label><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" value={payerName} onChange={e => setPayerName(e.target.value)} placeholder="Full name" className={inputClass + ' pl-11'} required /></div></div>
                  <div><label className={labelClass}>Email *</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={payerEmail} onChange={e => setPayerEmail(e.target.value)} placeholder="email" className={inputClass + ' pl-11'} required /></div></div>
                  <div><label className={labelClass}>Phone</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="tel" value={payerPhone} onChange={e => setPayerPhone(e.target.value)} placeholder="phone" className={inputClass + ' pl-11'} /></div></div>
                </div>
                <div>
                  <label className={labelClass}>Notes (optional)</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Student ID, semester, etc." rows={2} className={inputClass + ' resize-none'} />
                </div>
              </motion.div>

              {/* Summary & Submit */}
              <motion.div variants={staggerItem} className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900">Payment Summary</h3>
                  {amount && <p className="text-2xl font-black text-orange-600">{currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'RUB' ? '₽' : '$'}{parseFloat(amount || 0).toLocaleString()}</p>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-5">
                  <div className="p-2.5 bg-white/80 rounded-xl"><p className="text-gray-400 mb-0.5">Method</p><p className="font-bold text-gray-900 capitalize">{paymentMethod.replace('_', ' ')}</p></div>
                  <div className="p-2.5 bg-white/80 rounded-xl"><p className="text-gray-400 mb-0.5">To</p><p className="font-bold text-gray-900 truncate">{recipientType === 'university' ? (selectedUni?.name || 'Not selected') : 'Self Account'}</p></div>
                  <div className="p-2.5 bg-white/80 rounded-xl"><p className="text-gray-400 mb-0.5">Purpose</p><p className="font-bold text-gray-900">{purpose}</p></div>
                  <div className="p-2.5 bg-white/80 rounded-xl"><p className="text-gray-400 mb-0.5">ETA</p><p className="font-bold text-gray-900">{paymentMethod === 'bank_transfer' ? '2-3 days' : 'Instant'}</p></div>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !amount}
                  className="w-full py-3.5 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? <><RefreshCw className="w-4 h-4 animate-spin" />Processing...</> : <><Send className="w-4 h-4" />Pay {currency === 'INR' ? '₹' : '$'}{parseFloat(amount || 0).toLocaleString()}</>}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <motion.div variants={staggerItem} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <History className="w-5 h-5 text-orange-500" />Transaction History
            </h3>
            <button onClick={fetchHistory} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Refresh">
              <RefreshCw className={`w-4 h-4 text-gray-400 ${loadingHistory ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {!user ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">Login to view history</h3>
              <p className="text-sm text-gray-500">Sign in to see your transaction history</p>
            </div>
          ) : loadingHistory ? (
            <div className="text-center py-12"><RefreshCw className="w-6 h-6 text-gray-300 mx-auto mb-2 animate-spin" /><p className="text-sm text-gray-400">Loading transactions...</p></div>
          ) : history.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No transactions yet</h3>
              <p className="text-sm text-gray-500 mb-4">Your payment history will appear here</p>
              <button onClick={() => setActiveTab('transfer')} className="px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 active:scale-[0.97] transition-all duration-200">Make a Payment</button>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map(txn => (
                <motion.div key={txn.id} variants={staggerItem} className={`bg-white rounded-2xl p-5 border shadow-xs transition-all duration-200 hover:shadow-md ${txn.status === 'completed' ? 'border-gray-100' : txn.status === 'processing' ? 'border-amber-200' : 'border-red-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.status === 'completed' ? 'bg-emerald-50' : txn.status === 'processing' ? 'bg-amber-50' : 'bg-red-50'}`}>
                        {txn.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : txn.status === 'processing' ? <Clock className="w-5 h-5 text-amber-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{txn.universityName || txn.selfAccountName || 'Self Transfer'}</p>
                        <p className="text-xs text-gray-400">{txn.purpose} • {new Date(txn.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-gray-900">${txn.amount.toLocaleString()}</p>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${txn.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : txn.status === 'processing' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{txn.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Txn ID</p><p className="font-mono font-bold text-gray-700 truncate">{txn.id}</p></div>
                    <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Confirmation</p><p className="font-mono font-bold text-gray-700 truncate">{txn.confirmationCode}</p></div>
                    <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Method</p><p className="font-bold text-gray-700 capitalize">{txn.paymentMethod.replace('_', ' ')}</p></div>
                    <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">ETA</p><p className="font-bold text-gray-700">{txn.estimatedCompletion}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Info Banner */}
      <motion.div variants={staggerItem} className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <Banknote className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Secure Payments</h3>
            <p className="text-sm text-gray-600 mb-3">All transfers are encrypted and processed securely. University bank details are verified. Card payments, GPay, and PhonePe are processed instantly. Bank transfers may take 2-3 business days.</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-blue-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />256-bit Encryption</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-blue-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />Instant Confirmation</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-blue-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />GPay & PhonePe Supported</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-blue-100"><CheckCircle2 className="w-3 h-3 text-emerald-500" />24/7 Support</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
