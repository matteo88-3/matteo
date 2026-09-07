'use client';

import { useState } from "react";
import { Linkedin, Podcast, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // LinkedIn newsletters can only be subscribed to on LinkedIn itself,
    // so this hands off to the actual newsletter page to complete it there.
    window.open(
      "https://www.linkedin.com/newsletters/news-from-the-rebel-s-front-6978747108887531520/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <footer className="bg-secondary text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About Matteo */}
        <div>
          
          <h4 className="text-white font-bold mb-3 uppercase text-sm tracking-wider">
            About Matteo
          </h4>
          <p className="text-sm leading-relaxed">
            Matteo is an unconventional entrepreneur, author, and seasoned executive with +20 years of experience in the FinTech space. With deep connections across global banks, startups, and investors, he is uniquely positioned to bridge the gap between traditional banking and disruptive technologies. Fluent in Italian, English, French, Spanish, and Portuguese, Matteo is a true multicultural European leader.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://drive.google.com/file/d/1H9Q9vYCy9zMdjHaL-hIWt7cr8yPlHRoh/view?usp=drivesdk"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                Download Media Kit
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=HjN4TTsM58I&list=PLVKkZ7o9TBmecfYxTRWDSAEsT0vW9fu-A"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                CXO Conversations Podcast
              </a>
            </li>
            <li>
              <a
                href="https://www.amazon.com/Fintech-Revolution-Italian-Matteo-Rizzi-ebook/dp/B01LX185Q7"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                Books
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
            Newsletter
          </h4>
          <p className="text-sm mb-4">
            Ideas on finance, innovation and talent — straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-white text-sm font-semibold py-2.5 rounded-lg transition-opacity"
            >
              Subscribe
            </button>
            <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              I agree to receive emails from Matteo Rizzi.
            </label>
          </form>
        </div>

        {/* Get in Touch — socials only */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
            Get in Touch
          </h4>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/matteorizzi/"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Linkedin />
            </a>
            <a
              href="https://x.com/matteorizzi?s=21"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://provoke.fm/author/matteo/"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Podcast />
            </a>
            <a
              href="https://www.instagram.com/matteorizziofficial?igsh=MWhxOXZic2pvNWUxbA=="
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Instagram />
            </a>
            <a
              href="https://youtu.be/W2OCFdYPkz4"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      {/* Designer credit */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800/50 text-center text-sm text-slate-500">
        Designed by <a href="mailto:vainqueurhirwa@gmail.com" className="text-slate-400 hover:text-primary transition-colors">Tricky Solutions</a>
      </div>
    </footer>
  );
};

export default Footer;
