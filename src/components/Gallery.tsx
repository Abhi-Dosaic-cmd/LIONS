import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface GalleryItem {
  id: string;
  image: string;
  category: string;
  caption: string;
}

const GALLERY_DATA: GalleryItem[] = [
  { id: '1',  image: '/images/act2.jpeg',  category: 'Activities', caption: 'Lions Club activity — act2.'  },
  { id: '2',  image: '/images/act3.jpeg',  category: 'Activities', caption: 'Lions Club activity — act3.'  },
  { id: '3',  image: '/images/act4.jpeg',  category: 'Activities', caption: 'Lions Club activity — act4.'  },
  { id: '4',  image: '/images/act5.jpeg',  category: 'Activities', caption: 'Lions Club activity — act5.'  },
  { id: '5',  image: '/images/act6.jpeg',  category: 'Activities', caption: 'Lions Club activity — act6.'  },
  { id: '6',  image: '/images/act7.jpeg',  category: 'Activities', caption: 'Lions Club activity — act7.'  },
  { id: '7',  image: '/images/act8.jpeg',  category: 'Activities', caption: 'Lions Club activity — act8.'  },
  { id: '8',  image: '/images/act9.jpeg',  category: 'Activities', caption: 'Lions Club activity — act9.'  },
  { id: '9',  image: '/images/act10.jpeg', category: 'Activities', caption: 'Lions Club activity — act10.' },
  { id: '10', image: '/images/act11.jpeg', category: 'Activities', caption: 'Lions Club activity — act11.' },
  { id: '11', image: '/images/act12.jpeg', category: 'Activities', caption: 'Lions Club activity — act12.' },
  { id: '12', image: '/images/act13.jpeg', category: 'Activities', caption: 'Lions Club activity — act13.' },
  { id: '13', image: '/images/act14.jpeg', category: 'Activities', caption: 'Lions Club activity — act14.' },
  { id: '14', image: '/images/act15.jpeg', category: 'Activities', caption: 'Lions Club activity — act15.' },
];

const CATEGORIES = ['All', 'Activities'];

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter logic
  const filteredItems = GALLERY_DATA.filter(
    (item) => selectedCat === 'All' || item.category === selectedCat
  );

  // Navigation callbacks
  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setLightboxIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <section id="gallery" className="py-24 bg-slate-50 dark:bg-lions-navy-bg relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-lions-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3.5 py-1 rounded-full bg-lions-blue/10 dark:bg-lions-gold/10 text-lions-blue dark:text-lions-gold text-xs font-bold uppercase tracking-wider mb-3"
          >
            Visual Journey
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Activity Gallery
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Moments of service, training, and celebrations frozen in time.
          </p>
          <div className="w-16 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 ${
                selectedCat === cat
                  ? 'bg-lions-blue text-white border-lions-blue dark:bg-lions-gold dark:text-slate-950 dark:border-lions-gold shadow-md'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/50 dark:bg-slate-900/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-3xl cursor-pointer aspect-square sm:aspect-[4/3] border border-slate-200/50 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={getAssetUrl(item.image)}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="self-start px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-lions-gold text-slate-950 uppercase mb-2">
                    {item.category}
                  </span>
                  <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-snug">
                    {item.caption}
                  </p>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/80">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4">
              {/* Top Bar inside Lightbox */}
              <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20">
                <span className="text-xs sm:text-sm font-semibold text-slate-400">
                  Image {lightboxIndex + 1} of {filteredItems.length} • {filteredItems[lightboxIndex].category}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 rounded-full bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850 transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Image Slider Area */}
              <div className="relative flex items-center justify-center w-full max-w-5xl h-[70vh] sm:h-[80vh]">
                {/* Navigation Left */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-25 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all select-none border border-slate-800"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Lightbox Active Image */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center p-2"
                >
                  <img
                    src={getAssetUrl(filteredItems[lightboxIndex].image)}
                    alt={filteredItems[lightboxIndex].caption}
                    className="max-w-full max-h-full object-contain rounded-xl select-none"
                  />
                </motion.div>

                {/* Navigation Right */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-25 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all select-none border border-slate-800"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Caption Bar */}
              <motion.div
                key={`caption-${lightboxIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl text-center px-4 mt-4 text-sm sm:text-base text-slate-300 font-medium leading-relaxed"
              >
                {filteredItems[lightboxIndex].caption}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
