import React, { useState } from "react";

function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    setError("");
    if (!dob) {
      setError("Please select your date of birth");
      return;
    }

    const today = new Date();
    const birthDate = new Date(dob);

    if (birthDate > today) {
      setError("Date of birth cannot be in the future");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const reset = () => {
    setDob("");
    setAge(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] px-4">
      <div className="w-full max-w-md bg-[#121225] border border-purple-900/40 rounded-2xl p-6 shadow-xl">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Age Calculator
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Calculate your exact age in years, months, and days
        </p>

        {/* Input */}
        <label className="text-sm text-gray-400 mb-2 block">
          Date of Birth
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-3 rounded-xl bg-[#1a1a2e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateAge}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Calculate Age
          </button>

          <button
            onClick={reset}
            className="w-12 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition"
          >
            ↺
          </button>
        </div>

        {/* Result */}
        {age && (
          <div className="mt-6 bg-[#1a1a2e] border border-purple-900/30 rounded-xl p-5 text-center">
            <p className="text-gray-400 text-sm mb-2">Your Age</p>

            <div className="flex justify-center gap-4">
              <div>
                <p className="text-3xl font-bold text-purple-400">{age.years}</p>
                <span className="text-xs text-gray-400">Years</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-400">{age.months}</p>
                <span className="text-xs text-gray-400">Months</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-400">{age.days}</p>
                <span className="text-xs text-gray-400">Days</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculator;