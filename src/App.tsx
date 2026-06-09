import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Portfolio from './pages/Portfolio';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import InaugurationScreen, { LAUNCHED_KEY, FORCE_SHOW } from './components/InaugurationScreen';
import { motion, AnimatePresence } from 'framer-motion';

// ── Phase order: inauguration? → loading → main ────────────────────────────
type Phase = 'inauguration' | 'loading' | 'main';

function getInitialPhase(): Phase {
  if (FORCE_SHOW) return 'inauguration';
  if (!localStorage.getItem(LAUNCHED_KEY)) return 'inauguration';
  return 'loading';
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(getInitialPhase);

  // Returning visitors: run the brief loading spinner then reveal main
  useEffect(() => {
    if (phase !== 'loading') return;
    const t = setTimeout(() => setPhase('main'), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  const handleInaugurationComplete = () => {
    // Skip loading screen — transition directly to main after inauguration
    setPhase('main');
  };

  return (
    <>
      <AnimatePresence mode="wait">

        {/* ── Inauguration screen (first-time visitors) ───────────── */}
        {phase === 'inauguration' && (
          <InaugurationScreen key="inauguration" onComplete={handleInaugurationComplete} />
        )}

        {/* ── Brief luxury loader (returning visitors) ─────────────── */}
        {phase === 'loading' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900 text-white"
          >
            {/* Spinning ring with logo */}
            <div className="relative w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700/50" />
              <div className="absolute inset-0 rounded-full border-4 border-t-lions-gold border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img src="/LOGO.png" alt="Lions Club Logo" className="w-full h-full object-contain p-1" />
              </div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold tracking-widest text-slate-100 uppercase"
            >
              Lions Club LEAD
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-slate-400 mt-1 font-semibold tracking-wide"
            >
              We Serve. We Lead. We Inspire.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main website (fades in after any loading phase) ─────────── */}
      <AnimatePresence>
        {phase === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col bg-slate-50 dark:bg-lions-navy-bg"
          >
            <Navbar />
            <div className="flex-grow">
              <Portfolio />
            </div>
            <Footer />
            <FloatingActions />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
