import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { PhotoItem } from '../types';

export default function GalleryView() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<boolean>(false);

  const photos: PhotoItem[] = [
    {
      id: 'gal-sanctuary',
      title: 'The Sanctuary Space',
      category: 'Architecture',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY0SPNsqTbQIZDznqncwALKY19pXNhniUkb7Vd-RC9QSjIWhJunQ8TGaKqHCA-sRPBHA0sqZREmgZxaSLecSBlQ47OuHETMTLhrIfhGdqARg2uqM_KWVFno6Q-XX5HpQAgYALon0sz17MQAidFRC1WliM9ow7yb42iPl05cJwOYuscDLo6Ooz0ojtg597PDrnVYbr8qJlNIlX0jZpjtrnq_w74a3N9ZqV87QhRGgulI3ZJ2m_2lnpZnOf8p1qTcBR3tGYCftbM7D18',
      description: 'Our serene wood-framed interior at Shimla Mall Road, overlooking alpine valleys through custom full-height sash windows.',
      aspect: 'large'
    },
    {
      id: 'gal-pour',
      title: 'Artisanal Pours',
      category: 'Craftsmanship',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvJbMB18nk2OOziXbsvZfEHlZwoHM58gpusD9U-UH0J6CmVZxRAQHMtoyMQm47fZkK5JyooXKKEiw94i-5u_QGudNDMgNWbfImbZcgYZdv0vs2ettpGj19Bwv_64jmrMIXUHvEngUivVEJalFeXQi1pW9HApiGPTP-C7qP7elOpDVIZVAHoV3cibea24GP1C2PbWOsVcbQPn5T4fHXyWa_STc--GGOt5NM8sm8aB3--P-5gS8z9d3SieVP7-KNec3Yn2hI1WWO5hAz',
      description: 'Precision hand immersion brewing using single-estate washed Arabica beans to release sweet citrus and cedarwood nuances.',
      aspect: 'tall'
    },
    {
      id: 'gal-beans',
      title: 'Coffee Beans Scoop',
      category: 'Single Origin',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2U_FyCoE-NVrSZphQ-LbBSd-yXMS0IYHzg0AQbKOoISowi2_HoD0EeFqAv6NX1IaF3_zCPfn1A-uFkOF6QMp-0rPtWJS1vYjeQcvGcFu7E08umpgpDSqyZAEyr86G2Vq1yMttGpiuM-iDNsRePdTeu8w3bh5jZKAigQmMlhUfyCRD6Ke9mS16_6eLX1I27bgkmdzHQC1idThuqYf9WSbz2T_M7U_35by6m-hlSv5MkxoMhX3IDFJ-_D-siOdFCel7zqDSd4hTzlh',
      description: 'Perfectly dried organic coffee cherries, selectively hand-sorted before going entering our slow conduction drum roaster.',
      aspect: 'square'
    },
    {
      id: 'gal-morning',
      title: 'Morning Rituals',
      category: 'Flavors',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnG1v8N_8F9TMD41rO5bQ87vL0d0TshL0f6rX_9P0Sj89p_a8_e9Y_c8_V8Y9f-8h8P9_v8Zg9q-87V9r_i7t9',
      description: 'An iced pour-over coffee paired with a freshly laminated, warm companion croissant, welcoming Shimla\'s crisp early golden hour.',
      aspect: 'wide'
    },
    {
      id: 'gal-espresso',
      title: 'Espresso Extraction',
      category: 'Craftsmanship',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJmT2y0mbzDGRsT-kWaLIlAONrLVhESOo9fPGOa9UEdkAjn0Z_kmOL1mZ3psIOmpl0SsuqWvCcwgJcDQ8ZWN2y-MHMf3VHjopL53nXIP7oXl9letGd8H_8-kvrg2gH1F0_eka4xwdeFh4-mITnKrNsUTgt_zgUxndPw6JDNlNpc3fE-ECi1Cz4rRd9NyPlXzWm9SyzJmq9-eENvwO5Vyf-dn9y1SIaqdroSlFw-XYu-e737uybSEJGeX_E1BQymLQgMwvrGviJLAyO',
      description: 'Extracting a concentrated double shot of our medium-dark house roast on custom espresso machinery, capturing deep tiger flecks.',
      aspect: 'square'
    },
    {
      id: 'gal-matcha',
      title: 'Organic Green Art',
      category: 'Flavors',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7XnZ2sL-7h6U28S-GIdD1KqUv59dY_6n-RjC8tPND-bK8U9r_K4Z-t7l-hS8kPf_uI0K8',
      description: 'Shaded stone-ground green companion latte whisked to absolute velvet finish, combined with local alpine pure honey.',
      aspect: 'square'
    },
    {
      id: 'gal-outdoor',
      title: 'The Outdoor Deck',
      category: 'Architecture',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2QsxAyeGc2zVlcvHELWkHwLfIs6KeBQyTqbnWPRu-u-Nmb6jA-zR5ep3U_GQNiEvuI2M3nxjveQ9CECdI5tCWk0hqe6dlsAL00L0xZ8uoP51L1fIcwx0MG4dJoasT0XnPkQEFfLVo3oIbnmSHAFl8MnfptDU8dIPVeRTnHH_MNovAyeCculOyTxG5IltIaZKibY4Wt6WQQ9wIz3Qie1m2JBvi4uYhrcQKPMVNMaWvxr3O9sM4Kp380qltXsDmwN3ObRqmRZU_YATW',
      description: 'Breathe in the tranquility on our cedar deck patio, watching valley clouds curl around deep moss-covered stones.',
      aspect: 'square'
    }
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(activePhotoIndex === 0 ? photos.length - 1 : activePhotoIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(activePhotoIndex === photos.length - 1 ? 0 : activePhotoIndex + 1);
    }
  };

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedIndex(true);
    setTimeout(() => setCopiedIndex(false), 2000);
  };

  return (
    <div className="w-full relative mt-20 pt-1 flex flex-col items-center bg-[color:var(--color-warm-cream)]" id="gallery-view-container">
      
      {/* Intro Heading Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-6 md:px-16 text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-[color:var(--color-primary-green)] block mb-3">
          Behind the Lens
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[color:var(--color-deep-moss)] tracking-tight">
          Visual Journey
        </h1>
        <div className="w-12 h-[2px] bg-[color:var(--color-gold-accent)] mx-auto my-4" />
        <p className="font-sans text-sm md:text-base text-[color:var(--color-sage-subtle)] leading-relaxed max-w-2xl mx-auto mt-4">
          Immerse yourself in the high-altitude tranquility of Pahari Brew. A curated collection of our finest roasts, artisanal pastries, and serene interior spaces designed for mindful moments.
        </p>
      </section>

      {/* Bento Layout Grid matching the screenshots */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-16 pb-24" id="gallery-bento-grid">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Card 1: Large landscape (The Sanctuary Space) - 8 columns */}
          <div 
            onClick={() => setActivePhotoIndex(0)}
            className="md:col-span-8 group relative aspect-[16/10] bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-1"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[0].url} 
              alt={photos[0].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[0].category}</span>
              <h3 className="font-display text-xl font-bold text-white">{photos[0].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-1">{photos[0].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          {/* Card 2: Tall portrait (Artisanal Pours) - 4 columns */}
          <div 
            onClick={() => setActivePhotoIndex(1)}
            className="md:col-span-4 group relative aspect-[10/16] bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-2"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[1].url} 
              alt={photos[1].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[1].category}</span>
              <h3 className="font-display text-xl font-bold text-white">{photos[1].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-2">{photos[1].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          {/* Card 3: Square (Coffee Beans scatter/scoop) - 4 columns */}
          <div 
            onClick={() => setActivePhotoIndex(2)}
            className="md:col-span-4 group relative aspect-square bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-3"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[2].url} 
              alt={photos[2].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[2].category}</span>
              <h3 className="font-display text-lg font-bold text-white">{photos[2].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-2">{photos[2].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          {/* Card 4: Wide landscape (Croissant + Iced Cold Brew) - 8 columns */}
          <div 
            onClick={() => setActivePhotoIndex(3)}
            className="md:col-span-8 group relative aspect-[16/10] bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-4"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[3].url} 
              alt={photos[3].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[3].category}</span>
              <h3 className="font-display text-xl font-bold text-white">{photos[3].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-1">{photos[3].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          {/* Card 5: Square (Espresso Machine) - 4 columns */}
          <div 
            onClick={() => setActivePhotoIndex(4)}
            className="md:col-span-4 group relative aspect-square bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-5"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[4].url} 
              alt={photos[4].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[4].category}</span>
              <h3 className="font-display text-lg font-bold text-white">{photos[4].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-2">{photos[4].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          {/* Card 6: Square (Matcha Latte) - 4 columns */}
          <div 
            onClick={() => setActivePhotoIndex(5)}
            className="md:col-span-4 group relative aspect-square bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-6"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[5].url} 
              alt={photos[5].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[5].category}</span>
              <h3 className="font-display text-lg font-bold text-white">{photos[5].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-2">{photos[5].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          {/* Card 7: Square (Outdoor Seating) - 4 columns */}
          <div 
            onClick={() => setActivePhotoIndex(6)}
            className="md:col-span-4 group relative aspect-square bg-[color:var(--color-border-subtle)] rounded-sm overflow-hidden shadow-md cursor-pointer reveal active"
            id="gal-bento-7"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 z-10" />
            <img 
              src={photos[6].url} 
              alt={photos[6].title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="font-sans text-[10px] uppercase text-[color:var(--color-gold-accent)] tracking-wider block mb-1">{photos[6].category}</span>
              <h3 className="font-display text-lg font-bold text-white">{photos[6].title}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-2">{photos[6].description}</p>
            </div>
            <ZoomIn className="absolute top-6 right-6 w-5 h-5 text-white/80 group-hover:scale-110 z-20 opacity-0 group-hover:opacity-100 transition-all" />
          </div>

        </div>
      </section>

      {/* Advanced Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            
            {/* Close touch sensitive background */}
            <div 
              onClick={() => setActivePhotoIndex(null)}
              className="absolute inset-0 cursor-zoom-out"
            />

            {/* Top Bar Navigation */}
            <div className="absolute top-5 left-5 right-5 z-25 flex justify-between items-center text-white/80">
              <span className="font-sans text-xs uppercase tracking-widest font-semibold bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                Photo {activePhotoIndex + 1} of {photos.length} — {photos[activePhotoIndex].category}
              </span>
              
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleCopyLink(photos[activePhotoIndex].url, e)}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  title="Copy image link"
                >
                  {copiedIndex ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
                  {copiedIndex && <span className="font-sans text-[10px] uppercase tracking-wider text-green-400 block pr-1">Copied!</span>}
                </button>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-3 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all focus:outline-none cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Swipe Controls: Left */}
            <button
              onClick={handlePrev}
              className="absolute left-6 md:left-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer z-20 transition-all border border-white/5"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Central Animated Container */}
            <motion.div
              key={activePhotoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-5xl max-h-[72vh] z-10 flex flex-col items-center justify-center p-4"
              id="lightbox-image-wrapper"
            >
              <img
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Swipe Controls: Right */}
            <button
              onClick={handleNext}
              className="absolute right-6 md:right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer z-20 transition-all border border-white/5"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Metadata Bottom Sheet details */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-xl text-center z-25 text-white bg-black/60 backdrop-blur-md px-6 py-4.5 rounded-md border border-white/10 w-[90%] md:w-full">
              <h4 className="font-display text-lg font-bold text-[color:var(--color-gold-accent)] uppercase tracking-wide">
                {photos[activePhotoIndex].title}
              </h4>
              <p className="font-sans text-xs md:text-sm text-white/80 mt-1.5 leading-relaxed">
                {photos[activePhotoIndex].description}
              </p>
              <div className="flex justify-center items-center gap-4 mt-3 text-[10px] uppercase font-mono tracking-wider text-white/50">
                <span>Location: Shimla Mall</span>
                <span>•</span>
                <span>Aperture: f/2.4</span>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
