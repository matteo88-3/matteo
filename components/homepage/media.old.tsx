"use client";

import React, { useState } from 'react';
import { 
  Mail, Linkedin, Send, User, Building, AtSign, FileText, HelpCircle,
  BookOpen, FileText as FileTextIcon, Video, Podcast, ArrowRight, 
  Play, Headphones, ExternalLink, Clock 
} from 'lucide-react';

// Types for Media & Insights
type InsightType = 'books' | 'articles' | 'videos' | 'podcasts';
type InsightItem = {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  image?: string;
  link: string;
  date?: string;
  duration?: string;
  author?: string;
};

// Sample data for Media & Insights
const INSIGHTS_DATA: InsightItem[] = [
  // Books
  {
    id: 'book-1',
    title: 'The Future of Fintech: Innovation at Scale',
    description: 'Exploring how blockchain, AI, and digital banking are reshaping the financial landscape globally.',
    type: 'books',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop',
    link: '#',
    author: 'Matteo Rizzi',
    date: '2024'
  },
  {
    id: 'book-2',
    title: 'Embedded Finance: The Next Frontier',
    description: 'How financial services are being integrated into everyday platforms and experiences.',
    type: 'books',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop',
    link: '#',
    author: 'Matteo Rizzi',
    date: '2023'
  },
  // Articles
  {
    id: 'article-1',
    title: 'Why Open Banking is Just the Beginning',
    description: 'The evolution from open banking to open finance and the implications for traditional institutions.',
    type: 'articles',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    link: '#',
    date: '2024-03-15',
    author: 'Forbes'
  },
  {
    id: 'article-2',
    title: 'The Rise of AI in Risk Management',
    description: 'How machine learning is transforming fraud detection and credit scoring.',
    type: 'articles',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    link: '#',
    date: '2024-02-10',
    author: 'TechCrunch'
  },
  // Videos
  {
    id: 'video-1',
    title: 'Keynote: The Future of Digital Banking',
    description: 'Matteo speaks at Money20/20 about embedded finance and customer-centric innovation.',
    type: 'videos',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    link: '#',
    duration: '45:22',
    date: '2024-01-20'
  },
  {
    id: 'video-2',
    title: 'Panel Discussion: Regulating Crypto',
    description: 'Experts debate the future of cryptocurrency regulation and its impact on innovation.',
    type: 'videos',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    link: '#',
    duration: '1:12:45',
    date: '2023-11-05'
  },
  // Podcasts
  {
    id: 'podcast-1',
    title: 'Breaking Banks Europe: The Open Banking Revolution',
    description: 'Matteo joins host to discuss the current state and future of open banking across Europe.',
    type: 'podcasts',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop',
    link: '#',
    duration: '52:00',
    date: '2024-02-28'
  },
  {
    id: 'podcast-2',
    title: 'Interview with Leading Regulator on Digital Assets',
    description: 'A deep dive into the regulatory landscape for cryptocurrencies and stablecoins.',
    type: 'podcasts',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
    link: '#',
    duration: '48:30',
    date: '2024-01-12'
  }
];

const MediaInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InsightType>('books');
  const [isLoading, setIsLoading] = useState(false);

  const filteredInsights = INSIGHTS_DATA.filter(item => item.type === activeTab);

  const getIcon = (type: InsightType) => {
    switch (type) {
      case 'books': return BookOpen;
      case 'articles': return FileTextIcon;
      case 'videos': return Video;
      case 'podcasts': return Podcast;
      default: return BookOpen;
    }
  };

  const getTabConfig = (type: InsightType) => {
    const icons = {
      books: { icon: BookOpen, label: 'Books', color: 'from-blue-500 to-cyan-600' },
      articles: { icon: FileTextIcon, label: 'Articles', color: 'from-purple-500 to-pink-600' },
      videos: { icon: Video, label: 'Videos', color: 'from-red-500 to-orange-600' },
      podcasts: { icon: Podcast, label: 'Podcasts', color: 'from-green-500 to-emerald-600' }
    };
    return icons[type];
  };

  const handleTabChange = (type: InsightType) => {
    setIsLoading(true);
    setActiveTab(type);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Knowledge Hub</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4">
            Media & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Thought leadership, interviews, and expert analysis on fintech, innovation, and the future of finance.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 flex flex-wrap gap-1 justify-center">
            {(['books', 'articles', 'videos', 'podcasts'] as InsightType[]).map((type) => {
              const config = getTabConfig(type);
              const Icon = config.icon;
              const count = INSIGHTS_DATA.filter(i => i.type === type).length;
              
              return (
                <button
                  key={type}
                  onClick={() => handleTabChange(type)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === type
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Insights Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-56 bg-gradient-to-r from-gray-300 to-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </div>
                  <div className="h-10 bg-gray-300 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((item, index) => {
              const Icon = getIcon(item.type);
              
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                    
                    {/* Type Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-lg bg-gradient-to-r ${
                      item.type === 'books' ? 'from-blue-500 to-cyan-600' :
                      item.type === 'articles' ? 'from-purple-500 to-pink-600' :
                      item.type === 'videos' ? 'from-red-500 to-orange-600' :
                      'from-green-500 to-emerald-600'
                    }`}>
                      <Icon className="w-3 h-3" />
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </div>

                    {/* Duration Badge for Videos/Podcasts */}
                    {item.duration && (
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1">
                        {item.type === 'videos' ? (
                          <Play className="w-3 h-3 text-white" />
                        ) : (
                          <Headphones className="w-3 h-3 text-white" />
                        )}
                        <span className="text-white text-xs font-medium">{item.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Author/Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      {item.author && (
                        <>
                          <span className="font-medium">{item.author}</span>
                          <span>•</span>
                        </>
                      )}
                      {item.date && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{typeof item.date === 'string' && item.date.length > 10 ? 
                            new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 
                            item.date}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <a
                      href={item.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      {item.type === 'videos' ? 'Watch Now' : 
                       item.type === 'podcasts' ? 'Listen Now' : 
                       item.type === 'books' ? 'Learn More' : 'Read Article'}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            View All Insights
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Featured Podcast Section (Breaking Banks Europe) */}
        {activeTab === 'podcasts' && (
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-indigo-500/10 rounded-3xl p-8 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full mb-4">
                  <Headphones className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Featured Series</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Breaking Banks Europe
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  The #1 fintech podcast in Europe. Matteo Rizzi hosts conversations with founders, 
                  regulators, and investors shaping the future of financial services.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Subscribe Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Podcast className="w-8 h-8 text-primary" />
                </div>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaInsights;