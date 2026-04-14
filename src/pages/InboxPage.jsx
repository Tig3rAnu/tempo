import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Mail, MailOpen, FileText, Download, CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../App.jsx';
import { list as fetchInboxList, markRead as markMessageRead } from '../services/inboxService.js';
import { performAction } from '../services/applicationService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } } };

export default function InboxPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [payingFor, setPayingFor] = useState(null);
  const [paySuccess, setPaySuccess] = useState(null);

  const fetchInbox = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetchInboxList(user.id);
      setMessages(res.data || []);
    } catch {}
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { fetchInbox(); }, [fetchInbox]);

  const markRead = async (msg) => {
    if (!msg.read) {
      try { await markMessageRead(msg.id); } catch {}
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
    setSelectedMsg(msg);
  };

  const handlePayForAdmission = async (appId) => {
    setPayingFor(appId);
    try {
      const res = await performAction(appId, 'pay-admission');
      if (res && res.ok) {
        setPaySuccess(appId);
        setTimeout(() => setPaySuccess(null), 3000);
      }
    } catch {}
    setPayingFor(null);
  };

  const getIcon = (type) => {
    if (type === 'admission_letter') return <FileText className="w-5 h-5 text-emerald-500" />;
    if (type === 'invitation_letter') return <Mail className="w-5 h-5 text-blue-500" />;
    if (type === 'application') return <Inbox className="w-5 h-5 text-purple-500" />;
    return <Mail className="w-5 h-5 text-gray-400" />;
  };

  if (!user) return <div className="text-center py-12 text-gray-500">Please login to view inbox</div>;

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-5">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Inbox</h2>
        <p className="text-gray-500 text-sm mt-0.5">{messages.length} messages</p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <motion.div variants={staggerItem} className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No messages yet</h3>
          <p className="text-sm text-gray-500">Messages from universities and system notifications will appear here</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Message list */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map(msg => (
              <motion.button
                key={msg.id}
                variants={staggerItem}
                onClick={() => markRead(msg)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${selectedMsg?.id === msg.id ? 'bg-orange-50 border-orange-200 shadow-xs' : msg.read ? 'bg-white border-gray-100 hover:bg-gray-50' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'}`}
              >
                <div className="flex items-start gap-3">
                  {getIcon(msg.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${msg.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{msg.subject}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.body?.substring(0, 60)}...</p>
                    <p className="text-[10px] text-gray-300 mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                  {!msg.read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2" />}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-2">
            {selectedMsg ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
                <div className="flex items-start gap-3 mb-4">
                  {getIcon(selectedMsg.type)}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedMsg.subject}</h3>
                    <p className="text-xs text-gray-400">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{selectedMsg.body}</p>
                </div>
                {/* Action buttons based on type */}
                {selectedMsg.attachmentType === 'admission_letter' && (
                  <div className="space-y-3">
                    {paySuccess === selectedMsg.applicationId ? (
                      <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-700">Payment successful! You can now download the admission letter.</span>
                      </div>
                    ) : null}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handlePayForAdmission(selectedMsg.applicationId)}
                        disabled={payingFor === selectedMsg.applicationId || paySuccess === selectedMsg.applicationId}
                        className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20 disabled:opacity-60"
                      >
                        <CreditCard className="w-4 h-4" />
                        {payingFor === selectedMsg.applicationId ? 'Processing...' : 'Pay \u20b910,000 to Download'}
                      </button>
                      {paySuccess === selectedMsg.applicationId && (
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-bold rounded-xl hover:bg-emerald-600 active:scale-[0.97] transition-all duration-200">
                          <Download className="w-4 h-4" />Download Letter
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {selectedMsg.attachmentType === 'invitation_letter' && (
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-600 active:scale-[0.97] transition-all duration-200">
                    <Download className="w-4 h-4" />Download Invitation Letter
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <MailOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
