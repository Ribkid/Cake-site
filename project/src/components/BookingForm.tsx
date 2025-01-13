import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const SERVICES = {
  'recording-session': {
    name: 'Recording Session',
    price: 400,
    deposit: 200,
    duration: '4 hours'
  },
  'full-day': {
    name: 'Full Day Studio',
    price: 700,
    deposit: 350,
    duration: '8 hours'
  }
};

const PAYMENT_DETAILS = {
  bankName: 'Commonwealth Bank',
  accountName: 'Liam Thomas',
  bsb: '062-692',
  accountNumber: '1234 5678',
  payId: 'liamtheboy5@gmail.com'
};

const TIME_SLOTS = [
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM'
];

const TERMS_AND_CONDITIONS = [
  'A 50% deposit is required to secure your booking.',
  'Payment must be made via bank transfer or PayID within 24 hours of booking.',
  'Please use your booking reference as the payment description.',
  'Cancellations must be made at least 48 hours in advance for a full deposit refund.',
  'Late cancellations (less than 48 hours) will forfeit the deposit.',
  'Sessions start promptly at the booked time. Late arrivals do not extend the session time.',
  'The studio provides basic equipment. Please inform us of any specific requirements.',
  'Files will be delivered within 7 business days after the session.',
  'Additional revisions may incur extra charges.',
  'The studio maintains a professional environment. Inappropriate behavior will result in session termination without refund.'
];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    message: ''
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.serviceType || !acceptedTerms) {
      toast.error('Please fill all required fields and accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const bookingDate = new Date(selectedDate);
      const [hours, minutes, period] = selectedTime.match(/(\d+):(\d+) (AM|PM)/).slice(1);
      let hour = parseInt(hours);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      bookingDate.setHours(hour, parseInt(minutes));

      const { data: existingBookings, error: checkError } = await supabase
        .from('bookings')
        .select('id')
        .eq('booking_date', bookingDate.toISOString());

      if (checkError) throw checkError;

      if (existingBookings?.length > 0) {
        toast.error('This time slot is already booked. Please select another time.');
        return;
      }

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([{
          user_name: formData.name,
          user_email: formData.email,
          service_type: formData.serviceType,
          booking_date: bookingDate.toISOString(),
          message: formData.message,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      setShowPaymentDetails(true);
      toast.success('Booking created! Please complete your payment using the details provided.');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = formData.serviceType ? SERVICES[formData.serviceType] : null;

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
      {showPaymentDetails ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Bank Transfer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">Bank Name</p>
                  <p className="font-medium">{PAYMENT_DETAILS.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Name</p>
                  <p className="font-medium">{PAYMENT_DETAILS.accountName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">BSB</p>
                  <p className="font-medium">{PAYMENT_DETAILS.bsb}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Number</p>
                  <p className="font-medium">{PAYMENT_DETAILS.accountNumber}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-purple-500/30 pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">PayID</h3>
              <div className="text-gray-300">
                <p className="text-sm text-gray-400">Email PayID</p>
                <p className="font-medium">{PAYMENT_DETAILS.payId}</p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-6">
              <h4 className="text-lg font-semibold text-white mb-2">Payment Instructions</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Please transfer ${selectedService?.deposit} to secure your booking</li>
                <li>• Use your name and booking date as the payment reference</li>
                <li>• Send your payment confirmation to liamtheboy5@gmail.com</li>
                <li>• Your booking will be confirmed once payment is received</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Make Another Booking
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="serviceType" className="block text-white mb-2">Service Type</label>
            <select
              id="serviceType"
              required
              value={formData.serviceType}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a service</option>
              <option value="recording-session">Recording Session (4 hours) - $400</option>
              <option value="full-day">Full Day Studio (8 hours) - $700</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={prevMonth} 
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <ChevronLeft className="text-white" />
                </button>
                <button 
                  type="button"
                  onClick={nextMonth} 
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <ChevronRight className="text-white" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-gray-400 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {blanks.map((blank) => (
                <div key={`blank-${blank}`} className="aspect-square"></div>
              ))}
              {days.map((day) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isToday = new Date().toDateString() === date.toDateString();
                const isPast = date < new Date().setHours(0, 0, 0, 0);
                const isAvailable = isWeekday(date);
                
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isPast || !isAvailable}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center
                      ${isPast || !isAvailable ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-blue-500/20'}
                      ${isToday ? 'bg-blue-500/20 text-white' : 'text-gray-300'}
                      ${selectedDate?.toDateString() === date.toDateString() ? 'bg-blue-500 text-white' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Available Time Slots</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`
                      p-3 rounded-lg text-white transition-colors
                      ${selectedTime === time ? 'bg-blue-500' : 'bg-blue-500/20 hover:bg-blue-500/40'}
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-white mb-2">Additional Notes</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <div>
              <label htmlFor="terms" className="text-white">
                I accept the terms and conditions
              </label>
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="ml-2 text-blue-400 hover:text-blue-300"
              >
                <Info size={16} className="inline" />
              </button>
            </div>
          </div>

          {showTerms && (
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Terms and Conditions</h4>
              <ul className="space-y-2 text-gray-300">
                {TERMS_AND_CONDITIONS.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !selectedDate || !selectedTime || !acceptedTerms}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Book Session'}
          </button>
        </form>
      )}
    </div>
  );
}