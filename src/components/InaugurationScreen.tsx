import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

// ── Config ─────────────────────────────────────────────────────────────────
export const LAUNCHED_KEY = 'lionsWebsiteLaunched';
/** true = show on every page load (ideal for event day) */
export const FORCE_SHOW = true;

// ── Background orbs ────────────────────────────────────────────────────────
const ORBS = [
  { id: 0, left: '5%',  top: '10%', w: 420, dur: 14, delay: 0   },
  { id: 1, left: '74%', top: '5%',  w: 300, dur: 18, delay: 2   },
  { id: 2, left: '50%', top: '70%', w: 360, dur: 12, delay: 1   },
  { id: 3, left: '14%', top: '74%', w: 220, dur: 22, delay: 3   },
  { id: 4, left: '84%', top: '50%', w: 280, dur: 16, delay: 0.5 },
  { id: 5, left: '38%', top: '3%',  w: 200, dur: 20, delay: 1.5 },
];

// ── Floating dust dots ─────────────────────────────────────────────────────
const DOTS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${(i * 2.85 + 1) % 97}%`,
  top:  `${(i * 4.63 + 2) % 95}%`,
  dur:  1.6 + (i % 6) * 0.35,
  delay:(i * 0.15) % 3,
  size: 1.5 + (i % 4) * 0.7,
}));

// ── Confetti: 220 pieces, full 360° spread, mixed shapes ───────────────────
const CONFETTI = Array.from({ length: 220 }, (_, i) => {
  const angle    = (i / 220) * 2 * Math.PI;
  const inner    = 80  + (i % 7)  * 30;   // 80–290 px inner ring
  const outer    = 320 + (i % 11) * 60;   // 320–940 px outer ring
  const dist     = i % 2 === 0 ? inner : outer;
  const colors   = ['#FFD700','#FFC300','#FFFFFF','#4169E1','#87CEEB','#FFA500','#FFE066','#FF6B6B','#A8E6CF','#FF8E53'];
  const shape    = i % 3; // 0 = rect, 1 = square, 2 = circle
  return {
    id:    i,
    tx:    Math.cos(angle) * dist,
    ty:    Math.sin(angle) * dist,
    color: colors[i % colors.length],
    w:     shape === 1 ? 8 + (i % 5) * 2 : 6 + (i % 8) * 1.5,
    h:     shape === 0 ? 3 + (i % 4)     : shape === 1 ? 8 + (i % 5) * 2 : 8 + (i % 5) * 2,
    borderRadius: shape === 2 ? '50%' : shape === 1 ? '2px' : '1px',
    rotate:(i * 61) % 360,
    dur:   0.5 + (i % 6) * 0.15,
    delay: (i % 8) * 0.03,
  };
});

// ── Component ──────────────────────────────────────────────────────────────
export default function InaugurationScreen({ onComplete }: { onComplete: () => void }) {
  const [cutting, setCutting] = useState(false);
  const [burst,   setBurst]   = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleLaunch = useCallback(() => {
    if (cutting) return;
    setCutting(true);
    setTimeout(() => setBurst(true),   850);
    setTimeout(() => setExiting(true), 2200);
    setTimeout(() => {
      localStorage.setItem(LAUNCHED_KEY, 'true');
      onComplete();
    }, 3200);
  }, [cutting, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="inauguration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, #010a28 0%, #031340 35%, #091c6a 65%, #020c32 100%)',
          }}
        >
          {/* ── Glow orbs ─────────────────────────────────────────────── */}
          {ORBS.map((orb) => (
            <motion.div
              key={orb.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: orb.left, top: orb.top,
                width: orb.w, height: orb.w,
                background:
                  'radial-gradient(circle, rgba(255,215,0,0.14) 0%, rgba(65,105,225,0.09) 45%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{ scale: [1, 1.28, 1], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* ── Gold dust dots ─────────────────────────────────────────── */}
          {DOTS.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: dot.left, top: dot.top,
                width: dot.size, height: dot.size,
                background: 'rgba(255,218,50,0.55)',
              }}
              animate={{ opacity: [0, 1, 0], y: [-14, 14, -14] }}
              transition={{ duration: dot.dur, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* ── Confetti burst (centred on ribbon button) ─────────────── */}
          <AnimatePresence>
            {burst && (
              <div
                className="absolute pointer-events-none z-30"
                style={{ left: '50%', top: '72%', transform: 'translate(-50%, -50%)' }}
              >
                {CONFETTI.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                      width: p.w, height: p.h,
                      background: p.color,
                      borderRadius: p.borderRadius,
                      top: 0, left: 0,
                      marginLeft: -p.w / 2,
                      marginTop:  -p.h / 2,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                    animate={{
                      x: p.tx, y: p.ty,
                      opacity: [1, 1, 0],
                      rotate: p.rotate,
                      scale: [1, 1.5, 0.3],
                    }}
                    transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut' }}
                  />
                ))}

                {/* Central flash rings */}
                {[0, 0.12, 0.25].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2 border-yellow-300"
                    style={{
                      width: 60 + i * 20, height: 60 + i * 20,
                      marginLeft: -(30 + i * 10), marginTop: -(30 + i * 10),
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 10, opacity: 0 }}
                    transition={{ duration: 0.9, delay, ease: 'easeOut' }}
                  />
                ))}
                {/* White flash */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 80, height: 80, marginLeft: -40, marginTop: -40,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,215,0,0.5), transparent)',
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 8, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            )}
          </AnimatePresence>

          {/* ── Upper content (logo + text) ───────────────────────────── */}
          <div
            className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl mx-auto"
            style={{ marginBottom: '18vh' }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 70, damping: 12 }}
              className="relative mb-7"
            >
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-yellow-400/30"
                animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -inset-1 rounded-full border border-yellow-300/40"
                animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2.5 overflow-hidden"
                style={{
                  boxShadow:
                    '0 0 0 4px rgba(255,215,0,0.5), 0 0 70px rgba(255,215,0,0.4), 0 20px 60px rgba(0,0,0,0.6)',
                }}
              >
                <img src={getAssetUrl('/images/LOGO.png')} alt="Lions Club" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-500/70" />
              <span
                className="text-[10px] sm:text-xs font-bold tracking-[0.32em] uppercase px-4 py-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,165,0,0.10))',
                  border: '1px solid rgba(255,215,0,0.4)',
                  color: '#FFD700',
                }}
              >
                Official Website Launch
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-yellow-500/70" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-2"
            >
              Lions Club of{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to right,#FFE566,#FFD700,#FFA500)' }}
              >
                LEAD College
              </span>
              <br />
              <span className="text-xl sm:text-2xl font-semibold text-slate-300 tracking-wide">
                Autonomous, Dhoni
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-slate-400 text-sm sm:text-base italic mt-3 leading-relaxed"
            >
              "Empowering Leaders. Inspiring Service. Creating Impact."
            </motion.p>
          </div>

          {/* ── Full-width realistic ribbon ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="absolute inset-x-0 z-20"
            style={{ top: '67%', height: 86 }}
          >
            {/* LEFT RIBBON HALF ───────────────────── */}
            <motion.div
              className="absolute top-0 bottom-0 left-0 overflow-hidden"
              style={{ right: 'calc(50% + 88px)' }}
              animate={cutting ? { x: '-105%', opacity: [1, 1, 0] } : { x: 0 }}
              transition={{ duration: 0.8, ease: [0.55, 0, 0.1, 1] }}
            >
              {/* Main gold body */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, #FFF0A0 0%, #FFE040 8%, #FFD700 22%, #FFA800 50%, #FFD700 78%, #FFE040 92%, #FFF0A0 100%)',
                }}
              />
              {/* Upper highlight streak */}
              <div
                className="absolute left-0 right-0"
                style={{ top: '8%', height: '18%', background: 'rgba(255,255,255,0.35)' }}
              />
              {/* Centre shadow crease */}
              <div
                className="absolute left-0 right-0"
                style={{ top: '44%', height: '12%', background: 'rgba(180,100,0,0.2)' }}
              />
              {/* Lower shadow */}
              <div
                className="absolute left-0 right-0 bottom-0"
                style={{ height: '20%', background: 'rgba(0,0,0,0.12)' }}
              />
              {/* Vertical stripe texture */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg,transparent 0,transparent 14px,rgba(255,255,255,0.5) 14px,rgba(255,255,255,0.5) 15px)',
                }}
              />
              {/* Frilled / chevron right edge */}
              <svg
                className="absolute right-0 top-0 h-full"
                style={{ width: 22 }}
                viewBox="0 0 22 86"
                preserveAspectRatio="none"
              >
                <path d="M0,0 L22,0 L8,43 L22,86 L0,86 Z" fill="rgba(0,0,0,0.18)" />
                <path d="M0,0 L20,0 L6,43 L20,86 L0,86 Z" fill="rgba(255,215,0,0.6)" />
              </svg>
            </motion.div>

            {/* RIGHT RIBBON HALF ──────────────────── */}
            <motion.div
              className="absolute top-0 bottom-0 right-0 overflow-hidden"
              style={{ left: 'calc(50% + 88px)' }}
              animate={cutting ? { x: '105%', opacity: [1, 1, 0] } : { x: 0 }}
              transition={{ duration: 0.8, ease: [0.55, 0, 0.1, 1] }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, #FFF0A0 0%, #FFE040 8%, #FFD700 22%, #FFA800 50%, #FFD700 78%, #FFE040 92%, #FFF0A0 100%)',
                }}
              />
              <div
                className="absolute left-0 right-0"
                style={{ top: '8%', height: '18%', background: 'rgba(255,255,255,0.35)' }}
              />
              <div
                className="absolute left-0 right-0"
                style={{ top: '44%', height: '12%', background: 'rgba(180,100,0,0.2)' }}
              />
              <div
                className="absolute left-0 right-0 bottom-0"
                style={{ height: '20%', background: 'rgba(0,0,0,0.12)' }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg,transparent 0,transparent 14px,rgba(255,255,255,0.5) 14px,rgba(255,255,255,0.5) 15px)',
                }}
              />
              {/* Frilled / chevron left edge */}
              <svg
                className="absolute left-0 top-0 h-full"
                style={{ width: 22 }}
                viewBox="0 0 22 86"
                preserveAspectRatio="none"
              >
                <path d="M22,0 L0,0 L14,43 L0,86 L22,86 Z" fill="rgba(0,0,0,0.18)" />
                <path d="M22,0 L2,0 L16,43 L2,86 L22,86 Z" fill="rgba(255,215,0,0.6)" />
              </svg>
            </motion.div>

            {/* CENTRE LAUNCH BUTTON ───────────────── */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
              <motion.button
                onClick={handleLaunch}
                disabled={cutting}
                whileHover={cutting ? {} : {
                  scale: 1.07,
                  boxShadow: '0 0 55px rgba(255,215,0,0.85), 0 14px 38px rgba(0,0,0,0.45)',
                }}
                whileTap={cutting ? {} : { scale: 0.93 }}
                animate={burst ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] } : {}}
                transition={
                  burst
                    ? { duration: 0.4, ease: 'easeIn' }
                    : { type: 'spring', stiffness: 280, damping: 18 }
                }
                className="flex items-center justify-center gap-2 h-14 px-8 rounded-full font-bold text-sm text-slate-900 disabled:cursor-default outline-none"
                style={{
                  background: 'linear-gradient(135deg,#FFF0A0 0%,#FFD700 40%,#FFA500 100%)',
                  boxShadow:
                    '0 0 32px rgba(255,215,0,0.65), 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
                  minWidth: 168,
                }}
              >
                {cutting ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    <span className="tracking-wide">Launching…</span>
                  </>
                ) : (
                  <>
                    <Scissors className="h-4 w-4" />
                    <span className="tracking-wide">Launch Website</span>
                  </>
                )}
              </motion.button>

              {/* Hint */}
              <motion.p
                animate={{ opacity: cutting ? 0 : 0.55 }}
                transition={{ duration: 0.3 }}
                className="text-slate-400 text-[11px] sm:text-xs whitespace-nowrap"
              >
                Click to officially inaugurate the Lions Club digital portal
              </motion.p>
            </div>
          </motion.div>

          {/* ── Bottom tagline ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1.2 }}
            className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1"
          >
            <div className="h-px w-28 bg-gradient-to-r from-transparent via-yellow-700/40 to-transparent mb-2" />
            <p className="text-slate-600 text-[10px] tracking-[0.28em] uppercase">
              Lions Clubs International · Region 1 · Zone 2
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
