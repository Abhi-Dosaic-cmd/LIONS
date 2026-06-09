import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAssetUrl } from '../utils/assets';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-28 text-white"
    >
      {/* Background Overlay Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-linear scale-105"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 40, 85, 0.82), rgba(8, 15, 30, 0.95)), url('${getAssetUrl('/images/home.jpeg')}')`,
        }}
      />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-lions-blue/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-lions-gold/25 blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Logo/Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Sparkles className="h-4.5 w-4.5 text-lions-gold" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-lions-gold-light">
            Lions International • Region 1 • Zone 2
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none"
        >
          Lions Club of <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-white via-white to-lions-gold bg-clip-text text-transparent">
            LEAD College
          </span>{' '}
          <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-lions-gold via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Autonomous, Dhoni
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 font-medium max-w-2xl italic leading-relaxed"
        >
          "We Serve. We Lead. We Inspire."
        </motion.p>

        {/* Short Mission Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl"
        >
          Fostering student leadership and serving local communities in Dhoni and surrounding areas through impactful, youth-led initiatives.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
        >
          <button
            onClick={() => handleScrollTo('#about')}
            className="group px-7 py-3.5 rounded-full font-bold bg-gradient-to-r from-lions-blue to-lions-blue-light border border-lions-blue/30 text-white shadow-xl shadow-lions-blue/30 hover:shadow-lions-blue/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2"
          >
            <span>Explore Our Journey</span>
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="px-7 py-3.5 rounded-full font-bold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 dark:bg-lions-gold dark:text-slate-950 dark:border-lions-gold hover:shadow-lg dark:hover:shadow-lions-gold/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Decorative Wave/Angle cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-lions-navy-bg to-transparent pointer-events-none" />
    </section>
  );
}
