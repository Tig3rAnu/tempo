import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Building2, Briefcase, Heart, GraduationCap, LogOut,
  BarChart3, Plus, Search, Edit3, Trash2, CheckCircle2, XCircle,
  Clock, Eye, X, ChevronDown, ChevronUp, Mail, Phone, Globe, AlertCircle,
  UserPlus, RefreshCw, Home, Key, MapPin, Calendar, Hash,
  FileText, Activity, Ban, RotateCcw, CheckSquare, Square,
  Download, Lock, Unlock, MessageSquare, History, Zap, MoreHorizontal,
  ClipboardList, BookOpen, Video, PlayCircle, Coins, List
} from 'lucide-react';
import { ShikshaLogo } from '../components/ShikshaLogo.jsx';
import Modal from '../components/Modal.jsx';
import HtmlEditor from '../components/HtmlEditor.jsx';

// services
import { getStats, listUsers, saveUser, listResource, saveResource, deleteResource } from '../services/adminService.js';
import { list as listTests, create as createTest, update as updateTest, remove as deleteTest } from '../services/testService.js';
import { list as listMaterials, create as createMaterial, update as updateMaterial, remove as deleteMaterial } from '../services/materialService.js';
import { list as listUniversities, create as createUniversity, update as updateUniversity, remove as removeUniversity } from '../services/universityService.js';

const staggerContainer = { animate: { transition: { staggerChildren: 0.04 } } };
const staggerItem = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] } } };

const ROLE_CONFIG = {
  agent: { label: 'Agents', singular: 'Agent', icon: Briefcase, color: 'emerald', gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  university: { label: 'Universities', singular: 'University', icon: Building2, color: 'purple', gradient: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50', text: 'text-purple-700' },
  parent: { label: 'Parents', singular: 'Parent', icon: Heart, color: 'pink', gradient: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', text: 'text-pink-700' },
  student: { label: 'Students', singular: 'Student', icon: GraduationCap, color: 'blue', gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-700' },
};

const STATUS_BADGES = {
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: CheckCircle2 },
  pending_admin: { label: 'Pending Approval', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', icon: Clock },
  pending_verification: { label: 'Unverified', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', icon: Clock },
  pending_documents: { label: 'Needs Docs', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500', icon: FileText },
  rejected: { label: 'Rejected', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', icon: XCircle },
  suspended: { label: 'Suspended', bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500', icon: Ban },
};

/* ========== MODALS ========== */

function UserFormModal({ isOpen, onClose, onSave, user, roleFilter }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', role: roleFilter || 'student', password: '', status: 'active', notes: '', agentLicense: '', universityAccreditation: '', parentStudentLink: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ ...user, password: '' });
    } else {
      setForm({ name: '', email: '', phone: '', country: '', role: roleFilter || 'student', password: '', status: 'active', notes: '', agentLicense: '', universityAccreditation: '', parentStudentLink: '' });
    }
    setError('');
  }, [user, roleFilter, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError('Name and email are required'); return; }
    setLoading(true); setError('');
    try { await onSave(form); onClose(); } catch (err) { setError(err.message || 'Failed to save'); }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Create User'}
      size="lg"
      footer={<button type="submit" form="user-form" disabled={loading} className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save User'}</button>}
    >
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Name</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required /></div>
          <div><label className={labelClass}>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} required /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Role</label><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputClass}><option value="student">Student</option><option value="agent">Agent</option><option value="university">University</option><option value="parent">Parent</option></select></div>
          <div><label className={labelClass}>Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputClass}><option value="active">Active</option><option value="pending_admin">Pending Approval</option><option value="rejected">Rejected</option></select></div>
        </div>
      </form>
    </Modal>
  );
}

function TestFormModal({ isOpen, onClose, onSave, test }) {
  const [form, setForm] = useState({ name: '', category: 'FMGE', questions: 50, duration: '60 min', difficulty: 'Medium', isSample: false, scheduledFor: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (test) setForm(test);
    else setForm({ name: '', category: 'FMGE', questions: 50, duration: '60 min', difficulty: 'Medium', isSample: false, scheduledFor: '' });
  }, [test, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await onSave(form); onClose(); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={test ? 'Edit Mock Test' : 'Add Mock Test'}
      size="lg"
      footer={<button type="submit" form="test-form" disabled={loading} className="py-3 px-6 bg-blue-600 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save Test'}</button>}
    >
      <form id="test-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Test Name</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} required /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}><option>FMGE</option><option>IELTS</option><option>TOEFL</option><option>GRE</option><option>SAT</option><option>GMAT</option></select></div>
          <div><label className={labelClass}>Difficulty</label><select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})} className={inputClass}><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Questions</label><input type="number" value={form.questions} onChange={e => setForm({...form, questions: e.target.value})} className={inputClass} /></div>
          <div><label className={labelClass}>Duration</label><input type="text" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>Schedule Date (Optional)</label><input type="datetime-local" value={form.scheduledFor || ''} onChange={e => setForm({...form, scheduledFor: e.target.value})} className={inputClass} /></div>
        <div className="flex items-center gap-2"><input type="checkbox" checked={form.isSample} onChange={e => setForm({...form, isSample: e.target.checked})} className="w-4 h-4 text-blue-600 rounded-sm" /><label className="text-sm text-gray-700">Free Sample Test</label></div>
      </form>
    </Modal>
  );
}

function MaterialFormModal({ isOpen, onClose, onSave, material }) {
  const [form, setForm] = useState({ title: '', type: 'PDF', category: 'FMGE', subject: '', size: '5 MB', videoUrl: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (material) setForm(material);
    else setForm({ title: '', type: 'PDF', category: 'FMGE', subject: '', size: '5 MB', videoUrl: '' });
  }, [material, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await onSave(form); onClose(); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={material ? 'Edit Material' : 'Add Material'}
      size="lg"
      footer={<button type="submit" form="material-form" disabled={loading} className="py-3 px-6 bg-purple-600 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save Material'}</button>}
    >
      <form id="material-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Title</label><input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} required /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}><option>FMGE</option><option>IELTS</option><option>TOEFL</option><option>GRE</option><option>SAT</option><option>GMAT</option></select></div>
          <div><label className={labelClass}>Type</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className={inputClass}><option>PDF</option><option>Video</option></select></div>
        </div>
        <div><label className={labelClass}>Subject (Optional)</label><input type="text" value={form.subject || ''} onChange={e => setForm({...form, subject: e.target.value})} className={inputClass} /></div>
        {form.type === 'Video' && (
          <div><label className={labelClass}>Video URL</label><input type="url" value={form.videoUrl || ''} onChange={e => setForm({...form, videoUrl: e.target.value})} placeholder="https://youtube.com/..." className={inputClass} /></div>
        )}
      </form>
    </Modal>
  );
}

function CountryFormModal({ isOpen, onClose, onSave, country }) {
  const [form, setForm] = useState({
    name: '', slug: '', code: '', iso2: '', iso3: '', capital: '', lang: '', caption: '',
    gmap: '', image: '', gallery: '', coordinates: '', currency: '', population: '', neighbours: '',
    geography: '', history: '', demographics: '', transportation: '', economy: '', visa_req: '',
    living_cost: '', can_work: false, work_details: '', benefits: '', note: '',
    priority: 0, views: 0, active: false
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (country) setForm({
      ...country,
      gallery: Array.isArray(country.gallery) ? country.gallery.join(',') : country.gallery || '',
      neighbours: Array.isArray(country.neighbours) ? country.neighbours.join(',') : country.neighbours || ''
    });
    else setForm({
      name: '', slug: '', code: '', iso2: '', iso3: '', capital: '', lang: '', caption: '',
      gmap: '', image: '', gallery: '', coordinates: '', currency: '', population: '', neighbours: '',
      geography: '', history: '', demographics: '', transportation: '', economy: '', visa_req: '',
      living_cost: '', can_work: false, work_details: '', benefits: '', note: '',
      priority: 0, views: 0, active: false
    });
  }, [country, isOpen]);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      if (payload.gallery) payload.gallery = payload.gallery.split(',').map(s => s.trim());
      if (payload.neighbours) payload.neighbours = payload.neighbours.split(',').map(s => s.trim());
      await onSave(payload);
      onClose();
    } catch (err) { console.error(err); }
    setLoading(false);
  };
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={country ? 'Edit Country' : 'Add Country'}
      size="lg"
      footer={<button type="submit" form="country-form" disabled={loading} className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save'}</button>}
    >
      <form id="country-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Name</label><input required className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Slug</label><input className={inputClass} value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div>
          <div><label className={labelClass}>Code</label><input className={inputClass} value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>ISO2</label><input className={inputClass} value={form.iso2} onChange={e => setForm({ ...form, iso2: e.target.value })} /></div>
          <div><label className={labelClass}>ISO3</label><input className={inputClass} value={form.iso3} onChange={e => setForm({ ...form, iso3: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Capital</label><input className={inputClass} value={form.capital} onChange={e => setForm({ ...form, capital: e.target.value })} /></div>
          <div><label className={labelClass}>Language</label><input className={inputClass} value={form.lang} onChange={e => setForm({ ...form, lang: e.target.value })} /></div>
        </div>
        <div><label className={labelClass}>Caption</label><input className={inputClass} value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} /></div>
        <div><label className={labelClass}>GMap iframe/URL</label><input className={inputClass} value={form.gmap} onChange={e => setForm({ ...form, gmap: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Image URL</label><input className={inputClass} value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} /></div>
          <div><label className={labelClass}>Gallery (comma separated)</label><input className={inputClass} value={form.gallery} onChange={e => setForm({ ...form, gallery: e.target.value })} /></div>
        </div>
        <div><label className={labelClass}>Neighbours (comma separated)</label><input className={inputClass} value={form.neighbours} onChange={e => setForm({ ...form, neighbours: e.target.value })} /></div>
        <div><label className={labelClass}>Coordinates / misc JSON</label><textarea rows="2" className={inputClass} value={form.coordinates} onChange={e => setForm({ ...form, coordinates: e.target.value })} /></div>
        <div><label className={labelClass}>Currency JSON</label><textarea rows="2" className={inputClass} value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} /></div>
        <div><label className={labelClass}>Population JSON</label><textarea rows="2" className={inputClass} value={form.population} onChange={e => setForm({ ...form, population: e.target.value })} /></div>
        <div><label className={labelClass}>Geography JSON</label><textarea rows="2" className={inputClass} value={form.geography} onChange={e => setForm({ ...form, geography: e.target.value })} /></div>
        <div><label className={labelClass}>History</label><HtmlEditor value={form.history} onChange={v => setForm({ ...form, history: v })} /></div>
        <div><label className={labelClass}>Demographics JSON</label><textarea rows="2" className={inputClass} value={form.demographics} onChange={e => setForm({ ...form, demographics: e.target.value })} /></div>
        <div><label className={labelClass}>Transportation JSON</label><textarea rows="2" className={inputClass} value={form.transportation} onChange={e => setForm({ ...form, transportation: e.target.value })} /></div>
        <div><label className={labelClass}>Economy JSON</label><textarea rows="2" className={inputClass} value={form.economy} onChange={e => setForm({ ...form, economy: e.target.value })} /></div>
        <div><label className={labelClass}>Visa Requirements</label><input className={inputClass} value={form.visa_req} onChange={e => setForm({ ...form, visa_req: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Living Cost</label><input type="number" className={inputClass} value={form.living_cost} onChange={e => setForm({ ...form, living_cost: e.target.value })} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.can_work} onChange={e => setForm({ ...form, can_work: e.target.checked })} className="w-4 h-4 text-gray-600"/><label className="text-sm text-gray-700">Can Work</label></div>
        </div>
        <div><label className={labelClass}>Work Details</label><HtmlEditor value={form.work_details} onChange={v => setForm({ ...form, work_details: v })} /></div>
        <div><label className={labelClass}>Benefits</label><HtmlEditor value={form.benefits} onChange={v => setForm({ ...form, benefits: v })} /></div>
        <div><label className={labelClass}>Note</label><HtmlEditor value={form.note} onChange={v => setForm({ ...form, note: v })} /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelClass}>Priority</label><input type="number" className={inputClass} value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} /></div>
          <div><label className={labelClass}>Views</label><input type="number" className={inputClass} value={form.views} onChange={e => setForm({ ...form, views: e.target.value })} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 text-gray-600"/><label className="text-sm text-gray-700">Active</label></div>
        </div>
      </form>
    </Modal>
  );
}

function UniversityFormModal({ isOpen, onClose, onSave, university, countries }) {
  const [form, setForm] = useState({
    name: '', slug: '', country: '', alias: '', caption: '', founded: '', type: '', gmap: '',
    image: '', logo: '', gallery: '', bank_statement: 0, application_fees: 0, benefits: '',
    scholarship: false, scholarship_policy: '', note: '', prospectus_path: '',
    contract_type: '', contract_path: '', priority: 0, views: 0, active: true
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (university) setForm({
      ...university,
      gallery: Array.isArray(university.gallery) ? university.gallery.join(',') : university.gallery || ''
    });
    else setForm({
      name: '', slug: '', country: '', alias: '', caption: '', founded: '', type: '', gmap: '',
      image: '', logo: '', gallery: '', bank_statement: 0, application_fees: 0, benefits: '',
      scholarship: false, scholarship_policy: '', note: '', prospectus_path: '',
      contract_type: '', contract_path: '', priority: 0, views: 0, active: true
    });
  }, [university, isOpen]);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      if (payload.gallery) payload.gallery = payload.gallery.split(',').map(s => s.trim());
      await onSave(payload);
      onClose();
    } catch (err) { console.error(err); }
    setLoading(false);
  };
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={university ? 'Edit University' : 'Add University'}
      size="lg"
      footer={<button type="submit" form="university-form" disabled={loading} className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save'}</button>}
    >
      <form id="university-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Name</label><input required className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Slug</label><input className={inputClass} value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></div>
          <div><label className={labelClass}>Country</label><select className={inputClass} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
              <option value="">Select country</option>
              {countries.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Alias</label><input className={inputClass} value={form.alias} onChange={e => setForm({ ...form, alias: e.target.value })} /></div>
          <div><label className={labelClass}>Caption</label><input className={inputClass} value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Founded</label><input className={inputClass} value={form.founded} onChange={e => setForm({ ...form, founded: e.target.value })} /></div>
          <div><label className={labelClass}>Type</label><select className={inputClass} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="">Select</option>
              <option value="govt">govt</option>
              <option value="pvt">pvt</option>
            </select></div>
        </div>
        <div><label className={labelClass}>GMap iframe/URL</label><input className={inputClass} value={form.gmap} onChange={e => setForm({ ...form, gmap: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Image URL</label><input className={inputClass} value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} /></div>
          <div><label className={labelClass}>Logo URL</label><input className={inputClass} value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} /></div>
        </div>
        <div><label className={labelClass}>Gallery (comma separated)</label><input className={inputClass} value={form.gallery} onChange={e => setForm({ ...form, gallery: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Bank Statement</label><input type="number" className={inputClass} value={form.bank_statement} onChange={e => setForm({ ...form, bank_statement: e.target.value })} /></div>
          <div><label className={labelClass}>Application Fees</label><input type="number" className={inputClass} value={form.application_fees} onChange={e => setForm({ ...form, application_fees: e.target.value })} /></div>
        </div>
        <div><label className={labelClass}>Benefits</label><HtmlEditor value={form.benefits} onChange={v => setForm({ ...form, benefits: v })} /></div>
        <div className="flex items-center gap-2"><input type="checkbox" checked={form.scholarship} onChange={e => setForm({ ...form, scholarship: e.target.checked })} className="w-4 h-4 text-gray-600" /><label className="text-sm text-gray-700">Scholarship</label></div>
        <div><label className={labelClass}>Scholarship Policy</label><HtmlEditor value={form.scholarship_policy} onChange={v => setForm({ ...form, scholarship_policy: v })} /></div>
        <div><label className={labelClass}>Note</label><HtmlEditor value={form.note} onChange={v => setForm({ ...form, note: v })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Prospectus Path</label><input className={inputClass} value={form.prospectus_path} onChange={e => setForm({ ...form, prospectus_path: e.target.value })} /></div>
          <div><label className={labelClass}>Contract Type</label><select className={inputClass} value={form.contract_type} onChange={e => setForm({ ...form, contract_type: e.target.value })}>
              <option value="">Select</option>
              <option value="direct">direct</option>
              <option value="indirect">indirect</option>
            </select></div>
        </div>
        <div><label className={labelClass}>Contract Path</label><input className={inputClass} value={form.contract_path} onChange={e => setForm({ ...form, contract_path: e.target.value })} /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelClass}>Priority</label><input type="number" className={inputClass} value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} /></div>
          <div><label className={labelClass}>Views</label><input type="number" className={inputClass} value={form.views} onChange={e => setForm({ ...form, views: e.target.value })} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 text-gray-600" /><label className="text-sm text-gray-700">Active</label></div>
        </div>
      </form>
    </Modal>
  );
}

function SimpleNameModal({ isOpen, onClose, onSave, item, title }) {
  const [form, setForm] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (item) setForm(item); else setForm({ name: '' }); }, [item, isOpen]);
  const handleSubmit = async e => { e.preventDefault(); setLoading(true); try{await onSave(form); onClose();}catch{} setLoading(false); };
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? `Edit ${title}` : `Add ${title}`}
      size="md"
      footer={<button type="submit" form="simple-form" disabled={loading} className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save'}</button>}
    >
      <form id="simple-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Name</label><input required className={inputClass} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
      </form>
    </Modal>
  );
}

function DepartmentFormModal({ isOpen, onClose, onSave, department, departments }) {
  const [form, setForm] = useState({ name: '', parent: '' });
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (department) setForm({ name: department.name, parent: department.parent?._id||'' }); else setForm({ name: '', parent: '' }); }, [department, isOpen]);
  const handleSubmit = async e => { e.preventDefault(); setLoading(true); try{await onSave(form); onClose();}catch{} setLoading(false); };
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={department ? 'Edit Department' : 'Add Department'}
      size="md"
      footer={<button type="submit" form="department-form" disabled={loading} className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save'}</button>}
    >
      <form id="department-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Name</label><input required className={inputClass} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div><label className={labelClass}>Parent</label><select className={inputClass} value={form.parent} onChange={e=>setForm({...form,parent:e.target.value})}>
              <option value="">None</option>{(departments||[]).map(d=><option key={d._id} value={d._id}>{d.name}</option>)}
            </select></div>
      </form>
    </Modal>
  );
}

/* ========== DASHBOARD ========== */
function CourseFormModal({ isOpen, onClose, onSave, course, universities, levels, departments }) {
  const [form, setForm] = useState({
    name: '', university: '', level: '', department: '', slug: '', alias: '', caption: '', image: '', gallery: '',
    duration: 0, semester: 0, fees: 0, fees_details: '', other_expenses: '', priority: 0, views: 0, active: true
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (course) setForm({
      ...course,
      gallery: Array.isArray(course.gallery) ? course.gallery.join(',') : course.gallery || ''
    });
    else setForm({
      name: '', university: '', level: '', department: '', slug: '', alias: '', caption: '', image: '', gallery: '',
      duration: 0, semester: 0, fees: 0, fees_details: '', other_expenses: '', priority: 0, views: 0, active: true
    });
  }, [course, isOpen]);
  const handleSubmit = async e => { e.preventDefault(); setLoading(true); try { const payload = {...form}; if(payload.gallery) payload.gallery = payload.gallery.split(',').map(s=>s.trim()); await onSave(payload); onClose(); } catch {} setLoading(false); };
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-gray-400/50 transition-all duration-200";
  const labelClass = "block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";

  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={course ? 'Edit Course' : 'Add Course'}
      size="lg"
      footer={<button type="submit" form="course-form" disabled={loading} className="py-3 px-6 bg-gray-900 text-white font-bold rounded-xl">{loading ? 'Saving...' : 'Save'}</button>}
    >
      <form id="course-form" onSubmit={handleSubmit} className="space-y-4">
        <div><label className={labelClass}>Name</label><input required className={inputClass} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>University</label><select required className={inputClass} value={form.university} onChange={e=>setForm({...form,university:e.target.value})}>
              <option value="">Select</option>{(universities||[]).map(u=><option key={u._id} value={u._id}>{u.name}</option>)}
            </select></div>
          <div><label className={labelClass}>Level</label><select className={inputClass} value={form.level} onChange={e=>setForm({...form,level:e.target.value})}>
              <option value="">Select</option>{(levels||[]).map(l=><option key={l._id} value={l._id}>{l.name}</option>)}
            </select></div>
        </div>
        <div><label className={labelClass}>Department</label><select className={inputClass} value={form.department} onChange={e=>setForm({...form,department:e.target.value})}>
              <option value="">Select</option>{(departments||[]).map(d=><option key={d._id} value={d._id}>{d.name}</option>)}
            </select></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Slug</label><input className={inputClass} value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})}/></div>
          <div><label className={labelClass}>Alias</label><input className={inputClass} value={form.alias} onChange={e=>setForm({...form,alias:e.target.value})}/></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Caption</label><input className={inputClass} value={form.caption} onChange={e=>setForm({...form,caption:e.target.value})}/></div>
          <div><label className={labelClass}>Image URL</label><input className={inputClass} value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/></div>
        </div>
        <div><label className={labelClass}>Gallery (comma separated)</label><input className={inputClass} value={form.gallery} onChange={e=>setForm({...form,gallery:e.target.value})}/></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelClass}>Duration</label><input type="number" className={inputClass} value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}/></div>
          <div><label className={labelClass}>Semester</label><input type="number" className={inputClass} value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})}/></div>
          <div><label className={labelClass}>Fees</label><input type="number" className={inputClass} value={form.fees} onChange={e=>setForm({...form,fees:e.target.value})}/></div>
        </div>
        <div><label className={labelClass}>Fees Details JSON</label><textarea rows="2" className={inputClass} value={form.fees_details} onChange={e=>setForm({...form,fees_details:e.target.value})}/></div>
        <div><label className={labelClass}>Other Expenses JSON</label><textarea rows="2" className={inputClass} value={form.other_expenses} onChange={e=>setForm({...form,other_expenses:e.target.value})}/></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelClass}>Priority</label><input type="number" className={inputClass} value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}/></div>
          <div><label className={labelClass}>Views</label><input type="number" className={inputClass} value={form.views} onChange={e=>setForm({...form,views:e.target.value})}/></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} className="w-4 h-4 text-gray-600"/><label className="text-sm text-gray-700">Active</label></div>
        </div>
      </form>
    </Modal>
  );
}

/* ========== DASHBOARD ========== */
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [universitiesDb, setUniversitiesDb] = useState([]);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [intakes, setIntakes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [qExams, setQExams] = useState([]);
  const [qDegrees, setQDegrees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUni, setExpandedUni] = useState(null);

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [editingIntake, setEditingIntake] = useState(null);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState(null);
  const [showQExamModal, setShowQExamModal] = useState(false);
  const [editingQExam, setEditingQExam] = useState(null);
  const [showQDegreeModal, setShowQDegreeModal] = useState(false);
  const [editingQDegree, setEditingQDegree] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3000); };

  useEffect(() => {
    const stored = sessionStorage.getItem('adminUser');
    if (!stored) { navigate('/admin/login'); return; }
    setAdminUser(JSON.parse(stored));
  }, [navigate]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await getStats();
      setStats(res);
    } catch {};
  }, []);

  const fetchUsers = useCallback(async (role) => {
    setLoading(true);
    try {
      const res = await listUsers(role === 'overview' ? 'all' : role);
      setUsers(res.data || []);
    } catch {}
    setLoading(false);
  }, []);

  const fetchTests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listTests();
      setTests(res.data || []);
    } catch {}
    setLoading(false);
  }, []);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listMaterials();
      setMaterials(res.data || []);
    } catch {}
    setLoading(false);
  }, []);

  const fetchUniversitiesDb = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listUniversities('?limit=1000');
      setUniversitiesDb(res.data || []);
    } catch {}
    setLoading(false);
  }, []);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('countries');
      setCountries(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchFacilities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('facilities');
      setFacilities(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('departments');
      setDepartments(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchIntakes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('intakes');
      setIntakes(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchLevels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('levels');
      setLevels(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchQExams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('q-exams');
      setQExams(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchQDegrees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('q-degrees');
      setQDegrees(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listResource('courses');
      setCourses(res.data || []);
    } catch {};
    setLoading(false);
  }, []);

  useEffect(() => {
    if (adminUser) {
      fetchStats();
      switch (activeTab) {
        case 'tests':
          fetchTests();
          break;
        case 'materials':
          fetchMaterials();
          break;
        case 'universities_db':
          fetchUniversitiesDb();
          break;
        case 'countries':
          fetchCountries();
          break;
        case 'facilities':
          fetchFacilities();
          break;
        case 'departments':
          fetchDepartments();
          break;
        case 'intakes':
          fetchIntakes();
          break;
        case 'levels':
          fetchLevels();
          break;
        case 'q_exams':
          fetchQExams();
          break;
        case 'q_degrees':
          fetchQDegrees();
          break;
        case 'courses':
          fetchCourses();
          fetchUniversitiesDb();
          break;
        default:
          if (activeTab && activeTab !== 'overview') fetchUsers(activeTab);
      }
    }
  }, [adminUser, activeTab]);

  // Handlers
  const handleSaveUser = async (data) => {
    await saveUser(data);
    showToast('User saved'); fetchUsers(activeTab); fetchStats();
  };

  const handleSaveTest = async (data) => {
    if (data.id) await updateTest(data.id, data);
    else await createTest(data);
    showToast('Test saved'); fetchTests();
  };

  const handleDeleteTest = async (id) => {
    if(!confirm('Delete this test?')) return;
    await deleteTest(id);
    showToast('Test deleted'); fetchTests();
  };

  const handleSaveMaterial = async (data) => {
    if (data.id) await updateMaterial(data.id, data);
    else await createMaterial(data);
    showToast('Material saved'); fetchMaterials();
  };

  const handleDeleteMaterial = async (id) => {
    if(!confirm('Delete this material?')) return;
    await deleteMaterial(id);
    showToast('Material deleted'); fetchMaterials();
  };

  const handleSaveUniversity = async (data) => {
    if (data._id || data.id) {
      const id = data._id || data.id;
      await updateUniversity(id, data);
    } else {
      await createUniversity(data);
    }
    showToast('University saved'); fetchUniversitiesDb();
  };
  const handleDeleteUniversity = async (id) => {
    if (!confirm('Delete this university?')) return;
    await removeUniversity(id);
    showToast('University deleted'); fetchUniversitiesDb();
  };

  // resource handlers
  const handleSaveCountry = async (data) => {
    await saveResource('countries', data);
    showToast('Country saved'); fetchCountries();
  };
  const handleDeleteCountry = async (id) => {
    if (!confirm('Delete this country?')) return;
    await deleteResource('countries', id);
    showToast('Country deleted'); fetchCountries();
  };

  const handleSaveFacility = async (data) => {
    await saveResource('facilities', data);
    showToast('Facility saved'); fetchFacilities();
  };
  const handleDeleteFacility = async (id) => {
    if (!confirm('Delete this facility?')) return;
    await deleteResource('facilities', id);
    showToast('Facility deleted'); fetchFacilities();
  };

  const handleSaveDepartment = async (data) => {
    await saveResource('departments', data);
    showToast('Department saved'); fetchDepartments();
  };
  const handleDeleteDepartment = async (id) => {
    if (!confirm('Delete this department?')) return;
    await deleteResource('departments', id);
    showToast('Department deleted'); fetchDepartments();
  };

  const handleSaveIntake = async (data) => {
    await saveResource('intakes', data);
    showToast('Intake saved'); fetchIntakes();
  };
  const handleDeleteIntake = async (id) => {
    if (!confirm('Delete this intake?')) return;
    await deleteResource('intakes', id);
    showToast('Intake deleted'); fetchIntakes();
  };

  const handleSaveLevel = async (data) => {
    await saveResource('levels', data);
    showToast('Level saved'); fetchLevels();
  };
  const handleDeleteLevel = async (id) => {
    if (!confirm('Delete this level?')) return;
    await deleteResource('levels', id);
    showToast('Level deleted'); fetchLevels();
  };

  const handleSaveQExam = async (data) => {
    await saveResource('q-exams', data);
    showToast('Entrance exam saved'); fetchQExams();
  };
  const handleDeleteQExam = async (id) => {
    if (!confirm('Delete this exam?')) return;
    await deleteResource('q-exams', id);
    showToast('Exam deleted'); fetchQExams();
  };

  const handleSaveQDegree = async (data) => {
    await saveResource('q-degrees', data);
    showToast('Qualification saved'); fetchQDegrees();
  };
  const handleDeleteQDegree = async (id) => {
    if (!confirm('Delete this qualification?')) return;
    await deleteResource('q-degrees', id);
    showToast('Qualification deleted'); fetchQDegrees();
  };

  const handleSaveCourse = async (data) => {
    await saveResource('courses', data);
    showToast('Course saved'); fetchCourses();
  };
  const handleDeleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return;
    await deleteResource('courses', id);
    showToast('Course deleted'); fetchCourses();
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg"><Shield className="w-5 h-5 text-white" /></div>
            <span className="text-base font-black">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm">Main Site</button>
            <button onClick={() => { sessionStorage.removeItem('adminUser'); navigate('/admin/login'); }} className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-sm text-red-300">Logout</button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto py-2.5 custom-scrollbar">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'student', label: 'Students' },
              { id: 'agent', label: 'Agents' },
              { id: 'university', label: 'Users: University' },
              { id: 'universities_db', label: 'Universities List' },
              { id: 'countries', label: 'Countries' },
              { id: 'courses', label: 'Courses' },
              { id: 'facilities', label: 'Facilities' },
              { id: 'departments', label: 'Departments' },
              { id: 'intakes', label: 'Intakes' },
              { id: 'levels', label: 'Levels' },
              { id: 'q_exams', label: 'Entrance Exams' },
              { id: 'q_degrees', label: 'Qualifications' },
              { id: 'tests', label: 'Mock Tests' },
              { id: 'materials', label: 'Materials' }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${activeTab === tab.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence>
          {toastMessage && (
            <motion.div initial={{ opacity: 0, y: -20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -20, x: '-50%' }} className="fixed top-20 left-1/2 z-300 px-5 py-3 bg-gray-900 text-white rounded-2xl shadow-2xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />{toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ l: 'Users', v: stats.totalUsers }, { l: 'Students', v: stats.totalStudents }, { l: 'Agents', v: stats.totalAgents }, { l: 'Universities', v: stats.totalUniversities }].map((s, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100">
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-xs text-gray-500 uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'student' || activeTab === 'agent' || activeTab === 'university') && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold capitalize">{activeTab} Users</h2>
              <button onClick={() => { setEditingUser(null); setShowUserModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add User</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{u.name}</td>
                        <td className="p-4 text-gray-500">{u.email}</td>
                        <td className="p-4"><span className={`px-2 py-1 rounded-sm text-xs font-bold ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{u.status}</span></td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingUser(u); setShowUserModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'universities_db' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Universities Database</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{universitiesDb.length} records</p>
                <button onClick={() => { fetchCountries(); setEditingUniversity(null); setShowUniversityModal(true); }} className="px-3 py-1 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add</button>
              </div>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-100">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold">
                    <tr>
                      <th className="p-4">Country</th>
                      <th className="p-4">State / City</th>
                      <th className="p-4">University</th>
                      <th className="p-4">Rector Name</th>
                      <th className="p-4">Address</th>
                      <th className="p-4">Phone / Email</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {universitiesDb.map(uni => (
                      <React.Fragment key={uni._id}>
                        <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedUni(expandedUni === uni._id ? null : uni._id)}>
                          <td className="p-4 font-medium">{uni.country}</td>
                          <td className="p-4 text-gray-600">{uni.cityDetails?.name || 'N/A'}</td>
                          <td className="p-4 font-bold text-gray-900">{uni.name}</td>
                          <td className="p-4 text-gray-600">{uni.rector?.name || 'N/A'}</td>
                          <td className="p-4 text-gray-600 truncate max-w-[150px]" title={uni.contact?.address}>{uni.contact?.address || 'N/A'}</td>
                          <td className="p-4">
                            <div className="text-xs">
                              <p className="text-gray-900">{uni.contact?.phone || 'N/A'}</p>
                              <p className="text-gray-500 truncate max-w-[150px]">{uni.contact?.email || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="p-4 text-right flex justify-end gap-3">
                            <button onClick={() => { fetchCountries(); setEditingUniversity(uni); setShowUniversityModal(true); }}><Edit3 className="w-4 h-4 text-gray-400 hover:text-blue-600" /></button>
                            <button onClick={() => handleDeleteUniversity(uni._id)}><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" /></button>
                          </td>
                        </tr>
                        {expandedUni === uni._id && (
                          <tr className="bg-gray-50/50">
                            <td colSpan="7" className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Courses */}
                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Courses Provided</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {(uni.programs || []).map((prog, i) => (
                                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">{prog}</span>
                                    ))}
                                    {(!uni.programs || uni.programs.length === 0) && <p className="text-xs text-gray-400 italic">No courses listed</p>}
                                  </div>
                                </div>

                                {/* Fees */}
                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2"><Coins className="w-3.5 h-3.5" /> Fees Structure</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Tuition Range:</span>
                                      <span className="font-bold text-gray-900">{uni.tuition || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Min Tuition:</span>
                                      <span className="font-bold text-gray-900">${uni.tuitionMin?.toLocaleString() || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Annual Living Cost:</span>
                                      <span className="font-bold text-gray-900">~${uni.annualExpenditure?.toLocaleString() || 0}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Documents */}
                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2"><List className="w-3.5 h-3.5" /> Documents Required</h4>
                                  <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                                    <li>Valid Passport (min 18 months validity)</li>
                                    <li>10th & 12th Marksheets (Apostilled)</li>
                                    <li>Passport Size Photographs (White bg)</li>
                                    <li>Medical Fitness Certificate (HIV Report)</li>
                                    <li>NEET Score Card (For Medical Students)</li>
                                    <li>Birth Certificate</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'countries' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Countries</h2>
              <button onClick={() => { setEditingCountry(null); setShowCountryModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Country</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4">Slug</th><th className="p-4">Code</th><th className="p-4">Active</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {countries.map(c => (
                      <tr key={c._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{c.name}</td>
                        <td className="p-4 text-gray-500">{c.slug}</td>
                        <td className="p-4">{c.code}</td>
                        <td className="p-4">{c.active ? 'Yes' : 'No'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingCountry(c); setShowCountryModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteCountry(c._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Facilities</h2>
              <button onClick={() => { setEditingFacility(null); setShowFacilityModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Facility</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {facilities.map(f => (
                      <tr key={f._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{f.name}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingFacility(f); setShowFacilityModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteFacility(f._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Departments</h2>
              <button onClick={() => { setEditingDepartment(null); setShowDepartmentModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Department</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4">Parent</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {departments.map(d => (
                      <tr key={d._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{d.name}</td>
                        <td className="p-4 text-gray-500">{d.parent?.name || '-'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingDepartment(d); setShowDepartmentModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteDepartment(d._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'intakes' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Intakes</h2>
              <button onClick={() => { setEditingIntake(null); setShowIntakeModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Intake</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {intakes.map(i => (
                      <tr key={i._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{i.name}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingIntake(i); setShowIntakeModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteIntake(i._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'levels' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Levels</h2>
              <button onClick={() => { setEditingLevel(null); setShowLevelModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Level</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {levels.map(l => (
                      <tr key={l._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{l.name}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingLevel(l); setShowLevelModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteLevel(l._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'q_exams' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Entrance Exams</h2>
              <button onClick={() => { setEditingQExam(null); setShowQExamModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Exam</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {qExams.map(q => (
                      <tr key={q._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{q.name}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingQExam(q); setShowQExamModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteQExam(q._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'q_degrees' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Qualifications</h2>
              <button onClick={() => { setEditingQDegree(null); setShowQDegreeModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Qualification</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {qDegrees.map(q => (
                      <tr key={q._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{q.name}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingQDegree(q); setShowQDegreeModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteQDegree(q._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Courses</h2>
              <button onClick={() => { setEditingCourse(null); setShowCourseModal(true); }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">+ Add Course</button>
            </div>
            {loading ? <div className="text-center py-10">Loading...</div> : (
              <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Name</th><th className="p-4">University</th><th className="p-4">Level</th><th className="p-4">Dept</th><th className="p-4 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {courses.map(c => (
                      <tr key={c._id} className="hover:bg-gray-50">
                        <td className="p-4 font-medium">{c.name}</td>
                        <td className="p-4 text-gray-500">{c.university?.name || '-'}</td>
                        <td className="p-4 text-gray-500">{c.level?.name || '-'}</td>
                        <td className="p-4 text-gray-500">{c.department?.name || '-'}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => { setEditingCourse(c); setShowCourseModal(true); }} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteCourse(c._id)} className="ml-2 text-red-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Mock Tests</h2>
              <button onClick={() => { setEditingTest(null); setShowTestModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4" />Add Test</button>
            </div>
            <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Test Name</th><th className="p-4">Category</th><th className="p-4">Schedule</th><th className="p-4 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {tests.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium">{t.name} {t.isSample && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Sample</span>}</td>
                      <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-sm text-xs font-bold">{t.category}</span></td>
                      <td className="p-4 text-gray-500">{t.scheduledFor ? new Date(t.scheduledFor).toLocaleString() : 'On Demand'}</td>
                      <td className="p-4 text-right flex justify-end gap-3">
                        <button onClick={() => { setEditingTest(t); setShowTestModal(true); }}><Edit3 className="w-4 h-4 text-gray-400 hover:text-blue-600" /></button>
                        <button onClick={() => handleDeleteTest(t.id)}><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Study Materials</h2>
              <button onClick={() => { setEditingMaterial(null); setShowMaterialModal(true); }} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4" />Add Material</button>
            </div>
            <div className="bg-white rounded-2xl shadow-xs overflow-hidden border border-gray-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-semibold"><tr><th className="p-4">Title</th><th className="p-4">Type</th><th className="p-4">Category</th><th className="p-4 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {materials.map(m => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium flex items-center gap-2">
                        {m.type === 'Video' ? <Video className="w-4 h-4 text-purple-500" /> : <FileText className="w-4 h-4 text-red-500" />}
                        {m.title}
                      </td>
                      <td className="p-4 text-gray-500">{m.type}</td>
                      <td className="p-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-sm text-xs font-bold">{m.category}</span></td>
                      <td className="p-4 text-right flex justify-end gap-3">
                        <button onClick={() => { setEditingMaterial(m); setShowMaterialModal(true); }}><Edit3 className="w-4 h-4 text-gray-400 hover:text-blue-600" /></button>
                        <button onClick={() => handleDeleteMaterial(m.id)}><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <UserFormModal isOpen={showUserModal} onClose={() => setShowUserModal(false)} onSave={handleSaveUser} user={editingUser} />
      <TestFormModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} onSave={handleSaveTest} test={editingTest} />
      <MaterialFormModal isOpen={showMaterialModal} onClose={() => setShowMaterialModal(false)} onSave={handleSaveMaterial} material={editingMaterial} />
      <CountryFormModal isOpen={showCountryModal} onClose={() => setShowCountryModal(false)} onSave={handleSaveCountry} country={editingCountry} />
      <SimpleNameModal isOpen={showFacilityModal} onClose={() => setShowFacilityModal(false)} onSave={handleSaveFacility} item={editingFacility} title="Facility" />
      <DepartmentFormModal isOpen={showDepartmentModal} onClose={() => setShowDepartmentModal(false)} onSave={handleSaveDepartment} department={editingDepartment} departments={departments} />
      <SimpleNameModal isOpen={showIntakeModal} onClose={() => setShowIntakeModal(false)} onSave={handleSaveIntake} item={editingIntake} title="Intake" />
      <SimpleNameModal isOpen={showLevelModal} onClose={() => setShowLevelModal(false)} onSave={handleSaveLevel} item={editingLevel} title="Level" />
      <SimpleNameModal isOpen={showQExamModal} onClose={() => setShowQExamModal(false)} onSave={handleSaveQExam} item={editingQExam} title="Entrance Exam" />
      <SimpleNameModal isOpen={showQDegreeModal} onClose={() => setShowQDegreeModal(false)} onSave={handleSaveQDegree} item={editingQDegree} title="Qualification" />
      <CourseFormModal isOpen={showCourseModal} onClose={() => setShowCourseModal(false)} onSave={handleSaveCourse} course={editingCourse} universities={universitiesDb} levels={levels} departments={departments} />
      <UniversityFormModal isOpen={showUniversityModal} onClose={() => setShowUniversityModal(false)} onSave={handleSaveUniversity} university={editingUniversity} countries={countries} />
    </div>
  );
}
