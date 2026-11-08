import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, X, Coffee, Heart, Clock } from 'lucide-react';
import { MenuItem } from '../types';

export default function MenuView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'brews' | 'companions'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'brew-cold',
      name: 'Signature Cold Brew',
      price: 180,
      description: 'Steeped for 18 grueling hours with single-origin Himalayan beans, served over a single artisanal block of hand-cut ice.',
      tags: ['Cold', 'Single Origin', 'Bold'],
      category: 'brews'
    },
    {
      id: 'brew-pourover',
      name: 'Himalayan Pour Over',
      price: 210,
      description: 'Delicate light roast with crisp floral notes of wild jasmine, highland berries, and a remarkably clean, tea-like finish.',
      tags: ['Hot', 'Single Origin', 'Complex'],
      category: 'brews'
    },
    {
      id: 'brew-cortado',
      name: 'Spiced Mountain Cortado',
      price: 190,
      description: 'Equal parts robust espresso and micro-foamed steamed milk, gently infused with hand-ground local cardamom and cinnamon.',
      tags: ['Hot', 'Cardamom Accent'],
      category: 'brews'
    },
    {
      id: 'brew-mocha',
      name: 'Pahari Mocha',
      price: 240,
      description: 'Rich dark artisan chocolate melted directly into double espresso, topped with velvety steamed organic oat milk.',
      tags: ['Hot', 'Oat Milk Standard'],
      category: 'brews'
    },
    {
      id: 'pastry-toast',
      name: 'Avocado Toast',
      price: 220,
      description: 'Smashed Hass avocado, pickled valley shallots, mountain micro-greens, and a dash of Himalayan pink salt on thick-cut, house-fermented wild sourdough.',
      tags: ['High Roasted Grain', 'Healthy', 'Fresh'],
      category: 'companions',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnG1v8N_8F9TMD41rO5bQ87vL0d0TshL0f6rX_9P0Sj89p_a8_e9Y_c8_V8Y9f-8h8P9_v8Zg9q-87V9r_i7t9'
    },
    {
      id: 'pastry-croissant',
      name: 'Classic Croissant',
      price: 120,
      description: 'Delicately layered, certified high-butter pastry baked fresh at dawn every day, offering an intensely flaky, golden-brown crust.',
      tags: ['Heritage Grain', 'Buttery'],
      category: 'companions'
    },
    {
      id: 'pastry-tart',
      name: 'Almond Tart',
      price: 150,
      description: 'Traditional frangipane sweet tart topped with perfectly toasted single-farm almond shavings and glazed with mountain honey.',
      tags: ['Organic', 'Honey Glazed'],
      category: 'companions'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Process details metadata for modals
  const getItemDetails = (id: string) => {
    switch(id) {
      case 'brew-cold':
        return {
          altitude: '1,650m Barog Estate',
          roast: 'True Medium-Dark',
          notes: 'Molasses, dark chocolate, hint of pine zest.',
          method: 'Double-walled cold filtration chamber, steep time of eighteen hours in 4°C water.'
        };
      case 'brew-pourover':
        return {
          altitude: '1,920m Sangla Valley micro-lot',
          roast: 'Very Light Nordic style',
          notes: 'Wild honeysuckle, apricot, sweet tea.',
          method: 'Hario V60 ceramic dripper, steady manual pulse pour with 92.5°C spring water.'
        };
      case 'pastry-toast':
        return {
          altitude: 'Grain: Dehradun plains',
          roast: 'Loaf: Thick oven baked',
          notes: 'Complex lactic tang, crispy bottom crust.',
          method: 'Natural 72-hour wild yeast starter hydration, high-temp stone chamber bake.'
        };
      default:
        return {
          altitude: 'Premium Curated estate',
          roast: 'Classic House Profile',
          notes: 'Velvety, balanced, sweet.',
          method: 'Artisanal hand-prepared fresh daily by custom crafted barista techniques.'
        };
    }
  };

  return (
    <div className="w-full relative mt-20 pt-1 flex flex-col items-center bg-[color:var(--color-warm-cream)]" id="menu-view-container">
      
      {/* Menu Header / Hero with Blurred backdrop style */}
      <section className="relative w-full py-20 px-6 md:px-16 text-center overflow-hidden border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-deep-moss)] text-white">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnG1v8N_8F9TMD41rO5bQ87vL0d0TshL0f6rX_9P0Sj89p_a8_e9Y_c8_V8Y9f-8h8P9_v8Zg9q-87V9r_i7t9" 
          alt="Coffee Roaster texture" 
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-[2px] z-0"
        />
        <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--color-gold-accent)] mb-3 block">
            Our Offerings
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
            The Menu
          </h1>
          <div className="w-16 h-[2px] bg-[color:var(--color-gold-accent)] my-4" />
          <p className="font-sans text-[13px] md:text-sm text-white/85 max-w-lg leading-relaxed uppercase tracking-wider">
            Explore our slow-batch Mountain infusions paired with heritage baker companions.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Menu Center */}
      <section className="w-full max-w-7xl mx-auto py-16 px-6 md:px-16 flex flex-col items-center">
        
        {/* Category Controls */}
        <div className="flex gap-2 sm:gap-4 p-1.5 bg-[color:var(--color-surface-container-low)] border border-[color:var(--color-border-subtle)] rounded-full mb-16 inline-flex" id="menu-tabs">
          {[
            { tag: 'all', label: 'All Menu' },
            { tag: 'brews', label: 'Signature Brews' },
            { tag: 'companions', label: 'Artisanal Companions' }
          ].map((tab) => (
            <button
              key={tab.tag}
              onClick={() => setActiveCategory(tab.tag as any)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 ${
                activeCategory === tab.tag
                  ? 'bg-[color:var(--color-primary-green)] text-white shadow-md'
                  : 'text-[color:var(--color-sage-subtle)] hover:text-[color:var(--color-primary-green)]'
              }`}
              id={`menu-tab-${tab.tag}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Display Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="menu-items-grid">
          
          {/* Brews Container / Subsection */}
          {(activeCategory === 'all' || activeCategory === 'brews') && (
            <div className="col-span-12 lg:col-span-12 space-y-12 mb-12">
              <div className="flex items-center gap-4 reveal active">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[color:var(--color-primary-green)]">
                  Signature Brews
                </h2>
                <div className="flex-1 h-[2px] bg-[color:var(--color-gold-accent)] opacity-40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredItems.filter(i => i.category === 'brews').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-[color:var(--color-card-bg)] border border-[color:var(--color-border-subtle)]/60 hover:border-[color:var(--color-primary-green)]/35 p-6 rounded-sm shadow-sm hover:shadow-md transition-all duration-400 cursor-pointer flex flex-col justify-between h-[190px] relative reveal active"
                    id={`menu-card-${item.id}`}
                  >
                    <div>
                      {/* Title & Price Header */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display text-lg font-bold text-[color:var(--color-deep-moss)] group-hover:text-[color:var(--color-primary-green)] transition-colors pr-2">
                          {item.name}
                        </h3>
                        <span className="font-sans text-sm font-semibold text-[color:var(--color-primary-green)] bg-[color:var(--color-warm-cream)] px-2.5 py-0.5 rounded-sm border border-[color:var(--color-border-subtle)]/50">
                          ₹{item.price}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] leading-relaxed mt-2.5 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags Footer & Favorites Button */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags?.map((tag, tIndex) => (
                          <span 
                            key={tIndex} 
                            className="font-sans text-[9px] uppercase tracking-wider bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] px-2 py-0.5 rounded-sm border border-[color:var(--color-border-subtle)]/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="p-1.5 rounded-full hover:bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <Info className="w-3.5 h-3.5 text-[color:var(--color-primary-green)] opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Companions Container / Subsection */}
          {(activeCategory === 'all' || activeCategory === 'companions') && (
            <div className="col-span-12 lg:col-span-12 space-y-12">
              <div className="flex items-center gap-4 reveal active">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[color:var(--color-primary-green)]">
                  Artisanal Companions
                </h2>
                <div className="flex-1 h-[2px] bg-[color:var(--color-gold-accent)] opacity-40" />
              </div>

              {/* Bento Grid with highlight for card with image (Avocado Toast) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                
                {filteredItems.filter(i => i.category === 'companions').map((item) => {
                  const isHighlighted = item.id === 'pastry-toast';

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`group bg-[color:var(--color-card-bg)] border border-[color:var(--color-border-subtle)]/60 hover:border-[color:var(--color-primary-green)]/35 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-400 cursor-pointer flex flex-col justify-between relative ${
                        isHighlighted 
                          ? 'col-span-12 md:col-span-8 md:flex-row h-auto md:h-[260px]' 
                          : 'col-span-12 md:col-span-4 h-auto md:h-[260px] p-6'
                      }`}
                      id={`companion-card-${item.id}`}
                    >
                      {isHighlighted ? (
                        <>
                          {/* Image side */}
                          <div className="w-full md:w-5/12 h-44 md:h-full overflow-hidden relative shrink-0 bg-[color:var(--color-warm-cream)]">
                            <div className="absolute inset-0 bg-black/5 z-5" />
                            <img
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                              src={item.image}
                            />
                            <div className="absolute top-4 left-4 z-10">
                              <span className="bg-[color:var(--color-primary-green)] text-white text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 fill-current" /> Highlight
                              </span>
                            </div>
                          </div>

                          {/* Content side */}
                          <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-display text-xl font-bold text-[color:var(--color-deep-moss)] group-hover:text-[color:var(--color-primary-green)] transition-colors">
                                  {item.name}
                                </h3>
                                <span className="font-sans text-sm font-semibold text-[color:var(--color-primary-green)] bg-[color:var(--color-warm-cream)] px-2.5 py-0.5 rounded-sm border border-[color:var(--color-border-subtle)]/50">
                                  ₹{item.price}
                                </span>
                              </div>
                              <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] leading-relaxed mt-2.5 mb-6">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex justify-between items-center border-t border-[color:var(--color-border-subtle)]/40 pt-4 mt-auto">
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags?.map((tag, tIndex) => (
                                  <span 
                                    key={tIndex} 
                                    className="font-sans text-[9px] uppercase tracking-wider bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] px-2 py-0.5 rounded-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={(e) => toggleFavorite(item.id, e)}
                                  className="p-1.5 rounded-full hover:bg-[color:var(--color-warm-cream)] text-red-400 group-hover:text-red-500 transition-colors"
                                >
                                  <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                </button>
                                <span className="font-sans text-[10px] uppercase font-bold text-[color:var(--color-primary-green)]">Explore Ingredients</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-display text-lg font-bold text-[color:var(--color-deep-moss)] group-hover:text-[color:var(--color-primary-green)] transition-colors">
                                  {item.name}
                                </h3>
                                  <span className="font-sans text-sm font-semibold text-[color:var(--color-primary-green)] bg-[color:var(--color-warm-cream)] px-2.5 py-0.5 rounded-sm border border-[color:var(--color-border-subtle)]/50">
                                    ₹{item.price}
                                  </span>
                              </div>
                              <p className="font-sans text-xs text-[color:var(--color-sage-subtle)] leading-relaxed mt-3.5 mb-6 line-clamp-3">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex justify-between items-center border-t border-[color:var(--color-border-subtle)]/40 pt-4 mt-auto">
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags?.map((tag, tIndex) => (
                                  <span 
                                    key={tIndex} 
                                    className="font-sans text-[9px] uppercase tracking-wider bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] px-2"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              
                              <button
                                onClick={(e) => toggleFavorite(item.id, e)}
                                className="p-1.5 rounded-full hover:bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] hover:text-red-500 transition-colors"
                              >
                                <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>
          )}

        </div>
      </section>

      {/* Specialty Ingredient Highlight slide-in Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              id="menu-modal-overlay"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[color:var(--color-warm-white)] rounded-sm overflow-hidden shadow-2xl z-10 p-8 text-left"
              id="menu-modal-card"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-[color:var(--color-warm-cream)] text-[color:var(--color-sage-subtle)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[color:var(--color-primary-green)] mb-2">
                <Coffee className="w-5 h-5" />
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold">Craft Ingredients</span>
              </div>
              
              <h3 className="font-display text-2xl font-bold text-[color:var(--color-deep-moss)] mb-1">
                {selectedItem.name}
              </h3>
              <p className="font-sans text-xs text-[color:var(--color-primary-green)] font-semibold mb-4">
                Price: ₹{selectedItem.price} — Standard Cup Size
              </p>

              <p className="font-sans text-sm text-[color:var(--color-sage-subtle)] leading-relaxed mb-6 border-b border-[color:var(--color-border-subtle)] pb-6">
                {selectedItem.description}
              </p>

              {/* Specialty Details Panel */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-gold-accent)] mt-2 shrink-0" />
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-[color:var(--color-deep-moss)] block">Estate / Origin Elevation</span>
                    <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">{getItemDetails(selectedItem.id).altitude}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-gold-accent)] mt-2 shrink-0" />
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-[color:var(--color-deep-moss)] block">Roast Profile</span>
                    <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">{getItemDetails(selectedItem.id).roast}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-gold-accent)] mt-2 shrink-0" />
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-[color:var(--color-deep-moss)] block">Delicate Tastings</span>
                    <span className="font-sans text-xs text-[color:var(--color-sage-subtle)]">{getItemDetails(selectedItem.id).notes}</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-[color:var(--color-warm-cream)] p-4 rounded-sm border border-[color:var(--color-border-subtle)]/40">
                  <Clock className="w-5 h-5 text-[color:var(--color-gold-muted)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-[color:var(--color-primary-green)] block">Brewing Method</span>
                    <span className="font-sans text-xs text-[color:var(--color-sage-subtle)] block mt-0.5 leading-relaxed">{getItemDetails(selectedItem.id).method}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full bg-[color:var(--color-primary-green)] text-white hover:bg-[color:var(--color-primary-green-hover)] text-center font-sans text-xs uppercase tracking-widest font-semibold py-4 rounded-sm shadow-md transition-all mt-8 cursor-pointer"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
