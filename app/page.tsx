import Expertise from "@/components/homepage/expertise";
import HeroPage from "@/components/homepage/hero";
import Trustee from "@/components/homepage/trustee";
import Events from "@/components/homepage/events"; 
import About from "@/components/homepage/about"; 
import ContactPage from "@/components/homepage/contact";
import CollaborateSection from "@/components/homepage/work";
import MediaInsights from "@/components/homepage/media";
import Testimonials from "@/components/homepage/testmonior";


export default function Home() {
  return (
    <>
    <main className="pt-20">
<HeroPage />
<About />
<Trustee />
<Expertise />
<Events />
<MediaInsights />
<CollaborateSection />
<Testimonials />
<ContactPage />
      </main>
    </>
  )
}