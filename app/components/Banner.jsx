import React from "react";
import bg from "../images/bg.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const Banner = ({}) => {
  return (
    <div className="pt-[100px] max-[800px]:pt-[80px] " >
      <div
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${bg.src})` }}
        className="h-[500px] bg-cover bg-center flex justify-center items-center"
      >
        <div className="text-center" >
          <h1 className="text-white text-4xl font-QBold">
            Your favorite movies.Explained
          </h1>
          <h3 className="text-white font-QRegular mt-[15px]" >Figure out what happened.Then find out why.</h3>
          <div className="bg-white flex p-[2%] rounded-[25px] font-QRegular mt-[70px]" >
                <FontAwesomeIcon className="h-[20px] mr-3" icon={faSearch} />
                <input className="w-[80%] outline-none" type="text" placeholder="Search for a movie...." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
