import React from 'react';
import Header from '../components/Header';
import { Music2, Mic, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Music2,
    name: "Music Production",
    description: "From concept to final master, bring your vision to life with industry-standard production quality. Includes mixing, mastering, and unlimited revisions.",
    price: "Starting at $350",
    link: "/booking"
  },
  {
    icon: Mic,
    name: "Studio Recording",
    description: "Professional recording studio with SSL console, top-tier microphones, and full acoustic treatment. Includes an experienced engineer to capture your best performance.",
    price: "$75/hour",
    link: "/booking"
  }
];

const brands = [
  {
    name: "Adidas",
    logo: "https://res.cloudinary.com/do0zflatc/image/upload/v1709673985/adidas_ml7sxw.png",
    invert: false
  },
  {
    name: "Republic Records",
    logo: "https://res.cloudinary.com/do0zflatc/image/upload/v1709673985/Republic_Records_logo_ksozmx.png",
    invert: false
  },
  {
    name: "Nike",
    logo: "https://res.cloudinary.com/do0zflatc/image/upload/v1709673985/nike_c5h49x.png",
    invert: false
  },
  {
    name: "Riot Games",
    logo: "https://res.cloudinary.com/do0zflatc/image/upload/v1709673985/riot_intmfj.png",
    invert: false
  }
];

export default function Services() {
  return (
    <div className="relative min-h-screen overflow-hidden">
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <img 
            src="https://res.cloudinary.com/do0zflatc/image/upload/v1709673985/Screenshot_2025-01-07_192150_ehc5av.jpg"
            alt="Liam Thomas"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-8 border-4 border-blue-500/50 shadow-lg shadow-blue-500/20"
          />
          <h1 className="text-5xl font-bold text-white mb-6">Liam Thomas</h1>
          <p className="text-xl text-blue-200 mb-4">Music Producer • Sound Designer • Mix Engineer</p>
          <p className="text-lg text-gray-300">Transforming ideas into professional soundscapes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative bg-black/20 backdrop-blur-md rounded-xl p-8 transform transition-all duration-500 hover:scale-[1.02] hover:bg-black/30 border border-white/10 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <service.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                </div>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-400">{service.price}</p>
                  <a 
                    href={service.link}
                    className="bg-blue-600/80 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-lg"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Industry Collaborations</h2>
          <p className="text-center text-blue-200 mb-12">Delivering excellence across leading global brands</p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className={`w-24 h-24 object-contain transition-opacity duration-300 ${
                    brand.invert ? 'filter brightness-0 invert opacity-80 hover:opacity-100' : 'opacity-90 hover:opacity-100'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">The Journey</h2>
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-8 mb-6">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              From bedroom beats to collaborating with T-Pain, and every bass drop in between - Liam's journey in music production reads like a producer's dream. Starting at 16, inspired by Skrillex and electronic music, he turned his obsession into expertise, evolving from a home studio in his mom's house to crafting hits with Australia's biggest names - Hooligan Hefs, Creed Tha Kid, 360, and DayOne. After taking his talents to Sydney and working with T-Pain, Liam's proven he can produce for both local legends and international icons. Now crafting sonic landscapes from Melbourne, he's bringing his years of high-level industry experience to emerging artists while exploring his own chill electronic project.
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 bg-blue-600/80 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-lg group"
            >
              Read More
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}