"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1,
  Maximize, Minimize, RotateCcw, Globe, BookOpen, Mic2, Briefcase,
  MapPin, GraduationCap, Tag,
} from 'lucide-react';

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
  highlights: [
    { period: "2000–2013", org: "SWIFT", note: "Co-founded Innotribe in 2008 — launched the first global FinTech startup competition and the Enablers cross-industry think tank." },
    { period: "2013–2014", org: "SBT Venture Capital", note: "Partner at one of the first FinTech-dedicated venture funds ($100M), building a 12-startup portfolio." },
    { period: "2014–now", org: "FTSGroup.eu", note: "Global innovation platform covering research, matchmaking, corporate innovation, talent development, and media." },
    { period: "2019–now", org: "Timepledge.org", note: "Social initiative supporting African entrepreneurs in soft skills development." },
  ],
  education: [
    "BSc Computer Science — University of Genova",
    "Postgrad Financial Transactions — Solvay Business School",
  ],
  languages: ["Italian", "English", "French", "Spanish", "Portuguese"],
  location: "Lisbon, Portugal",
  advisories: ["NEVA SGR (Intesa SanPaolo)", "Elevandi (MAS Singapore)", "Omidyar Network", "Bamboo Capital Partners"],
};

function formatTime(s: number) {
  if (isNaN(s)) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function VideoPlayerNow() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setShowControls(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration);
    const onWait = () => setIsBuffering(true);
    const onPlay = () => setIsBuffering(false);
    const onEnd = () => { setIsPlaying(false); setShowControls(true); };
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("waiting", onWait);
    video.addEventListener("playing", onPlay);
    video.addEventListener("ended", onEnd);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("waiting", onWait);
      video.removeEventListener("playing", onPlay);
      video.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); setShowControls(true); }
    resetHideTimer();
  };

  const skip = (s: number) => {
    const v = videoRef.current;
    if (v) v.currentTime = Math.max(0, Math.min(duration, v.currentTime + s));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.volume = val;
    setVolume(val); setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isMuted) { v.volume = volume || 0.5; setIsMuted(false); }
    else { v.volume = 0; setIsMuted(true); }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar || !videoRef.current) return;
    const rect = bar.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    setHoverTime(((e.clientX - rect.left) / rect.width) * duration);
    setHoverX(e.clientX - rect.left);
  };

  const handleFullScreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  };

  const setRate = (r: number) => {
    if (videoRef.current) videoRef.current.playbackRate = r;
    setPlaybackRate(r); setShowSpeedMenu(false);
  };

  const restart = () => {
    const v = videoRef.current;
    if (v) { v.currentTime = 0; v.play(); setIsPlaying(true); }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const VolIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <section id="about" className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Meet Matteo Rizzi</h1>
          <p className="text-gray-500 mt-2 text-base max-w-xl mx-auto">
            20+ years shaping the future of FinTech — watch his introduction and explore his story.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">

          {/* VIDEO */}
          <div className="flex-1 w-full">
            <div
              ref={containerRef}
              className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
              onMouseMove={resetHideTimer}
              onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
            >
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dnotkysy1/video/upload/v1778568466/IMG_7046_aoafay.mp4"
                className="w-full aspect-video object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Buffering spinner */}
              {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {/* Center play icon */}
              {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <Play className="w-9 h-9 text-white ml-1" />
                  </div>
                </div>
              )}

              {/* Controls overlay */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pt-10 pb-4 transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="relative h-1.5 bg-white/25 rounded-full cursor-pointer mb-4 group/p hover:h-2.5 transition-all"
                  onClick={handleProgressClick}
                  onMouseMove={handleProgressHover}
                  onMouseLeave={() => setHoverTime(null)}
                >
                  <div className="h-full bg-primary rounded-full relative" style={{ width: `${progress}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover/p:opacity-100 transition-opacity" />
                  </div>
                  {hoverTime !== null && (
                    <div
                      className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded -translate-x-1/2 pointer-events-none"
                      style={{ left: hoverX }}
                    >
                      {formatTime(hoverTime)}
                    </div>
                  )}
                </div>

                {/* Button row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button onClick={restart} title="Restart" className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button onClick={() => skip(-10)} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button onClick={togglePlay} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                      {isPlaying
                        ? <Pause className="w-5 h-5 text-gray-900" />
                        : <Play className="w-5 h-5 text-gray-900 ml-0.5" />}
                    </button>
                    <button onClick={() => skip(10)} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
                      <SkipForward className="w-5 h-5" />
                    </button>
                    <span className="text-white/60 text-xs font-mono ml-1 hidden sm:block">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button onClick={toggleMute} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
                      <VolIcon className="w-4 h-4" />
                    </button>
                    <input
                      type="range" min="0" max="1" step="0.02"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolume}
                      className="w-20 h-1 accent-white cursor-pointer hidden sm:block"
                    />
                    <div className="relative">
                      <button
                        onClick={() => setShowSpeedMenu(p => !p)}
                        className="text-white/70 hover:text-white text-xs font-semibold px-2 py-1 rounded-lg hover:bg-white/10 transition min-w-[2.5rem]"
                      >
                        {playbackRate}x
                      </button>
                      {showSpeedMenu && (
                        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl z-10">
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(r => (
                            <button
                              key={r}
                              onClick={() => setRate(r)}
                              className={`block w-full px-4 py-1.5 text-xs text-left hover:bg-white/10 transition ${playbackRate === r ? 'text-white font-bold' : 'text-white/60'}`}
                            >
                              {r}x
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button onClick={handleFullScreen} className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
                      {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Below video: name + location */}
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

          {/* SIDEBAR */}
          <div className="w-full xl:w-80 flex flex-col gap-4 xl:sticky xl:top-8">

            {/* Profile card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0 select-none">
                  MR
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base leading-tight">{PROFILE.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{PROFILE.tagline}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{PROFILE.bio}</p>
            </div>

            {/* Current roles */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 font-semibold text-sm mb-3 pb-2 border-b border-gray-100">Current Roles</h3>
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

            {/* Career timeline */}
         {/*   <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 font-semibold text-sm mb-4 pb-2 border-b border-gray-100">Career Highlights</h3>
              <ol className="relative border-l-2 border-gray-100 space-y-5 ml-2">
                {PROFILE.highlights.map((h, i) => (
                  <li key={i} className="pl-5 relative">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary/50 block" />
                    <p className="text-xs text-gray-400 font-medium">{h.period}</p>
                    <p className="text-gray-900 font-semibold text-sm">{h.org}</p>
                    <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{h.note}</p>
                  </li>
                ))}
              </ol>
            </div>
/*}
            {/* Advisory + Education 
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 font-semibold text-sm mb-3 pb-2 border-b border-gray-100">Advisory Roles</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {PROFILE.advisories.map(a => (
                  <span key={a} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">{a}</span>
                ))}
              </div>
              <h3 className="text-gray-900 font-semibold text-sm mb-3 pb-2 border-b border-gray-100">Education</h3>
              <ul className="space-y-2">
                {PROFILE.education.map(e => (
                  <li key={e} className="flex items-start gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
*/}
            {/* Languages
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-900 font-semibold text-sm mb-3 pb-2 border-b border-gray-100">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {PROFILE.languages.map(l => (
                  <span key={l} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    <Tag className="w-3 h-3" />{l}
                  </span>
                ))}
              </div>
            </div>
             */}

          </div>
        </div>
      </div>
    </section>
  );
}