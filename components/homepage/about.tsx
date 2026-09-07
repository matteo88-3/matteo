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
  Building2,
} from "lucide-react";

const PROFILE = {
  name: "Matteo Rizzi",
  tagline: "Senior Partner · Author · Investor",
  location: "Lisbon, Portugal",
};

// ---------------------------------------------------------------------------
// EXPERIENCE — full career history, copied from LinkedIn.
// `logo` is left blank on purpose — drop a company logo path in there
// (e.g. "/logos/gftn.png") and the card will use it automatically; until
// then it falls back to a placeholder tile.
// ---------------------------------------------------------------------------
type ExperienceItem = {
  title: string;
  company: string;
  duration: string;
  location?: string;
  description?: string;
  logo?: string;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    title:
      "Senior Partner - Africa & Middle East, Global Strategic Initiatives",
    company: "Global Finance & Technology Network · Contract",
    duration: "Jan 2025 - Present · 1 yr 9 mos",
    location: "Remote",
    logo: "/logos/gftn.png",
  },
  {
    title: "Founder",
    company: "Timepledge.org",
    duration: "Dec 2014 - Present · 11 yrs 10 mos",
    location: "London Area, United Kingdom",
    description:
      "Our mission: build innovation ecosystems, engaging incumbents, entrepreneurs and investors to boost FinTech innovation globally (via FTSgroup.eu).",
    logo: "/logos/timepledge.png",
  },
  {
    title: "Co-Host & Executive Producer",
    company: "Breaking Banks Africa",
    duration: "Oct 2019 - Present · 7 yrs",
    description:
      "Breaking Banks is the #1 radio show and podcast, with almost 7M audience across 117 countries. Breaking Banks Africa is the African edition dedicated to the continent's innovation scene.",
    logo: "/logos/breaking-banks-africa.png",
  },
  {
    title: "Founder & Startup Coach",
    company: "TimePledge · Full-time",
    duration: "Sep 2009 - Present · 17 yrs 1 mo",
    location: "Worldwide, in 5 languages · Hybrid",
    description:
      "Startup coach and advisor — and occasionally angel investor — connecting founders with partners and ecosystems. Trusted by large Financial Services players in their collaboration journey with entrepreneurs and innovators.",
    logo: "/logos/timepledge.png",
  },
  {
    title: "Venture Partner",
    company: "NEVA Finventures",
    duration: "Jun 2018 - Jun 2024 · 6 yrs 1 mo",
    description:
      "Intesa Sanpaolo's corporate venture capital arm. Strategic advisory and Venture Partner role.",
    logo: "",
  },
  {
    title: "Strategic Advisor",
    company: "Finnovating · Contract",
    duration: "Sep 2022 - Jan 2023 · 5 mos",
    location: "World",
    logo: "/logos/finnovating.png",
  },
  {
    title: "Venture Partner",
    company: "Bamboo Capital Partners · Contract",
    duration: "Jan 2021 - Jun 2022 · 1 yr 6 mos",
    description:
      "Impact VC / Tech-for-Good fund investing mainly in post-seed and Series A, focused on the African market, in collaboration with SMART Africa.",
    logo: "/logos/bamboo-capital-partners.png",
  },
  {
    title: "Venture Partner - SG Ventures",
    company: "Société Générale",
    duration: "May 2019 - Dec 2020 · 1 yr 8 mos",
    description: "Venture arm of Société Générale, a strategic investment vehicle.",
    logo: "",
  },
  {
    title: "Advisor",
    company: "Omidyar Network",
    duration: "Oct 2015 - Mar 2017 · 1 yr 6 mos",
    location: "Redwood City",
    description:
      "Focused on financial inclusion — helping people in emerging markets, and underserved paycheck-to-paycheck families in the U.S., save, send and access credit and insurance safely through mobile and digital finance innovation.",
    logo: "/logos/omidyar-network.png",
  },
  {
    title: "General Partner",
    company: "SBT Venture Capital",
    duration: "Sep 2013 - Dec 2015 · 2 yrs 4 mos",
    location: "Brussels Metropolitan Area",
    description:
      "Management company of a $100M FinTech fund focused on Series A investments — the venture arm of Sberbank.",
    logo: "",
  },
  {
    title: "Co-founder Innotribe @ SWIFT",
    company: "SWIFT",
    duration: "Jun 2009 - Sep 2013 · 4 yrs 4 mos",
    location: "Brussels Metropolitan Area",
    description:
      "Co-founded Innotribe, SWIFT's infrastructure for collaborative innovation in the financial industry — building the skills, tools, processes, metrics and network needed to transform SWIFT into an agile, future-ready organization.",
    logo: "/logos/swift.png",
  },
  {
    title: "Head of Community Channels - www.swiftcommunity.net",
    company: "SWIFT",
    duration: "Jan 2001 - Jun 2009 · 8 yrs 6 mos",
    description:
      "Created and led swiftcommunity.net, SWIFT's global financial network — moving from Sales to Corporate Communications to run the initiative.",
    logo: "/logos/swift.png",
  },
  {
    title: "Co-founder",
    company: "www.italiansonline.net",
    duration: "Feb 2003 - Jun 2009 · 6 yrs 5 mos",
    description:
      "A community portal for Italians living abroad — grew to 100,000+ members across 80 countries within its first eight months.",
    logo: "",
  },
];

// ---------------------------------------------------------------------------
// BIOS — one entry per language.
// ---------------------------------------------------------------------------
type Bio = {
  code: string;
  language: string;
  flagCode?: string; // ISO 3166-1 alpha-2 country code, lowercase — renders a real flag image. Omit for a globe icon (used for English/international).
  text: string;
};

const MEDIA_KIT_URL =
  "https://drive.google.com/file/d/1H9Q9vYCy9zMdjHaL-hIWt7cr8yPlHRoh/view";

const BIOS: Bio[] = [
  {
    code: "en",
    language: "English",
    flagCode: undefined,
    text: "Matteo Rizzi is an unconventional entrepreneur with two decades of experience in Financial Services, constantly referred amongst the top executives in the industry. He spent 13 years at SWIFT - where he co-founded Innotribe, the innovation arm of the cooperative, launching the first global startup challenge. Since 2013, he has had a FinTech Investor and/or Venture Partner role with global VCs and CVCs (20+ deals, 5 exits). In 2015, he co-founded FinTechStage (FTSGroup.eu). In 2019, Matteo founded Timepledge. In 2025, he founded the African Talent Academy. He is the author of \"The FinTech Revolution\" and \"Talents & Rebels\" and is fluent in 5 languages.",
  },
  {
    code: "it",
    language: "Italiano",
    flagCode: "it",
    text: "Matteo Rizzi è un imprenditore non convenzionale con oltre vent'anni di esperienza nei Servizi Finanziari, costantemente considerato tra i top executive del settore. Ha trascorso 13 anni in SWIFT, dove ha co-fondato Innotribe. Dal 2013, ha ricoperto ruoli di investitore FinTech e/o venture partner con fondi VC e CVC a livello globale. Nel 2019, Matteo ha fondato Timepledge. Ha scritto e pubblicato due libri, \"The FinTech Revolution\" e \"Talents & Rebels\", e parla correntemente cinque lingue.",
  },
  {
    code: "pt",
    language: "Português",
    flagCode: "pt",
    text: "Matteo Rizzi é um empreendedor não convencional com mais de duas décadas de experiência no setor dos Serviços Financeiros. Passou 13 anos na SWIFT, onde cofundou a Innotribe. Em 2019, fundou a Timepledge. É autor de \"The FinTech Revolution\" e \"Talents & Rebels\", e fala fluentemente cinco línguas.",
  },
  {
    code: "es",
    language: "Español",
    flagCode: "es",
    text: "Matteo Rizzi es un emprendedor poco convencional con más de dos décadas de experiencia en el sector de los Servicios Financieros. Pasó 13 años en SWIFT, donde cofundó Innotribe. En 2019, fundó Timepledge. Es autor de \"The FinTech Revolution\" y \"Talents & Rebels\".",
  },
  {
    code: "fr",
    language: "Français",
    flagCode: "fr",
    text: "Matteo Rizzi est un entrepreneur hors norme avec plus de vingt ans d'expérience dans les services financiers. Il a passé 13 ans chez SWIFT, où il a cofondé Innotribe. En 2019, il lance Timepledge. Il est l'auteur de \"The FinTech Revolution\" et de \"Talents & Rebels\".",
  },
  {
    code: "sv",
    language: "Svenska",
    flagCode: "se",
    text: "Matteo Rizzi är en okonventionell entreprenör med över två decenniers erfarenhet inom finansiella tjänster. Han tillbringade 13 år på SWIFT, där han var med och grundade Innotribe. År 2019 grundade Matteo Timepledge. Han är författare till \"The FinTech Revolution\" och \"Talents & Rebels\".",
  },
];

// Generate image paths from 1.jpeg to 18.jpeg
const TOTAL_IMAGES = 18;
const imagePaths = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/images/${TOTAL_IMAGES - i}.jpeg`
);

const EXPERIENCE_PER_PAGE = 6;

export default function ProfileWithSlideshow() {
  // --- Image slideshow state ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // --- Bio slider state ---
  const [bioIndex, setBioIndex] = useState(0);

  // --- Experience pagination state ---
  const [expPage, setExpPage] = useState(0);
  const expTotalPages = Math.ceil(EXPERIENCE.length / EXPERIENCE_PER_PAGE);
  const pagedExperience = EXPERIENCE.slice(
    expPage * EXPERIENCE_PER_PAGE,
    expPage * EXPERIENCE_PER_PAGE + EXPERIENCE_PER_PAGE
  );
  const expPrev = () =>
    setExpPage((p) => (p === 0 ? expTotalPages - 1 : p - 1));
  const expNext = () =>
    setExpPage((p) => (p === expTotalPages - 1 ? 0 : p + 1));

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
            Right: full experience list, LinkedIn-style cards.
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div className="flex flex-col gap-5">
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
                      {bio.flagCode ? (
                        <img
                          src={`https://flagcdn.com/24x18/${bio.flagCode}.png`}
                          srcSet={`https://flagcdn.com/48x36/${bio.flagCode}.png 2x`}
                          alt={`${bio.language} flag`}
                          className="w-4 h-3 rounded-[2px] object-cover shrink-0"
                        />
                      ) : (
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                      )}
                      {bio.language}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex flex-col flex-1">
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

          {/* ---------------- RIGHT COLUMN: EXPERIENCE ---------------- */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-gray-900 font-bold text-lg">Experience</h3>
              </div>
              {expTotalPages > 1 && (
                <span className="text-xs text-gray-400">
                  Page {expPage + 1} / {expTotalPages}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {pagedExperience.map((exp, i) => (
                <div
                  key={`${expPage}-${i}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex gap-3"
                >
                  {/* Logo placeholder — drop exp.logo = "/logos/yourfile.png"
                      in the data above and it renders here automatically. */}
                  <div className="shrink-0 w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-gray-300" />
                    )}
                  </div>

                  {/* Content — full text, nothing truncated or clipped */}
                  <div className="min-w-0 flex-1">
                    <p className="text-primary font-bold text-sm leading-snug">
                      {exp.title}
                    </p>
                    <p className="text-gray-900 font-bold text-sm leading-snug mt-0.5">
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-xs mt-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {expTotalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  onClick={expPrev}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                  aria-label="Previous experience page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: expTotalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setExpPage(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === expPage ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
                      }`}
                      aria-label={`Experience page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={expNext}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                  aria-label="Next experience page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
