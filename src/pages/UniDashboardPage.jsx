import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Send, CheckCircle2, Clock, Mail } from 'lucide-react';
import { useAuth } from '../App.jsx';
import { listByUser as fetchAppsByUser, performAction } from '../services/applicationService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

export default function UniDashboardPage() {
  const { user } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchApps = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetchAppsByUser(user.id);
      setApps(res.data || []);
    } catch {}
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const handleAction = async (appId, action) => {
    setActionLoading(appId + action);
    try {
      await performAction(appId, action);
      await fetchApps();
    } catch {}
    setActionLoading(null);
  };

  if (!user || user.role !== 'university') return <div className="text-center py-12 text-gray-500">University access only</div>;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Student Applications</h2>
        <p className="text-gray-500 text-sm mt-0.5">{apps.length} application(s) received</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : apps.length === 0 ? (
        <motion.div variants={staggerItem} className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No applications yet</h3>
          <p className="text-sm text-gray-500">Student applications will appear here</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {apps.map(app => (
            <motion.div key={app.id} variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{app.studentName}</h3>
                  <p className="text-xs text-gray-400">{app.studentEmail} \u2022 {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold capitalize">{app.status.replace(/_/g, ' ')}</span>
              </div>

              {/* Documents */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Documents Submitted</p>
                <div className="flex flex-wrap gap-2">
                  {app.documents?.map((doc, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-100 flex items-center gap-1">
                      <FileText className="w-3 h-3" />{doc.type.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                {!app.admissionLetterIssued && (
                  <button
                    onClick={() => handleAction(app.id, 'admission-letter')}
                    disabled={actionLoading === app.id + 'admission-letter'}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
                  >
                    <FileText className="w-3.5 h-3.5" />Issue Admission Letter
                  </button>
                )}
                {app.admissionLetterIssued && !app.documentsReceivedConfirmed && (
                  <button
                    onClick={() => handleAction(app.id, 'confirm-documents')}
                    disabled={actionLoading === app.id + 'confirm-documents'}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />Confirm Docs Received
                  </button>
                )}
                {app.documentsReceivedConfirmed && !app.invitationLetterIssued && (
                  <button
                    onClick={() => handleAction(app.id, 'invitation-letter')}
                    disabled={actionLoading === app.id + 'invitation-letter'}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-sm font-bold rounded-xl hover:bg-amber-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
                  >
                    <Mail className="w-3.5 h-3.5" />Send Invitation Letter
                  </button>
                )}
                {app.admissionLetterIssued && <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" />Admission Issued</span>}
                {app.invitationLetterIssued && <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" />Invitation Sent</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
