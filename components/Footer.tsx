import { Linkedin, Podcast, ArrowRight, Youtube, Instagram } from "lucide-react";
import { FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <span className="font-bold text-2xl tracking-tighter text-white mb-4 block">
            MATTEO<span className="text-primary">RIZZI</span>
          </span>
          <p className="mb-6 max-w-sm">
            Building the future of finance, talent, and innovation ecosystems across the globe.
          </p>
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
              <FaTwitter />
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
              href="https://youtube.com/@timepledgeorg?si=zt6u96HWM7geFK7x"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Youtube />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://drive.google.com/file/d/1f09aBhihS1mHklf1zBU23hqeyT_haQJp/view?usp=sharing"
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
                href="https://www.fintechfutures.com/job-cuts-new-hires/talents-rebels-dealing-with-corporate-misfits"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                Books
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">
            Newsletter
          </h4>
          <p className="text-sm mb-4">
            Get the latest insights on fintech and ecosystems.
          </p>
          <a
            href="https://www.linkedin.com/newsletters/news-from-the-rebel-s-front-6978747108887531520/"
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            Newsletter
          </a>
        </div>
      </div>

      {/* Designer credit */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800/50 text-center text-sm text-slate-500">
        Designed by <span className="text-slate-400 hover:text-primary transition-colors">Tricky Solutions</span>
      </div>
    </footer>
  );
};

export default Footer;