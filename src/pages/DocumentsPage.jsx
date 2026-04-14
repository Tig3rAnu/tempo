import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Clock, AlertCircle, Stamp, Globe, Languages, MapPin, Phone, Mail } from 'lucide-react';
import { list as fetchDocuments, upload as uploadDocument } from '../services/documentService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const statusConfig = {
  'Verified': { color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  'Under Review': { color: 'bg-blue-50 text-blue-700', icon: Clock },
  'Pending': { color: 'bg-amber-50 text-amber-700', icon: AlertCircle },
  'Not Uploaded': { color: 'bg-gray-50 text-gray-500', icon: Upload },
};

const SERVICE_PROVIDERS = [
  {
    id: 1,
    type: 'translation',
    title: 'Certified Translation Services',
    name: 'Global Lingua Experts',
    desc: 'Authorized translations for Russian, Spanish, French & German. Accepted by all embassies.',
    address: '45, Connaught Place, Inner Circle, New Delhi - 110001',
    contact: '+91-11-2345-6789',
    email: 'support@globallingua.com',
    cost: '₹800 - ₹1,200 per page',
    icon: Languages,
    color: 'blue'
  },
  {
    id: 2,
    type: 'notary',
    title: 'Notary Public & Legal',
    name: 'Delhi Supreme Notary',
    desc: 'Affidavits, true copy attestation, and legal documentation support.',
    address: 'Chamber 102, Patiala House Court, New Delhi',
    contact: '+91-98765-43210',
    email: 'legal@delhinotary.in',
    cost: '₹100 - ₹300 per document',
    icon: Stamp,
    color: 'orange'
  },
  {
    id: 3,
    type: 'apostille',
    title: 'MEA Apostille & HRD',
    name: 'Superb Enterprises',
    desc: 'MEA Apostille, HRD Attestation, and Embassy Legalization services.',
    address: '1006, 10th Floor, Hemkunt Tower, Rajendra Place, New Delhi',
    contact: '+91-11-4185-5999',
    email: 'info@superbenterprises.com',
    cost: '₹4,000 - ₹6,000 (Full Package)',
    icon: Globe,
    color: 'purple'
  },
  {
    id: 4,
    type: 'visa',
    title: 'Visa Application Center',
    name: 'VFS Global Services',
    desc: 'Official partner for visa processing, biometrics, and document submission.',
    address: 'Shivaji Stadium Metro Station, Mezzanine Level, New Delhi',
    contact: '+91-22-6786-6010',
    email: 'info.attest@vfs.com',
    cost: 'Varies by Country',
    icon: FileText,
    color: 'emerald'
  }
];

export default function DocumentsPage() {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    fetchDocuments()
      .then(res => { if (!canceled) setDocs(res.data || []); })
      .catch(() => {})
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, []);

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8 pb-8">
      <motion.div variants={staggerItem} className="space-y-5">
        <div variants={staggerItem}>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Documents</h2>
          <p className="text-gray-500 text-sm mt-0.5">Upload and track your documents</p>
        </div>
        <motion.div variants={staggerItem} className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-200 text-center hover:border-orange-300 transition-colors duration-300">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">Drop files here or click to upload</p>
          <p className="text-xs text-gray-400 mb-5">PDF, JPG, PNG up to 10MB</p>
          <button className="px-5 py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20"
            onClick={async () => {
              // trigger file dialog and upload
              const input = document.createElement('input');
              input.type = 'file';
              input.onchange = async () => {
                const file = input.files[0];
                if (!file) return;
                const form = new FormData();
                form.append('file', file);
                setLoading(true);
                try {
                  const res = await uploadDocument(form);
                  if (res.data) {
                    setDocs(prev => [...prev, res.data]);
                  }
                } catch (e) {}
                setLoading(false);
              };
              input.click();
            }}
          >Upload</button>
        </motion.div>
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading documents...</div>
        ) : (
          <motion.div variants={staggerItem} className="bg-white rounded-2xl border border-gray-100/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100"><h3 className="text-base font-bold text-gray-900">Status</h3></div>
            <div className="divide-y divide-gray-50">
              {docs.map((doc, i) => {
                const sc = statusConfig[doc.status] || statusConfig['Pending'];
                const Icon = sc.icon;
                return (
                  <div key={doc.id || i} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div><p className="text-sm font-semibold text-gray-900">{doc.name}</p><p className="text-xs text-gray-400">{doc.date}</p></div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${sc.color}`}><Icon className="w-3 h-3" />{doc.status}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-2 mb-4">
          <Stamp className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-black text-gray-900">Document Services</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">Verified partners for translation, notary, and legalization services.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_PROVIDERS.map(service => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-${service.color}-50 text-${service.color}-600`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{service.name}</h3>
                    <p className={`text-xs font-semibold text-${service.color}-600 uppercase tracking-wide mb-2`}>{service.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{service.desc}</p>

                    <div className="space-y-2 bg-gray-50 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-600">{service.address}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <p className="text-xs text-gray-600">{service.contact}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <p className="text-xs text-gray-600 truncate">{service.email}</p>
                        </div>
                      </div>
                      <div className="pt-2 mt-2 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">Estimated Cost</span>
                        <span className="text-xs font-bold text-gray-900">{service.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
