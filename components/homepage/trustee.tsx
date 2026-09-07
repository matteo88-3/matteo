"use client";

import React from "react";

const IMAGE_COUNT = 17;
const imagePaths = Array.from(
  { length: IMAGE_COUNT },
  (_, i) => `/companies/picture${i + 1}.png`
);

// Duplicated once for the seamless infinite-scroll loop.
const duplicatedImages = [...imagePaths, ...imagePaths];

export default function Trustee() {
  return (
    <>
      <style>
        {`
          .marquee-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 8%,
              #000 92%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 8%,
              #000 92%,
              transparent 100%
            );
          }

          .marquee-track {
            display: flex;
            align-items: center;
            width: fit-content;
            animation: marquee-scroll 36s linear infinite;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }

          .marquee-tile {
            flex-shrink: 0;
            width: 152px;
            height: 88px;
            margin: 0 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border: 1px solid #eef0f3;
            border-radius: 14px;
            transition: border-color 0.25s ease, box-shadow 0.25s ease,
              transform 0.25s ease;
          }

          .marquee-tile:hover {
            border-color: #e2e5eb;
            box-shadow: 0 6px 16px -8px rgba(15, 23, 42, 0.12);
            transform: translateY(-2px);
          }

          /* Fixed container size + image fills the container */
          .marquee-tile img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(100%) opacity(0.55);
            transition: filter 0.3s ease;
          }

          .marquee-tile:hover img {
            filter: grayscale(0%) opacity(1);
          }

          @keyframes marquee-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
            }

            .marquee-container {
              overflow-x: auto;
            }
          }

          @media (max-width: 768px) {
            .marquee-tile {
              width: 116px;
              height: 68px;
              margin: 0 0.4rem;
              border-radius: 12px;
            }

            .marquee-tile img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        `}
      </style>

      <section className="bg-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-8">
            Trusted by industry leaders
          </p>

          <div className="marquee-container">
            <div className="marquee-track">
              {imagePaths.map((src, index) => (
                <div key={`logo-${index}`} className="marquee-tile">
                  <img
                    src={src}
                    alt={`Company logo ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}

              {imagePaths.map((src, index) => (
                <div
                  key={`logo-dup-${index}`}
                  className="marquee-tile"
                  aria-hidden="true"
                >
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
