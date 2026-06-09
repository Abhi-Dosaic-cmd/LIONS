import { motion } from 'framer-motion';
import { Eye, Target, Sparkles, Heart } from 'lucide-react';

export default function VisionMission() {
  return (
    <section id="vision-mission" className="py-24 bg-slate-100 dark:bg-lions-navy-bg/50 relative overflow-hidden">
      {/* Decorative Spheres */}
      <div className="absolute top-1/2 left-1/10 w-96 h-96 rounded-full bg-lions-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/10 w-80 h-80 rounded-full bg-lions-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3.5 py-1 rounded-full bg-lions-blue/10 dark:bg-lions-gold/10 text-lions-blue dark:text-lions-gold text-xs font-bold uppercase tracking-wider mb-3"
          >
            Aspiration & Strategy
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Our Vision & Mission
          </h2>
          <div className="w-16 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 hover:border-lions-blue/30 dark:hover:border-lions-gold/30 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top golden indicator line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lions-blue to-lions-blue-light" />

            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Icon Container */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-lions-blue/10 dark:bg-lions-blue/20 text-lions-blue dark:text-lions-blue-light mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-7 w-7 stroke-[2]" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span>Our Vision</span>
                  <Sparkles className="h-4 w-4 ml-2 text-lions-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                  "To empower young leaders through service, compassion, and innovation, creating a lasting positive impact in society."
                </p>
              </div>

              {/* Decorative background logo */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <span>Lions International</span>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 hover:border-lions-gold/30 dark:hover:border-lions-gold/30 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top golden indicator line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lions-gold to-amber-500" />

            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Icon Container */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-lions-gold/10 dark:bg-lions-gold/20 text-lions-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-7 w-7 stroke-[2]" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <span>Our Mission</span>
                  <Heart className="h-4 w-4 ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                  "To foster leadership, community engagement, and humanitarian service by organizing impactful initiatives and nurturing socially responsible individuals."
                </p>
              </div>

              {/* Decorative background logo */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <span>LEAD Dhoni Chapter</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
