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
