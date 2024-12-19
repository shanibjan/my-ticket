"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ShowTime = ({ showDetailDate, showDetail }) => {
 
  
  const searchParams=useSearchParams()
  const name= searchParams.get("name")
  const id= searchParams.get("id")
  const date=searchParams.get("date")
  
  
  
  const router=useRouter()
  
  showDetailDate&& showDetailDate.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB; // Sort in ascending order
  });

  const [categoryClick, setCategoryClick] = useState(
    date ? date :showDetailDate?showDetailDate[0].date: ""
  );

  let filteredShowDetail = showDetail&& showDetail.reduce((acc, curr) => {
    if (curr.date === categoryClick) {
      acc.push(curr.showsTime);
    }
    return acc;
  }, []);
const dateClick=((date)=>{
  setCategoryClick(date)
  const newParams = new URLSearchParams(searchParams);
  
  
    newParams.set("name", name || "");
    newParams.set("id", id || "");
    newParams.set("date", date);
   
    // Update the URL without triggering a page reload
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams.toString()}`
    );
})
  return (
    <div className="px-[7%] max-[530px]:px-[3%] border-b-[1px] border-b-gray-200">
      <div className="flex gap-x-[20px] mt-[50px] max-[620px]:mt-[20px]">
        {showDetailDate ? (
          showDetailDate.map((date, i) => {
            return (
              <button
                onClick={() => dateClick(date.date)}
                key={i}
                className={` text-center font-QMedium border-[1px] cursor-pointer border-[#417AB2] p-[1%] text-[15px] max-[1140px]:text-[10px] ${
                  categoryClick === date.date ? "bg-[#417AB2] text-white" : ""
                }`}
              >
                {date.date}
              </button>
            );
          })
        ) : (
          <h1>NO SHOWS</h1>
        )}
      </div>

      <div className="flex justify-between my-[50px] max-[620px]:my-[20px] max-[620px]:block items-center">
        <div>
          <h1 className="font-QSemi max-[425px]:font-QMedium max-[425px]:text-[14px]">
            ARC Abhilash Cinemas 4K, Mukkam
          </h1>
        </div>
        <div className="grid grid-cols-6 w-[70%] gap-[25px] max-[800px]:gap-[10px] font-QSemi cursor-pointer max-[1170px]:grid-cols-5 max-[870px]:w-[90%] max-[620px]:w-full max-[870px]:grid-cols-4 max-[800px]:grid-cols-3">
          {filteredShowDetail &&
            filteredShowDetail.map((show, i) => {
              return (
                <span
                  key={i}
                  className=" text-center border-[1px] text-[#21C179] border-gray-200 py-[10%] px-[1%]"
                >
                  <h1>{show}</h1>
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ShowTime;
