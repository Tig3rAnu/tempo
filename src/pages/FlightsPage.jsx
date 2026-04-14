import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plane, ChevronDown, X, CheckCircle2, Clock, Copy, Ticket,
  MapPin, Calendar, User, Mail, Phone, AlertCircle, Globe, ArrowRight,
  Filter, Star, TrendingDown, ChevronRight, Luggage, RefreshCw
} from 'lucide-react';
import { getDestinations, getPopular, getCountryRoutes, search, getBookings, cancelBooking, book } from '../services/flightService.js';
import { createTranswireTransfer } from '../services/transferService.js';
import { useAuth } from '../App.jsx';

const staggerContainer = { animate: { transition: { staggerChildren: 0.05 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const COUNTRY_FLAGS = {
  'Russia': '\ud83c\uddf7\ud83c\uddfa', 'Georgia': '\ud83c\uddec\ud83c\uddea', 'Uzbekistan': '\ud83c\uddfa\ud83c\uddff',
  'Kyrgyzstan': '\ud83c\uddf0\ud83c\uddec', 'Azerbaijan': '\ud83c\udde6\ud83c\uddff', 'Ukraine': '\ud83c\uddfa\ud83c\udde6',
  'Tajikistan': '\ud83c\uddf9\ud83c\uddef', 'United Kingdom': '\ud83c\uddec\ud83c\udde7', 'Canada': '\ud83c\udde8\ud83c\udde6',
  'Australia': '\ud83c\udde6\ud83c\uddfa', 'United States': '\ud83c\uddfa\ud83c\uddf8', 'Singapore': '\ud83c\uddf8\ud83c\uddec',
  'Switzerland': '\ud83c\udde8\ud83c\udded', 'Kazakhstan': '\ud83c\uddf0\ud83c\uddff',
};

const COUNTRY_COLORS = {
  'Russia': 'from-blue-500 to-indigo-600',
  'Georgia': 'from-red-500 to-rose-600',
  'Uzbekistan': 'from-cyan-500 to-blue-600',
  'Kyrgyzstan': 'from-red-500 to-red-600',
  'Azerbaijan': 'from-emerald-500 to-teal-600',
  'Ukraine': 'from-sky-400 to-yellow-500',
  'Tajikistan': 'from-green-500 to-red-500',
  'United Kingdom': 'from-blue-600 to-red-600',
  'Canada': 'from-red-500 to-red-700',
  'Australia': 'from-blue-600 to-blue-800',
  'United States': 'from-blue-600 to-red-500',
  'Singapore': 'from-red-600 to-white',
  'Switzerland': 'from-red-500 to-red-700',
  'Kazakhstan': 'from-sky-400 to-yellow-500',
};

/* ========== BOOKING MODAL ========== */
function BookingModal({ isOpen, onClose, flight, user, onBookingSuccess }) {
  const [form, setForm] = useState({
    passengerName: '', passengerEmail: '', passengerPhone: '',
    passengers: '1', travelDate: ''
  });
  const [booking, setBooking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (user && isOpen) {
      setForm(prev => ({
        ...prev,
        passengerName: user.name || '',
        passengerEmail: user.email || '',
        passengerPhone: user.phone || ''
      }));
    }
    if (!isOpen) { setResult(null); setError(''); }
  }, [user, isOpen]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!form.passengerName || !form.passengerEmail) {
      setError('Name and email are required'); return;
    }
    setBooking(true); setError('');
    try {
      const res = await book({
        flightId: flight.id, bookingCode: flight.bookingCode,
        ...form, passengers: parseInt(form.passengers)
      });
      if (!res || (res.error && !res.booking)) {
        setError(res?.error || 'Booking failed');
      } else {
        // if we have transwire available, initiate payment as well
        const bookingData = res.booking;
        setResult(bookingData);
        if (typeof createTranswireTransfer === 'function') {
          try {
            await createTranswireTransfer({
              amount: bookingData.totalPrice,
              currency: 'USD',
              purpose: 'Flight Booking',
              payerName: form.passengerName,
              payerEmail: form.passengerEmail,
              paymentMethod: 'card', // you might collect method separately
            });
          } catch (err) {
            console.warn('Transwire payment failed', err);
          }
        }
        if (onBookingSuccess) onBookingSuccess();
      }
    } catch {
      setError('Server error. Please try again.');
    }
    setBooking(false);
  };

  const copyCode = (code, label) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(label); setTimeout(() => setCopied(''), 2000);
    });
  };

  if (!isOpen || !flight) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {result ? (
            /* ===== BOOKING CONFIRMATION ===== */
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h2>
                <p className="text-sm text-gray-500">Your flight has been booked successfully</p>
              </div>
              <div className="bg-linear-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl p-5 text-white mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div><p className="text-xs text-white/60 uppercase tracking-wider">From</p><p className="text-lg font-bold">{result.fromCode}</p><p className="text-xs text-white/80">{result.from}</p></div>
                  <div className="flex flex-col items-center"><Plane className="w-5 h-5 text-white/80 rotate-90 mb-1" /><p className="text-[10px] text-white/60">{result.duration}</p></div>
                  <div className="text-right"><p className="text-xs text-white/60 uppercase tracking-wider">To</p><p className="text-lg font-bold">{result.toCode}</p><p className="text-xs text-white/80">{result.to}</p></div>
                </div>
                <div className="border-t border-white/20 pt-3 grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-white/60">Flight</p><p className="font-semibold">{result.flightNumber}</p></div>
                  <div><p className="text-white/60">Airline</p><p className="font-semibold">{result.airline}</p></div>
                  <div><p className="text-white/60">Departure</p><p className="font-semibold">{result.departure}</p></div>
                  <div><p className="text-white/60">Arrival</p><p className="font-semibold">{result.arrival}</p></div>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div><p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Confirmation Code</p><p className="text-lg font-mono font-bold text-gray-900 tracking-wider">{result.confirmationCode}</p></div>
                  <button onClick={() => copyCode(result.confirmationCode, 'conf')} className="p-2 rounded-lg hover:bg-gray-200 transition-colors duration-150" aria-label="Copy">
                    {copied === 'conf' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Passengers</p><p className="text-sm font-bold text-gray-900">{result.passengers}</p></div>
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total</p><p className="text-sm font-bold text-gray-900">${result.totalPrice}</p></div>
                  <div className="p-3 bg-gray-50 rounded-xl"><p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Status</p><p className="text-sm font-bold text-emerald-600 capitalize">{result.status}</p></div>
                </div>
              </div>
              <button onClick={onClose} className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-200">Done</button>
            </div>
          ) : (
            /* ===== BOOKING FORM ===== */
            <>
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg"><Ticket className="w-5 h-5 text-white" /></div>
                    <div><h2 className="text-lg font-bold text-gray-900">Book Flight</h2><p className="text-xs text-gray-500">{flight.flightNumber} \u2022 {flight.airline} \u2022 {flight.country}</p></div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Close"><X className="w-5 h-5 text-gray-400" /></button>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <div><p className="text-xs text-gray-400">From</p><p className="text-lg font-bold text-gray-900">{flight.fromCode}</p><p className="text-xs text-gray-500">{flight.from}</p><p className="text-xs text-gray-400 mt-0.5">{flight.departure}</p></div>
                    <div className="flex flex-col items-center px-4">
                      <p className="text-[10px] text-gray-400 mb-1">{flight.duration}</p>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400" /><div className="w-16 h-0.5 bg-orange-300" /><Plane className="w-4 h-4 text-orange-500" /><div className="w-16 h-0.5 bg-orange-300" /><div className="w-2 h-2 rounded-full bg-orange-400" /></div>
                      <p className="text-[10px] text-gray-400 mt-1">{flight.stops}</p>
                    </div>
                    <div className="text-right"><p className="text-xs text-gray-400">To</p><p className="text-lg font-bold text-gray-900">{flight.toCode}</p><p className="text-xs text-gray-500">{flight.to}</p><p className="text-xs text-gray-400 mt-0.5">{flight.arrival}</p></div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-xs text-gray-500"><span>{flight.aircraft}</span><span>\u2022</span><span className="font-mono text-orange-600 font-semibold">{flight.bookingCode}</span></div>
                    <p className="text-xl font-black text-gray-900">{flight.price}<span className="text-xs font-normal text-gray-400">/person</span></p>
                  </div>
                </div>
                {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-500" /><p className="text-sm text-red-600">{error}</p></div>}
                <form onSubmit={handleBook} className="space-y-3">
                  <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Passenger Name *</label><div className="relative"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" value={form.passengerName} onChange={e => setForm(f => ({ ...f, passengerName: e.target.value }))} placeholder="Full name" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={form.passengerEmail} onChange={e => setForm(f => ({ ...f, passengerEmail: e.target.value }))} placeholder="email" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" required /></div></div>
                    <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label><div className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="tel" value={form.passengerPhone} onChange={e => setForm(f => ({ ...f, passengerPhone: e.target.value }))} placeholder="phone" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" /></div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Travel Date</label><div className="relative"><Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="date" value={form.travelDate} onChange={e => setForm(f => ({ ...f, travelDate: e.target.value }))} className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" /></div></div>
                    <div><label className="block text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Passengers</label><div className="relative"><select value={form.passengers} onChange={e => setForm(f => ({ ...f, passengers: e.target.value }))} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200"><option value="1">1 Passenger</option><option value="2">2 Passengers</option><option value="3">3 Passengers</option><option value="4">4 Passengers</option><option value="5">5 Passengers</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /></div></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl mt-2">
                    <p className="text-sm font-semibold text-gray-700">Total Price</p>
                    <p className="text-xl font-black text-orange-600">${flight.priceNum * parseInt(form.passengers || 1)}</p>
                  </div>
                  <button type="submit" disabled={booking} className="w-full py-3 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 disabled:opacity-60 flex items-center justify-center gap-2">
                    <Ticket className="w-4 h-4" />{booking ? 'Booking...' : 'Confirm Booking'}
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

/* ========== DESTINATION CARD ========== */
function DestinationCard({ dest, onSelectCountry }) {
  const flag = COUNTRY_FLAGS[dest.country] || '\ud83c\udff3\ufe0f';
  const gradient = COUNTRY_COLORS[dest.country] || 'from-gray-500 to-gray-700';
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onSelectCountry(dest.country)}
      className="bg-white rounded-2xl border border-gray-100/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className={`h-2 bg-linear-to-r ${gradient}`} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{flag}</span>
            <div>
              <h4 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">{dest.country}</h4>
              <p className="text-xs text-gray-400">{dest.routeCount} route{dest.routeCount !== 1 ? 's' : ''} available</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200" />
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {dest.destinations.map(d => (
            <span key={d.toCode} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100">
              {d.city} ({d.toCode})
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
            <span>From</span>
          </div>
          <p className="text-lg font-black text-gray-900">${dest.cheapest}<span className="text-xs font-normal text-gray-400">/person</span></p>
        </div>
      </div>
    </motion.div>
  );
}

/* ========== FLIGHT ROW ========== */
function FlightRow({ route, onBook }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-5 border border-gray-100/80 shadow-xs hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-center min-w-[50px]">
            <p className="text-lg font-bold text-gray-900">{route.fromCode}</p>
            <p className="text-xs text-gray-400">{route.departure}</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <p className="text-[10px] text-gray-400 mb-1">{route.duration}</p>
            <div className="flex items-center gap-1 w-full max-w-[120px]">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="flex-1 h-px bg-gray-300 relative"><Plane className="w-3 h-3 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /></div>
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">{route.stops}</p>
          </div>
          <div className="text-center min-w-[50px]">
            <p className="text-lg font-bold text-gray-900">{route.toCode}</p>
            <p className="text-xs text-gray-400">{route.arrival}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-left sm:text-center min-w-[100px]">
            <p className="text-xs font-semibold text-gray-900">{route.airline}</p>
            <p className="text-[10px] text-gray-400">{route.flightNumber} \u2022 {route.aircraft}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] text-gray-400">{COUNTRY_FLAGS[route.country] || ''}</span>
              <span className="text-[10px] text-gray-400">{route.country}</span>
            </div>
          </div>
          <div className="text-right min-w-[60px]">
            <p className="text-xl font-black text-gray-900">{route.price}</p>
            <p className="text-[10px] text-gray-400">per person</p>
          </div>
          <button
            onClick={() => onBook(route)}
            className="px-5 py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Ticket className="w-4 h-4" />Book
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ========== MAIN PAGE ========== */
export default function FlightsPage() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('destinations'); // destinations, search, bookings
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchMsg, setSearchMsg] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [countryRoutes, setCountryRoutes] = useState([]);
  const [loadingCountryRoutes, setLoadingCountryRoutes] = useState(false);

  const [destinations, setDestinations] = useState([]);
  const [allRoutes, setAllRoutes] = useState([]);
  const [destLoading, setDestLoading] = useState(false);

  useEffect(() => {
    let canceled = false;
    setDestLoading(true);
    getDestinations().then(res => { if (!canceled) setDestinations(res.data || []); })
      .catch(() => {})
      .finally(() => { if (!canceled) setDestLoading(false); });
    getPopular().then(res => { if (!canceled) setAllRoutes(res.data || []); }).catch(() => {});
    return () => { canceled = true; };
  }, []);

  const fetchBookings = useCallback(async () => {
    if (!user?.email) return;
    try {
      const data = await getBookings(user.email);
      setMyBookings(data.data || []);
    } catch {}
  }, [user?.email]);

  useEffect(() => {
    if (user?.email && activeView === 'bookings') fetchBookings();
  }, [user?.email, activeView, fetchBookings]);

  const handleSelectCountry = async (country) => {
    setSelectedCountry(country);
    setLoadingCountryRoutes(true);
    try {
      const data = await getCountryRoutes(country);
      setCountryRoutes(data.data || []);
    } catch { setCountryRoutes([]); }
    setLoadingCountryRoutes(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true); setSearchMsg('');
    setActiveView('search'); setSelectedCountry(null);
    try {
      const res = await search(from, to, date, parseInt(passengers));
      setSearchResults(res.data);
      if (res.message) setSearchMsg(res.message);
    } catch {}
    setSearching(false);
  };

  const openBooking = (flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch {}
  };

  const displayRoutes = selectedCountry ? countryRoutes : (searchResults || allRoutes);

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Plane className="w-6 h-6 text-orange-500" />Flight Tickets
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">Book flights to all study destinations \u2022 {allRoutes.length} routes \u2022 {destinations.length} countries</p>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <button
              onClick={() => { setActiveView(activeView === 'bookings' ? 'destinations' : 'bookings'); if (activeView !== 'bookings') fetchBookings(); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeView === 'bookings' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <Luggage className="w-4 h-4" />My Bookings{myBookings.length > 0 && ` (${myBookings.length})`}
            </button>
          )}
        </div>
      </motion.div>

      {/* View Tabs */}
      <motion.div variants={staggerItem} className="flex gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
        {[
          { id: 'destinations', label: 'All Destinations', icon: Globe },
          { id: 'search', label: 'Search Flights', icon: Search },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id || (activeView === 'bookings' && tab.id === 'destinations');
          return (
            <button key={tab.id} onClick={() => { setActiveView(tab.id); setSelectedCountry(null); setSearchResults(null); }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeView === tab.id ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}>
              <Icon className="w-4 h-4" />{tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* MY BOOKINGS */}
      <AnimatePresence>
        {activeView === 'bookings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Luggage className="w-5 h-5 text-orange-500" />My Bookings</h3>
            {myBookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No bookings yet</h3>
                <p className="text-sm text-gray-500 mb-4">Book a flight to get started!</p>
                <button onClick={() => setActiveView('destinations')} className="px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 active:scale-[0.97] transition-all duration-200">Browse Destinations</button>
              </div>
            ) : (
              <div className="space-y-3">
                {myBookings.map(b => (
                  <div key={b.id} className={`bg-white rounded-2xl p-5 border ${b.status === 'cancelled' ? 'border-red-200 bg-red-50/30' : 'border-gray-100'} shadow-xs`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">{b.fromCode}</span>
                          <Plane className="w-4 h-4 text-orange-500" />
                          <span className="text-lg font-bold text-gray-900">{b.toCode}</span>
                        </div>
                        <span className="text-xs text-gray-400">{COUNTRY_FLAGS[b.country] || ''} {b.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{b.status}</span>
                        {b.status === 'confirmed' && (
                          <button onClick={() => handleCancelBooking(b.id)} className="px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150">Cancel</button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                      <div><p className="text-gray-400 mb-0.5">Confirmation</p><p className="font-mono font-bold text-gray-900">{b.confirmationCode}</p></div>
                      <div><p className="text-gray-400 mb-0.5">Flight</p><p className="font-semibold text-gray-700">{b.flightNumber}</p></div>
                      <div><p className="text-gray-400 mb-0.5">Date</p><p className="font-semibold text-gray-700">{b.travelDate}</p></div>
                      <div><p className="text-gray-400 mb-0.5">Passengers</p><p className="font-semibold text-gray-700">{b.passengers}</p></div>
                      <div><p className="text-gray-400 mb-0.5">Total</p><p className="font-bold text-gray-900">${b.totalPrice}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH BAR (always visible unless viewing bookings) */}
      {activeView !== 'bookings' && (
        <motion.div variants={staggerItem} className="bg-white rounded-2xl p-5 border border-gray-100/80 shadow-xs">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={from} onChange={e => setFrom(e.target.value)} placeholder="Delhi, Mumbai..." className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">To (City / Country)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="Moscow, Russia..." className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Passengers</label>
                <div className="relative">
                  <select value={passengers} onChange={e => setPassengers(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm appearance-none focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 transition-all duration-200">
                    <option value="1">1 Passenger</option><option value="2">2 Passengers</option><option value="3">3 Passengers</option><option value="4">4 Passengers</option><option value="5">5 Passengers</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-end">
                <button type="submit" disabled={searching} className="w-full py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 disabled:opacity-60 text-sm">
                  <Search className="w-4 h-4" />{searching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
          {searchMsg && <p className="text-xs text-amber-600 mt-2 font-medium">{searchMsg}</p>}
        </motion.div>
      )}

      {/* DESTINATIONS VIEW */}
      {activeView === 'destinations' && !selectedCountry && activeView !== 'bookings' && (
        <motion.div variants={staggerItem}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-500" />All Destinations
            </h3>
            <p className="text-sm text-gray-400">{destinations.length} countries</p>
          </div>
          {destLoading ? (
            <div className="text-center py-12"><RefreshCw className="w-6 h-6 text-gray-300 mx-auto mb-2 animate-spin" /><p className="text-sm text-gray-400">Loading destinations...</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map(dest => (
                <DestinationCard key={dest.country} dest={dest} onSelectCountry={handleSelectCountry} />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* COUNTRY ROUTES VIEW */}
      {selectedCountry && activeView !== 'bookings' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedCountry(null)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-150" aria-label="Back">
              <ArrowRight className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">{COUNTRY_FLAGS[selectedCountry] || ''}</span>
                Flights to {selectedCountry}
              </h3>
              <p className="text-sm text-gray-400">{countryRoutes.length} route{countryRoutes.length !== 1 ? 's' : ''} available</p>
            </div>
          </div>
          {loadingCountryRoutes ? (
            <div className="text-center py-12"><RefreshCw className="w-6 h-6 text-gray-300 mx-auto mb-2 animate-spin" /><p className="text-sm text-gray-400">Loading routes...</p></div>
          ) : countryRoutes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <Plane className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No routes found for {selectedCountry}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {countryRoutes.map(route => <FlightRow key={route.id} route={route} onBook={openBooking} />)}
            </div>
          )}
        </motion.div>
      )}

      {/* SEARCH RESULTS or ALL FLIGHTS */}
      {activeView === 'search' && !selectedCountry && activeView !== 'bookings' && (
        <motion.div variants={staggerItem}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {searchResults ? `Search Results (${searchResults.length})` : `All Available Flights (${allRoutes.length})`}
            </h3>
            {searchResults && (
              <button onClick={() => setSearchResults(null)} className="text-xs text-orange-600 font-semibold hover:underline flex items-center gap-1">
                <X className="w-3 h-3" />Clear search
              </button>
            )}
          </div>
          <div className="space-y-3">
            {(searchResults || allRoutes).map(route => <FlightRow key={route.id} route={route} onBook={openBooking} />)}
          </div>
        </motion.div>
      )}

      {/* QUICK STATS BANNER */}
      {activeView === 'destinations' && !selectedCountry && activeView !== 'bookings' && (
        <motion.div variants={staggerItem} className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Student Travel Benefits</h3>
              <p className="text-sm text-gray-600 mb-3">All flights include student baggage allowance (23kg), flexible rebooking, instant confirmation codes, and dedicated support. Book with confidence for your study abroad journey.</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />Instant Confirmation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />Student Baggage
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />Flexible Dates
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-lg text-xs font-semibold text-gray-700 border border-orange-100">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />24/7 Support
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => { setShowBookingModal(false); setSelectedFlight(null); }}
        flight={selectedFlight}
        user={user}
        onBookingSuccess={fetchBookings}
      />
    </motion.div>
  );
}
