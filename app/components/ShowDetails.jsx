"use client"
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShowDetails = ({show,day}) => {
 
 
 
  
  
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");
  const id = searchParams.get("id");
  const lang = searchParams.get("lang");
  const date = searchParams.get("date");
  const showTime = searchParams.get("showtime");
  
  
  const[showTimeBg,setShowTimeBg]=useState(showTime)
  
  
  const currentYear = new Date().getFullYear();

// The input date


// Parse the date to include the current year
const fullDateString = `${date}-${currentYear}`;
const parsedDate = new Date(fullDateString);

// Get the day of the week
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayOfWeek = daysOfWeek[parsedDate.getDay()];
useEffect(()=>{
  day(dayOfWeek)
},[])


const showTimeSelect=(show)=>{
  setShowTimeBg(show);
  const newParams = new URLSearchParams(searchParams);

  newParams.set("movie", movie || "");
  newParams.set("id", id || "");
  newParams.set("date", date || "");
  newParams.set("lang", lang);
  newParams.set("showtime", show);
  

  // Update the URL without triggering a page reload
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${newParams.toString()}`
  );
    
}

 
  return (
    <div className="pt-[100px] px-[7%] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200 ">
      <div className="py-[2%]" >
        <div className="text-center ">
          <h1 className="font-QSemi capitalize text-[20px] max-[425px]:text-[17px]">
            {movie} • {lang}
          </h1>
          <div className="flex justify-center font-QRegular text-[15px] max-[425px]:text-[12px] mb-[50px]">
            <h2>{date} ,{showTimeBg} at  ARC Abhilash Cinemas 4K, Mukkam</h2>
          </div>
        </div>
        <div className=" justify-between items-center  ">
          <div className="flex  items-center w-full" >
            <div className="w-[11%] max-[620px]:w-[20%] font-QSemi max-[425px]:text-[12px] " >
              <h1 className="text-gray-400" >{dayOfWeek}</h1>
              <h1>{date}</h1>
            </div>
            <div className="flex w-[90%] gap-x-[25px] max-[425px]:gap-x-[15px] overflow-x-scroll font-QSemi cursor-pointer ml-[4%] hide-scrollbar">
              {show.map((show,i)=>{
                  return(
                    <span onClick={()=>showTimeSelect(show.showsTime)} key={i}  className={` flex-shrink-0 w-[12%] max-[425px]:w-[30%] text-center border-[1px]  border-gray-200 max-[905px]:w-[17%] max-[630px]:w-[25%] p-[1%] ${showTimeBg===show.showsTime?"bg-[#CE567F] text-white":"text-[#21C179]"}`}>
                <h1>{show.showsTime}</h1>
              </span>
                  )
              })}
              
              
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
