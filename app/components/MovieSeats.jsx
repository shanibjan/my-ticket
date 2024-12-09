"use client"
import React, { useState } from "react";

export default function MovieSeats() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Array.from({ length: 100 }, (_, i) => i + 1); // Create 100 seats (1 to 100)

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat) // Deselect seat
        : [...prev, seat] // Select seat
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Seat Booking</h1>

      {/* Screen */}
      <div className="w-full bg-gray-700 h-10 text-center text-white mb-4 rounded-t-md">
        Screen
      </div>

      {/* Seats Grid */}
      <div className="grid grid-cols-10 gap-2">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeatSelection(seat)}
            className={`w-10 h-10 flex items-center justify-center rounded-md 
              ${
                selectedSeats.includes(seat)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } 
              hover:bg-gray-400 transition`}
          >
            {seat}
          </button>
        ))}
      </div>

      {/* Selected Seats */}
      <div className="mt-4">
        <h2 className="text-lg font-medium">Selected Seats:</h2>
        {selectedSeats.length > 0 ? (
          <p>{selectedSeats.join(", ")}</p>
        ) : (
          <p>No seats selected</p>
        )}
      </div>
    </div>
  );
}
