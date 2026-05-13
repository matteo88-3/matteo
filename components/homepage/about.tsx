"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Globe,
  BookOpen,
  Mic2,
  Briefcase,
  MapPin,
} from "lucide-react";

const PROFILE = {
  name: "Matteo Rizzi",
  tagline: "Senior Partner · Author · Investor",
  bio: "Matteo is an unconventional entrepreneur, author, and seasoned executive with 20+ years in FinTech. With deep connections across global banks, startups, and investors, he bridges the gap between traditional banking and disruptive technologies.",
  roles: [
    { icon: Briefcase, label: "Senior Partner, GFTN" },
    { icon: Globe, label: "Founder, Timepledge.org" },
    { icon: BookOpen, label: 'Author — "The FinTech Revolution" & "Talents & Rebels"' },
    { icon: Mic2, label: "Executive Producer, Breaking Banks Europe" },
  ],
  location: "Lisbon, Portugal",
};

// Generate image paths from 1.jpeg to 14.jpeg
const TOTAL_IMAGES = 9;
const imagePaths = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/images/${i + 1}.jpeg`
);

export default function ProfileWithSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Clear and reset autoplay timer
  const resetAutoplay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TOTAL_IMAGES);
      }, 4000);
    }
  }, [isAutoPlaying, isHovering]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [resetAutoplay]);

  // Navigate manually
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_IMAGES) % TOTAL_IMAGES);
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_IMAGES);
  };
  const goToIndex = (idx: number) => {
    setCurrentIndex(idx);
  };
  const toggleAutoplay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === " ") {
        e.preventDefault();
        toggleAutoplay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <section id="about" className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Meet Matteo Rizzi
          </h1>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            20+ years shaping the future of FinTech — browse his photo journey.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* SLIDESHOW COLUMN */}
          <div className="flex-1 w-full">
            <div
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Main image */}
              <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                <img
                  src={imagePaths[currentIndex]}
                  alt={`Matteo Rizzi - image ${currentIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  loading="lazy"
                />
                {/* Subtle image counter overlay (top-right) */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  <ImageIcon className="w-3 h-3 inline mr-1" />
                  {currentIndex + 1} / {TOTAL_IMAGES}
                </div>
              </div>

              {/* Slideshow controls (always visible below image) */}
              <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <button
                    onClick={goPrev}
                    className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleAutoplay}
                    className={`ml-1 p-2 rounded-full transition ${
                      isAutoPlaying
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-1.5 overflow-x-auto max-w-[200px] py-1">
                  {imagePaths.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Counter text for small screens */}
                <span className="text-xs text-gray-500 sm:hidden">
                  {currentIndex + 1}/{TOTAL_IMAGES}
                </span>
              </div>
            </div>

            {/* Below slideshow: name + location (same as original) */}
            <div className="mt-4 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-gray-900 font-bold text-xl">{PROFILE.name}</h2>
                <p className="text-gray-500 text-sm">{PROFILE.tagline}</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                {PROFILE.location}
              </div>
            </div>
          </div>

          {/* SIDEBAR (unchanged) */}
          <div className="w-full xl:w-80 flex flex-col gap-4 xl:sticky xl:top-8">
            {/* Profile card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0 select-none">
                  MR
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base leading-tight">
                    {PROFILE.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{PROFILE.tagline}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{PROFILE.bio}</p>
            </div>

            {/* Current roles */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 font-semibold text-sm mb-3 pb-2 border-b border-gray-100">
                Current Roles
              </h3>
              <ul className="space-y-3">
                {PROFILE.roles.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-gray-700 text-sm leading-snug">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}