"use client";

import React, { useState } from 'react';
import { 
  Mail, Linkedin, Send, User, Building, AtSign, FileText, HelpCircle,
  BookOpen, FileText as FileTextIcon, Video, Podcast as PodcastIcon, ArrowRight, 
  Play, Headphones, ExternalLink, Clock, Calendar, User as UserIcon
} from 'lucide-react';
import { usePodcasts, Podcast } from '@/lib/api/fetch.podcasts';

type InsightType = 'podcasts';

const MediaInsights: React.FC = () => {
  const { data, isLoading, isError, error } = usePodcasts();
  const [activeTab, setActiveTab] = useState<InsightType>('podcasts');
  const [isTabLoading, setIsTabLoading] = useState(false);

  // Get podcasts from API response
  const podcasts = data?.podcastsdata || [];
  
  // Filter insights based on active tab (only podcasts for now)
  const filteredInsights = podcasts;

  const getIcon = (type: InsightType) => {
    switch (type) {
      case 'podcasts': return PodcastIcon;
      default: return PodcastIcon;
    }
  };

  const getTabConfig = (type: InsightType) => {
    const icons = {
      podcasts: { icon: PodcastIcon, label: 'Podcasts', color: 'from-green-500 to-emerald-600' }
    };
    return icons[type];
  };

  const handleTabChange = (type: InsightType) => {
    setIsTabLoading(true);
    setActiveTab(type);
    setTimeout(() => setIsTabLoading(false), 300);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Get host name (podHost) or fallback
  const getHost = (podcast: Podcast) => {
    return podcast.podHost || 'Industry Expert';
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Podcasts</h3>
            <p className="text-gray-600 mb-4">
              {error?.message || 'There was an error loading the podcast data. Please try again later.'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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
            {(['podcasts'] as InsightType[]).map((type) => {
              const config = getTabConfig(type);
              const Icon = config.icon;
              const count = podcasts.length;
              
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
        {isTabLoading ? (
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
          <>
            {filteredInsights.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PodcastIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Podcasts Available</h3>
                <p className="text-gray-500">Check back soon for new episodes and insights.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInsights.map((podcast, index) => {
                  const Icon = PodcastIcon;
                  
                  return (
                    <div
                      key={podcast.podNo || podcast.podId}
                      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={podcast.podImage || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop'}
                          alt={podcast.podTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                        
                        {/* Type Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600">
                          <Icon className="w-3 h-3" />
                          Podcast
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Host & Date */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                          {getHost(podcast) && (
                            <>
                              <div className="flex items-center gap-1">
                                <UserIcon className="w-3 h-3" />
                                <span className="font-medium">{getHost(podcast)}</span>
                              </div>
                              <span>•</span>
                            </>
                          )}
                          {podcast.addeddate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(podcast.addeddate)}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {podcast.podTitle}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: podcast.podDescription }}/>
                        

                        <a
                          href={podcast.podLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/link"
                        >
                          <Play className="w-4 h-4" />
                          Listen Now
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

    
      </div>
    </section>
  );
};

export default MediaInsights;