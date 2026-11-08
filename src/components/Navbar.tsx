import { useState } from 'react';
import { Menu, X, Coffee, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenAssistant?: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, onOpenAssistant }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'About', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Booking', id: 'booking' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (id === 'about') {
      setCurrentPage('home');
      // Delay slightly to allow page transition before scrolling
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--color-warm-cream)]/90 backdrop-blur-md border-b border-[color:var(--color-border-subtle)]/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
          id="nav-logo"
        >
          <Coffee className="w-6 h-6 text-[color:var(--color-primary-green)] transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-2xl font-bold tracking-tight text-[color:var(--color-primary-green)]">
            Pahari Brew
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id || (item.id === 'about' && currentPage === 'home' && false);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:text-[color:var(--color-primary-green)] relative py-2 cursor-pointer ${
                  isActive
                    ? 'text-[color:var(--color-primary-green)] font-semibold'
                    : 'text-[color:var(--color-sage-subtle)]'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--color-gold-accent)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenAssistant && (
            <button
              onClick={onOpenAssistant}
              className="border border-[color:var(--color-primary-green)]/40 text-[color:var(--color-primary-green)] hover:bg-[color:var(--color-primary-green)] hover:text-white transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold px-4 py-3 rounded-sm flex items-center gap-1.5 cursor-pointer"
              id="nav-assistant-btn"
              title="Open AI Café Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[color:var(--color-gold-muted)]" />
              <span>Ask Guide</span>
            </button>
          )}
          <button
            onClick={() => handleNavClick('booking')}
            className="bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-sm active:scale-95 duration-200 cursor-pointer"
            id="nav-reserve-btn"
          >
            Reserve Table
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[color:var(--color-primary-green)] hover:text-[color:var(--color-primary-green-hover)] p-2 focus:outline-none cursor-pointer"
          id="nav-mobile-hamburger"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[color:var(--color-warm-cream)] border-b border-[color:var(--color-border-subtle)] shadow-xl z-40 transition-all duration-300">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-sans font-medium text-sm uppercase tracking-wider py-2 border-b border-[color:var(--color-border-subtle)]/30 ${
                  currentPage === item.id
                    ? 'text-[color:var(--color-primary-green)] font-bold'
                    : 'text-[color:var(--color-sage-subtle)]'
                }`}
                id={`nav-mobile-link-${item.id}`}
              >
                {item.name}
              </button>
            ))}
            
            {onOpenAssistant && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAssistant();
                }}
                className="border border-[color:var(--color-primary-green)] text-[color:var(--color-primary-green)] hover:bg-[color:var(--color-warm-cream)] text-center font-sans text-xs uppercase tracking-widest font-semibold py-3 rounded-sm mt-2 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="nav-mobile-assistant-btn"
              >
                <Sparkles className="w-4 h-4 text-[color:var(--color-gold-muted)]" />
                <span>Ask Pahari Brew Guide</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('booking')}
              className="bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] text-center font-sans text-xs uppercase tracking-widest font-semibold py-3.5 rounded-sm transition-all cursor-pointer"
              id="nav-mobile-reserve-btn"
            >
              Reserve Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
