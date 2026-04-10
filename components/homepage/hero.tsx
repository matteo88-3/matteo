'use client';

import React from 'react';

const HeroPage = () => {
  const scrollToSection = (sectionId:any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

   <section 
      className="relative overflow-hidden h-screen  bg-no-repeat bg-cover bg-center flex items-center justify-center"
      id="home" 
      style={{ backgroundImage: "url(https://t4.ftcdn.net/jpg/06/24/26/51/360_F_624265121_NMx9P0hbcwbJqjhUeHE2XXYw84j2WD3D.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)" }} // Fallback image
    >
    


        {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: "opacity 0.5s ease-in" }}
        onCanPlayThrough={(e:any) => (e.target.style.opacity = 1)} // Show video when ready
      >
     <source src="https://res.cloudinary.com/dholzaaws/video/upload/v1736345628/y2mate.com_-_PEOPLE_MATTERS_AWARDS_2024_HIGHLIGHT_v720P_ebbjw1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block animate-fade-in">
          Matteo Rizzi
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up">
          Building the Future of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent inline-block">
            Finance, Talent & Innovation
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-3xl mx-auto font-light px-4 animate-fade-in-up animation-delay-200">
          Founder, investor, advisor, and global keynote speaker with 30+ years of experience 
          across fintech, venture capital, and ecosystem building.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 animate-fade-in-up animation-delay-400">
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all shadow-lg shadow-primary/30 transform hover:scale-105 duration-300"
          >
            Book a Keynote
          </button>
          <button 
            onClick={() => scrollToSection('events')}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-all transform hover:scale-105 duration-300"
          >
            Explore Events
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
    
    </section>
  );
};

export default HeroPage;