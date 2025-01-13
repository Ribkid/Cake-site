import React, { useState } from 'react';
import Header from '../components/Header';
import BookingForm from '../components/BookingForm';

export default function Booking() {
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
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Book a Session</h1>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}