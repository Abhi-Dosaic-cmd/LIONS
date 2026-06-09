import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../utils/assets';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Vision & Mission', href: '#vision-mission' },
  { label: 'Board', href: '#board' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check if navbar should have background styling
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const scrollPosition = window.scrollY + 100;
      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href.substring(1));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-lg shadow-slate-900/5 dark:shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lions-blue via-lions-gold to-lions-blue-light transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            {/* Logo Badge */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-lions-gold shadow-md overflow-hidden bg-white">
              <img src={getAssetUrl('/images/LOGO.png')} alt="Lions Club Logo" className="w-full h-full object-contain" />
              <div className="absolute inset-0 rounded-full border border-lions-gold/30 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base text-lions-blue dark:text-white leading-tight tracking-wide group-hover:text-lions-blue-light dark:group-hover:text-lions-gold transition-colors duration-300">
                LIONS CLUB
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none tracking-tight">
                LEAD COLLEGE AUTONOMOUS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-lions-blue dark:text-lions-gold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-lions-blue dark:hover:text-lions-gold hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lions-blue dark:bg-lions-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <div className="pl-4 border-l border-slate-200 dark:border-slate-800 ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-slate-200/50 dark:border-slate-800/50 bg-white/95 dark:bg-lions-navy-bg/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-lions-blue/10 dark:bg-lions-gold/10 text-lions-blue dark:text-lions-gold border-l-4 border-lions-blue dark:border-lions-gold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
