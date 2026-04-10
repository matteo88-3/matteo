import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
         <Toaster richColors position="top-center" />
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
      </body>
      </Providers>
    </html>
  )
}