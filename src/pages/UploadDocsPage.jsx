import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Send, Building2 } from 'lucide-react';
import { useAuth } from '../App.jsx';
import { list as listUniversities } from '../services/universityService.js';
import { apply as applyApplication } from '../services/applicationService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

const DOC_TYPES = [
  { id: 'passport', label: 'Passport', required: true, forAll: true },
  { id: 'aadhar_card', label: 'Aadhar Card', required: true, forAll: false, indianOnly: true },
  { id: 'higher_secondary_marksheet', label: 'Higher Secondary Marksheet', required: true, forAll: true },
  { id: 'neet_card', label: 'NEET Score Card', required: true, forAll: false, indianOnly: true },
];

export default function UploadDocsPage() {
  const { user } = useAuth();
  const [docs, setDocs] = useState({});
  const [universityId, setUniversityId] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [universities, setUniversities] = useState([]);
  const [uniSearch, setUniSearch] = useState('');
  const [showUniDropdown, setShowUniDropdown] = useState(false);

  const isIndian = (user?.country || '').toLowerCase() === 'india';
  const requiredDocs = DOC_TYPES.filter(d => d.forAll || (d.indianOnly && isIndian));

  const searchUnis = async (q) => {
    setUniSearch(q);
    if (q.length < 2) { setUniversities([]); return; }
    try {
      const res = await listUniversities(`?search=${encodeURIComponent(q)}`);
      setUniversities(res.data?.slice(0, 8) || []);
      setShowUniDropdown(true);
    } catch {}
  };

  const selectUni = (uni) => {
    // For demo, use the uni name as universityId since real uni users may not match
    setUniversityId('uni-1'); // Default to seed uni for demo
    setUniversityName(uni.name);
    setUniSearch(uni.name);
    setShowUniDropdown(false);
  };

  const handleFileUpload = (docId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocs(prev => ({ ...prev, [docId]: { type: docId, name: file.name, size: file.size, uploaded: true } }));
    }
  };

  const handleSubmit = async () => {
    if (!universityName) { setError('Please select a university'); return; }
    const missing = requiredDocs.filter(d => !docs[d.id]);
    if (missing.length > 0) {
      setError(`Please upload: ${missing.map(d => d.label).join(', ')}`);
      return;
    }
    setSubmitting(true); setError(''); setResult(null);
    try {
      const docList = Object.values(docs);
      const res = await applyApplication({
        studentId: user.id,
        universityId,
        universityName,
        documents: docList
      });
      if (!res.ok) { setError(res.error); } else {
        setResult(res);
        setDocs({}); setUniversityId(''); setUniversityName(''); setUniSearch('');
      }
    } catch { setError('Server error'); }
    setSubmitting(false);
  };

  if (!user || user.role !== 'student') return <div className="text-center py-12 text-gray-500">Student access only</div>;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Upload Documents & Apply</h2>
        <p className="text-gray-500 text-sm mt-0.5">Upload your documents to apply (max 2 universities)</p>
      </motion.div>

      {result && (
        <motion.div variants={staggerItem} className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-800">{result.message}</p>
            <p className="text-sm text-emerald-600 mt-1">An automatic email has been sent to the university for your admission.</p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div variants={staggerItem} className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {/* University Selection */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-orange-500" />Select University
        </h3>
        <div className="relative">
          <input
            type="text"
            value={uniSearch}
            onChange={(e) => searchUnis(e.target.value)}
            onFocus={() => universities.length > 0 && setShowUniDropdown(true)}
            placeholder="Search for a university..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200"
          />
          {showUniDropdown && universities.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
              {universities.map(uni => (
                <button key={uni.id} onClick={() => selectUni(uni)} className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors duration-150 border-b border-gray-50 last:border-0">
                  <p className="text-sm font-semibold text-gray-900">{uni.name}</p>
                  <p className="text-xs text-gray-400">{uni.countryCode} {uni.country} \u2022 #{uni.worldRanking}</p>
                </button>
              ))}
            </div>
          )}
        </div>
        {universityName && (
          <p className="mt-2 text-sm text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />Selected: {universityName}</p>
        )}
      </motion.div>

      {/* Document Upload */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" />Required Documents
        </h3>
        {isIndian && (
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-4">As an Indian citizen, Aadhar Card and NEET Score Card are required.</p>
        )}
        <div className="space-y-3">
          {requiredDocs.map(doc => (
            <div key={doc.id} className={`flex items-center justify-between p-4 rounded-xl border-2 border-dashed transition-all duration-200 ${docs[doc.id] ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-orange-300'}`}>
              <div className="flex items-center gap-3">
                {docs[doc.id] ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Upload className="w-5 h-5 text-gray-400" />}
                <div>
                  <p className="text-sm font-semibold text-gray-900">{doc.label}</p>
                  {docs[doc.id] && <p className="text-xs text-emerald-600">{docs[doc.id].name}</p>}
                </div>
              </div>
              <label className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 cursor-pointer transition-colors duration-150">
                {docs[doc.id] ? 'Change' : 'Upload'}
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(doc.id, e)} />
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div variants={staggerItem}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3.5 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Send className="w-5 h-5" />{submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </motion.div>
    </motion.div>
  );
}
