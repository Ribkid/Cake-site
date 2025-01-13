import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .single();

        if (error) throw error;
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>Booking not found</div>;
  }

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
        <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Booking Confirmation</h1>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Booking Details</h2>
              <p className="text-gray-300">Service: {booking.service_type}</p>
              <p className="text-gray-300">Date: {new Date(booking.booking_date).toLocaleString()}</p>
              <p className="text-gray-300">Status: {booking.status}</p>
            </div>

            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-300">
                {booking.deposit_paid 
                  ? 'Deposit payment received. Your booking is confirmed!'
                  : 'Awaiting deposit payment. Please check your email for payment instructions.'}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-gray-300">
                Thank you for booking with us! We'll be in touch shortly with more details about your session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}