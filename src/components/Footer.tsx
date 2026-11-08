import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (id: string) => {
    if (id === 'about') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById('about-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setCurrentPage(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[color:var(--color-warm-white)] border-t border-[color:var(--color-border-subtle)] py-16 px-6 md:px-16" id="app-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <span className="font-display text-3xl font-bold tracking-tight text-[color:var(--color-primary-green)]">
              Pahari Brew
            </span>
            <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] leading-relaxed max-w-sm">
              Experience the finest single-origin roasts curated in the heart of Shimla. Where heritage meets contemporary brew culture with high-altitude tranquility.
            </p>
            <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] pt-4">
              © {new Date().getFullYear()} Pahari Brew. High-Altitude Tranquility. All rights reserved.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 md:col-start-6 flex flex-col space-y-3">
            <h4 className="font-display text-lg font-bold text-[color:var(--color-primary-green)] mb-2">
              Explore
            </h4>
            {[
              { label: 'Menu', id: 'menu' },
              { label: 'About Us', id: 'about' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Booking', id: 'booking' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-sans text-sm text-[color:var(--color-sage-subtle)] hover:text-[color:var(--color-primary-green)] transition-colors py-1 cursor-pointer focus:outline-none"
                id={`footer-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="font-display text-lg font-bold text-[color:var(--color-primary-green)] mb-2">
              Connect
            </h4>
            <a
              href="mailto:hello@paharibrew.com"
              className="font-sans text-sm text-[color:var(--color-sage-subtle)] hover:text-[color:var(--color-primary-green)] transition-all flex items-center gap-2 group py-1"
              id="footer-email-link"
            >
              <Mail className="w-4 h-4 text-[color:var(--color-gold-muted)] group-hover:scale-110 transition-transform" />
              hello@paharibrew.com
            </a>
            <div className="font-sans text-sm text-[color:var(--color-sage-subtle)] flex items-start gap-2 py-1" id="footer-location-info">
              <MapPin className="w-4 h-4 text-[color:var(--color-gold-muted)] mt-0.5 shrink-0" />
              <span>Mall Road, Near Christ Church, Shimla, HP 171001</span>
            </div>
            <div className="font-sans text-xs text-[color:var(--color-sage-subtle)] border-t border-[color:var(--color-border-subtle)] pt-4 mt-2">
              <span className="font-semibold block text-[color:var(--color-primary-green)] mb-1">Roastery &amp; Café Hours</span>
              8:00 AM – 9:00 PM daily
            </div>
          </div>
        </div>

        {/* Visible Portfolio Demonstration Disclaimer Note */}
        <div className="mt-12 pt-8 border-t border-[color:var(--color-border-subtle)] text-center" id="footer-demonstration-notice">
          <p className="font-sans text-xs md:text-sm text-[color:var(--color-sage-subtle)] leading-relaxed bg-[color:var(--color-warm-cream)] py-3.5 px-6 rounded-sm border border-[color:var(--color-border-subtle)] max-w-4xl mx-auto shadow-xs">
            <span className="font-semibold text-[color:var(--color-deep-moss)]">Portfolio Notice: </span>
            Fictional portfolio demonstration. Pahari Brew Roasters Shimla, its menu, contact details, testimonials, reservation form, and café information are placeholders. This website does not create real reservations or process payments.
          </p>
        </div>
      </div>
    </footer>
  );
}
