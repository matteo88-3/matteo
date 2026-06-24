import React from 'react'
import { BarChart2Icon , Network  , Mic} from 'lucide-react'
const Expertise = () => {
  return (
    <section id='themes' className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary mb-4">Areas of Expertise</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center text-2xl mb-6">
                                <Mic />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-secondary">Thought Leadership</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">He delivers high-impact global keynotes focused on fintech innovation, talent transformation, and ecosystem building across Europe, Africa, and beyond.</p>
                            <a href='#collaborate' className="text-primary font-semibold hover:text-secondary flex items-center gap-2">Book Matteo <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div className="bg-secondary text-white p-10 rounded-3xl shadow-xl shadow-slate-900/20 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                            <div className="w-16 h-16 bg-white/10 text-primary rounded-2xl flex items-center justify-center text-2xl mb-6">
                                <BarChart2Icon />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Advisory & Venture</h3>
                            <p className="text-slate-300 mb-6 leading-relaxed">Working with corporates, venture funds, and startups to navigate innovation and growth. Senior Advisor at GFTN, Venture Partner at SG Ventures & NEVA.</p>
                            <a href='#collaborate' className="text-primary font-semibold hover:text-white flex items-center gap-2">Work With Me <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center text-2xl mb-6">
                                <Network />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-secondary">Ecosystem Building</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">Connecting startups, corporates, investors, and regulators. Founder of FinTechStage, TimePledge, and Co-Founder of the SWIFT Innotribe initiative.</p>
                            <a href='#events' className="text-primary font-semibold hover:text-secondary flex items-center gap-2">Explore Ecosystems <i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default Expertise