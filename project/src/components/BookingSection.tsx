import React from 'react';
import { Calendar, Clock, Mail } from 'lucide-react';

export default function BookingSection() {
  return (
    <section id="booking" className="min-h-screen py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Book Studio Time</h2>
        <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-white mb-2">Preferred Date</label>
              <input
                type="date"
                id="date"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Submit Booking Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}