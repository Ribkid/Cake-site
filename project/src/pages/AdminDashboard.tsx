import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Calendar, Clock, User, Mail, LogOut, Check, X, Trash2, DollarSign } from 'lucide-react';
import { isAuthenticated, logout } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        navigate('/admin/login');
        return;
      }
      fetchBookings();
    };
    checkAuth();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings');
        return;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) {
        console.error('Delete error:', error);
        toast.error(`Failed to delete booking: ${error.message}`);
        return;
      }

      toast.success('Booking deleted successfully');
      setShowDeleteConfirm(null);
      await fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error(`Failed to delete booking: ${error.message}`);
    }
  };

  const updateBookingStatus = async (bookingId, updates) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId);

      if (error) {
        console.error('Error updating booking:', error);
        toast.error(`Failed to update booking: ${error.message}`);
        return;
      }
      
      toast.success('Booking updated successfully');
      await fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error(`Failed to update booking: ${error.message}`);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Group bookings by date
  const groupedBookings = bookings.reduce((acc, booking) => {
    const dateKey = formatDate(booking.booking_date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(booking);
    return acc;
  }, {});

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Upcoming Bookings</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
          {loading ? (
            <div className="text-white text-center py-8">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="text-white text-center py-8">No upcoming bookings</div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedBookings).map(([date, dateBookings]) => (
                <div key={date} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">
                    {date}
                  </h2>
                  <div className="grid gap-4">
                    {dateBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                              <User size={16} />
                              <span>Client</span>
                            </div>
                            <p className="text-white">{booking.user_name}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                              <Mail size={16} />
                              <span>Email</span>
                            </div>
                            <p className="text-white">{booking.user_email}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                              <Clock size={16} />
                              <span>Time</span>
                            </div>
                            <p className="text-white">
                              {new Date(booking.booking_date).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </p>
                          </div>

                          <div>
                            <div className="text-gray-400 mb-1">Service Type</div>
                            <p className="text-white">{booking.service_type}</p>
                          </div>
                        </div>

                        {booking.message && (
                          <div className="mt-4">
                            <div className="text-gray-400 mb-1">Additional Notes</div>
                            <p className="text-white">{booking.message}</p>
                          </div>
                        )}

                        <div className="mt-4 flex items-center gap-4">
                          <button
                            onClick={() => updateBookingStatus(booking.id, { status: 'confirmed' })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              booking.status === 'confirmed'
                                ? 'bg-green-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-green-500/20'
                            }`}
                          >
                            <Check size={16} />
                            Confirm
                          </button>

                          <button
                            onClick={() => updateBookingStatus(booking.id, { deposit_paid: !booking.deposit_paid })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              booking.deposit_paid
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-blue-500/20'
                            }`}
                          >
                            <DollarSign size={16} />
                            {booking.deposit_paid ? 'Paid' : 'Mark as Paid'}
                          </button>

                          <button
                            onClick={() => setShowDeleteConfirm(booking.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-red-300 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>

                        {showDeleteConfirm === booking.id && (
                          <div className="mt-4 p-4 bg-red-500/20 rounded-lg">
                            <p className="text-white mb-4">Are you sure you want to delete this booking?</p>
                            <div className="flex gap-4">
                              <button
                                onClick={() => deleteBooking(booking.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Yes, Delete
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}