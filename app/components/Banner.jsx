import React from "react";
import bg from "../images/bg.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const Banner = ({}) => {
  return (
    <div className="pt-[100px] max-[800px]:pt-[80px] max-[425px]:pt-[65px]" >
      <div
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${bg.src})` }}
        className="h-[500px] max-[620px]:h-[300px] max-[425px]:h-[210px] bg-cover bg-center flex justify-center items-center"
      >
        <div className="text-center" >
          <h1 className="text-white text-4xl max-[425px]:text-[25px] font-QSemi">
            Your favorite movies.Explained
          </h1>
          <h3 className="text-white font-QRegular mt-[15px] max-[425px]:text-[12px] " >Figure out what happened.Then find out why.</h3>
          <div className="bg-white flex items-center p-[2%] rounded-md font-QRegular mt-[70px] max-[425px]:mt-[35px] max-[425px]:w-[70%] mx-auto" >
                <FontAwesomeIcon className="h-[20px] max-[425px]:h-[15px] mr-3" icon={faSearch} />
                <input className="w-[80%] max-[425px]:text-[13px] outline-none" type="text" placeholder="Search for a movie...." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
