import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import boardData from '../data/board.json';

interface Member {
  id: string;
  name: string;
  designation: string;
  image: string;
  phone: string;
  phoneDisplay: string;
}

export default function Board() {
  const members: Member[] = boardData;

  return (
    <section id="board" className="py-24 bg-slate-50 dark:bg-lions-navy-bg relative overflow-hidden">
      {/* Decorative Spheres */}
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-lions-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-lions-gold/5 blur-[100px] pointer-events-none" />

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
            Leadership Circle
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Board of Directors
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            The visionary leaders driving community services and student-led initiatives at LEAD College.
          </p>
          <div className="w-16 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Board Members Grid — 3 cards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card flex flex-col justify-between overflow-hidden group border border-slate-200/50 dark:border-slate-800/80 hover:border-lions-blue/30 dark:hover:border-lions-gold/30 hover:shadow-2xl transition-all duration-300 rounded-3xl"
            >
              {/* Member Card Header & Profile Picture */}
              <div className="p-6 text-center flex flex-col items-center">
                {/* Circular image */}
                <div className="relative w-28 h-28 rounded-full p-1.5 bg-gradient-to-br from-lions-blue to-lions-gold/60 shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full bg-slate-200"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border border-white/20" />
                </div>

                {/* Name & Designation */}
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                  {member.name}
                </h3>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-lions-blue dark:text-lions-gold">
                  {member.designation}
                </span>
              </div>

              {/* Bottom contact bar */}
              <div className="px-6 py-4 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-center">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-lions-blue dark:hover:text-lions-gold transition-colors duration-200"
                  aria-label={`Call ${member.name}`}
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{member.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
