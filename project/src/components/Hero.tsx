import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
          Liam Thomas
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 mb-8">
          Music Producer | Sound Designer | Audio Engineer
        </p>
        <a
          href="#booking"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Book Studio Time
        </a>
      </div>
    </section>
  );
}