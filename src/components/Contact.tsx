import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, Clock, MessageCircle } from 'lucide-react';

const WA_NUMBER = '916238984914';
const CONTACT_EMAIL = 'lions@lead.ac.in';
const CONTACT_PHONE = '+91 62389 84914';
const CONTACT_PHONE_TEL = '+916238984914';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: ContactFormErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = 'Email address is required';
    else if (!emailRegex.test(formData.email.trim())) tempErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) tempErrors.message = 'Message must be at least 10 characters';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const text =
      `Hello Lions Club of LEAD College Autonomous,%0A%0A` +
      `Name: ${encodeURIComponent(formData.name)}%0A` +
      `Email: ${encodeURIComponent(formData.email)}%0A` +
      `Subject: ${encodeURIComponent(formData.subject)}%0A%0A` +
      `Message:%0A${encodeURIComponent(formData.message)}%0A%0A` +
      `I would like to get in touch regarding the above enquiry.`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-lions-navy-bg relative overflow-hidden">
      {/* Decorative Spheres */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-lions-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-lions-gold/5 blur-[120px] pointer-events-none" />

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
            Connect With Us
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Contact Our Team
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Have questions about operations, partnerships, or joining the club? Send us a message below.
          </p>
          <div className="w-16 h-1 bg-lions-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto mb-16">
          {/* Info Column (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
              Contact Information
            </h3>

            {/* Address */}
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-lions-blue dark:text-lions-gold shrink-0 shadow-sm">
                <MapPin className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-805 dark:text-white text-base">
                  College Location
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  LEAD College Autonomous, Dhoni, Palakkad, Kerala, Pin - 678009
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-lions-blue dark:text-lions-gold shrink-0 shadow-sm">
                <Mail className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-805 dark:text-white text-base">
                  Official Email
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-lions-blue dark:hover:text-lions-gold transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-lions-blue dark:text-lions-gold shrink-0 shadow-sm">
                <Phone className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-805 dark:text-white text-base">
                  Phone Support
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:text-lions-blue dark:hover:text-lions-gold transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-lions-blue dark:text-lions-gold shrink-0 shadow-sm">
                <Clock className="h-5 w-5 stroke-[2]" />
              </div>
              <div>
                <h4 className="font-bold text-slate-805 dark:text-white text-base">
                  Operating Hours
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Monday - Friday: 9:00 AM - 5:00 PM <br />
                  Saturday: 9:00 AM - 1:00 PM (Projects Day)
                </p>
              </div>
            </div>
          </div>

          {/* Form Column (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl border border-slate-200/50 dark:border-slate-800 p-6 sm:p-10 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Write to Us
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Fill in your details and we'll open WhatsApp with your message pre-filled.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/50 border outline-none transition-all dark:bg-slate-900/40 dark:text-white ${
                            errors.name
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-slate-200 focus:border-lions-blue dark:border-slate-800 dark:focus:border-lions-gold'
                          }`}
                          placeholder="Jane Doe"
                        />
                        {errors.name && (
                          <span className="text-xs font-semibold text-red-500 mt-1 block">{errors.name}</span>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/50 border outline-none transition-all dark:bg-slate-900/40 dark:text-white ${
                            errors.email
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-slate-200 focus:border-lions-blue dark:border-slate-800 dark:focus:border-lions-gold'
                          }`}
                          placeholder="janedoe@email.com"
                        />
                        {errors.email && (
                          <span className="text-xs font-semibold text-red-500 mt-1 block">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/50 border outline-none transition-all dark:bg-slate-900/40 dark:text-white ${
                          errors.subject
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-200 focus:border-lions-blue dark:border-slate-800 dark:focus:border-lions-gold'
                        }`}
                        placeholder="e.g. Partnership Opportunity"
                      />
                      {errors.subject && (
                        <span className="text-xs font-semibold text-red-500 mt-1 block">{errors.subject}</span>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50/50 border outline-none transition-all dark:bg-slate-900/40 dark:text-white resize-none ${
                          errors.message
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-slate-200 focus:border-lions-blue dark:border-slate-800 dark:focus:border-lions-gold'
                        }`}
                        placeholder="Write your message here..."
                      />
                      {errors.message && (
                        <span className="text-xs font-semibold text-red-500 mt-1 block">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit → WhatsApp Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center justify-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/10">
                      <CheckCircle className="h-9 w-9 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Opening WhatsApp…
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                        Hi{' '}
                        <strong className="text-slate-900 dark:text-white font-semibold">
                          {formData.name}
                        </strong>
                        ! WhatsApp should have opened with your message pre-filled. If it didn't,{' '}
                        <a
                          href={`https://wa.me/${WA_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#25D366] underline underline-offset-2"
                        >
                          tap here to open it manually
                        </a>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Map Embed Card */}
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/5 dark:shadow-none border border-slate-200/50 dark:border-slate-800 h-96 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.167232233804!2d76.6436663148009!3d10.798485292306894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86deda5bdfdb9%3A0xe7e871783cfd5d02!2sLEAD%20College%2520of%2520Management%252C%2520Dhoni!5e0!3m2!1sen!2sin!4v1623098765432!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
            allowFullScreen={false}
            loading="lazy"
            title="LEAD College Autonomous Dhoni Map Location"
          />
        </div>
      </div>
    </section>
  );
}
