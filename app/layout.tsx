import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Providers from "@/lib/queryProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Matteo Rizzi || Global Fintech Leader',
  description: 'Global Fintech Leader.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>

      <Providers>

        <body className="font-poppins antialiased">

          {/* =========================
              MATTEO RIZZI PAGE LOADER
          ========================== */}

          <div className="matteo-loader">

            <div className="matteo-loader-glow matteo-glow-one"></div>
            <div className="matteo-loader-glow matteo-glow-two"></div>

            <div className="matteo-loader-content">

              <div className="matteo-loader-label">
                <span></span>
                PERSONAL WEBSITE
              </div>

              <div className="matteo-loader-name">
                <div>MATTEO</div>
                <div>RIZZI</div>
              </div>

              <div className="matteo-loader-progress">
                <div className="matteo-loader-progress-bar"></div>
              </div>

              <div className="matteo-loader-bottom">

                <span>
                  INNOVATION&nbsp;&nbsp;•&nbsp;&nbsp;
                  FINTECH&nbsp;&nbsp;•&nbsp;&nbsp;
                  ECOSYSTEMS
                </span>

                <span className="matteo-loader-percent">
                  100%
                </span>

              </div>

            </div>
          </div>


          {/* =========================
              EXISTING WEBSITE
          ========================== */}

          <Toaster
            richColors
            position="top-center"
          />

          <NextTopLoader
            color="#1b7fa8"
            initialPosition={0.08}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            shadow="0 0 10px #1b7fa8,0 0 5px #1b7fa8"
          />

          <Header />

          <main>

            {children}

          </main>

          <Footer />

          <LanguageSwitcher />


          {/* =========================
              LOADER CSS
          ========================== */}

          <style>{`

            /* =====================================
               FULL SCREEN LOADER
            ====================================== */

            .matteo-loader {
              position: fixed;
              inset: 0;
              width: 100%;
              height: 100%;
              background: #080808;
              color: #ffffff;
              z-index: 999999;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;

              animation: matteoLoaderExit 0.8s
                cubic-bezier(0.77, 0, 0.18, 1)
                2.4s forwards;
            }


            /* =====================================
               CONTENT
            ====================================== */

            .matteo-loader-content {
              position: relative;
              z-index: 5;
              width: min(850px, 82vw);
            }


            /* =====================================
               SMALL LABEL
            ====================================== */

            .matteo-loader-label {
              display: flex;
              align-items: center;
              gap: 10px;

              font-family: Arial, sans-serif;
              font-size: 10px;
              letter-spacing: 0.22em;

              color: rgba(255,255,255,0.55);

              margin-bottom: 32px;

              opacity: 0;

              animation: matteoFadeUp 0.8s ease
                0.2s forwards;
            }

            .matteo-loader-label span {
              width: 6px;
              height: 6px;

              border-radius: 50%;

              background: #ffffff;

              animation: matteoPulse 1.2s
                ease-in-out infinite;
            }


            /* =====================================
               MATTEO RIZZI
            ====================================== */

            .matteo-loader-name {
              font-family: Arial, Helvetica, sans-serif;

              font-size: clamp(
                60px,
                11vw,
                150px
              );

              font-weight: 800;

              line-height: 0.78;

              letter-spacing: -0.075em;

              overflow: hidden;
            }

            .matteo-loader-name div {
              transform: translateY(110%);

              animation:
                matteoRevealText 1s
                cubic-bezier(0.77, 0, 0.18, 1)
                forwards;
            }

            .matteo-loader-name div:nth-child(2) {
              animation-delay: 0.08s;
            }


            /* =====================================
               PROGRESS BAR
            ====================================== */

            .matteo-loader-progress {
              width: 100%;
              height: 1px;

              margin-top: 55px;

              background:
                rgba(255,255,255,0.16);

              overflow: hidden;
            }

            .matteo-loader-progress-bar {
              height: 100%;
              width: 0%;

              background: #ffffff;

              animation:
                matteoProgress 2.2s
                cubic-bezier(0.65,0,0.35,1)
                forwards;
            }


            /* =====================================
               BOTTOM TEXT
            ====================================== */

            .matteo-loader-bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;

              margin-top: 15px;

              font-family: Arial, sans-serif;

              font-size: 9px;

              letter-spacing: 0.16em;

              color:
                rgba(255,255,255,0.45);
            }

            .matteo-loader-percent {
              color: #ffffff;

              font-variant-numeric:
                tabular-nums;
            }


            /* =====================================
               BACKGROUND GLOW
            ====================================== */

            .matteo-loader-glow {
              position: absolute;

              width: 500px;
              height: 500px;

              border-radius: 50%;

              filter: blur(120px);

              opacity: 0.07;

              pointer-events: none;
            }

            .matteo-glow-one {
              background: #ffffff;

              top: -300px;
              right: -200px;

              animation:
                matteoGlow 7s
                ease-in-out infinite;
            }

            .matteo-glow-two {
              background: #ffffff;

              bottom: -350px;
              left: -250px;

              animation:
                matteoGlow 9s
                ease-in-out infinite reverse;
            }


            /* =====================================
               ANIMATIONS
            ====================================== */

            @keyframes matteoRevealText {

              0% {
                transform: translateY(110%);
              }

              100% {
                transform: translateY(0);
              }

            }


            @keyframes matteoFadeUp {

              0% {
                opacity: 0;
                transform: translateY(15px);
              }

              100% {
                opacity: 1;
                transform: translateY(0);
              }

            }


            @keyframes matteoProgress {

              0% {
                width: 0%;
              }

              80% {
                width: 82%;
              }

              94% {
                width: 94%;
              }

              100% {
                width: 100%;
              }

            }


            @keyframes matteoPulse {

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


            @keyframes matteoGlow {

              0%,
              100% {
                transform:
                  translate(0, 0);
              }

              50% {
                transform:
                  translate(60px, 40px);
              }

            }


            @keyframes matteoLoaderExit {

              0% {
                opacity: 1;
                visibility: visible;
              }

              100% {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
              }

            }


            /* =====================================
               MOBILE
            ====================================== */

            @media (max-width: 600px) {

              .matteo-loader-content {
                width: 86vw;
              }

              .matteo-loader-name {
                font-size: 17vw;
              }

              .matteo-loader-progress {
                margin-top: 40px;
              }

              .matteo-loader-bottom span:first-child {
                font-size: 7px;
              }

            }


            /* =====================================
               REDUCED MOTION
            ====================================== */

            @media (prefers-reduced-motion: reduce) {

              .matteo-loader,
              .matteo-loader-name div,
              .matteo-loader-progress-bar,
              .matteo-loader-label,
              .matteo-loader-glow {
                animation: none;
              }

              .matteo-loader {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
              }

            }

          `}</style>

        </body>

      </Providers>

    </html>
  )
}
