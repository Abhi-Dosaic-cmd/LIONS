import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, CalendarCheck } from 'lucide-react';

// ── Animated count-up counter ──────────────────────────────────────────────
function AnimatedCounter({ value, duration = 1500 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
          if (isNaN(numericValue)) { setCount(0); return; }

          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = progress * (2 - progress); // ease-out quad
            setCount(Math.floor(easeProgress * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(numericValue);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [value, duration]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={elementRef} className="font-extrabold text-4xl sm:text-5xl tabular-nums">
      {count}{suffix}
    </span>
  );
}

// ── Stats data (3 items) ───────────────────────────────────────────────────
const STATS = [
  { id: '1', label: 'Projects Completed', value: '55+',  icon: Award,         animated: true  },
  { id: '2', label: 'Active Members',     value: '150+', icon: Users,         animated: true  },
  { id: '3', label: 'Established',        value: '2022', icon: CalendarCheck, animated: false },
];

// ── Section component ──────────────────────────────────────────────────────
export default function StatsSection() {
  return (
    <div className="relative -mt-16 z-20 max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white dark:bg-lions-navy-dark rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-black/40">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-4 text-center"
            >
              {/* Icon badge */}
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-lions-blue/10 dark:bg-lions-gold/10 text-lions-blue dark:text-lions-gold mb-3.5">
                <Icon className="h-6 w-6" />
              </div>

              {/* Value */}
              <div className="text-lions-blue dark:text-white">
                {stat.animated ? (
                  <AnimatedCounter value={stat.value} />
                ) : (
                  <span className="font-extrabold text-4xl sm:text-5xl tabular-nums">
                    {stat.value}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
