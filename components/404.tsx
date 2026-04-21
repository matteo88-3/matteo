"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Home, Phone, Mail } from 'lucide-react'
import ContactModal from './contactModal'
import { useState } from 'react'

export default function NotFound() {
   const [isModalOpen, setIsContactOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
  
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Error Badge */}
          

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Page not found
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved or doesn't exist.
            </p>

            {/* Search Suggestion */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Looking for something?</h3>
              <p className="text-gray-600 mb-4">
                Try searching our services or browse our main sections:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/services" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Our Services
                </Link>
                <Link 
                  href="/#about" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  About Us
                </Link>
              
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#0b4a6f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0b4a6f]/90 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <button
                  onClick={() => { 
                    setIsContactOpen(true); 
                  }}
                className="inline-flex items-center justify-center gap-2 bg-amber-400 text-[#0b4a6f] px-6 py-3 rounded-lg font-medium hover:bg-amber-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Contact Support
              </button>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80"
                alt="404 Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#0b4a6f]/20 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Quick Help Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Still need help? Contact us directly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-2xl mx-auto">
        

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-amber-400/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">24/7 Support</p>
              <a href="mailto:support@matteorizz.com" className="text-[#0b4a6f] font-medium hover:underline">
                support@matteorizz.com
              </a>
            </div>

          
          </div>
        </div>
      </div> 
      <ContactModal 
              isOpen={isModalOpen} 
              onClose={() => setIsContactOpen(false)} 
            />
    </div>
  )
}