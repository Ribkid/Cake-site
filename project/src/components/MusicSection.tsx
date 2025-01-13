import React from 'react';

export default function MusicSection() {
  return (
    <section id="music" className="min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Music</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Latest Release</h3>
            <div className="aspect-video">
              <iframe
                src="https://player.monstercat.app/release/MCLP025"
                width="100%"
                height="100%"
                className="w-full h-full rounded-lg"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Featured Clients</h3>
            <ul className="space-y-4 text-lg text-white">
              <li>• Monstercat Media</li>
              <li>• Major Record Labels</li>
              <li>• Independent Artists</li>
              <li>• Commercial Brands</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}