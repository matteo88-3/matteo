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

          {/* ==================================================
              PREMIUM MATTEO RIZZI LOADER
          ================================================== */}

          <div className="mr-loader">

            {/* Background grid */}
            <div className="mr-grid"></div>

            {/* Ambient glow */}
            <div className="mr-ambient mr-ambient-1"></div>
            <div className="mr-ambient mr-ambient-2"></div>


            {/* Top branding */}
            <div className="mr-loader-top">

              <div className="mr-loader-brand">
                MATTEO RIZZI
              </div>

              <div className="mr-loader-status">
                <span className="mr-status-dot"></span>
                LOADING EXPERIENCE
              </div>

            </div>


            {/* Center */}
            <div className="mr-loader-center">

              {/* Orbit system */}
              <div className="mr-orbit mr-orbit-1"></div>
              <div className="mr-orbit mr-orbit-2"></div>
              <div className="mr-orbit mr-orbit-3"></div>


              {/* Rotating accent */}
              <div className="mr-orbit-dot"></div>


              {/* Monogram */}
              <div className="mr-monogram">
                MR
              </div>


              {/* Name */}
              <div className="mr-loader-name">
                MATTEO RIZZI
              </div>

              <div className="mr-loader-role">
                GLOBAL FINTECH LEADER
              </div>

            </div>


            {/* Bottom */}
            <div className="mr-loader-bottom">

              <div className="mr-loader-line-container">
                <div className="mr-loader-line"></div>
              </div>

              <div className="mr-loader-info">

                <span>
                  INNOVATION / FINTECH / ECOSYSTEMS
                </span>

                <span className="mr-loader-counter">
                  <span className="mr-counter-number">
                    0
                  </span>
                  %
                </span>

              </div>

            </div>


            {/* ==================================================
                LOADER STYLES
            ================================================== */}

            <style>{`

              /* =================================================
                 MAIN LOADER
              ================================================= */

              .mr-loader {
                position: fixed;
                inset: 0;

                width: 100%;
                height: 100%;

                background: #050505;

                color: #ffffff;

                z-index: 999999;

                overflow: hidden;

                display: flex;
                align-items: center;
                justify-content: center;

                animation:
                  mrLoaderExit
                  1.2s
                  cubic-bezier(.77,0,.18,1)
                  3.4s
                  forwards;
              }


              /* =================================================
                 BACKGROUND GRID
              ================================================= */

              .mr-grid {
                position: absolute;
                inset: -50%;

                background-image:
                  linear-gradient(
                    rgba(255,255,255,.035) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,.035) 1px,
                    transparent 1px
                  );

                background-size:
                  80px 80px;

                transform:
                  perspective(700px)
                  rotateX(65deg)
                  scale(1.5);

                transform-origin: center;

                opacity: .35;

                animation:
                  mrGridMove
                  12s
                  linear
                  infinite;
              }


              /* =================================================
                 AMBIENT LIGHT
              ================================================= */

              .mr-ambient {
                position: absolute;

                width: 500px;
                height: 500px;

                border-radius: 50%;

                filter: blur(140px);

                opacity: .08;

                pointer-events: none;
              }

              .mr-ambient-1 {
                top: -250px;
                left: -200px;

                background: #1b7fa8;

                animation:
                  mrAmbientMove
                  8s
                  ease-in-out
                  infinite;
              }

              .mr-ambient-2 {
                right: -250px;
                bottom: -250px;

                background: #ffffff;

                animation:
                  mrAmbientMove
                  10s
                  ease-in-out
                  infinite
                  reverse;
              }


              /* =================================================
                 TOP
              ================================================= */

              .mr-loader-top {
                position: absolute;

                top: 35px;
                left: 45px;
                right: 45px;

                display: flex;
                align-items: center;
                justify-content: space-between;

                font-family: Arial, sans-serif;

                animation:
                  mrFadeUp
                  .9s
                  ease
                  .2s
                  both;
              }

              .mr-loader-brand {
                font-size: 11px;

                font-weight: 600;

                letter-spacing: .18em;

                color: rgba(255,255,255,.85);
              }

              .mr-loader-status {
                display: flex;

                align-items: center;

                gap: 9px;

                font-size: 8px;

                letter-spacing: .18em;

                color: rgba(255,255,255,.4);
              }

              .mr-status-dot {
                width: 5px;
                height: 5px;

                border-radius: 50%;

                background: #1b7fa8;

                box-shadow:
                  0 0 12px
                  rgba(27,127,168,.8);

                animation:
                  mrStatusPulse
                  1.2s
                  ease-in-out
                  infinite;
              }


              /* =================================================
                 CENTER
              ================================================= */

              .mr-loader-center {

                position: relative;

                width: 430px;
                height: 430px;

                display: flex;

                flex-direction: column;

                align-items: center;

                justify-content: center;

                animation:
                  mrCenterIn
                  1.2s
                  cubic-bezier(.16,1,.3,1)
                  .15s
                  both;
              }


              /* =================================================
                 ORBITS
              ================================================= */

              .mr-orbit {

                position: absolute;

                border-radius: 50%;

                border: 1px solid
                  rgba(255,255,255,.12);

                left: 50%;
                top: 50%;

                transform:
                  translate(-50%,-50%);
              }

              .mr-orbit-1 {
                width: 190px;
                height: 190px;

                border-color:
                  rgba(255,255,255,.18);

                animation:
                  mrRotate
                  8s
                  linear
                  infinite;
              }

              .mr-orbit-2 {
                width: 270px;
                height: 270px;

                border-color:
                  rgba(27,127,168,.28);

                border-left-color:
                  transparent;

                animation:
                  mrRotateReverse
                  11s
                  linear
                  infinite;
              }

              .mr-orbit-3 {
                width: 350px;
                height: 350px;

                border-color:
                  rgba(255,255,255,.06);

                animation:
                  mrRotate
                  18s
                  linear
                  infinite;
              }


              /* =================================================
                 ORBIT DOT
              ================================================= */

              .mr-orbit-dot {

                position: absolute;

                width: 9px;
                height: 9px;

                border-radius: 50%;

                background: #1b7fa8;

                box-shadow:
                  0 0 20px
                  rgba(27,127,168,.8);

                top: 50%;

                left: 50%;

                margin-left: -135px;

                transform-origin:
                  135px 0;

                animation:
                  mrDotRotate
                  5s
                  linear
                  infinite;
              }


              /* =================================================
                 MONOGRAM
              ================================================= */

              .mr-monogram {

                position: relative;

                z-index: 5;

                font-family:
                  Arial,
                  Helvetica,
                  sans-serif;

                font-size: 72px;

                font-weight: 700;

                letter-spacing: -.09em;

                line-height: 1;

                color: #ffffff;

                text-shadow:
                  0 0 40px
                  rgba(255,255,255,.08);

                animation:
                  mrMonogramPulse
                  3s
                  ease-in-out
                  infinite;
              }


              /* =================================================
                 NAME
              ================================================= */

              .mr-loader-name {

                margin-top: 25px;

                font-family: Arial, sans-serif;

                font-size: 12px;

                font-weight: 600;

                letter-spacing: .35em;

                padding-left: .35em;

                color:
                  rgba(255,255,255,.9);

                animation:
                  mrFadeUp
                  1s
                  ease
                  .7s
                  both;
              }


              /* =================================================
                 ROLE
              ================================================= */

              .mr-loader-role {

                margin-top: 12px;

                font-family: Arial, sans-serif;

                font-size: 7px;

                letter-spacing: .25em;

                color:
                  rgba(255,255,255,.35);

                padding-left: .25em;

                animation:
                  mrFadeUp
                  1s
                  ease
                  .9s
                  both;
              }


              /* =================================================
                 BOTTOM
              ================================================= */

              .mr-loader-bottom {

                position: absolute;

                left: 45px;
                right: 45px;

                bottom: 38px;

                animation:
                  mrFadeUp
                  .9s
                  ease
                  .5s
                  both;
              }


              /* =================================================
                 PROGRESS LINE
              ================================================= */

              .mr-loader-line-container {

                width: 100%;

                height: 1px;

                background:
                  rgba(255,255,255,.1);

                overflow: hidden;
              }

              .mr-loader-line {

                width: 0%;

                height: 100%;

                background:
                  linear-gradient(
                    90deg,
                    transparent,
                    #1b7fa8,
                    #ffffff
                  );

                box-shadow:
                  0 0 12px
                  rgba(27,127,168,.5);

                animation:
                  mrProgress
                  3s
                  cubic-bezier(.65,0,.35,1)
                  forwards;
              }


              /* =================================================
                 BOTTOM INFO
              ================================================= */

              .mr-loader-info {

                display: flex;

                align-items: center;

                justify-content: space-between;

                margin-top: 13px;

                font-family: Arial, sans-serif;

                font-size: 8px;

                letter-spacing: .18em;

                color:
                  rgba(255,255,255,.3);
              }

              .mr-loader-counter {

                color:
                  rgba(255,255,255,.85);

                font-variant-numeric:
                  tabular-nums;
              }

              .mr-counter-number {

                display: inline-block;

                min-width: 30px;

                text-align: right;
              }


              /* =================================================
                 ANIMATIONS
              ================================================= */

              @keyframes mrLoaderExit {

                0% {
                  opacity: 1;

                  transform:
                    scale(1);

                  filter:
                    blur(0);
                }

                65% {
                  opacity: 1;

                  transform:
                    scale(1);

                  filter:
                    blur(0);
                }

                100% {
                  opacity: 0;

                  visibility: hidden;

                  pointer-events: none;

                  transform:
                    scale(1.04);

                  filter:
                    blur(8px);
                }

              }


              @keyframes mrCenterIn {

                from {
                  opacity: 0;

                  transform:
                    scale(.75);
                  filter:
                    blur(10px);
                }

                to {
                  opacity: 1;

                  transform:
                    scale(1);
                  filter:
                    blur(0);
                }

              }


              @keyframes mrFadeUp {

                from {
                  opacity: 0;

                  transform:
                    translateY(18px);
                }

                to {
                  opacity: 1;

                  transform:
                    translateY(0);
                }

              }


              @keyframes mrRotate {

                from {
                  transform:
                    translate(-50%,-50%)
                    rotate(0deg);
                }

                to {
                  transform:
                    translate(-50%,-50%)
                    rotate(360deg);
                }

              }


              @keyframes mrRotateReverse {

                from {
                  transform:
                    translate(-50%,-50%)
                    rotate(360deg);
                }

                to {
                  transform:
                    translate(-50%,-50%)
                    rotate(0deg);
                }

              }


              @keyframes mrDotRotate {

                from {
                  transform:
                    rotate(0deg);
                }

                to {
                  transform:
                    rotate(360deg);
                }

              }


              @keyframes mrMonogramPulse {

                0%,
                100% {
                  transform:
                    scale(1);

                  opacity: .9;
                }

                50% {
                  transform:
                    scale(1.04);

                  opacity: 1;
                }

              }


              @keyframes mrProgress {

                0% {
                  width: 0%;
                }

                15% {
                  width: 18%;
                }

                40% {
                  width: 43%;
                }

                65% {
                  width: 68%;
                }

                82% {
                  width: 84%;
                }

                94% {
                  width: 94%;
                }

                100% {
                  width: 100%;
                }

              }


              @keyframes mrStatusPulse {

                0%,
                100% {
                  opacity: .3;

                  transform:
                    scale(.7);
                }

                50% {
                  opacity: 1;

                  transform:
                    scale(1.2);
                }

              }


              @keyframes mrGridMove {

                from {
                  transform:
                    perspective(700px)
                    rotateX(65deg)
                    scale(1.5)
                    translateY(0);
                }

                to {
                  transform:
                    perspective(700px)
                    rotateX(65deg)
                    scale(1.5)
                    translateY(80px);
                }

              }


              @keyframes mrAmbientMove {

                0%,
                100% {
                  transform:
                    translate(0,0)
                    scale(1);
                }

                50% {
                  transform:
                    translate(80px,50px)
                    scale(1.2);
                }

              }


              /* =================================================
                 MOBILE
              ================================================= */

              @media (max-width: 600px) {

                .mr-loader-top {

                  top: 25px;

                  left: 22px;
                  right: 22px;

                }

                .mr-loader-status {

                  font-size: 6px;

                  letter-spacing: .12em;

                }

                .mr-loader-brand {

                  font-size: 9px;

                }

                .mr-loader-center {

                  width: 330px;

                  height: 330px;

                }

                .mr-orbit-1 {

                  width: 150px;
                  height: 150px;

                }

                .mr-orbit-2 {

                  width: 220px;
                  height: 220px;

                }

                .mr-orbit-3 {

                  width: 285px;
                  height: 285px;

                }

                .mr-monogram {

                  font-size: 58px;

                }

                .mr-loader-name {

                  font-size: 9px;

                  letter-spacing: .25em;

                }

                .mr-loader-role {

                  font-size: 6px;

                }

                .mr-loader-bottom {

                  left: 22px;
                  right: 22px;

                  bottom: 25px;

                }

                .mr-loader-info {

                  font-size: 6px;

                  letter-spacing: .1em;

                }

              }


              /* =================================================
                 ACCESSIBILITY
              ================================================= */

              @media (prefers-reduced-motion: reduce) {

                .mr-loader,
                .mr-grid,
                .mr-ambient,
                .mr-loader-center,
                .mr-loader-label,
                .mr-loader-name,
                .mr-loader-role,
                .mr-loader-bottom,
                .mr-orbit,
                .mr-orbit-dot,
                .mr-monogram,
                .mr-loader-line {

                  animation: none !important;

                }

                .mr-loader {

                  display: none;

                }

              }

            `}</style>

          {/* ==================================================
              END LOADER
          ================================================== */}


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

        </body>

      </Providers>

    </html>
  )
}
