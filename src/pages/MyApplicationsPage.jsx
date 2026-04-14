import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CheckCircle2, Clock, CreditCard, FileText, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../App.jsx';
import { listByUser as fetchMyApps } from '../services/applicationService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

const STATUS_CONFIG = {
  submitted: { label: 'Submitted', color: 'bg-blue-50 text-blue-700', icon: Clock },
  admission_issued: { label: 'Admission Issued', color: 'bg-emerald-50 text-emerald-700', icon: FileText },
  payment_completed: { label: 'Payment Done', color: 'bg-purple-50 text-purple-700', icon: CreditCard },
  invitation_sent: { label: 'Invitation Sent', color: 'bg-amber-50 text-amber-700', icon: Mail },
  rejected: { label: 'Rejected', color: 'bg-red-50 text-red-700', icon: AlertCircle },
};

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetchMyApps(user.id)
      .then(d => setApps(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (!user) return <div className="text-center py-12 text-gray-500">Please login</div>;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">My Applications</h2>
        <p className="text-gray-500 text-sm mt-0.5">{apps.length} application(s) \u2022 Max 2 allowed</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : apps.length === 0 ? (
        <motion.div variants={staggerItem} className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No applications yet</h3>
          <p className="text-sm text-gray-500">Upload your documents and apply to a university</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {apps.map(app => {
            const sc = STATUS_CONFIG[app.status] || STATUS_CONFIG.submitted;
            const Icon = sc.icon;
            return (
              <motion.div key={app.id} variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{app.universityName}</h3>
                    <p className="text-xs text-gray-400">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${sc.color}`}>
                    <Icon className="w-3.5 h-3.5" />{sc.label}
                  </span>
                </div>
                {/* Progress */}
                <div className="flex items-center gap-2 mb-4">
                  {['submitted', 'admission_issued', 'payment_completed', 'invitation_sent'].map((step, i) => {
                    const steps = ['submitted', 'admission_issued', 'payment_completed', 'invitation_sent'];
                    const currentIdx = steps.indexOf(app.status);
                    const done = i <= currentIdx;
                    return (
                      <React.Fragment key={step}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>{i + 1}</div>
                        {i < 3 && <div className={`flex-1 h-1 rounded-full ${done && i < currentIdx ? 'bg-orange-500' : 'bg-gray-100'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Documents</p><p className="font-semibold text-gray-900">{app.documents?.length || 0} uploaded</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Admission</p><p className="font-semibold text-gray-900">{app.admissionLetterIssued ? 'Issued' : 'Pending'}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Payment</p><p className="font-semibold text-gray-900">{app.admissionPaymentDone ? 'Paid' : 'Pending'}</p></div>
                  <div className="p-2 bg-gray-50 rounded-lg"><p className="text-gray-400 mb-0.5">Invitation</p><p className="font-semibold text-gray-900">{app.invitationLetterIssued ? 'Sent' : 'Pending'}</p></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
