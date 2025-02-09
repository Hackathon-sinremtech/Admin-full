import { useState, useMemo, useCallback } from 'react';
import { CheckBadgeIcon, ClockIcon, CalendarIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate } from 'react-router';
import { getInitials } from '../../../functions';

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  // Sample doctor data
  const doctor = useMemo(() => ({
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 15,
    about:"Dr. Sarah is a highly specialized cardiologist with 15+ years of experience in preventive cardiology and heart failure management. She is dedicated to providing personalized care to her patients.",
    image: "/doctor1.jpg",
    charge: 1500, // Changed to number for formatting
    availableSlots: [
      { date: "2024-03-10", times: ["10:00 AM", "11:30 AM", "2:00 PM"] },
      { date: "2024-03-11", times: ["09:00 AM", "12:00 PM", "3:00 PM"] },
    ]
  }), []);

  const [selected, setSelected] = useState({
    date: null,
    time: null,
    reason: ""
  });

  const handleBooking = useCallback((e) => {
    e.preventDefault();
    console.log('Booking details:', { 
      doctorId, 
      date: selected.date, 
      time: selected.time, 
      reason: selected.reason 
    });
    navigate('/appointments');
  }, [doctorId, selected, navigate]);

  const availableTimes = useMemo(() => {
    return doctor.availableSlots.find(slot => slot.date === selected.date)?.times || [];
  }, [selected.date, doctor.availableSlots]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

const [hasImageError, setHasImageError] = useState(false);
  return (
    <div className="min-h-screen pt-30 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-40 h-40 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
          {hasImageError || !doctor.image ? (
            <svg
              className="w-full h-full bg-blue-100 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <text
                x="50%"
                y="50%"
                fontWeight="500"
                fontSize="40"
                textAnchor="middle"
                dy=".3em"
                fill="oklch(0.546 0.245 262.881)"
              >
                {getInitials(doctor.name)}
              </text>
            </svg>
          ) : (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setHasImageError(true)} // Set error state if image fails to load
            />
          )}
        </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Book Appointment with {doctor.name}
              </h1>
              <p className="text-gray-600 text-lg mb-2">{doctor.specialty}</p>
              <p className="text-gray-600 mb-4">
                {doctor.about}
              </p>
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-600">Available Now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Date/Time Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Select Availability
            </h2>
            
            {/* Date Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose Date
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {doctor.availableSlots.map((slot, index) => (
                   <button
                   key={index}
                   onClick={() => setSelected(prev => ({ ...prev, date: slot.date, time: null }))}
                   className={`p-3 rounded-lg text-center transition-all duration-200 ease-in-out transform ${
                    selected.date === slot.date
                      ? 'bg-blue-600 text-white scale-105 shadow-md' 
                      : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                  }`}
                 >
                   {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                 </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selected.date && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelected(prev => ({ ...prev, time }))}
                        className={`p-3 rounded-lg text-center transition-all duration-200 ease-in-out transform ${
                          selected.time === time 
                            ? 'bg-blue-600 text-white scale-105 shadow-md' 
                            : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                        }`}
                      >
                        {time}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-500 py-4">
                      No available slots for this date
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Appointment Details
            </h2>
            
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Reason Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Consultation (Optional)
                </label>
                <textarea
                  value={selected.reason}
                  onChange={(e) => setSelected(prev => ({
                    ...prev,
                    reason: e.target.value
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  rows="3"
                  placeholder="Example: Follow-up consultation for hypertension management"
                />
              </div>

              {/* Appointment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarIcon className="w-5 h-5 flex-shrink-0 text-blue-600" />
                  <span>Date:</span>
                  <span className="font-medium">
                    {selected.date ? formatDate(selected.date) : 'Select date'}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <ClockIcon className="w-5 h-5 flex-shrink-0 text-blue-600" />
                  <span>Time:</span>
                  <span className="font-medium">
                    {selected.time || 'Select time'}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{doctor.charge.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selected.date || !selected.time}
                className="w-full bg-blue-600 text-white p-3.5 rounded-lg hover:bg-blue-700 
                  disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
              >
                Confirm & Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;