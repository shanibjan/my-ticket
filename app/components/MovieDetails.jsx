"use client"
import React from 'react';
import t from "../images/Turbo.jpg";

const MoviesDetails = ({movieDetails }) => {
  console.log(movieDetails);
  
  
  return (
    <div className="pt-[100px] max-[530px]:px-[3%] px-[7%] border-b-[1px] border-b-gray-200 ">
        <div className="flex justify-between py-[5%]">
          <div className="leading-[44px] max-[425px]:leading-[30px] w-[30%] max-[1080px]:w-[45%] max-[780px]:w-[60%] max-[370px]:w-[50%]">
            <h1 className="font-QBold capitalize text-[30px] max-[425px]:text-[20px] max-[425px]:font-QSemi" >{movieDetails.movieName}</h1>
            <div className="flex justify-between font-QRegular w-[50%] max-[425px]:text-[12px] text-gray-500 max-[550px]:w-[70%] max-[370px]:w-full" >
              <h3 className='capitalize' >{movieDetails.certificate} </h3>
              <h3>•</h3>
              <h3>{movieDetails.duration}</h3>
            </div>
            <h3 className="font-QRegular text-gray-500 capitalize max-[425px]:text-[12px]">{movieDetails.genre}</h3>
            <h3 className="font-QRegular capitalize text-gray-500 max-[425px]:text-[12px]  ">{movieDetails.language}</h3>
            <button className="mt-[30px] text-center font-QMedium  cursor-pointer bg-[#417AB2] max-[425px]:text-[13px]  px-[15%] text-[15px] text-white" >Watch Trailer</button>
          </div>
          <div className="h-[250px] overflow-hidden w-[15%] max-[800px]:w-[30%] max-[370px]:w-[40%] max-[570px]:h-[180px] shadow-md" >
            <img className='h-full w-full object-cover' src={movieDetails.image} alt="" />
          </div>
        </div>
      </div>
  );
};

export default MoviesDetails;