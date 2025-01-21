"use client";
import React, { useEffect, useState } from "react";
import bp from "../images/bp.jpg";
import pk from "../images/peaky.jpg";
import av from "../images/avesham.jpg";
import t from "../images/Turbo.jpg";
import p from "../images/push.jpg";
import mb from "../images/mb.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import loading from '../images/loading.gif'

const UpcomingMovies = ({moviesDetails}) => {
  
  
  
  const [categoryClick, setCategoryClick] = useState("All");
  
  const[loadClick,setLoadClick]=useState('')
  const [isHidden, setIsHidden] = useState(false);
  const router=useRouter()
 

 
  const categories = [
    "All",
    "Malayalam",
    "Tamil",
    "Telugu",
    "Hindi",
    "English",
  ];
  const filteredMovies = moviesDetails.filter((filter) => {
    
  
    return filter.language.toLowerCase() === categoryClick.toLowerCase();
  });
  
  const navToMoviePage=(movie)=>{
    setLoadClick(movie.movieName);
    router.push(`/movie?name=${movie.movieName}&id=${movie._id}`)
    
}
useEffect(()=>{
  setLoadClick("")
},[moviesDetails])
  
  
return (
  <div>
    <div className="mx-[7%]  max-[530px]:mx-[3%] mb-[4%] mt-[10%]">
      <div className="my-[2%] flex justify-between items-center">
        <h1 className="font-QBold max-[425px]:font-QSemi max-[425px]:text-[15px] text-[25px] max-[500px]:text-[20px] ">
          Upcoming Movies
        </h1>
        <div className="dropdown hidden max-[830px]:block">
        <div className="flex justify-between items-start gap-x-[10px]">
            <h1 onClick={()=>setIsHidden(false)} className="font-QMedium max-[425px]:text-[12px] " >{categoryClick}</h1>
            <FontAwesomeIcon className="max-[425px]:w-[10px]" icon={faChevronDown} />
          </div>

          <ul
            className={`dropdown-menu font-QMedium text-[#244262] leading-[35px] max-[1000px]:px-[20px] left-[-170px] max-[1000px]:left-[-67px] max-[530px]:left-[-100px] max-[550px]:text-[11px]  max-[1000px]:w-[150px] ${
              isHidden ? "hidden" : ""
            } `}
          >
            {categories.map((c, i) => {
              return (
                <li
                  onClick={() => {
                    setCategoryClick(c);
                    setIsHidden(true);
                  }}
                  key={i}
                >
                  {c}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="flex justify-between w-[60%] max-[1140px]:w-[70%] items-center max-[830px]:hidden">
          {categories.map((c, i) => {
            return (
              <li
                onClick={() => setCategoryClick(c)}
                key={i}
                className={`w-[15%] rounded-md text-center font-QMedium border-[1px] cursor-pointer border-[#417AB2] py-[1%] text-[15px] max-[1140px]:text-[10px] ${
                  categoryClick === c ? "bg-[#417AB2] text-white" : ""
                }`}
              >
                {c}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-start gap-x-8 max-[500px]:gap-x-[10px] overflow-x-scroll hide-scrollbar w-full flex-nowrap py-[2%]">
        {categoryClick === "All"
          ? moviesDetails.map((movie, index) => (
              <div
                onClick={() => navToMoviePage(movie)}
                key={index}
                className=" rounded-md relative flex-shrink-0 w-[25%] max-[800px]:w-[35%] max-[500px]:w-[50%] shadow-lg"
              >
                {" "}
                {/* Set fixed width */}
                {loadClick === movie.movieName && (
                  <div className="absolute w-full z-10 h-[84%] flex items-center justify-center">
                    <img className="h-[16%]" src={loading.src} alt="" />
                  </div>
                )}
                <img
                  className={`w-full rounded-t-md object-cover h-[400px] max-[950px]:h-[250px] max-[400px]:h-[215px] ${
                    loadClick === movie.movieName ? "brightness-50" : ""
                  }`}
                  src={movie.image}
                  alt=""
                />
                 <div className="p-[3%]">
                  <h1 className="font-QSemi capitalize text-[18px] max-[930px]:text-[14px] max-[425px]:text-[13px] my-[1%]">
                    {movie.movieName}
                  </h1>
                  <h2 className="font-QRegular capitalize text-[14px] max-[930px]:text-[10px] max-[425px]:text-[9px]">
                    {movie.language}
                  </h2>
                </div>
              </div>
            ))
          : filteredMovies.map((movie, index) => (
              <div
                onClick={() => navToMoviePage(movie)}
                key={index}
                className=" rounded-md relative flex-shrink-0 w-[25%] max-[800px]:w-[35%] max-[500px]:w-[50%] shadow-lg"
              >
                {" "}
                {/* Set fixed width */}
                {loadClick === movie.movieName && (
                  <div className="absolute w-full z-10 h-[84%] flex items-center justify-center">
                    <img className="h-[16%]" src={loading.src} alt="" />
                  </div>
                )}
                <img
                  className={`w-full rounded-t-md object-cover h-[400px] max-[950px]:h-[250px] max-[400px]:h-[215px] ${
                    loadClick === movie.movieName ? "brightness-50" : ""
                  }`}
                  src={movie.image}
                  alt=""
                />
                 <div className="p-[3%]">
                  <h1 className="font-QSemi capitalize text-[18px] max-[930px]:text-[14px] max-[425px]:text-[13px] my-[1%]">
                    {movie.movieName}
                  </h1>
                  <h2 className="font-QRegular capitalize text-[14px] max-[930px]:text-[10px] max-[425px]:text-[9px]">
                    {movie.language}
                  </h2>
                </div>
              </div>
            ))}
      </div>
    </div>
  </div>
);
};

export default UpcomingMovies;
