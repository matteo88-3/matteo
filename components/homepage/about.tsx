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
  Calendar,
} from "lucide-react";

const PROFILE = {
  name: "Matteo Rizzi",
  tagline: "Senior Partner · Author · Investor",
  location: "Lisbon, Portugal",
};

// ---------------------------------------------------------------------------
// EXPERIENCE — full career history, copied from LinkedIn.
// ---------------------------------------------------------------------------
type ExperienceItem = {
  title: string;
  company: string;
  duration: string;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Senior Partner - Africa & Middle East, Global Strategic Initiatives",
    company: "Global Finance & Technology Network · Contract",
    duration: "Jan 2025 - Present · 1 yr 9 mos",
  },
  {
    title: "Founder",
    company: "Timepledge.org",
    duration: "Dec 2014 - Present · 11 yrs 10 mos",
  },
  {
    title: "Co-Host & Executive Producer",
    company: "Breaking Banks Africa",
    duration: "Oct 2019 - Present · 7 yrs",
  },
  {
    title: "Founder & Startup Coach",
    company: "TimePledge · Full-time",
    duration: "Sep 2009 - Present · 17 yrs 1 mo",
  },
  {
    title: "Venture Partner",
    company: "NEVA Finventures",
    duration: "Jun 2018 - Jun 2024 · 6 yrs 1 mo",
  },
  {
    title: "Strategic Advisor",
    company: "Finnovating · Contract",
    duration: "Sep 2022 - Jan 2023 · 5 mos",
  },
  {
    title: "Venture Partner",
    company: "Bamboo Capital Partners · Contract",
    duration: "Jan 2021 - Jun 2022 · 1 yr 6 mos",
  },
  {
    title: "Venture Partner - SG Ventures",
    company: "Société Générale",
    duration: "May 2019 - Dec 2020 · 1 yr 8 mos",
  },
  {
    title: "Advisor",
    company: "Omidyar Network",
    duration: "Oct 2015 - Mar 2017 · 1 yr 6 mos",
  },
  {
    title: "General Partner",
    company: "SBT Venture Capital",
    duration: "Sep 2013 - Dec 2015 · 2 yrs 4 mos",
  },
  {
    title: "Co-founder Innotribe @ SWIFT",
    company: "SWIFT",
    duration: "Jun 2009 - Sep 2013 · 4 yrs 4 mos",
  },
  {
    title: "Head of Community Channels",
    company: "SWIFT",
    duration: "Jan 2001 - Jun 2009 · 8 yrs 6 mos",
  },
];

// ---------------------------------------------------------------------------
// BIOS — one entry per language.
// ---------------------------------------------------------------------------
type Bio = {
  code: string;
  language: string;
  flag: string;
  text: string;
};

const MEDIA_KIT_URL =
  "https://drive.google.com/file/d/1H9Q9vYCy9zMdjHaL-hIWt7cr8yPlHRoh/view";

const BIOS: Bio[] = [
  {
    code: "en",
    language: "English",
    flag: "🇬🇧",
    text: "Matteo Rizzi is an unconventional entrepreneur with two decades of experience in Financial Services, constantly referred amongst the top executives in the industry. He spent 13 years at SWIFT - where he co-founded Innotribe, the innovation arm of the cooperative, launching the first global startup challenge. Since 2013, he has had a FinTech Investor and/or Venture Partner role with global VCs and CVCs (20+ deals, 5 exits). In 2015, he co-founded FinTechStage (FTSGroup.eu). In 2019, Matteo founded Timepledge. In 2025, he founded the African Talent Academy. He is the author of \"The FinTech Revolution\" and \"Talents & Rebels\" and is fluent in 5 languages.",
  },
  {
    code: "it",
    language: "Italiano",
    flag: "🇮🇹",
    text: "Matteo Rizzi è un imprenditore non convenzionale con oltre vent'anni di esperienza nei Servizi Finanziari, costantemente considerato tra i top executive del settore. Ha trascorso 13 anni in SWIFT, dove ha co-fondato Innotribe. Dal 2013, ha ricoperto ruoli di investitore FinTech e/o venture partner con fondi VC e CVC a livello globale. Nel 2019, Matteo ha fondato Timepledge. Ha scritto e pubblicato due libri, \"The FinTech Revolution\" e \"Talents & Rebels\", e parla correntemente cinque lingue.",
  },
  {
    code: "pt",
    language: "Português",
    flag: "🇵🇹",
    text: "Matteo Rizzi é um empreendedor não convencional com mais de duas décadas de experiência no setor dos Serviços Financeiros. Passou 13 anos na SWIFT, onde cofundou a Innotribe. Em 2019, fundou a Timepledge. É autor de \"The FinTech Revolution\" e \"Talents & Rebels\", e fala fluentemente cinco línguas.",
  },
  {
    code: "es",
    language: "Español",
    flag: "🇪🇸",
    text: "Matteo Rizzi es un emprendedor poco convencional con más de dos décadas de experiencia en el sector de los Servicios Financieros. Pasó 13 años en SWIFT, donde cofundó Innotribe. En 2019, fundó Timepledge. Es autor de \"The FinTech Revolution\" y \"Talents & Rebels\".",
  },
  {
    code: "fr",
    language: "Français",
    flag: "🇫🇷",
    text: "Matteo Rizzi est un entrepreneur hors norme avec plus de vingt ans d'expérience dans les services financiers. Il a passé 13 ans chez SWIFT, où il a cofondé Innotribe. En 2019, il lance Timepledge. Il est l'auteur de \"The FinTech Revolution\" et de \"Talents & Rebels\".",
  },
  {
    code: "sv",
    language: "Svenska",
    flag: "🇸🇪",
    text: "Matteo Rizzi är en okonventionell entreprenör med över två decenniers erfarenhet inom finansiella tjänster. Han tillbringade 13 år på SWIFT, där han var med och grundade Innotribe. År 2019 grundade Matteo Timepledge. Han är författare till \"The FinTech Revolution\" och \"Talents & Rebels\".",
  },
];

// Generate image paths from 1.jpeg to 18.jpeg
const TOTAL_IMAGES = 18;
const imagePaths = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/images/${TOTAL_IMAGES - i}.jpeg`
);

// Number of experience cards shown in the right-hand grid (2 columns × 6 rows).
const NUM_EXPERIENCE_CARDS = 12;

export default function ProfileWithSlideshow() {
  // --- Image slideshow state ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // --- Bio slider state ---
  const [bioIndex, setBioIndex] = useState(0);

  // --- Right column height matching ---
  // Measure the left column's rendered height and apply it to the right
  // column, so the experience grid always stretches to fit exactly flush
  // with the bottom of the bio panel — no CSS stretch/flex guesswork.
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftColHeight, setLeftColHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;
    const updateHeight = () => setLeftColHeight(el.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + TOTAL_IMAGES) % TOTAL_IMAGES);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % TOTAL_IMAGES);
  const goToIndex = (idx: number) => setCurrentIndex(idx);
  const toggleAutoplay = () => setIsAutoPlaying((prev) => !prev);

  const bioPrev = () =>
    setBioIndex((prev) => (prev - 1 + BIOS.length) % BIOS.length);
  const bioNext = () => setBioIndex((prev) => (prev + 1) % BIOS.length);

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
  }, []);

  const activeBio = BIOS[bioIndex];
  const visibleExperience = EXPERIENCE.slice(0, NUM_EXPERIENCE_CARDS);

  return (
    <section id="about" className="min-h-screen bg-gray-50 py-12 px-6 lg:px-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Meet Matteo Rizzi
          </h1>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            20+ years shaping the future of FinTech.
          </p>
        </div>

        {/* ══════════════════════════════════════════
            TWO-COLUMN LAYOUT
            Left: carousel (top) + bio (bottom), stacked.
            Right: tapering experience grid.
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div ref={leftColRef} className="flex flex-col gap-5">
            {/* Panel 1: image carousel */}
            <div
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
                <img
                  src={imagePaths[currentIndex]}
                  alt={`Matteo Rizzi - image ${currentIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  <ImageIcon className="w-3 h-3 inline mr-1" />
                  {currentIndex + 1} / {TOTAL_IMAGES}
                </div>
              </div>

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

                <span className="text-xs text-gray-500 sm:hidden">
                  {currentIndex + 1}/{TOTAL_IMAGES}
                </span>
              </div>

              <div className="bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100">
                <div>
                  <h2 className="text-gray-900 font-bold text-lg leading-tight">
                    {PROFILE.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{PROFILE.tagline}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {PROFILE.location}
                </div>
              </div>
            </div>

            {/* Panel 2: bio slider */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 pt-4">
                <h3 className="text-gray-900 font-semibold text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Bio in {BIOS.length} languages
                </h3>
                <span className="text-xs text-gray-400">
                  {bioIndex + 1} / {BIOS.length}
                </span>
              </div>

              <div className="relative px-5 py-4 flex-1 flex flex-col">
                <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
                  {BIOS.map((bio, idx) => (
                    <button
                      key={bio.code}
                      onClick={() => setBioIndex(idx)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
                        idx === bioIndex
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-sm leading-none">{bio.flag}</span>
                      {bio.language}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex flex-col flex-1 overflow-y-auto">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {activeBio.text}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <a
                      href={MEDIA_KIT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:underline underline-offset-2 shrink-0"
                    >
                      Read full bio & media kit →
                    </a>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={bioPrev}
                        className="p-1.5 rounded-full hover:bg-gray-200 transition text-gray-600"
                        aria-label="Previous language"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={bioNext}
                        className="p-1.5 rounded-full hover:bg-gray-200 transition text-gray-600"
                        aria-label="Next language"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-1.5 mt-3">
                  {BIOS.map((bio, idx) => (
                    <button
                      key={bio.code}
                      onClick={() => setBioIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === bioIndex
                          ? "w-5 bg-primary"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to ${bio.language} bio`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN ---------------- */}
          <div
            className="flex flex-col"
            style={{ height: leftColHeight ? `${leftColHeight}px` : undefined }}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-gray-900 font-bold text-lg">Experience</h3>
              </div>
              {EXPERIENCE.length > visibleExperience.length && (
                <button className="text-xs font-semibold text-primary hover:underline underline-offset-2 shrink-0">
                  View all →
                </button>
              )}
            </div>

            {/* auto-rows-fr + flex-1 makes every card the same height and
                stretches the whole grid to fill the column, so the last
                row's bottom edge lines up with the bio panel's bottom. */}
            <div className="grid grid-cols-3 auto-rows-fr gap-3 flex-1">
              {visibleExperience.map((exp, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between overflow-hidden h-full"
                >
                  <p className="text-primary font-semibold text-sm leading-snug line-clamp-2">
                    {exp.title}
                  </p>
                  <p className="text-gray-900 font-bold text-xs leading-snug line-clamp-1">
                    {exp.company}
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3 shrink-0" />
                    {exp.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
