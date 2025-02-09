import React from "react";
import { Link, NavLink } from "react-router";

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
            <Link to="complete-profile" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            
            
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
