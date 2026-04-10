import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
          alt="Global teamwork"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Global Solutions.<br />Local Impact.<br />Purpose-Driven Growth.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Elohim Group is a diversified enterprise delivering healthcare workforce solutions, logistics services, accommodation, retail, and professional staffing across international and regional markets.
          </p>
          <p className="text-md md:text-lg text-gray-300">
            We exist to connect people, services, and opportunities — building businesses that strengthen communities and enable sustainable development.
          </p>
          <div className="mt-10">
            <a href="#what-we-do" className="bg-secondary hover:bg-amber-600 text-primary font-semibold px-8 py-3 rounded-md transition inline-block shadow-lg">
              Explore Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  )
}

export default Hero