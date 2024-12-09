import React from "react";

const RateSeatSelection = ({seatQuantity}) => {
    console.log(seatQuantity);
    
  return (
    <div className="flex w-full bg-white fixed bottom-0 justify-between px-[8%] py-[1%] border-t-[1px] border-gray-300 font-QRegular" >
      <div>
        <h1 className="font-QSemi" >₹ {110*seatQuantity}</h1>
        <h2 className="text-gray-500 text-[14px]" >Tickets {seatQuantity} X 110</h2>
      </div>
      <button className="bg-[#CE567F] px-[5%] text-white " >Book Tickets</button>
    </div>
  );
};

export default RateSeatSelection;
