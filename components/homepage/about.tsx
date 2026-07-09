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
  roles: [
    { icon: Briefcase, label: "Senior Partner, GFTN" },
    { icon: Globe, label: "Founder, Timepledge.org" },
    { icon: BookOpen, label: 'Author — "The FinTech Revolution" & "Talents & Rebels"' },
    { icon: Mic2, label: "Executive Producer, Breaking Banks Europe and Africa" },
    { icon: Mic2, label: " CXO Conversations" },
  ],
  location: "Lisbon, Portugal",
};

// ---------------------------------------------------------------------------
// BIOS — one entry per language. `text` is shown in full on the slide.
// ---------------------------------------------------------------------------
type Bio = {
  code: string; // e.g. "en"
  language: string; // display name, e.g. "English"
  flag: string; // emoji flag or short tag
  text: string;
};

const MEDIA_KIT_URL =
  "https://drive.google.com/file/d/1H9Q9vYCy9zMdjHaL-hIWt7cr8yPlHRoh/view";

const BIOS: Bio[] = [
  {
    code: "en",
    language: "English",
    flag: "🇬🇧",
    text: "Matteo Rizzi is an unconventional entrepreneur with two decades of experience in Financial Services, constantly referred amongst the top executives in the industry. He spent 13 years at SWIFT - where he co-founded Innotribe, the innovation arm of the cooperative, launching the first global startup challenge. Since 2013, he has had a FinTech Investor and/or Venture Partner role with global VCs and CVCs (20+ deals, 5 exits). In 2015, he co-founded FinTechStage (FTSGroup.eu) - a platform for Investors and Innovators to boost FinTech innovation globally. In 2019, Matteo founded Timepledge a global initiative to foster financial inclusion and entrepreneurship. In 2025, Matteo aligned FTS and Timepledge's into a single mission and founded the African Talent Academy. In 2019, he also launched Breaking Banks Europe (as the Executive Producer) and in 2025 the spin-off Breaking Banks Africa. In 2026, he took over Executive Production for the CXO Conversations show. In 2023, he was appointed Senior Partner for Elevandi (MAS) now GFTN.com. He is the author of \"The FinTech Revolution\" and \"Talents & Rebels\" and is fluent in 5 languages.",
  },
  {
    code: "it",
    language: "Italiano",
    flag: "🇮🇹",
    text: "Matteo Rizzi è un imprenditore non convenzionale con oltre vent'anni di esperienza nei Servizi Finanziari, costantemente considerato tra i top executive del settore. Ha trascorso 13 anni in SWIFT, dove ha co-fondato Innotribe, il braccio innovativo della cooperativa, lanciando la prima startup challenge globale. Dal 2013, ha ricoperto ruoli di investitore FinTech e/o venture partner con fondi VC e CVC a livello globale (oltre 20 operazioni, 5 exit). Nel 2015 ha co-fondato FinTechStage (FTSGroup.eu), una piattaforma che unisce investitori e innovatori per promuovere l'innovazione FinTech nel mondo. Nel 2019, Matteo ha fondato Timepledge, un'iniziativa globale per promuovere l'inclusione finanziaria e l'imprenditorialità. Nel 2025 ha unificato le missioni di FTS e Timepledge fondando l'African Talent Academy. Sempre nel 2019, ha lanciato Breaking Banks Europe (come Executive Producer), a cui ha fatto seguito nel 2025 lo spin-off Breaking Banks Africa. Dal 2023 è Senior Partner per GFTN.com, uno spin-off della Banca Centrale di Singapore. Ha scritto e pubblicato due libri, \"The FinTech Revolution\" (Egea) e \"Talents & Rebels\" (Hoepli), e parla correntemente cinque lingue.",
  },
  {
    code: "pt",
    language: "Português",
    flag: "🇵🇹",
    text: "Matteo Rizzi é um empreendedor não convencional com mais de duas décadas de experiência no setor dos Serviços Financeiros, sendo frequentemente reconhecido entre os principais executivos da indústria. Passou 13 anos na SWIFT, onde cofundou a Innotribe, o braço de inovação da cooperativa, lançando o primeiro desafio global para startups. Desde 2013, tem desempenhado funções como investidor em FinTech e/ou venture partner com fundos de capital de risco (VC) e corporate venture capital (CVC) a nível global (mais de 20 investimentos, 5 saídas). Em 2015, cofundou a FinTechStage (FTSGroup.eu), uma plataforma que conecta investidores e inovadores para impulsionar a inovação FinTech a nível mundial. Em 2019, Matteo fundou a Timepledge, uma iniciativa global para promover a inclusão financeira e o empreendedorismo. Em 2025, alinhou as missões da FTS e da Timepledge, dando origem à African Talent Academy. Também em 2019, lançou o plataforma Breaking Banks Europe (como Executive Producer), ao qual se juntou em 2025 o spin-off Breaking Banks Africa. Em 2023, foi nomeado Senior Partner da Elevandi (MAS), agora GFTN.com. É autor de \"The FinTech Revolution\" e \"Talents & Rebels\", e fala fluentemente cinco línguas.",
  },
  {
    code: "es",
    language: "Español",
    flag: "🇪🇸",
    text: "Matteo Rizzi es un emprendedor poco convencional con más de dos décadas de experiencia en el sector de los Servicios Financieros, siendo reconocido habitualmente entre los principales ejecutivos de la industria. Pasó 13 años en SWIFT, donde cofundó Innotribe, el brazo de innovación de la cooperativa, lanzando el primer reto global para startups. Desde 2013, ha desempeñado funciones como inversor en FinTech y/o venture partner con fondos de capital riesgo (VC) y corporate venture capital (CVC) a nivel global (más de 20 inversiones, 5 salidas). En 2015, cofundó FinTechStage (FTSGroup.eu), una plataforma que conecta a inversores e innovadores para impulsar la innovación FinTech a nivel mundial. En 2019, Matteo fundó Timepledge, una iniciativa global destinada a fomentar la inclusión financiera y el emprendimiento. En 2025, unificó las misiones de FTS y Timepledge, dando lugar a la African Talent Academy. Ese mismo año, lanzó Breaking Banks Europe (como Executive Producer), seguido en 2025 del spin-off Breaking Banks Africa. En 2023, fue nombrado Senior Partner de Elevandi (MAS), actualmente GFTN.com. Es autor de \"The FinTech Revolution\" y \"Talents & Rebels\", y habla con fluidez cinco idiomas.",
  },
  {
    code: "fr",
    language: "Français",
    flag: "🇫🇷",
    text: "Matteo Rizzi est un entrepreneur hors norme avec plus de vingt ans d'expérience dans les services financiers, régulièrement classé parmi les cadres les plus influents du secteur. Il a passé 13 ans chez SWIFT, où il a cofondé Innotribe, le pôle innovation de la coopérative, lançant le tout premier concours mondial de startups. Depuis 2013, il occupe des rôles d'investisseur FinTech et/ou de venture partner auprès de fonds VC et CVC internationaux (plus de 20 investissements, 5 sorties réussies). En 2015, il cofonde FinTechStage (FTSGroup.eu), une plateforme qui connecte investisseurs et innovateurs pour accélérer l'innovation FinTech à l'échelle mondiale. En 2019, Matteo lance Timepledge, une initiative mondiale visant à promouvoir l'inclusion financière et l'entrepreneuriat. En 2025, il aligne les missions de FTS et de Timepledge en fondant l'African Talent Academy. La même année, il lance Breaking Banks Europe (en tant que producteur exécutif), suivi en 2025 du spin-off Breaking Banks Africa. En 2023, il est nommé Senior Partner pour Elevandi (MAS), aujourd'hui GFTN.com. Il est l'auteur de \"The FinTech Revolution\" et de \"Talents & Rebels\", et parle couramment cinq langues.",
  },
  {
    code: "sv",
    language: "Svenska",
    flag: "🇸🇪",
    text: "Matteo Rizzi är en okonventionell entreprenör med över två decenniers erfarenhet inom finansiella tjänster, och räknas konsekvent bland de främsta ledarna i branschen. Han tillbringade 13 år på SWIFT, där han var med och grundade Innotribe, kooperativets innovationsgren, och lanserade den första globala startup-tävlingen. Sedan 2013 har han haft roller som FinTech-investerare och/eller venture partner med globala riskkapitalbolag och företagsinvesterare (över 20 affärer, 5 exits). År 2015 var han med och grundade FinTechStage (FTSGroup.eu) – en plattform som kopplar samman investerare och innovatörer för att främja FinTech-innovation globalt. År 2019 grundade Matteo Timepledge, ett globalt initiativ för att främja finansiell inkludering och entreprenörskap. År 2025 samordnade han FTS och Timepledge till ett gemensamt uppdrag och grundade African Talent Academy. Samma år lanserade han även Breaking Banks Europe (som exekutiv producent), följt av spin-offen Breaking Banks Africa år 2025. År 2023 utsågs han till Senior Partner för Elevandi (MAS), numera GFTN.com. Han är författare till \"The FinTech Revolution\" och \"Talents & Rebels\", och talar fem språk flytande.",
  },
];

// Generate image paths from 1.jpeg to 18.jpeg
const TOTAL_IMAGES = 18;
const imagePaths = Array.from(
  { length: TOTAL_IMAGES },
  (_, i) => `/images/${TOTAL_IMAGES - i}.jpeg`
);

export default function ProfileWithSlideshow() {
  // --- Image slideshow state ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // --- Bio slider state ---
  const [bioIndex, setBioIndex] = useState(0);

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

  // Bio slider navigation
  const bioPrev = () => {
    setBioIndex((prev) => (prev - 1 + BIOS.length) % BIOS.length);
  };
  const bioNext = () => {
    setBioIndex((prev) => (prev + 1) % BIOS.length);
  };

  // Keyboard navigation (image slideshow)
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

  const activeBio = BIOS[bioIndex];

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

            {/* Below slideshow: name + location */}
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

            {/* BIO SLIDER (replaces the old static bio paragraph) */}
            <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 pt-4">
                <h3 className="text-gray-900 font-semibold text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Bio in {BIOS.length} languages
                </h3>
                <span className="text-xs text-gray-400">
                  {bioIndex + 1} / {BIOS.length}
                </span>
              </div>

              <div className="relative px-5 py-4">
                {/* Language pill row */}
                <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-thin">
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

                {/* Active bio card */}
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex flex-col">
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

                    {/* Slide nav */}
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

                {/* Dot indicators for bio slides */}
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

          {/* SIDEBAR (bio removed, roles unchanged) */}
          <div className="w-full xl:w-80 flex flex-col gap-4 xl:sticky xl:top-8">
            {/* Profile card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
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
