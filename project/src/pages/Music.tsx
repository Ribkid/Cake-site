import React from 'react';
import Header from '../components/Header';

const releases = [
  {
    title: "Latest Release",
    type: "Single",
    date: "March 2024",
    platform: "Monstercat",
    link: "https://player.monstercat.app/release/MCLP025"
  }
];

const upcomingProjects = [
  {
    title: "Nike Campaign",
    type: "Sound Design",
    date: "April 2024"
  },
  {
    title: "EP Release",
    type: "Production",
    date: "May 2024"
  }
];

export default function Music() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12 text-center">Music</h1>
          
          <div className="grid grid-cols-1 gap-8">
            {/* SoundCloud Profile */}
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Latest Tracks</h2>
              <div className="aspect-[5/3] w-full">
                <iframe
                  title="SoundCloud Profile"
                  width="100%"
                  height="100%"
                  scrolling="no"
                  frameBorder="no"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/liamthomasau&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true&single_active=true&sharing=true&download=true&buying=false&liking=true&cookie_enabled=false"
                  allow="autoplay"
                  className="rounded-lg"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monstercat Release */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Featured Release</h2>
                {releases.map((release, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-xl font-bold text-white mb-2">{release.title}</h3>
                    <p className="text-gray-300">{release.type} • {release.date}</p>
                    <p className="text-blue-400 mb-2">{release.platform}</p>
                    <div className="aspect-video">
                      <iframe
                        src={release.link}
                        className="w-full h-full rounded-lg"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upcoming Projects */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Upcoming Projects</h2>
                {upcomingProjects.map((project, index) => (
                  <div key={index} className="mb-6 last:mb-0 bg-black/20 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.type}</p>
                    <p className="text-blue-400">{project.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}