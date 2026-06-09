import { Mail, Phone, MapPin } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 dark:bg-black pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-lions-gold shadow-md overflow-hidden bg-white">
                <img src={getAssetUrl('/images/LOGO.png')} alt="Lions Club Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base text-white leading-tight tracking-wide">
                  LIONS CLUB
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-none tracking-tight">
                  LEAD COLLEGE AUTONOMOUS
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              We serve the community, build outstanding future leaders, and promote humanitarian values under the banner of Lions Clubs International.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-l-4 border-lions-gold pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="hover:text-lions-gold transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-lions-gold transition-colors duration-200"
                >
                  About the Club
                </a>
              </li>
              <li>
                <a
                  href="#vision-mission"
                  onClick={(e) => handleNavClick(e, '#vision-mission')}
                  className="hover:text-lions-gold transition-colors duration-200"
                >
                  Vision & Mission
                </a>
              </li>
              <li>
                <a
                  href="#board"
                  onClick={(e) => handleNavClick(e, '#board')}
                  className="hover:text-lions-gold transition-colors duration-200"
                >
                  Board of Directors
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  onClick={(e) => handleNavClick(e, '#activities')}
                  className="hover:text-lions-gold transition-colors duration-200"
                >
                  Activities & Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Core Areas */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-l-4 border-lions-gold pl-3">
              Core Pillars
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lions-gold" />
                <span>Leadership Development</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lions-gold" />
                <span>Youth Empowerment</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lions-gold" />
                <span>Community Humanitarian Service</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lions-gold" />
                <span>National Exposure & Networks</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lions-gold" />
                <span>Skill Enhancement Programs</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 border-l-4 border-lions-gold pl-3">
              Get in Touch
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-lions-gold shrink-0 mt-0.5" />
                <span>
                  LEAD College Autonomous, Dhoni,
                  Palakkad, Kerala, Pin - 678009
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-lions-gold shrink-0" />
                <a href="mailto:lions@lead.ac.in" className="hover:text-white transition-colors">
                  lions@lead.ac.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-lions-gold shrink-0" />
                <a href="tel:+916238984914" className="hover:text-white transition-colors">
                  +91 62389 84914
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex items-center justify-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Lions Club of LEAD College Autonomous, Dhoni. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
