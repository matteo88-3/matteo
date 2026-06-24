'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Matteo is one of those rare people who can hold a room of 500 banking executives and a table of three founders with equal conviction. His keynote reframed the entire conversation on ecosystem strategy — we still reference it internally.",
    name: "Brett King",
    title: "Founder, Breaking Banks · Author of Bank 4.0",
    initials: "BK",
    color: "bg-blue-600",
  },
  {
    quote:
      "Working with Matteo on our innovation agenda was transformative. He doesn't just advise — he connects, challenges, and pushes you to think 18 months ahead of the market. Few people carry that combination of depth and global network.",
    name: "Ghela Boskovich",
    title: "Head of Fintech & RegTech Partnerships, FemTechGlobal",
    initials: "GB",
    color: "bg-violet-600",
  },
  {
    quote:
      "Matteo helped us navigate a complex market entry into Europe with the kind of nuance that only comes from decades on the ground. He opened doors we didn't know existed and gave us a framework that held up under real pressure.",
    name: "Paulo Rodrigues",
    title: "CEO, SG Ventures",
    initials: "PR",
    color: "bg-emerald-600",
  },
  {
    quote:
      "I've seen many ecosystem builders come and go. Matteo is the real thing — he built Innotribe from zero to one of the most respected innovation programs in financial services. His instinct for when to convene and when to step back is unmatched.",
    name: "Chris Skinner",
    title: "Author, The Finanser · Independent Financial Futurist",
    initials: "CS",
    color: "bg-amber-600",
  },
  {
    quote:
      "Matteo doesn't give you a slide deck. He gives you a perspective you can't unsee. His advisory work reshaped how we think about talent and disruption — and more importantly, what we do about it.",
    name: "Susanne Chishti",
    title: "CEO, FINTECH Circle · Co-editor, The FINTECH Book",
    initials: "SC",
    color: "bg-rose-600",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section id="testimonials" className="bg-secondary py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            What People Say
          </p>
          <h2 className="text-4xl font-bold text-white">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* ── DESKTOP: 5-card grid ── */}
        <div className="hidden md:grid md:grid-cols-5 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5 hover:border-white/20 hover:bg-white/8 transition-colors duration-300"
            >
              {/* Quote icon */}
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Quote className="w-4 h-4 text-primary" />
              </div>

              {/* Quote */}
              <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-xs truncate">{t.name}</p>
                  <p className="text-slate-500 text-xs leading-tight mt-0.5 line-clamp-2">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE: slideshow ── */}
        <div className="md:hidden">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-7 py-10 text-center">
            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>
            </div>

            {/* Quote text */}
            <blockquote className="text-slate-300 text-base leading-relaxed mb-8">
              "{testimonials[active].quote}"
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full ${testimonials[active].color} flex items-center justify-center text-white text-sm font-bold`}>
                {testimonials[active].initials}
              </div>
              <p className="text-white font-semibold text-sm">{testimonials[active].name}</p>
              <p className="text-slate-400 text-xs">{testimonials[active].title}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LinkedIn CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.linkedin.com/in/matteorizzi/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-primary transition-colors underline underline-offset-4"
          >
            View all recommendations on LinkedIn →
          </a>
        </div>

      </div>
    </section>
  );
}