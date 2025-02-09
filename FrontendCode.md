project structure : |-node_modules
                    |-public/images
                    |-src/|-assets
                          |-components/|-DoctorCard.jsx
                                       |-Footer.jsx
                                       |-Nav.jsx
                          |-pages/|AppointmentsPage.jsx
                                  |BookingPage.jsx
                                  |DoctorsPage.jsx
                                  |HomePage.jsx
                          |-App.jsx
                          |-index.css
                          |-Layout.jsx
                          |-main.jsx
                    |functions.js
                    |index.html
                    |package.json
                    |package-lock.json
                    |vite.config.js


# components

## DoctorCard.jsx : 
    import {
  BriefcaseIcon,
  CheckBadgeIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { getInitials } from "../../functions";
const DoctorCard = ({ doctor }) => {
  const { name, specialty, experience, available, image, id } = doctor;

 
  // State to handle image error
  const [hasImageError, setHasImageError] = useState(false);

  // Effect to reset image error state if the image is updated
  useEffect(() => {
    setHasImageError(false);
  }, [image]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Doctor Image or Initials SVG */}
        <div className="w-30 h-30 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
          {hasImageError || !image ? (
            <svg
              className="w-full h-full bg-blue-100 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <text
                x="50%"
                y="50%"
                fontWeight="500"
                fontSize="30"
                textAnchor="middle"
                dy=".3em"
                fill="oklch(0.546 0.245 262.881)"
              >
                {getInitials(name)}
              </text>
            </svg>
          ) : (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setHasImageError(true)} // Set error state if image fails to load
            />
          )}
        </div>

        {/* Doctor Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-primary text-blue-600 font-medium mb-2">
            {specialty}
          </p>

          {/* Experience */}
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
            <BriefcaseIcon className="w-5 h-5 text-gray-600" />
            <span>{experience} years experience</span>
          </div>

          {/* Availability Badge */}
          <div
            className={`flex items-center gap-2 text-sm ${
              available ? "text-green-700" : "text-red-700"
            }`}
          >
            {available ? (
              <>
                <CheckBadgeIcon className="w-5 h-5" />
                <span>Available Now</span>
              </>
            ) : (
              <>
                <ClockIcon className="w-5 h-5" />
                <span>Currently Unavailable</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link to={`book/${id}`}>
        <button
          className={`w-full mt-6 py-3 rounded-xl font-medium transition-colors ${
            available
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!available}
        >
          {available ? "Book Now" : "Not Available"}
        </button>
      </Link>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired, // Change this to number
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};


export default React.memo(DoctorCard);



## Footer.jsx : 

    import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 ">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">DocSphere</h3>
            <p className="text-sm">
              Redefining healthcare accessibility through technology
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Appointments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telemedicine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Tracking</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} DocSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footerf



## Nav.jsx:

    import React from "react";
import { NavLink } from "react-router";

const Nav = () => {
  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">DocSphere</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={({isActive})=> isActive? "text-blue-600" : "text-gray-600 hover:text-blue-600 transition-colors"}>Home</NavLink>
            <NavLink to="/Doctors" className={({isActive})=> isActive? "text-blue-600" : "text-gray-600 hover:text-blue-600 transition-colors"}>Doctors</NavLink>
            <NavLink to="/Appointments" className={({isActive})=> isActive? "text-blue-600" : "text-gray-600 hover:text-blue-600 transition-colors"}>Appointments</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;



# pages

## AppointmentsPage.jsx
    import { useState } from 'react';
import { CalendarIcon, XCircleIcon, CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/outline';

const AppointmentsPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-02-10",
      time: "10:00 AM",
      status: "confirmed",
      reason: "Routine checkup",
      image: "/doctor1.jpg"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-02-05",
      time: "02:30 PM",
      status: "completed",
      reason: "Skin allergy treatment",
      image: "/doctor2.jpg"
    },
    {
      id: 3,
      doctor: "Dr. Lisa Patel",
      specialty: "Orthopedics",
      date: "2024-03-01",
      time: "11:00 AM",
      status: "pending",
      image: "/doctor3.jpg"
    },
  ]);

  const cancelAppointment = (appointmentId) => {
    setAppointments(appointments.map(appt => 
      appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
    ));
    setSelectedAppointment(null);
  };

  const upcomingAppointments = appointments.filter(a => a.status !== 'cancelled' && a.status !== 'completed');
  const pastAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  return (
    <div className="min-h-screen pt-30 bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Your Appointments</h1>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-gray-600" />
            <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        <div className="grid gap-6">
          {upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-4">
                <img src={appointment.image} alt={appointment.doctor} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  {appointment.reason && <p className="text-gray-500 text-sm">Reason: {appointment.reason}</p>}
                  <div className="flex items-center gap-2 mt-1">
                    {appointment.status === 'confirmed' ? <CheckBadgeIcon className="w-4 h-4 text-green-600" /> : <ClockIcon className="w-4 h-4 text-yellow-600" />}
                    <span className={`text-sm ${appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-gray-600">{appointment.time}</p>
                <button onClick={() => setSelectedAppointment(appointment)} className="text-red-600 hover:text-red-700 flex items-center gap-1">
                  <XCircleIcon className="w-5 h-5" /><span>Cancel</span>
                </button>
              </div>
            </div>
          ))}
          {upcomingAppointments.length === 0 && <p className="text-gray-600">No upcoming appointments found.</p>}
        </div>

        {/* Past Appointments */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Appointment History</h2>
        <div className="grid gap-6">
          {pastAppointments.map(appointment => (
            <div key={appointment.id} className="bg-gray-100 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <img src={appointment.image} alt={appointment.doctor} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  {appointment.reason && <p className="text-gray-500 text-sm">Reason: {appointment.reason}</p>}
                  <span className={`text-sm ${appointment.status === 'cancelled' ? 'text-red-600' : 'text-blue-600'}`}>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                </div>
              </div>
              <p className="mt-2 text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
            </div>
          ))}
          {pastAppointments.length === 0 && <p className="text-gray-600">No past appointments found.</p>}
        </div>

        {/* Cancellation Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Cancellation</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel your appointment with <span className="font-semibold">{selectedAppointment.doctor}</span> on {new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}?</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setSelectedAppointment(null)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Go Back</button>
                <button onClick={() => cancelAppointment(selectedAppointment.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Confirm Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;


## BookingPage.jsx 

    import { useState, useMemo, useCallback } from 'react';
import { CheckBadgeIcon, ClockIcon, CalendarIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate } from 'react-router';
import { getInitials } from '../../functions';

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



## DoctorsPage.jsx 

    import { useState } from 'react';
import DoctorCard from '../components/DoctorCard';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: 15,
      available: true,
      image: "/doctor1.jpg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      experience: 10,
      available: false,
      image: ""
    },
    {
      id: 3,
      name: "Dr. Anish Sonar",
      specialty: "Neurologist",
      experience:5,
      available: true,
      image: "/anish.png"
    },
   
    
  ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen pt-30 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-center text-gray-900">Find Your Specialist</h1>
          <p className="text-xl text-center mb-12 text-gray-600">Connect with certified medical professionals</p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="search" className="sr-only">Search doctors</label>
              <input
                id="search"
                type="text"
                placeholder="Search doctors..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="all">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurologist">Neurologist</option>
              {/* Add more specialties */}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No doctors found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;



## HomePage.jsx

        import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// Data for reusable components
const servicesData = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Instant Booking",
    description: "Real-time availability with instant confirmation",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Instant Booking",
    description: "Real-time availability with instant confirmation",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Instant Booking",
    description: "Real-time availability with instant confirmation",
  },
  // Add more service objects
];

const specialistsData = [
  {
    initials: "SJ",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15+ years experience",
  },
  {
    initials: "SJ",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15+ years experience",
  },
  {
    initials: "SJ",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: "15+ years experience",
  },
  // Add more specialist objects
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="h-screen flex items-center px-6 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="text-blue-600">🏆</span>
              <span className="text-sm font-medium text-gray-600">
                Trusted by 200+ Hospitals
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Modern Care,
              <span className="block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl">
              Connect with certified specialists through our intelligent medical
              network. Quality healthcare made accessible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold 
                          hover:bg-blue-600 hover:text-white transition-colors duration-300"
                aria-label="Find your doctor"
              >
                Find Your Doctor
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square rounded-[3rem] shadow-2xl overflow-hidden">
              <img
                src="/11116016_415.jpg"
                alt="Medical professionals discussing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Specialists Section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Specialists
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Board-certified medical professionals across all specialties
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialistsData.map((specialist, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600">
                    {specialist.initials}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {specialist.name}
                </h3>
                <p className="text-blue-600 mb-4">{specialist.specialty}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{specialist.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              End-to-end healthcare management solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 
                         hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;


# APP.jsx 
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import BookingPage from './pages/BookingPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<HomePage />} />
      <Route path='Doctors' element={<DoctorsPage />} />
      <Route path='Doctors/book/:doctorId' element={<BookingPage />} />
      <Route path='Appointments' element={<AppointmentsPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;



# Layout.jsx 

import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Outlet } from 'react-router'



const Layout = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout


# main.jsx 

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App/>
  </StrictMode>,
)



# functions.js 

 // Function to get the initials of the doctor
  export const getInitials = (name) => {
    const nameParts = name
      .split(" ")
      .filter((part) => part.toLowerCase() !== "dr."); // Exclude "Dr"
    return nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };



                    

                          
                    
                    