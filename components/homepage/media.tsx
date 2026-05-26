"use client";

import React, { useState, useMemo } from 'react';
import { 
  Mail, Linkedin, Send, User, Building, AtSign, FileText, HelpCircle,
  BookOpen, FileText as FileTextIcon, Video, Podcast as PodcastIcon, ArrowRight, 
  Play, Headphones, ExternalLink, Clock, Calendar, User as UserIcon, Filter,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { usePodcasts, Podcast } from '@/lib/api/fetch.podcasts';

type InsightType = 'podcasts';

const PODCASTS_PER_PAGE = 6;

const MediaInsights: React.FC = () => {
  const { data, isLoading, isError, error } = usePodcasts();
  const [activeTab, setActiveTab] = useState<InsightType>('podcasts');
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const podcasts = data?.podcastsdata || [];

  const categories = useMemo(() => {
    const catMap = new Map<number, string>();
    podcasts.forEach(pod => {
      if (pod.podCat && !catMap.has(pod.podCat)) {
        catMap.set(pod.podCat, pod.category_name);
      }
    });
    return Array.from(catMap.entries()).map(([id, name]) => ({ id, name }));
  }, [podcasts]);

  const filteredPodcasts = useMemo(() => {
    if (selectedCategory === 'all') return podcasts;
    return podcasts.filter(pod => pod.podCat === selectedCategory);
  }, [podcasts, selectedCategory]);

  const totalPages = Math.ceil(filteredPodcasts.length / PODCASTS_PER_PAGE);

  const paginatedPodcasts = useMemo(() => {
    const start = (currentPage - 1) * PODCASTS_PER_PAGE;
    return filteredPodcasts.slice(start, start + PODCASTS_PER_PAGE);
  }, [filteredPodcasts, currentPage]);

  const handleFilterChange = (cat: number | 'all') => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleTabChange = (type: InsightType) => {
    setIsTabLoading(true);
    setActiveTab(type);
    setSelectedCategory('all');
    setCurrentPage(1);
    setTimeout(() => setIsTabLoading(false), 300);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getHost = (podcast: Podcast) => podcast.podHost || 'Industry Expert';

  const getTabConfig = (type: InsightType) => ({
    podcasts: { icon: PodcastIcon, label: 'Podcasts', color: 'from-green-500 to-emerald-600' },
  }[type]);

  /* ── Pagination Bar ── */
  const PaginationBar = () =>
    totalPages > 1 ? (
      <div className="flex flex-col items-center gap-3 mt-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200 ${
                currentPage === page
                  ? 'bg-primary text-white shadow-lg'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * PODCASTS_PER_PAGE + 1}–
          {Math.min(currentPage * PODCASTS_PER_PAGE, filteredPodcasts.length)} of {filteredPodcasts.length} podcasts
        </p>
      </div>
    ) : null;

  /* ── Loading skeleton ── */
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
            {[...Array(6)].map((_, i) => (
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

  /* ── Error state ── */
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
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 flex flex-wrap gap-1 justify-center">
            {(['podcasts'] as InsightType[]).map((type) => {
              const config = getTabConfig(type);
              const Icon = config.icon;
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
                  {config.label} ({podcasts.length})
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Bar */}
        {categories.length > 0 && (
          <div className="flex justify-center mb-10">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-md border border-white/30 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                All Categories ({podcasts.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.name} ({podcasts.filter(p => p.podCat === cat.id).length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid */}
        {isTabLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
        ) : filteredPodcasts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PodcastIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Podcasts in this Category</h3>
            <p className="text-gray-500">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPodcasts.map((podcast, index) => (
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
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600">
                      <PodcastIcon className="w-3 h-3" />
                      Podcast
                    </div>
                    {podcast.category_name && (
                      <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                        {podcast.category_name}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
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

                    <p
                      className="text-gray-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: podcast.podDescription }}
                    />

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
              ))}
            </div>

            {/* Pagination */}
            <PaginationBar />
          </>
        )}
      </div>
    </section>
  );
};

export default MediaInsights;