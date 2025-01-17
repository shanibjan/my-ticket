"use client";
import React, { useEffect, useState } from "react";
import screen from "../images/screen.png";
import RateSeatSelection from "./RateSeatSelection";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

const SeatsRow = ({ show,onDataChange ,seatLength}) => {
  
  
  const searchParams = useSearchParams();
  const showTime = searchParams.get("showtime");
 
  
  const [selectedSeats, setSelectedSeats] = useState([]);
useEffect(()=>{
  seatLength(selectedSeats)
},[selectedSeats])

  const getBookedSeats = show.filter((s) => s.showsTime === showTime);
  
  
  const firstRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const secondRow = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const thirdRow = ["1", "2", "3", "4", "5", "6"];
  const fourthRow = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const toggleSeatSelection = (seat) => {
    setSelectedSeats(
      (prev) =>
        prev.includes(seat)
          ? prev.filter((s) => s !== seat) // Deselect seat
          : [...prev, seat] // Select seat
    );
  };
  return (
    <div>
      <div className="px-[7%] max-[530px]:px-[3%]">
        <div>
          <h1 className="text-center font-QSemi">EXECUTIVE : ₹ 110</h1>
        </div>
        <div className="flex justify-evenly py-[80px] overflow-x-scroll">
          <div className=" flex-shrink-0 mr-[3%] grid gap-y-[15px] h-[165px]">
            <h1 className="font-QSemi h-[28px]  mr-[2%] text-[20px] text-gray-500">
              A
            </h1>
            <h1 className="font-QSemi h-[28px] mr-[2%] text-[20px] text-gray-500">
              B
            </h1>
            <h1 className="font-QSemi h-[28px] mr-[2%] text-[20px] text-gray-500">
              C
            </h1>
            <h1 className="font-QSemi h-[28px] mr-[2%] text-[20px] text-gray-500">
              D
            </h1>
          </div>
          <div className=" flex-shrink-0 grid gap-y-[15px]">
            <div className="flex justify-center gap-x-[15px] text-[12px] items-center">
              {firstRow.map((rows, i) => {
                return (
                  <div key={i}>
                    {getBookedSeats[0].seats.includes("A" + rows) ? (
                      <h1
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-gray-300 text-gray-400 cursor-pointer bg-gray-300`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    ) : (
                      <h1
                        onClick={() => toggleSeatSelection("A" + rows)}
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-[#CE567F] text-[#CE567F] cursor-pointer ${
                          selectedSeats.includes("A" + rows)
                            ? "bg-[#CE567F] text-white"
                            : ""
                        }`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-x-[15px] text-[12px] items-center">
              {secondRow.map((rows, i) => {
                return (
                  <div key={i}>
                    {getBookedSeats[0].seats.includes("B" + rows) ? (
                      <h1
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-gray-300 text-gray-400 cursor-pointer bg-gray-300`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    ) : (
                      <h1
                        onClick={() => toggleSeatSelection("B" + rows)}
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-[#CE567F] text-[#CE567F] cursor-pointer ${
                          selectedSeats.includes("B" + rows)
                            ? "bg-[#CE567F] text-white"
                            : ""
                        }`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-x-[15px] text-[12px] items-center">
              {thirdRow.map((rows, i) => {
                return (
                  <div key={i}>
                    {getBookedSeats[0].seats.includes("C" + rows) ? (
                      <h1
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-gray-300 text-gray-400 cursor-pointer bg-gray-300`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    ) : (
                      <h1
                        onClick={() => toggleSeatSelection("C" + rows)}
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-[#CE567F] text-[#CE567F] cursor-pointer ${
                          selectedSeats.includes("C" + rows)
                            ? "bg-[#CE567F] text-white"
                            : ""
                        }`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-x-[15px] text-[12px] items-center">
              {fourthRow.map((rows, i) => {
                return (
                  <div key={i}>
                    {getBookedSeats[0].seats.includes("D" + rows) ? (
                      <h1
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-gray-300 text-gray-400 cursor-pointer bg-gray-300`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    ) : (
                      <h1
                        onClick={() => toggleSeatSelection("D" + rows)}
                        className={`flex justify-center items-center font-QMedium border-[1.5px] h-[28px] w-[28px] border-[#CE567F] text-[#CE567F] cursor-pointer ${
                          selectedSeats.includes("D" + rows)
                            ? "bg-[#CE567F] text-white"
                            : ""
                        }`}
                        key={i}
                      >
                        {rows}
                      </h1>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex mt-[30px] justify-center">
              <img src={screen.src} alt="" />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5 }}
          >
            <RateSeatSelection seats={selectedSeats} onDataChange={onDataChange}  />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatsRow;
