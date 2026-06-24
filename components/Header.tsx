'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (section:any) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'themes', label: 'Themes' },
    { id: 'events', label: 'Events' },
    { id: 'collaborate', label: 'Work With Me' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled ? 'glass-nav bg-white/90 backdrop-blur-md shadow-lg' : 'glass-nav'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => navigate('home')}>
  <img src="/logomr.png" alt="Matteo Rizzi" className="w-100 h-100 rounded-full object-cover" />
 {/** <span className="font-bold text-2xl tracking-tighter text-secondary">
    MATTEO<span className="text-primary">RIZZI</span>
  </span>*/} 
</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center font-medium text-sm text-slate-600">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigate('contact')}
                className="bg-secondary text-white px-5 py-2.5 rounded-full hover:bg-primary transition-colors shadow-lg shadow-primary/20"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-secondary" />
              ) : (
                <Menu className="w-6 h-6 text-secondary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col pt-24 px-6 space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="text-left text-slate-600 hover:text-primary transition-colors text-lg font-medium py-2 border-b border-gray-100"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate('contact')}
              className="bg-secondary text-white px-5 py-3 rounded-full hover:bg-primary transition-colors shadow-lg shadow-primary/20 text-center font-medium"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}