import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Star, 
  Plus, 
  Minus, 
  MapPin, 
  Calendar, 
  Utensils, 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  X,
  Coffee
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
}

export default function HomeView({ setCurrentPage }: HomeViewProps) {
  // Accordion active index state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // States for interactive story modal and tour booking modal
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [tourBooked, setTourBooked] = useState(false);

  // Active effect for reveal elements on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    setTimeout(handleScroll, 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "Do I need to reserve a table?",
      answer: "While walk-ins are always welcome, we highly recommend reserving a table for weekends or groups larger than four to ensure a seamless high-altitude experience."
    },
    {
      question: "Are your beans sourced locally?",
      answer: "Yes, over 80% of our beans are sourced from small-lot estates across the Himalayas and Southern India, focusing on sustainable, organic, and ethical farming practices."
    },
    {
      question: "Do you offer dairy alternatives?",
      answer: "Absolutely. We offer house-made oat and almond milks, carefully formulated by our head roaster to complement rather than overpower the delicate mountain tasting notes of our coffee."
    }
  ];

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourBooked(true);
    setTimeout(() => {
      setTourBooked(false);
      setShowTourModal(false);
    }, 2500);
  };

  return (
    <div className="w-full relative overflow-x-hidden pt-20" id="home-view-container">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[700px] flex items-center justify-center overflow-hidden" id="hero-section">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <img
          alt="Coffee pour"
          className="absolute inset-0 w-full h-full object-cover z-0 object-center scale-100 transition-transform duration-10000"
          id="hero-bg-img"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvJbMB18nk2OOziXbsvZfEHlZwoHM58gpusD9U-UH0J6CmVZxRAQHMtoyMQm47fZkK5JyooXKKEiw94i-5u_QGudNDMgNWbfImbZcgYZdv0vs2ettpGj19Bwv_64jmrMIXUHvEngUivVEJalFeXQi1pW9HApiGPTP-C7qP7elOpDVIZVAHoV3cibea24GP1C2PbWOsVcbQPn5T4fHXyWa_STc--GGOt5NM8sm8aB3--P-5gS8z9d3SieVP7-KNec3Yn2hI1WWO5hAz"
        />

        <div className="relative z-20 text-center px-6 md:px-16 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-gold-accent)] mb-6 block"
            id="hero-badge"
          >
            High-Altitude Tranquility
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
            id="hero-heading"
          >
            Good coffee,<br className="hidden sm:inline" /> better conversations.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
            id="hero-subtitle"
          >
            Experience the finest single-origin roasts curated in the heart of Shimla. Where heritage meets contemporary brew culture.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
            id="hero-actions"
          >
            <button
              onClick={() => setCurrentPage('booking')}
              className="bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-all shadow-lg shadow-black/10 cursor-pointer"
              id="hero-reserve-btn"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => setCurrentPage('menu')}
              className="bg-transparent border border-white text-white hover:bg-white hover:text-[color:var(--color-primary-green)] font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-sm transition-all backdrop-blur-sm shadow-md cursor-pointer"
              id="hero-menu-btn"
            >
              Explore Menu
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/70">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
            <div className="w-full h-1/2 bg-[color:var(--color-gold-accent)] absolute top-0 left-0 animate-[shimmer_2s_infinite_ease-in-out]" style={{
              animationName: 'scroll_indicator_anim'
            }} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto relative" id="about-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* About text story */}
          <div className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1 reveal" id="about-text-container">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[color:var(--color-primary-green)] mb-3 block">
              Our Sanctuary
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[color:var(--color-deep-moss)] leading-[1.2] mb-6">
              Elevated above the everyday.
            </h2>
            <div className="w-12 h-[2px] bg-[color:var(--color-gold-accent)] mb-8" />
            
            <p className="font-sans text-base text-[color:var(--color-sage-subtle)] leading-relaxed mb-6">
              Nestled in the crisp, whispering pine air of Shimla, Pahari Brew is more than a café—it's a sanctuary for the senses. We blend the raw, tactile beauty of the Himalayas with modern, minimalist sensibilities.
            </p>
            <p className="font-sans text-base text-[color:var(--color-sage-subtle)] leading-relaxed mb-10">
              Our beans are ethically hand-picked from high-altitude estates, roasted in tiny batches in our roastery to preserve their delicate floral and honey notes. It's an open invitation to slow down, savor the warmth, and engage in conversations that truly matter.
            </p>
            
            <button
              onClick={() => setShowStoryModal(true)}
              className="inline-flex items-center gap-2 group font-sans text-xs uppercase tracking-widest font-semibold text-[color:var(--color-primary-green)] hover:text-[color:var(--color-gold-muted)] transition-colors cursor-pointer"
              id="about-story-btn"
            >
              Our Story 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* About Broken Grid Images */}
          <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 relative mb-12 lg:mb-0 reveal" id="about-images-container">
            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-xl shadow-black/5">
              <img
                alt="Cafe interior view"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY0SPNsqTbQIZDznqncwALKY19pXNhniUkb7Vd-RC9QSjIWhJunQ8TGaKqHCA-sRPBHA0sqZREmgZxaSLecSBlQ47OuHETMTLhrIfhGdqARg2uqM_KWVFno6Q-XX5HpQAgYALon0sz17MQAidFRC1WliM9ow7yb42iPl05cJwOYuscDLo6Ooz0ojtg597PDrnVYbr8qJlNIlX0jZpjtrnq_w74a3N9ZqV87QhRGgulI3ZJ2m_2lnpZnOf8p1qTcBR3tGYCftbM7D18"
              />
            </div>
            
            {/* Overlay Small Accent Card */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-[color:var(--color-warm-white)] p-3 rounded-sm shadow-2xl border border-[color:var(--color-border-subtle)]/30 hidden md:block">
              <div className="w-full h-full rounded-sm overflow-hidden bg-[color:var(--color-warm-cream)]">
                <img
                  alt="Macro coffee beans"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN2U_FyCoE-NVrSZphQ-LbBSd-yXMS0IYHzg0AQbKOoISowi2_HoD0EeFqAv6NX1IaF3_zCPfn1A-uFkOF6QMp-0rPtWJS1vYjeQcvGcFu7E08umpgpDSqyZAEyr86G2Vq1yMttGpiuM-iDNsRePdTeu8w3bh5jZKAigQmMlhUfyCRD6Ke9mS16_6eLX1I27bgkmdzHQC1idThuqYf9WSbz2T_M7U_35by6m-hlSv5MkxoMhX3IDFJ-_D-siOdFCel7zqDSd4hTzlh"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Offerings - Taste the Altitude */}
      <section className="py-24 bg-[color:var(--color-surface-container-low)] relative" id="offerings-section">
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[color:var(--color-primary-green)] block mb-3">
              Curated Offerings
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[color:var(--color-deep-moss)]">
              Taste the Altitude
            </h2>
            <div className="w-12 h-[2px] bg-[color:var(--color-gold-accent)] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Large Bento Card (Himalayan Mist Latte) */}
            <div className="lg:col-span-8 flex flex-col justify-end relative h-[500px] lg:h-[600px] rounded-sm overflow-hidden group shadow-lg reveal" id="offering-mist-latte">
              <div className="absolute inset-0 bg-black/35 z-10 group-hover:bg-black/25 transition-colors duration-500" />
              <img
                alt="Latte art"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJmT2y0mbzDGRsT-kWaLIlAONrLVhESOo9fPGOa9UEdkAjn0Z_kmOL1mZ3psIOmpl0SsuqWvCcwgJcDQ8ZWN2y-MHMf3VHjopL53nXIP7oXl9letGd8H_8-kvrg2gH1F0_eka4xwdeFh4-mITnKrNsUTgt_zgUxndPw6JDNlNpc3fE-ECi1Cz4rRd9NyPlXzWm9SyzJmq9-eENvwO5Vyf-dn9y1SIaqdroSlFw-XYu-e737uybSEJGeX_E1BQymLQgMwvrGviJLAyO"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 rounded-sm mb-4">
                  <Sparkles className="w-3 h-3 text-[color:var(--color-primary-green)]" />
                  <span className="font-sans text-[10px] uppercase text-[color:var(--color-primary-green)] tracking-wider font-semibold">
                    Signature Pour
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3.5xl font-bold text-white mb-2">Himalayan Mist Latte</h3>
                <p className="font-sans text-sm md:text-base text-white/80 max-w-md">
                  Our premier roast gently infused with local wild mountain honey and a magical hint of green cardamom.
                </p>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="mt-6 font-sans text-xs uppercase tracking-wider font-semibold text-white hover:text-[color:var(--color-gold-accent)] transition-colors flex items-center gap-2"
                >
                  Discover More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right-Hand Column: Two stacked cards */}
            <div className="lg:col-span-4 flex flex-col gap-8 h-full">
              {/* Card 1: Artisanal Pastries details */}
              <div 
                className="bg-[color:var(--color-warm-white)] rounded-sm p-8 shadow-md border border-[color:var(--color-primary-green)]/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[284px] reveal"
                id="offering-pastries"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[color:var(--color-warm-cream)] flex items-center justify-center text-[color:var(--color-primary-green)] mb-6">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[color:var(--color-deep-moss)] mb-2">
                    Artisanal Companions
                  </h3>
                  <p className="font-sans text-sm text-[color:var(--color-sage-subtle)]">
                    Delicious golden crusts baked fresh at dawn every single day. Using heritage organic grains only.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="mt-4 font-sans text-xs uppercase tracking-widest font-semibold text-[color:var(--color-primary-green)] hover:text-[color:var(--color-gold-muted)] transition-colors inline-flex items-center gap-2 self-start cursor-pointer"
                >
                  View Pastries <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: Roastery Tours */}
              <div 
                className="bg-[color:var(--color-primary-green)] text-white rounded-sm p-8 shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-[284px] reveal"
                id="offering-tours"
              >
                <div>
                  <h3 className="font-display text-xl font-extrabold mb-3">
                    Roastery Workshops
                  </h3>
                  <p className="font-sans text-sm text-white/80">
                    Discover the fascinating journey from misty mountain berries to the perfect comforting cup in our hands-on roastery workshops.
                  </p>
                </div>
                <button
                  onClick={() => setShowTourModal(true)}
                  className="bg-transparent border border-white/60 hover:border-white text-white hover:text-white hover:bg-white/10 font-sans text-xs uppercase tracking-wider font-semibold py-2.5 px-6 rounded-sm transition-all self-start cursor-pointer text-center"
                >
                  Book a Tour
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Testimonials - Echoes from the Valley */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-16 relative" id="testimonials-section">
        <div className="text-center mb-16 reveal">
          <span className="font-display text-5xl md:text-7xl text-[color:var(--color-gold-muted)] leading-none select-none block mb-2 font-serif opacity-30">“</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[color:var(--color-deep-moss)] mt-[-10px]">
            Echoes from the Valley
          </h2>
          <div className="w-12 h-[2px] bg-[color:var(--color-gold-accent)] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[color:var(--color-warm-white)] p-8 rounded-sm shadow-md border border-[color:var(--color-primary-green)]/5 flex flex-col justify-between h-auto reveal" id="testimonial-1">
            <div>
              <div className="flex gap-1 mb-6 text-[color:var(--color-gold-accent)]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-[color:var(--color-gold-accent)]" />)}
              </div>
              <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] italic leading-relaxed mb-8">
                "The perfect cozy refuge after a long mountain pine hike. The pour-over is absolutely impeccable, and the atmosphere feels like a deep slow exhale."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--color-border-subtle)]/60 text-[color:var(--color-primary-green)] flex items-center justify-center font-display font-bold text-sm">
                A
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[color:var(--color-deep-moss)]">Aisha M.</h4>
                <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">Local Guide</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[color:var(--color-warm-white)] p-8 rounded-sm shadow-md border border-[color:var(--color-primary-green)]/5 flex flex-col justify-between h-auto md:translate-y-6 reveal" id="testimonial-2">
            <div>
              <div className="flex gap-1 mb-6 text-[color:var(--color-gold-accent)]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-[color:var(--color-gold-accent)]" />)}
              </div>
              <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] italic leading-relaxed mb-8">
                "Minimalist perfection. The singular focus is entirely on the premium quality of the beans and roast. The Himalayan Mist Latte is something I dream about."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--color-border-subtle)]/60 text-[color:var(--color-primary-green)] flex items-center justify-center font-display font-bold text-sm">
                R
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[color:var(--color-deep-moss)]">Rahul S.</h4>
                <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">Travel Writer</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[color:var(--color-warm-white)] p-8 rounded-sm shadow-md border border-[color:var(--color-primary-green)]/5 flex flex-col justify-between h-auto md:translate-y-12 reveal" id="testimonial-3">
            <div>
              <div className="flex gap-1 mb-6">
                {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-[color:var(--color-gold-accent)]" />)}
                <Star className="w-4 h-4 text-[color:var(--color-gold-accent)] fill-current opacity-50" />
              </div>
              <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] italic leading-relaxed mb-8">
                "Aesthetically gorgeous. The sage green interiors calm the soul instantly. They profoundly respect the bean here, and the service is understated yet flawless."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[color:var(--color-border-subtle)]/60 text-[color:var(--color-primary-green)] flex items-center justify-center font-display font-bold text-sm">
                K
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[color:var(--color-deep-moss)]">Karan V.</h4>
                <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">Design Enthusiast</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs section */}
      <section className="py-24 bg-[color:var(--color-warm-cream)] border-t border-[color:var(--color-border-subtle)]/40 px-6 md:px-16" id="faq-section" style={{ marginTop: '64px' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-4xl font-bold text-[color:var(--color-deep-moss)] mb-3">
              Curiosity, Answered.
            </h2>
            <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] uppercase tracking-wider">
              Essential details for your high-altitude visit.
            </p>
            <div className="w-12 h-[2px] bg-[color:var(--color-gold-accent)] mx-auto mt-4" />
          </div>

          <div className="space-y-4" id="faq-accordions">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[color:var(--color-warm-white)] border border-[color:var(--color-border-subtle)] rounded-sm p-6 shadow-sm shadow-black/2 transition-colors reveal"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer"
                    id={`faq-btn-${index}`}
                  >
                    <h3 className="font-display text-lg font-bold text-[color:var(--color-deep-moss)] pr-4">
                      {faq.question}
                    </h3>
                    <div className="text-[color:var(--color-primary-green)] bg-[color:var(--color-warm-cream)] rounded-full p-1 border border-[color:var(--color-border-subtle)]">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed mt-4 pt-4 border-t border-[color:var(--color-border-subtle)]/60">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Narrative Story Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoryModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              id="story-modal-overlay"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-2xl bg-[color:var(--color-warm-white)] rounded-sm overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col"
              id="story-modal-card"
            >
              {/* Header */}
              <div className="p-6 border-b border-[color:var(--color-border-subtle)] flex justify-between items-center sticky top-0 bg-[color:var(--color-warm-white)] z-15">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-[color:var(--color-primary-green)]" />
                  <span className="font-display font-bold text-xl text-[color:var(--color-primary-green)]">Pahari Brew History</span>
                </div>
                <button 
                  onClick={() => setShowStoryModal(false)}
                  className="p-1 rounded-full hover:bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Story Content */}
              <div className="p-8 overflow-y-auto space-y-6 flex-1 text-left">
                <h3 className="font-display text-2xl font-bold text-[color:var(--color-deep-moss)] mb-1">
                  The Seed of Shimla's Coffee Era
                </h3>
                <p className="font-sans text-xs uppercase tracking-widest text-[color:var(--color-gold-muted)] font-semibold mb-4">
                  Established in 1982 — Revitalized Today
                </p>

                <div className="w-full h-48 bg-[color:var(--color-warm-cream)] rounded-sm overflow-hidden mb-6">
                  <img
                    alt="Coffee roasting story"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2QsxAyeGc2zVlcvHELWkHwLfIs6KeBQyTqbnWPRu-u-Nmb6jA-zR5ep3U_GQNiEvuI2M3nxjveQ9CECdI5tCWk0hqe6dlsAL00L0xZ8uoP51L1fIcwx0MG4dJoasT0XnPkQEFfLVo3oIbnmSHAFl8MnfptDU8dIPVeRTnHH_MNovAyeCculOyTxG5IltIaZKibY4Wt6WQQ9wIz3Qie1m2JBvi4uYhrcQKPMVNMaWvxr3O9sM4Kp380qltXsDmwN3ObRqmRZU_YATW"
                  />
                </div>

                <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed">
                  Pahari Brew began as a passion project deep in the high-altitude forests of Shimla. Decades ago, our founder realized that the cool, pristine climate kept specialty coffee beans incredibly fresh and matured them with complex, slow caramelized attributes that were entirely missing at lower altitudes.
                </p>
                <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed">
                  We built our first wood roaster near Christ Church, and baristas would hand-grind local beans while mist drifted in from the valleys. Ever since, we have dedicated ourselves to one simple proposition: Good coffee breeds better, more authentic, heart-to-heart human conversations.
                </p>
                <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed italic border-l-2 border-[color:var(--color-gold-accent)] pl-4">
                  "Specialty coffee is a window to slow times. Out here in Pahari, we don't watch the hours, we watch the mountains and enjoy our companion's presence."
                </p>
                <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed">
                  Today, we continue that legacy with state-of-the-art drum roasters, sustainable partnerships with multi-generational organic estates, and our tranquil cedar sanctuary spaces.
                </p>
              </div>

              {/* Close Footer CTA */}
              <div className="p-6 bg-[color:var(--color-warm-cream)] border-t border-[color:var(--color-border-subtle)] flex justify-end">
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] font-sans text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-sm cursor-pointer"
                >
                  Experience It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Roastery Tour Modal */}
      <AnimatePresence>
        {showTourModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTourModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              id="tour-modal-overlay"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[color:var(--color-warm-white)] rounded-sm overflow-hidden shadow-2xl z-10 p-8 text-left"
              id="tour-modal-card"
            >
              <button 
                onClick={() => setShowTourModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[color:var(--color-primary-green)] mb-3">
                <Camera className="w-5 h-5" />
                <span className="font-sans text-xs uppercase tracking-widest font-bold">Tour Reservation</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[color:var(--color-deep-moss)] mb-2">Book a Roastery Tour</h3>
              <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] mb-6">
                Go behind the scenes to discover our high-altitude roasting method, taste exclusive test roasted profiles, and hand-pour your own espresso.
              </p>

              {tourBooked ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-[color:var(--color-primary-green)] mb-4 animate-bounce" />
                  <h4 className="font-display text-lg font-bold text-[color:var(--color-deep-moss)]">Tour Request Received!</h4>
                  <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] mt-1 max-w-xs">
                    This is a demonstration form. No real tour reservation has been created or confirmed.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleTourSubmit} className="space-y-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide font-medium text-[color:var(--color-sage-subtle)] mb-1">Select Future Date</label>
                    <input 
                      type="date" 
                      required 
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide font-medium text-[color:var(--color-sage-subtle)] mb-1">Number of Visitors</label>
                    <select className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none">
                      <option>1 Person</option>
                      <option>2 People</option>
                      <option>3 - 4 People</option>
                      <option>5+ People</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide font-medium text-[color:var(--color-sage-subtle)] mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      required 
                      className="w-full bg-[color:var(--color-warm-cream)] border border-[color:var(--color-border-subtle)] p-3 rounded-sm font-sans text-sm focus:border-[color:var(--color-gold-accent)] focus:outline-none" 
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] text-center font-sans text-xs uppercase tracking-widest font-semibold py-4 rounded-sm shadow-md transition-all mt-4 cursor-pointer"
                  >
                    Request Tour
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
