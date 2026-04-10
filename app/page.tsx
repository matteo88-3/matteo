import Expertise from "@/components/homepage/expertise";
import HeroPage from "@/components/homepage/hero";
import Trustee from "@/components/homepage/trustee";
import Events from "@/components/homepage/events"; 
import About from "@/components/homepage/about"; 
import ContactPage from "@/components/homepage/contact";
import CollaborateSection from "@/components/homepage/work";


export default function Home() {
  return (
    <>
    <main className="pt-20">
<HeroPage />
<About />
<Trustee />
<Expertise />
<Events />
<CollaborateSection />
<ContactPage />
      </main>
    </>
  )
}