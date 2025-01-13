import React from 'react';
import { Calendar, Clock, Music2, ArrowRight } from 'lucide-react';

const upcomingProjects = [
  { name: "Nike Campaign", date: "March 25, 2024", type: "Sound Design" },
  { name: "Riot Games Project", date: "April 2, 2024", type: "Music Production" },
  { name: "Adidas Commercial", date: "April 15, 2024", type: "Sound Design" },
  { name: "Warner Music Session", date: "April 20, 2024", type: "Studio Recording" }
];

const studioServices = [
  {
    name: "Recording Session",
    duration: "4 hours",
    price: "$400",
    description: "Professional recording session with mixing and mastering"
  },
  {
    name: "Full Day Studio",
    duration: "8 hours",
    price: "$700",
    description: "Complete day of recording, production, and mixing"
  },
  {
    name: "Production Package",
    duration: "Custom",
    price: "Contact",
    description: "Full music production service including arrangement"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Projects Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="text-blue-400" />
                Upcoming Projects
              </h2>
              <div className="space-y-4">
                {upcomingProjects.map((project, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                    <p className="text-blue-300 text-sm">{project.date}</p>
                    <p className="text-gray-400 text-sm">{project.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Studio Booking Section */}
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Music2 className="text-blue-400" />
                Studio Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studioServices.map((service, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
                    <div className="flex items-center gap-2 text-blue-300 mb-2">
                      <Clock size={16} />
                      <span>{service.duration}</span>
                    </div>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{service.price}</span>
                      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
                        Book Now
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Book a Session</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/5 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-white/5 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="bg-white/5 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Service</option>
                  {studioServices.map((service, index) => (
                    <option key={index} value={service.name}>{service.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="bg-white/5 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Additional Notes"
                  className="md:col-span-2 bg-white/5 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                ></textarea>
                <button
                  type="submit"
                  className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}