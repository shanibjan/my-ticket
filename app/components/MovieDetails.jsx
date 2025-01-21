"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const MoviesDetails = ({ movieDetails }) => {
 
  
  const [isVideo, setIsVideo] = useState(false);
  const videoRef = useRef(null);
  const [user, setUser] = useState();
  const [videoHeight, setVideoHeight] = useState("600");
  const [userInterestedMovies, setInterestedMovies] = useState([]);
  const [interestedMoviesLength, setInterestedMoviesLength] = useState();

 

  const fetchUser = async () => {
    try {
      setUser(JSON.parse(localStorage.getItem("my-ticket-user")));
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchInterestedMovies = async () => {
    try {
      if (user) {
        const res = await axios.get(
          `https://my-ticket-b9fg.vercel.app/api/user/${user._id}`
        );
        setInterestedMovies(res.data.movies);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInterestedMoviesLength = async () => {
    try {
      const res = await axios.get(
        `https://my-ticket-b9fg.vercel.app/api/user/get-movies-count/${movieDetails._id}`
      );
      console.log(res.data.length);
      
      setInterestedMoviesLength(res.data.length);
     
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchInterestedMoviesLength();
  }, []);
  useEffect(()=>{
    fetchInterestedMoviesLength();
  },[movieDetails])
  useEffect(() => {
    fetchInterestedMovies();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setVideoHeight("300");
      } else if (window.innerWidth <= 600) {
        setVideoHeight("400"); // Set height for widths <= 600px
      } else if (window.innerWidth <= 900) {
        setVideoHeight("500"); // Set height for widths <= 900px
      } else {
        setVideoHeight("600"); // Default height for widths > 900px
      }
    };

    // Set the initial height based on current window width
    handleResize();

    // Add a resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const opts = {
    height: videoHeight,
    width: "100%",
    playerVars: {
      autoplay: 1, // Enable autoplay
    },
  };

  const onReady = (event) => {
    event.target.playVideo(); // Automatically play the video
  };

  useEffect(() => {
    if (isVideo) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isVideo]);

  // Handle click outside the video container
  useEffect(() => {
    const handleClickOutside = () => {
      if (videoRef.current) {
        setIsVideo(false);
      }
    };

    if (isVideo) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVideo]);

  const handleInterest = async () => {
    try {
      const res = await axios.post(
        "https://my-ticket-b9fg.vercel.app/api/movie/handle-interest",
        { userId: user._id, movieId: movieDetails._id }
      );

      fetchInterestedMovies();
      fetchInterestedMoviesLength();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {movieDetails ? (
        <div className="pt-[100px] max-[425px]:pt-[65px] max-[530px]:px-[3%] px-[7%] border-b-[1px] border-b-gray-200">
          <div className={`flex justify-between  py-[5%] ${movieDetails.status === "releasing"?"items-center":""}`}>
            <div className="leading-[44px] max-[425px]:leading-[26px] w-[30%] max-[1080px]:w-[45%] max-[780px]:w-[60%] max-[370px]:w-[50%]">
              <h1 className="font-QBold capitalize text-[30px] max-[425px]:text-[16px] max-[425px]:font-QSemi max-[425px]:mb-[10px]">
                {movieDetails && movieDetails.movieName}
              </h1>
              {movieDetails.status === "releasing" ? (
                <div className="flex justify-between font-QRegular w-[50%] max-[425px]:text-[12px] text-gray-500 max-[550px]:w-[70%] max-[370px]:w-full">
                  <h3 className="capitalize">
                    {movieDetails && movieDetails.certificate}{" "}
                  </h3>
                  <h3>•</h3>
                  <h3>{movieDetails && movieDetails.duration}</h3>
                </div>
              ) : (
                <div className="flex justify-between font-QRegular w-[60%] max-[425px]:text-[12px] text-gray-500 max-[550px]:w-[70%] max-[425px]:w-[80%] max-[370px]:w-full">
                  <h3 className="capitalize">
                    Releasing on {movieDetails && movieDetails.release}{" "}
                  </h3>
                </div>
              )}

              <h3 className="font-QRegular text-gray-500 capitalize max-[425px]:text-[12px]">
                {movieDetails && movieDetails.genre}
              </h3>
              <h3 className="font-QRegular capitalize text-gray-500 max-[425px]:text-[12px]">
                {movieDetails && movieDetails.language}
              </h3>

              {movieDetails.status === "releasing" ? (
                <button
                  onClick={() => setIsVideo(true)}
                  className="mt-[30px] max-[425px]:mt-[25px] rounded-md text-center max-[425px]:py-[3%] font-QMedium cursor-pointer bg-[#417AB2] max-[425px]:text-[11px] px-[15%] text-[15px] text-white"
                >
                  Watch Trailer
                </button>
              ) : (
                
                <div className="flex items-center rounded-md  justify-between border-[1px] border-gray-300 px-[3%] py-[4%] max-[510px]:w-[167%] max-[425px]:mt-[75px] max-[425px]:text-[11px] max-[370px]:w-[200%]">
                  <div className="flex items-center font-QMedium text-[#417AB2] w-[60%] ">
                    <FontAwesomeIcon className="mr-[3%]" icon={faThumbsUp} />
                    <h4 className="font-QMedium">
                      {interestedMoviesLength} are intrested
                    </h4>
                  </div>

                  <button
                    onClick={handleInterest}
                    className=" text-center max-[425px]:py-[7px] rounded-md font-QMedium cursor-pointer bg-[#417AB2] max-[425px]:text-[11px] px-[15%] text-[15px] text-white"
                  >
                    { userInterestedMovies.includes(movieDetails._id)
                      ? "Interested"
                      : "Interest"}
                  </button>
                </div>
              )}
            </div>
            <div className="h-[250px] overflow-hidden w-[15%] max-[800px]:w-[30%] max-[370px]:w-[40%] max-[570px]:h-[180px] shadow-md">
              <img
                className="h-full w-full object-cover rounded-md"
                src={movieDetails && movieDetails.image}
                alt=""
              />
            </div>
          </div>
          <AnimatePresence>
            {isVideo && (
              <div className="overlay">
                <div className="overlay-content fixed w-full flex h-screen justify-center items-center">
                  <motion.div
                    ref={videoRef} // Attach the ref to this div
                    className="w-[80%] max-[1000px]:w-[80%] max-[900px]:w-[90%] h-[600px] max-[900px]:h-[500px] max-[600px]:h-[400px] max-[425px]:h-[300px] bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <YouTube
                      className="w-full"
                      videoId={movieDetails && movieDetails.trailerId}
                      opts={opts}
                      onReady={onReady}
                    />
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="pt-[100px] flex justify-center ">
          <h1 className="my-[50px] font-QMedium">Movie not found</h1>
        </div>
      )}
    </div>
  );
};

export default MoviesDetails;
