import React from 'react';
import Header from '../components/Header';

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/do0zflatc/video/upload/v1709673985/lightsky_h245jk.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Header />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <img 
              src="https://res.cloudinary.com/do0zflatc/image/upload/v1709673985/Screenshot_2025-01-07_192150_ehc5av.jpg"
              alt="Liam Thomas"
              className="w-48 h-48 object-cover rounded-full mb-8 border-4 border-blue-500/50 shadow-lg shadow-blue-500/20"
            />
            <h1 className="text-5xl font-bold text-white mb-4">About Liam Thomas</h1>
            <p className="text-xl text-blue-200">Music Producer • Sound Designer • Mix Engineer</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-8 border border-white/10">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Driven by an early passion for electronic music and inspired by groundbreaking artists like Skrillex, Liam's musical journey began at just 16 years old. While his peers were still figuring out their paths, Liam was already laying the foundation for his future in music production.
                </p>
                
                <p>
                  After high school, he took a decisive step by pursuing a diploma in sound production, balancing his studies with work to fuel his growing ambition. What started as a modest home studio in his mother's house quickly evolved into a hub for emerging talent, as Liam's natural ability to capture and enhance artists' sound began drawing attention.
                </p>
                
                <p>
                  His reputation for exceptional production quality and innovative sound design soon caught the ear of established artists, leading to a career-defining move to Sydney. There, Liam's talent truly flourished as he began collaborating with some of Australia's most prominent musicians. A standout moment in his career came with the extraordinary opportunity to work with Grammy-winning artist T-Pain, showcasing his ability to produce at an international level.
                </p>
                
                <p>
                  Throughout his career, Liam has built an impressive portfolio working with Australia's elite artists and major music companies, consistently delivering productions that blend technical excellence with creative vision. Now based in Melbourne, he continues to shape the sound of local artists while exploring his own creative boundaries through a solo project focused on atmospheric, chill electronic music.
                </p>
                
                <p>
                  His journey from a teenage electronic music enthusiast to a sought-after producer demonstrates not just technical skill, but an innate understanding of what makes music resonate with audiences. Liam's story is one of persistent growth, artistic evolution, and the pursuit of sonic excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}