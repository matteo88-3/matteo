"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let mounted = true;

    const startTime = Date.now();
    const minimumTime = 1500;

    // Animate percentage
    const interval = setInterval(() => {
      if (!mounted) return;

      setProgress((current) => {
        if (current >= 94) return current;
        return current + Math.floor(Math.random() * 7) + 1;
      });
    }, 90);

    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minimumTime - elapsed);

      setTimeout(() => {
        if (!mounted) return;

        setProgress(100);

        setTimeout(() => {
          if (!mounted) return;

          setHide(true);

          setTimeout(() => {
            if (mounted) {
              setLoading(false);
            }
          }, 700);
        }, 350);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
    }

    return () => {
      mounted = false;
      clearInterval(interval);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`page-loader ${hide ? "loader-hide" : ""}`}>
      
      {/* Background glow */}
      <div className="loader-glow glow-one" />
      <div className="loader-glow glow-two" />

      <div className="loader-content">

        {/* Small top label */}
        <div className="loader-label">
          <span className="loader-dot" />
          PERSONAL WEBSITE
        </div>

        {/* Matteo Rizzi */}
        <div className="loader-name">
          <span>MATTEO</span>
          <span>RIZZI</span>
        </div>

        {/* Animated line */}
        <div className="loader-line-wrapper">
          <div
            className="loader-line"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom information */}
        <div className="loader-bottom">
          <span>
            INNOVATION&nbsp;&nbsp;•&nbsp;&nbsp;FINTECH&nbsp;&nbsp;•&nbsp;&nbsp;ECOSYSTEMS
          </span>

          <span className="loader-percentage">
            {String(progress).padStart(2, "0")}%
          </span>
        </div>

      </div>

      <style jsx>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #080808;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 1;
          visibility: visible;
          transition:
            opacity 0.7s cubic-bezier(0.77, 0, 0.18, 1),
            visibility 0.7s;
        }

        .loader-hide {
          opacity: 0;
          visibility: hidden;
        }

        .loader-content {
          width: min(850px, 82vw);
          position: relative;
          z-index: 2;
        }

        /* --------------------------------
           LABEL
        -------------------------------- */

        .loader-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 32px;

          animation: fadeUp 0.8s ease forwards;
        }

        .loader-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          animation: pulse 1.2s infinite;
        }

        /* --------------------------------
           NAME
        -------------------------------- */

        .loader-name {
          display: flex;
          flex-direction: column;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(60px, 11vw, 150px);
          line-height: 0.78;
          font-weight: 800;
          letter-spacing: -0.075em;
          overflow: hidden;
        }

        .loader-name span {
          display: block;
          animation: revealText 1.1s cubic-bezier(0.77, 0, 0.18, 1)
            forwards;
          transform: translateY(110%);
        }

        .loader-name span:nth-child(2) {
          animation-delay: 0.08s;
        }

        /* --------------------------------
           PROGRESS LINE
        -------------------------------- */

        .loader-line-wrapper {
          width: 100%;
          height: 1px;
          margin-top: 55px;
          background: rgba(255, 255, 255, 0.16);
          overflow: hidden;
        }

        .loader-line {
          height: 100%;
          background: #fff;
          transition: width 0.15s ease-out;
        }

        /* --------------------------------
           BOTTOM
        -------------------------------- */

        .loader-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;

          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.45);
        }

        .loader-percentage {
          color: #fff;
          font-variant-numeric: tabular-nums;
          min-width: 35px;
          text-align: right;
        }

        /* --------------------------------
           BACKGROUND GLOWS
        -------------------------------- */

        .loader-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.08;
          pointer-events: none;
        }

        .glow-one {
          background: #ffffff;
          top: -300px;
          right: -200px;
          animation: floatGlow 7s ease-in-out infinite;
        }

        .glow-two {
          background: #ffffff;
          bottom: -350px;
          left: -250px;
          animation: floatGlow 9s ease-in-out infinite reverse;
        }

        /* --------------------------------
           ANIMATIONS
        -------------------------------- */

        @keyframes revealText {
          0% {
            transform: translateY(110%);
          }

          100% {
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes floatGlow {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(60px, 40px);
          }
        }

        @media (max-width: 600px) {
          .loader-content {
            width: 86vw;
          }

          .loader-name {
            font-size: clamp(55px, 17vw, 100px);
          }

          .loader-line-wrapper {
            margin-top: 40px;
          }

          .loader-bottom span:first-child {
            font-size: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-name span,
          .loader-label,
          .loader-dot,
          .loader-glow {
            animation: none;
          }

          .loader-name span {
            transform: translateY(0);
          }

          .loader-label {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
