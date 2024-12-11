"use client"
import React from 'react';
import t from "../images/Turbo.jpg";
import { useParams, useSearchParams } from 'next/navigation';
const MoviesDetails = ({ }) => {
  const query=useSearchParams()
  const name=query.get("id")
  console.log(name);
  return (
    <div className="pt-[100px] max-[530px]:px-[3%] px-[7%] border-b-[1px] border-b-gray-200 ">
        <div className="flex justify-between py-[5%]">
          <div className="leading-[44px] max-[425px]:leading-[30px] w-[30%] max-[1080px]:w-[45%] max-[780px]:w-[60%] max-[370px]:w-[50%]">
            <h1 className="font-QBold text-[30px] max-[425px]:text-[20px] max-[425px]:font-QSemi" >{name}</h1>
            <div className="flex justify-between font-QRegular w-[50%] max-[425px]:text-[12px] text-gray-500 max-[550px]:w-[70%] max-[370px]:w-full" >
              <h3>U/A </h3>
              <h3>•</h3>
              <h3>2 hrs 32 mins</h3>
            </div>
            <h3 className="font-QRegular text-gray-500 max-[425px]:text-[12px]">Action,Drama</h3>
            <h3 className="font-QRegular text-gray-500 max-[425px]:text-[12px]  ">Malayalam</h3>
            <button className="mt-[30px] text-center font-QMedium  cursor-pointer bg-[#417AB2] max-[425px]:text-[13px]  px-[15%] text-[15px] text-white" >Watch Trailer</button>
          </div>
          <div className="h-[250px] overflow-hidden w-[15%] max-[800px]:w-[30%] max-[370px]:w-[40%] max-[570px]:h-[180px] shadow-md" >
            <img className='h-full w-full object-cover' src={t.src} alt="" />
          </div>
        </div>
      </div>
  );
};

export default MoviesDetails;