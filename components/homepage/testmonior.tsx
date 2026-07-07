'use client';

import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Working with Matteo during the 3iAfrica Fintech Innovation Challenge was a valuable experience for our team. His mentorship helped us sharpen our fintech solution, improve our strategic thinking, and present our ideas with greater clarity and confidence. Matteo combines strong industry expertise with a practical approach to innovation, making him highly impactful to founders and startup teams navigating fast-paced environments.",
    name: "Yaw Awuku Adu",
    title: "UGBS | Banking & Finance Student  Certified Data Protection Officer",
    initials: "YA",
    color: "bg-blue-600",
  },
  {
    quote:
      "i had the privilege of working with Matteo during the 3iAfrica Fintech Innovation Challenge. As a coach, he provided invaluable insights that helped us sharpen our fintech solution on very short notice. His deep understanding of the industry and his ability to challenge our assumptions were instrumental to our progress. I highly recommend Matteo to anyone looking for a high-impact mentor in the fintech space",
    name: "Favour Betta",
    title: "President University of Ghana Finance Students and Associate’s (FINSA) ",
    initials: "FB",
    color: "bg-violet-600",
  },
  {
    quote:
      "When pitching your startup, you want to have a clear story and focused message, that's where Matteo comes in with his vast experience and understanding of not just what makes a great pitch, but also the nuances of storytelling in the Fintech space. Matteo served as my coach for Fintech Islands 2025 and his feedback was critical in refining our story and landing dataffluent in the top 3 startups at the event. ",
    name: "Raquel Seville",
    title: "CEO and Founder @ Dataffluent | Techstars ’24",
    initials: "RS",
    color: "bg-emerald-600",
  },
  {
    quote:
      "When Matteo says he is unconventional, he is correct, but not only that, he is authentic. His coaching for Fix25 (Fintech Island)  was instrumental, and his feedback was invaluable. He helped me refine my deck and pitch, which gave me the winning edge and helped me find my focus, flow, and rhythm",
    name: "Khary Sharpe",
    title: "Founder @ HeadOffice Inc. | Techstars & JP Morgan",
    initials: "KS",
    color: "bg-amber-600",
  },
  {
    quote:
      "Matteo is a world-class coach of Founders for Pitch Contests. I had the pleasure of being coached by Matteo at Fintech Islands 2024 in Barbados and I believe his advice and direction contributed greatly towards myself and company, Sunshine ☀️ winning 1st Place at the contest. Matteo is very clear in his advice and does a great job of helping Founders understand the format of a Pitch Contests vs other forms of pitches. I’d highly recommend working with Matteo to any Founder.",
    name: "Jarryon Paul",
    title: "Founder of Sunshine®️ ☀️ Creating FINANCIAL FREEDOM FOR ALL",
    initials: "JP",
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