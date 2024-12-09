"use client"
import React, { useEffect, useState } from "react";

const ShowDetails = ({}) => {
  const[showTimeBg,setShowTimeBg]=useState(null)
  useEffect(()=>{
    setShowTimeBg("2")
  },[])
 
  return (
    <div className="pt-[100px] px-[7%] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200 ">
      <div className="py-[2%]" >
        <div className="text-center ">
          <h1 className="font-QSemi text-[20px] max-[425px]:text-[17px]">
            Pushpa 2: The Rule • Malayalam
          </h1>
          <div className="flex justify-center font-QRegular text-[15px] max-[425px]:text-[12px] mb-[50px]">
            <h2>5 Dec ,11:00 AM at Pee Cee Talkies 4K Atmos, Mukkam</h2>
          </div>
        </div>
        <div className=" justify-between items-center  ">
          <div className="flex  items-center w-full" >
            <div className="w-[11%] max-[620px]:w-[20%] font-QSemi max-[425px]:text-[12px] " >
              <h1 className="text-gray-400" >Thu</h1>
              <h1>05 Dec</h1>
            </div>
            <div className="flex w-[90%] gap-x-[25px] max-[425px]:gap-x-[15px] overflow-x-scroll font-QSemi cursor-pointer ml-[4%] hide-scrollbar">
              <span onClick={()=>setShowTimeBg("2")} className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg==="2"?"bg-[#CE567F] text-white":"text-[#21C179]"}`}>
                <h1>2:45 PM</h1>
              </span>
              <span onClick={()=>setShowTimeBg("5")} className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg==="5"?"bg-[#CE567F] text-white":"text-[#21C179]"}`}>
                <h1>5:45 PM</h1>
              </span>
              <span onClick={()=>setShowTimeBg("9")} className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg==="9"?"bg-[#CE567F] text-white":"text-[#ff9d00]"}`}>
                <h1>9:15 PM</h1>
              </span>
              <span onClick={()=>setShowTimeBg("2")} className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg==="2"?"bg-[#CE567F] text-white":"text-[#21C179]"}`}>
                <h1>2:45 PM</h1>
              </span>
              <span onClick={()=>setShowTimeBg("5")} className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg==="5"?"bg-[#CE567F] text-white":"text-[#21C179]"}`}>
                <h1>5:45 PM</h1>
              </span>
              <span onClick={()=>setShowTimeBg("9")} className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg==="9"?"bg-[#CE567F] text-white":"text-[#ff9d00]"}`}>
                <h1>9:15 PM</h1>
              </span>
            </div>
          </div>

          <div className="flex  font-QMedium text-[14px] max-[425px]:text-[12px] w-full justify-evenly mt-[25px] mb-[15px]" >
            <div className="flex items-center " >
              <h1 className="border-[1.5px] h-[20px] w-[20px] border-[#CE567F] mr-[10px]" ></h1>
              <h1>Available</h1>
            </div>
            <div className="flex items-center" >
              <h1 className="border-[1px] h-[20px] w-[20px] bg-gray-300 mr-[10px]" ></h1>
              <h1>Booked</h1>
            </div>
            <div className="flex items-center" >
              <h1 className="border-[1px] h-[20px] w-[20px] bg-[#CE567F] mr-[10px]" ></h1>
              <h1>Selected</h1>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
