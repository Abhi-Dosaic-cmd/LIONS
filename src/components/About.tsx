import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface NewsCard {
  id: string;
  image: string;
  badge: string;
  title: string;
  description: string;
}

const NEWS_CARDS: NewsCard[] = [
  {
    id: '1',
    image: '/n1.jpeg',
    badge: 'Kerala Kaumudi • Mar 2026',
    title: 'Palliative Care Patient-Family Meet at LEAD College',
    description:
      'The Lions Club of LEAD College, in association with Akathethara Family Health Centre and Akathethara Gram Panchayat, organised a Palliative Care patient-family gathering. Over 60 participants — including cancer patients, kidney patients, elderly individuals, and differently-abled persons — attended the event. The programme was inaugurated by Panchayat President Bindu Ramachandran.',
  },
  {
    id: '2',
    image: '/n2.jpeg',
    badge: 'Deepika • 08 Mar 2026',
    title: "Students Take Over Housekeeping Roles on Women's Day",
    description:
      "As part of Women's Day celebrations, LEAD College Lions Club students took over the full-day duties of the college's women housekeeping staff, allowing them a well-deserved day of rest. 18 student volunteers performed all cleaning and maintenance tasks from 6:30 AM onwards. Director Dr. Thomas George praised the initiative as a true demonstration of empathy and service.",
  },
  {
    id: '3',
    image: '/n3.jpeg',
    badge: 'Veekshanam • 08 Mar 2026',
    title: "LEAD College Students Set an Example on Women's Day",
    description:
      "Dhoni LEAD College Lions Club students conducted all housekeeping duties at the college campus on Women's Day, honouring the women workers with a full day off. The activity — reported across major Malayalam dailies — was lauded by Deputy Director Dr. Rajkishna as a model of selfless service. Lions Club President Swyenth highlighted the event as a proud moment for the institution.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-lions-navy-bg">
      {/* Background decoration elements */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-lions-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-lions-gold/5 blur-[120px] pointer-events-none" />

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
            About The Club
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            A Legacy of Service and Youth Leadership
          </motion.h2>
          <div className="w-16 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Introduction Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-slate-600 dark:text-slate-300 text-base leading-relaxed"
          >
            <p>
              The{' '}
              <strong className="text-lions-blue dark:text-lions-gold font-bold">
                Lions Club of LEAD College Autonomous, Dhoni
              </strong>{' '}
              is a dynamic student-led chapter affiliated with Lions Clubs International, the world's largest service club organization. Located in the picturesque landscape of Dhoni, Palakkad, we represent a passionate community of youth committed to making a difference.
            </p>
            <p>
              By combining academic excellence at LEAD College Autonomous with hands-on social responsibility, we cultivate leadership skills among students. Our projects focus on essential needs: from digital literacy campaigns to blood donation drives, environment conservation, and rural health clinics.
            </p>
            <p className="font-semibold text-slate-800 dark:text-white border-l-4 border-lions-blue dark:border-lions-gold pl-4 italic">
              "We believe that by serving our community, we discover our own potential. Through service, we lead; through leadership, we inspire."
            </p>
          </motion.div>

          {/* Graphics/Stats representation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/act6.jpeg"
                alt="Lions Club activity"
                className="w-full object-cover aspect-[4/3] rounded-2xl hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lions-blue/60 to-transparent pointer-events-none" />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-6 -left-6 glass-card border border-slate-200/50 p-6 rounded-2xl flex items-center space-x-4 max-w-xs shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-lions-gold text-slate-900 shrink-0 shadow-lg">
                <Award className="h-6 w-6 stroke-[2]" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Lions Clubs Int.
                </p>
                <p className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">
                  Lions International — Region 1 • Zone 2
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Latest News & Highlights */}
        <div className="mt-24">
          {/* Sub-section header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3.5 py-1 rounded-full bg-lions-blue/10 dark:bg-lions-gold/10 text-lions-blue dark:text-lions-gold text-xs font-bold uppercase tracking-wider mb-3"
            >
              What's New
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Latest News &amp; Highlights
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
              Stay updated with our recent achievements, community initiatives, and upcoming opportunities.
            </p>
            <div className="w-12 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
          </div>

          {/* News cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS_CARDS.map((card, idx) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="glass-card group flex flex-col overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-800/80 hover:border-lions-blue/30 dark:hover:border-lions-gold/30 hover:shadow-2xl transition-all duration-300"
              >
                {/* Card image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-lions-gold text-slate-950 shadow">
                    {card.badge}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-grow p-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-lions-blue dark:group-hover:text-lions-gold transition-colors duration-200">
                    {card.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
