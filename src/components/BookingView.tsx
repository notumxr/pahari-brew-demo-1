import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Ticket,
  AlertCircle
} from 'lucide-react';
import { Reservation } from '../types';

export default function BookingView() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showConfirmCancel, setShowConfirmCancel] = useState<string | null>(null);

  // Calculate tomorrow's date string (YYYY-MM-DD) to enforce choosing a future date
  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDateString = getTomorrowDateString();

  // Form states - date starts empty to require visitor to choose a future date
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [time, setTime] = useState('11:30 AM');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');

  // Status logs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);

  // Time slots in consistent 12-hour format strictly between 8:00 AM and 9:00 PM
  const timeSlots = [
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM'
  ];

  // Load existing reservations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pahari_brew_bookings');
      if (stored) {
        setReservations(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load reservations", e);
    }
  }, []);

  const saveReservations = (updated: Reservation[]) => {
    setReservations(updated);
    try {
      localStorage.setItem('pahari_brew_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to write reservations", e);
    }
  };

  const handleDateChange = (selectedDate: string) => {
    setDate(selectedDate);
    if (!selectedDate) {
      setDateError('Please select a reservation date.');
    } else if (selectedDate < minDateString) {
      setDateError('Date cannot be in the past. Please choose an upcoming future date.');
    } else {
      setDateError('');
    }
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    if (!date) {
      setDateError('Please select a reservation date.');
      return;
    }

    if (date < minDateString) {
      setDateError('Date cannot be in the past. Please choose an upcoming future date.');
      return;
    }

    setDateError('');
    setIsSubmitting(true);

    // Simulate scheduling delay for realistic feedback
    setTimeout(() => {
      const codeSuffix = Math.floor(1000 + Math.random() * 9000);
      const codeLetter = ['A', 'B', 'M', 'T', 'S'][Math.floor(Math.random() * 5)];
      const code = `PB-${codeSuffix}${codeLetter}`;

      const newBooking: Reservation = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        phone: phone.trim(),
        date,
        time,
        guests,
        specialRequests: requests.trim(),
        code,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newBooking, ...reservations];
      saveReservations(updated);

      setCreatedReservation(newBooking);
      setIsSubmitting(false);

      // Reset form variables
      setName('');
      setPhone('');
      setRequests('');
      setDate('');
      setGuests('2');
    }, 1200);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = reservations.filter(res => res.id !== id);
    saveReservations(updated);
    setShowConfirmCancel(null);
  };

  return (
    <div className="w-full relative mt-20 pt-1 flex flex-col items-center bg-[color:var(--color-warm-cream)]" id="booking-view-container">
      
      {/* Narrative Intro Headers */}
      <section className="w-full max-w-4xl mx-auto py-16 px-6 md:px-16 text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[color:var(--color-primary-green)] block mb-3">
          Reservations
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[color:var(--color-deep-moss)] tracking-tight">
          Request a Reservation
        </h1>
        <div className="w-12 h-[2px] bg-[color:var(--color-gold-accent)] mx-auto my-4" />
        <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed max-w-2xl mx-auto mt-4">
          Experience high-altitude tranquility. Request a table for an intimate gathering or reach out to us for special events at our Shimla roastery.
        </p>
      </section>

      {/* Two Column Layout */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-16 pb-24" id="booking-forms-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reservation Core Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="bg-[color:var(--color-card-bg)] border border-[color:var(--color-border-subtle)] p-6 md:p-8 rounded-sm shadow-md">
              <h2 className="font-display text-2xl font-bold text-[color:var(--color-deep-moss)] mb-4 flex items-center gap-2.5">
                <Calendar className="w-5.5 h-5.5 text-[color:var(--color-primary-green)]" /> Request a Reservation
              </h2>

              {/* Fictional Portfolio Notice banner near reservation form */}
              <div className="bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3.5 rounded-sm mb-6 text-left flex items-start gap-2.5" id="booking-demo-banner">
                <AlertCircle className="w-4 h-4 text-[color:var(--color-primary-green)] mt-0.5 shrink-0" />
                <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] leading-relaxed">
                  <span className="font-semibold text-[color:var(--color-deep-moss)]">Portfolio Notice: </span>
                  Fictional portfolio demonstration. Pahari Brew Roasters Shimla, its menu, contact details, testimonials, reservation form, and café information are placeholders. This website does not create real reservations or process payments.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {createdReservation ? (
                  /* Success Demonstration Screen state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 md:p-8 bg-white border border-[color:var(--color-border-subtle)] rounded-sm text-center flex flex-col items-center shadow-xs"
                    id="booking-success-block"
                  >
                    <div className="w-16 h-16 rounded-full bg-[color:var(--color-warm-cream)] text-[color:var(--color-primary-green)] flex items-center justify-center mb-4 border border-[color:var(--color-border-subtle)]">
                      <CheckCircle2 className="w-9 h-9 text-[color:var(--color-primary-green)]" />
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold text-[color:var(--color-deep-moss)]">
                      Reservation Request Received
                    </h3>

                    {/* Required exact demonstration submission notice */}
                    <div className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] rounded-sm p-4 my-5 text-left flex items-start gap-3 shadow-xs">
                      <AlertCircle className="w-5 h-5 text-[color:var(--color-primary-green)] shrink-0 mt-0.5" />
                      <p className="font-sans text-xs md:text-sm text-[color:var(--color-deep-moss)] leading-relaxed font-medium">
                        This is a demonstration form. No real reservation has been created or confirmed. In a real café website, this request would be sent to the café’s approved reservation system or staff.
                      </p>
                    </div>

                    {/* Detailed digital ticket */}
                    <div className="w-full max-w-md bg-white border border-dashed border-[color:var(--color-border-subtle)] rounded-lg p-6 my-4 shadow-sm relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-28 h-20 bg-[color:var(--color-gold-accent)]/15 text-[color:var(--color-gold-muted)] font-bold font-sans text-[8px] uppercase tracking-widest flex items-center justify-center rotate-45 translate-x-8 -translate-y-2">
                        DEMO PASS
                      </div>

                      <div className="flex items-center gap-2 text-[color:var(--color-primary-green)] mb-4 border-b border-gray-100 pb-3">
                        <Ticket className="w-5 h-5 text-[color:var(--color-gold-muted)]" />
                        <span className="font-sans text-[11px] uppercase tracking-wider font-extrabold">Demonstration Request Summary</span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                        <div>
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Request Reference</span>
                          <span className="font-mono font-bold text-base text-[color:var(--color-primary-green)]">{createdReservation.code}</span>
                        </div>
                        <div>
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Guest Name</span>
                          <span className="font-sans font-semibold text-[color:var(--color-deep-moss)]">{createdReservation.name}</span>
                        </div>
                        <div>
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Scheduled Date</span>
                          <span className="font-sans font-semibold text-[color:var(--color-deep-moss)]">{createdReservation.date}</span>
                        </div>
                        <div>
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Session Time</span>
                          <span className="font-sans font-semibold text-[color:var(--color-deep-moss)]">{createdReservation.time}</span>
                        </div>
                        <div>
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Party Size</span>
                          <span className="font-sans font-semibold text-[color:var(--color-deep-moss)]">{createdReservation.guests} {parseInt(createdReservation.guests) === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div>
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Phone</span>
                          <span className="font-sans font-semibold text-[color:var(--color-deep-moss)]">{createdReservation.phone}</span>
                        </div>
                      </div>

                      {createdReservation.specialRequests && (
                        <div className="mt-4 border-t border-gray-100 pt-3">
                          <span className="font-sans text-[10px] text-[color:var(--color-sage-subtle)] uppercase tracking-wide block">Requests</span>
                          <span className="font-sans text-xs text-[color:var(--color-deep-moss)] leading-relaxed italic">{createdReservation.specialRequests}</span>
                        </div>
                      )}

                      <div className="mt-6 flex flex-col items-center justify-center pt-4 border-t border-dashed border-gray-200">
                        <span className="font-mono text-[9px] text-[color:var(--color-sage-subtle)] tracking-wider">PORTFOLIO DEMONSTRATION RECORD</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCreatedReservation(null)}
                      className="bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] font-sans text-xs uppercase tracking-widest font-semibold px-6 py-3.5 rounded-sm shadow-md transition-all cursor-pointer mt-2"
                    >
                      Request Another Table
                    </button>
                  </motion.div>
                ) : (
                  /* Form Input state */
                  <form key="form" onSubmit={handleCreateReservation} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Pick Date */}
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[color:var(--color-sage-subtle)] mb-2">
                          Reservation Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            min={minDateString}
                            value={date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className={`w-full bg-[color:var(--color-warm-cream)] border p-3.5 rounded-sm font-sans text-sm font-medium focus:border-[color:var(--color-gold-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-gold-accent)] ${
                              dateError ? 'border-red-400' : 'border-[color:var(--color-border-subtle)]'
                            }`}
                            id="booking-date-input"
                          />
                          {dateError ? (
                            <p className="font-sans text-xs text-red-600 mt-1.5 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {dateError}
                            </p>
                          ) : (
                            <p className="font-sans text-[11px] text-[color:var(--color-sage-subtle)] mt-1.5">
                              Please choose an upcoming future date.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Select Time Slots */}
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[color:var(--color-sage-subtle)] mb-2">
                          Reservation Time * (8:00 AM – 9:00 PM)
                        </label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3.5 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none"
                          id="booking-time-input"
                        >
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        <p className="font-sans text-[11px] text-[color:var(--color-sage-subtle)] mt-1.5">
                          Consistent 12-hour café reservation hours.
                        </p>
                      </div>

                    </div>

                    {/* Guest Size Selection micro interactives */}
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[color:var(--color-sage-subtle)] mb-3">
                        Number of Guests
                      </label>
                      <div className="flex flex-wrap gap-3" id="guests-chips">
                        {['1', '2', '3', '4', '5+'].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuests(num)}
                            className={`w-12 h-12 rounded-sm border transition-all font-sans text-sm font-bold flex items-center justify-center cursor-pointer ${
                              guests === num
                                ? 'bg-[color:var(--color-primary-green)] text-white border-[color:var(--color-primary-green)] shadow-md'
                                : 'bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] border-[color:var(--color-border-subtle)] hover:bg-gray-100'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[color:var(--color-sage-subtle)] mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Devashish Negi"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3.5 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-gold-accent)]"
                          id="booking-name-input"
                        />
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[color:var(--color-sage-subtle)] mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9845X XXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3.5 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-gold-accent)]"
                          id="booking-phone-input"
                        />
                      </div>

                    </div>

                    {/* Special request details */}
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[color:var(--color-sage-subtle)] mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Window-view table desired, quiet corner for conversation, celebrating an occasion..."
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3.5 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none"
                        id="booking-requests-input"
                      />
                    </div>

                    {/* Notice stating no payment is required */}
                    <p className="font-sans text-[11px] text-[color:var(--color-sage-subtle)]">
                      * Reservations at Pahari Brew do not require advance payment or deposit. No payment details are ever requested.
                    </p>

                    {/* Button with Loading state */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] text-center font-sans text-xs uppercase tracking-widest font-semibold py-4.5 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      id="booking-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <span>Request a Reservation</span>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>

            {/* My Historic Dynamic Bookings list panels */}
            {reservations.length > 0 && (
              <div className="bg-[color:var(--color-card-bg)] border border-[color:var(--color-border-subtle)] p-6 md:p-8 rounded-sm shadow-md mt-8">
                <h3 className="font-display text-xl font-bold text-[color:var(--color-deep-moss)] mb-6 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-[color:var(--color-gold-muted)]" /> My Saved Requests ({reservations.length})
                </h3>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {reservations.map((res) => (
                    <div 
                      key={res.id} 
                      className="p-4 bg-[color:var(--color-warm-cream)]/75 rounded-sm border border-[color:var(--color-border-subtle)]/70 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[color:var(--color-primary-green)] bg-white px-2 py-0.5 rounded border border-gray-100">{res.code}</span>
                          <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">{res.date} • {res.time}</span>
                        </div>
                        <p className="font-sans text-sm font-semibold text-[color:var(--color-deep-moss)] mt-1.5">{res.name} — {res.guests} pax</p>
                      </div>

                      <button
                        onClick={() => setShowConfirmCancel(res.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-white rounded-full transition-all cursor-pointer"
                        title="Cancel reservation request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact details Column */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="bg-[color:var(--color-card-bg)] border border-[color:var(--color-border-subtle)] p-6 md:p-8 rounded-sm shadow-md flex flex-col justify-between h-auto">
              
              <div>
                <h2 className="font-display text-2xl font-bold text-[color:var(--color-deep-moss)] mb-8">
                  Contact Us
                </h2>

                <div className="space-y-6">
                  
                  {/* Address */}
                  <div className="flex gap-4 items-start" id="contact-address-block">
                    <div className="w-10 h-10 rounded-full bg-[color:var(--color-warm-cream)] text-[color:var(--color-primary-green)] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-[11px] uppercase tracking-wider font-bold text-[color:var(--color-primary-green)] mb-1">Our Location</h4>
                      <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] leading-relaxed">
                        Mall Road, Near Christ Church,<br />Shimla, Himachal Pradesh 171001
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start" id="contact-phone-block">
                    <div className="w-10 h-10 rounded-full bg-[color:var(--color-warm-cream)] text-[color:var(--color-primary-green)] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-[11px] uppercase tracking-wider font-bold text-[color:var(--color-primary-green)] mb-1">Direct Landline</h4>
                      <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] leading-relaxed">
                        +91 94321 87654
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4 items-start" id="contact-hours-block">
                    <div className="w-10 h-10 rounded-full bg-[color:var(--color-warm-cream)] text-[color:var(--color-primary-green)] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans text-[11px] uppercase tracking-wider font-bold text-[color:var(--color-primary-green)] mb-1">Operating Hours</h4>
                      <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] leading-relaxed font-semibold">
                        8:00 AM – 9:00 PM daily
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic Simulated Map Widget container */}
              <div className="mt-12 pt-8 border-t border-[color:var(--color-border-subtle)]/60">
                <div className="w-full h-48 bg-[color:var(--color-warm-cream)] rounded-sm border border-[color:var(--color-border-subtle)] relative overflow-hidden flex flex-col justify-center items-center p-4 shadow-inner">
                  {/* Drawing outlines in backdrop to look like map lines */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                    <div className="w-[100%] h-[2px] bg-[color:var(--color-deep-moss)] rotate-12 absolute top-12" />
                    <div className="w-[100%] h-[2px] bg-[color:var(--color-deep-moss)] -rotate-45 absolute top-24" />
                    <div className="w-[2px] h-[100%] bg-[color:var(--color-deep-moss)] absolute left-24" />
                    <div className="w-[2px] h-[100%] bg-[color:var(--color-deep-moss)] absolute left-48" />
                  </div>

                  {/* Central GPS Locator Pin marker */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[color:var(--color-primary-green)] text-white flex items-center justify-center shadow-lg relative z-10 animate-bounce">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="w-6 h-1.5 bg-black/10 rounded-full blur-[1px] mt-1" />
                  </div>

                  <span className="font-display font-bold text-xs text-[color:var(--color-deep-moss)] mt-4 text-center z-10 bg-white/85 px-3 py-1 rounded-full border border-[color:var(--color-border-subtle)]">
                    Pahari Brew Roasters Shimla
                  </span>
                </div>

                <a
                  href="https://maps.google.com/?q=Mall+Road+Shimla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[color:var(--color-primary-green)]/10 hover:bg-[color:var(--color-primary-green)] hover:text-white text-[color:var(--color-primary-green)] text-center font-sans text-xs uppercase tracking-widest font-semibold py-3.5 rounded-sm mt-4 cursor-pointer inline-flex items-center justify-center gap-2 transition-all"
                >
                  View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Confirmation of cancel reservation dialog overlay */}
      <AnimatePresence>
        {showConfirmCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowConfirmCancel(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-md p-6 shadow-2xl z-10 text-left border border-red-100"
            >
              <div className="flex gap-3 items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[color:var(--color-deep-moss)]">Remove Saved Request?</h3>
                  <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] mt-1">
                    Are you sure you want to remove this saved request from your device history?
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowConfirmCancel(null)}
                  className="px-4 py-2 text-xs font-semibold font-sans uppercase tracking-wider text-[color:var(--color-sage-subtle)] hover:text-[color:var(--color-deep-moss)] cursor-pointer"
                >
                  Keep Request
                </button>
                <button
                  onClick={() => handleDeleteBooking(showConfirmCancel)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-sm text-xs font-semibold font-sans uppercase tracking-wider cursor-pointer"
                >
                  Remove Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
