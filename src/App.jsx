import React, { useState, useEffect } from 'react';
import { Menu, X, Star, Clock, MapPin, Phone, Mail, Check } from 'lucide-react';
import { createBooking, defaultSiteContent, getSiteContent } from './lib/cms';
import { GallerySection, ServicesSection, TeamSection, TestimonialsSection } from './components/sections';
import { useGallery } from './hooks/useGallery';
import { useHomepage } from './hooks/useHomepage';
import { useServices } from './hooks/useServices';
import { useTeam } from './hooks/useTeam';
import { useTestimonials } from './hooks/useTestimonials';
import { urlForImage } from './sanity/imageUrl';

export default function BarberShopWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Team', id: 'team' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const {
    services: sanityServices,
    loading: servicesLoading,
    error: servicesError,
  } = useServices();
  const { team: sanityTeam, loading: teamLoading, error: teamError } = useTeam();
  const { gallery: sanityGallery, loading: galleryLoading, error: galleryError } = useGallery();
  const {
    testimonials: sanityTestimonials,
    loading: testimonialsLoading,
    error: testimonialsError,
  } = useTestimonials();
  const { homepage, loading: homepageLoading } = useHomepage();

  const heroImage = siteContent.heroImage;
  const shopAddress = siteContent.shopAddress;
  const contactPhone = siteContent.phone;
  const contactEmail = siteContent.email;
  const contactHours = siteContent.hoursHtml;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddress)}`;
  const mapEmbedLink = `https://maps.google.com/maps?q=${encodeURIComponent(
    shopAddress
  )}&z=15&output=embed`;
  const galleryPhotos = siteContent.gallery;

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      const content = await getSiteContent();
      setSiteContent(content);
    })();
  }, []);

  const pricingPlans = siteContent.pricing ?? [];

  const heroBannerUrl =
    urlForImage(homepage?.bannerImage)?.width(1200).height(1400).quality(85).url() ?? heroImage;

  const fallbackServiceItems = (siteContent.services ?? []).map((s, i) => ({
    _key: `fallback-service-${i}`,
    name: s.title,
    price: '',
    description: s.desc,
    imageUrl: s.image,
    imageAlt: s.title,
  }));

  const fallbackTeamItems = (siteContent.team ?? []).map((m, i) => ({
    _key: `fallback-team-${i}`,
    name: m.name,
    role: `${m.specialty}${m.exp ? ` · ${m.exp}` : ''}`,
    imageUrl: m.image,
    imageAlt: m.name,
  }));

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();

    const message = `
🪒 New Booking Request:

👤 Name: ${bookingData.name}
📞 Phone: ${bookingData.phone}
✂️ Service: ${bookingData.service}
📅 Date: ${bookingData.date}
⏰ Time: ${bookingData.time}

💈 Booking Type: ${bookingData.service}
`;

    const phoneNumber = "15194512345";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    setBookingMessage(`Opening WhatsApp for ${bookingData.name}...`);
    setIsBookingOpen(false);
    setBookingData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: ""
    });
  };
  const openBookingWithService = (service) => {
    setBookingData({
      ...bookingData,
      service: service
    });
    setIsBookingOpen(true);
  };
  return (
    <div id="home" className="bg-black text-white min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-amber-400">BARBER HUTS</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm tracking-widest hover:text-amber-400 transition-colors bg-transparent border-none text-white cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-amber-400"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-amber-400/20">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="block text-sm tracking-widest hover:text-amber-400 bg-transparent border-none text-white cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-2">
              <p className="text-amber-400 text-sm tracking-[0.2em] font-light">EST - 2025 - LONDON</p>
              {homepage?.heroTitle ? (
                <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white whitespace-pre-line">
                  {homepage.heroTitle}
                </h1>
              ) : (
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  <span className="text-white">Precision</span>
                  <span className="text-white"> Cuts.</span>
                  <br />
                  <span className="text-amber-400 italic">Elite Service.</span>
                  <br />
                  <span className="text-white italic">Confidence</span>
                  <span className="text-white"> Redefined.</span>
                </h1>
              )}
              {homepageLoading && !homepage?.heroTitle && (
                <p className="text-gray-500 text-sm">Checking latest hero from CMS…</p>
              )}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md font-light">
              {homepage?.heroSubtitle ||
                'Experience premium grooming at Classy Barbershop with expert barbers, detailed fades, beard work, and a luxury atmosphere.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-amber-400 text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-amber-300 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full font-bold tracking-wide hover:bg-amber-400/10 transition-all"
              >
                View Services
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-amber-400/20">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Star size={20} className="fill-amber-400 text-amber-400" />
                  <span className="text-2xl font-bold">5.0</span>
                </div>
                <p className="text-gray-400 text-sm">Star Rating</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">594</p>
                <p className="text-gray-400 text-sm">Reviews</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">12+</p>
                <p className="text-gray-400 text-sm">Expert Barbers</p>
              </div>
            </div>
          </div>

          {/* Right - Image Placeholder */}
          <div className="relative h-96 md:h-full md:min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-black to-black rounded-3xl overflow-hidden">
              <img
                src={heroBannerUrl}
                alt={homepage?.bannerImage?.alt || 'Barbershop interior'}
                className="w-full h-full object-cover opacity-70"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection
        services={sanityServices}
        fallbackItems={fallbackServiceItems}
        loading={servicesLoading}
        error={servicesError}
      />

      <TeamSection
        members={sanityTeam}
        fallbackItems={fallbackTeamItems}
        loading={teamLoading}
        error={teamError}
      />

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <p className="text-amber-400 text-sm tracking-[0.2em]">PRICING</p>
            <h2 className="text-5xl md:text-6xl font-bold">Transparent Pricing</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border transition-all ${pkg.featured
                  ? 'border-amber-400 bg-amber-400/10 transform scale-105'
                  : 'border-amber-400/20 bg-amber-400/5 hover:border-amber-400/50'
                  }`}
              >
                {pkg.featured && <div className="text-amber-400 text-sm font-bold mb-4">MOST POPULAR</div>}
                <h3 className="text-2xl font-bold mb-2">{pkg.service}</h3>
                <div className="text-4xl font-bold text-amber-400 mb-6">{pkg.price}</div>
                <ul className="space-y-3">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300">
                      <Check size={18} className="text-amber-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openBookingWithService(pkg.service)}
                  className={`w-full mt-8 py-3 rounded-full font-bold transition-all ${pkg.featured
                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                    : 'border border-amber-400 text-amber-400 hover:bg-amber-400/10'
                    }`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection
        gallery={sanityGallery}
        fallbackUrls={galleryPhotos}
        loading={galleryLoading}
        error={galleryError}
      />

      <TestimonialsSection
        items={sanityTestimonials}
        fallbackItems={siteContent.testimonials ?? []}
        loading={testimonialsLoading}
        error={testimonialsError}
      />

      {/* FAQ Section */}
      <section className="relative py-24 bg-gradient-to-b from-amber-400/5 to-transparent">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-amber-400 text-sm tracking-[0.2em]">COMMON QUESTIONS</p>
            <h2 className="text-5xl md:text-6xl font-bold">FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'How do I book an appointment?', a: 'Click the "Book Appointment" button and fill in your details. You can also call us or visit our shop.' },
              { q: 'What are your operating hours?', a: 'Mon-Sat: 10AM - 7:30PM, Sun: 11AM - 5PM' },
              { q: 'Do you accept walk-ins?', a: 'Yes, we welcome walk-ins! However, appointments are recommended for shorter wait times.' },
              { q: 'What payment methods do you accept?', a: 'We accept cash, credit cards, and digital payments via Apple Pay and Google Pay.' },
              { q: 'Can I request a specific barber?', a: 'Absolutely! You can request your preferred barber when booking. Some barbers may have longer wait times.' },
            ].map((item, i) => (
              <details key={i} className="group border border-amber-400/20 rounded-lg overflow-hidden hover:border-amber-400/50 transition-all">
                <summary className="bg-amber-400/5 p-6 cursor-pointer flex justify-between items-center hover:bg-amber-400/10 transition-all">
                  <span className="font-bold text-lg">{item.q}</span>
                  <span className="text-amber-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="bg-black/50 p-6 text-gray-300">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-amber-400 text-sm tracking-[0.2em]">GET IN TOUCH</p>
                <h2 className="text-5xl md:text-6xl font-bold">Visit Us Today</h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-amber-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold mb-1">Address</p>
                    <p className="text-gray-400">{shopAddress}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-amber-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold mb-1">Phone</p>
                    <p className="text-gray-400">{contactPhone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-amber-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold mb-1">Email</p>
                    <p className="text-gray-400">{contactEmail}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="text-amber-400 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-bold mb-1">Hours</p>
                    <p
                      className="text-gray-400"
                      dangerouslySetInnerHTML={{ __html: contactHours }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-amber-400 text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-amber-300 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Book Appointment
              </button>
            </div>

            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-96 md:h-full md:min-h-96 flex items-center justify-center group"
              aria-label="Open shop location in Google Maps"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-black to-black rounded-3xl overflow-hidden flex items-center justify-center border border-amber-400/30 group-hover:border-amber-400/60 transition-colors">
                <iframe
                  title="BARBER HUTS location map"
                  src={mapEmbedLink}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white text-sm px-3 py-2 rounded-lg border border-amber-400/30 text-center">
                  Click map to open directions
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-amber-400/20 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold">Ready for Your Transformation?</h2>
          <p className="text-gray-300 text-lg">Book your appointment today and experience the Classy difference.</p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-amber-400 text-black px-12 py-4 rounded-full font-bold tracking-wide text-lg hover:bg-amber-300 transition-all hover:scale-105 inline-block"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-amber-400/30 rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold">Book Appointment</h3>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="w-full bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className="w-full bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="w-full bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Service</label>
                <select
                  required
                  value={bookingData.service}
                  onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                  className="w-full bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition-all"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="classic">Classic Haircut - $35</option>
                  <option value="premium">Premium Fade - $45</option>
                  <option value="deluxe">Deluxe Package - $75</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Date</label>
                <input
                  type="date"
                  required
                  min={today}
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Time</label>
                <input
                  type="time"
                  required
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full bg-amber-400/10 border border-amber-400/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 text-black py-3 rounded-lg font-bold hover:bg-amber-300 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}

      {bookingMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-black px-5 py-3 rounded-xl font-semibold shadow-xl max-w-sm">
          {bookingMessage}
        </div>
      )}

      {/* Footer */}
      <footer className="relative border-t border-amber-400/20 py-12 bg-black/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <p className="text-amber-400 font-bold mb-4 text-lg">BARBER HUTS</p>
              <p className="text-gray-400 text-sm">Premium Barbershop Est. 2025</p>
            </div>
            <div>
              <p className="font-bold mb-4">Quick Links</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button type="button" onClick={() => scrollToSection('home')} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-400 p-0 cursor-pointer">Home</button></li>
                <li><button type="button" onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-400 p-0 cursor-pointer">Services</button></li>
                <li><button type="button" onClick={() => scrollToSection('team')} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-400 p-0 cursor-pointer">Team</button></li>
                <li><button type="button" onClick={() => setIsBookingOpen(true)} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-400 p-0 cursor-pointer">Booking</button></li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-4">Hours</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>{contactHours.replace('<br/>', ' | ')}</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-4">Contact</p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Phone: {contactPhone}</li>
                <li>Email: {contactEmail}</li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-4">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">TikTok</a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-400/20 pt-8 text-center text-gray-500 text-sm space-y-2">
            <p>&copy; 2025 LONDON BARBER HUTS. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-xs">
              <button type="button" onClick={() => scrollToSection('home')} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-500 p-0 cursor-pointer">Privacy Policy</button>
              <button type="button" onClick={() => scrollToSection('home')} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-500 p-0 cursor-pointer">Terms of Service</button>
              <button type="button" onClick={() => scrollToSection('home')} className="hover:text-amber-400 transition-colors bg-transparent border-none text-gray-500 p-0 cursor-pointer">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
