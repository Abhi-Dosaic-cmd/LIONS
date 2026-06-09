import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, X, Eye } from 'lucide-react';
import activitiesData from '../data/activities.json';
import { getAssetUrl } from '../utils/assets';

interface Activity {
  id: string;
  title: string;
  date: string;
  category: string;
  year: string;
  description: string;
  image: string;
  details: string;
}

const CATEGORIES = ['All', 'Service', 'Leadership', 'Events', 'Community Outreach', 'Celebrations'];
const YEARS = ['All', '2026', '2025'];

export default function Activities() {
  const activities: Activity[] = activitiesData;
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [activeModal, setActiveModal] = useState<Activity | null>(null);

  // Filter logic
  const filteredActivities = activities.filter((act) => {
    const catMatch = selectedCat === 'All' || act.category === selectedCat;
    const yearMatch = selectedYear === 'All' || act.year === selectedYear;
    return catMatch && yearMatch;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="activities" className="py-24 bg-slate-100 dark:bg-lions-navy-bg/50 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/3 left-10 w-84 h-84 rounded-full bg-lions-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-84 h-84 rounded-full bg-lions-gold/5 blur-[120px] pointer-events-none" />

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
            Club Highlights
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Activities & Initiatives
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Discover our timeline of services, workshops, and outreach programs crafted to bring change.
          </p>
          <div className="w-16 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Filters Panel */}
        <div className="glass-card p-6 rounded-3xl mb-12 border border-slate-200/50 dark:border-slate-800/80 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          {/* Categories Tab */}
          <div className="w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2.5 flex items-center">
              <Filter className="h-3.5 w-3.5 mr-1 text-lions-gold" /> Filter by Category
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                    selectedCat === cat
                      ? 'bg-lions-blue text-white border-lions-blue dark:bg-lions-gold dark:text-slate-950 dark:border-lions-gold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="shrink-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
              Filter by Year
            </span>
            <div className="flex gap-1.5">
              {YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                    selectedYear === yr
                      ? 'bg-lions-blue text-white border-lions-blue dark:bg-lions-gold dark:text-slate-950 dark:border-lions-gold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-lions-navy-dark rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-lg font-medium text-slate-500">No activities match your filters.</p>
            <button
              onClick={() => {
                setSelectedCat('All');
                setSelectedYear('All');
              }}
              className="mt-4 px-5 py-2.5 rounded-full text-xs font-bold bg-lions-blue text-white hover:bg-lions-blue-light"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Activities Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((act) => (
              <motion.div
                key={act.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card glass-card-hover flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-lg"
              >
                {/* Cover Image */}
                <div className="relative group/img aspect-[16/10] overflow-hidden">
                  <img
                    src={getAssetUrl(act.image)}
                    alt={act.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> Preview Details
                    </span>
                  </div>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-white/95 text-lions-blue dark:bg-lions-navy-dark dark:text-lions-gold shadow">
                    {act.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Date */}
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      <Calendar className="h-3.5 w-3.5 text-lions-gold shrink-0" />
                      <span>{formatDate(act.date)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white leading-tight mb-2.5 hover:text-lions-blue dark:hover:text-lions-gold transition-colors duration-200">
                      {act.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {act.description}
                    </p>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => setActiveModal(act)}
                    className="w-full text-center px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-lions-blue hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-lions-gold dark:hover:text-slate-950 transition-all duration-300"
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Read More Modal Details */}
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-white dark:bg-lions-navy-dark rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200/50 dark:border-slate-800 shadow-2xl z-10 no-scrollbar"
              >
                {/* Close Button top corner */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 dark:bg-slate-800/80 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                {/* Cover Image in modal */}
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={getAssetUrl(activeModal.image)}
                    alt={activeModal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-lions-gold text-slate-950 shadow">
                    {activeModal.category}
                  </span>
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8">
                  {/* Date info */}
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mb-3">
                    <Calendar className="h-3.5 w-3.5 text-lions-gold shrink-0" />
                    <span>{formatDate(activeModal.date)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                    {activeModal.title}
                  </h3>

                  {/* Details paragraph */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
                    {activeModal.details}
                  </p>

                  {/* Bottom close action */}
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 flex justify-end">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
