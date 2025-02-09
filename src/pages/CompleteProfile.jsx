import React, { useState } from "react";
import { useNavigate } from "react-router";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Male");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for profile completion logic
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 mb-4 border rounded" />
        <input type="tel" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full p-3 mb-4 border rounded" />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="w-full p-3 mb-4 border rounded" />
        <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full p-3 mb-4 border rounded">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
