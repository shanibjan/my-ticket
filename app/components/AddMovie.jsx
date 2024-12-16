"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";

const AddMovie = ({ onDataSend }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [certificate, setCertificate] = useState("");
  const [genre, setGenre] = useState("");
  const [trailerId, setTrailerId] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState();
  
  console.log(name);
  

  useEffect(() => {
    onDataSend(isLogin);
  }, [isLogin]);

  const store = async (e) => {
    let val = e.target.files[0];

    const options = {
      maxSizeMB: 1, // Maximum file size (in MB)
      maxWidthOrHeight: 800, // Max width or height in pixels
      useWebWorker: true, // Use web workers for performance
    };

    try {
      // Compress the image
      const compressedFile = await imageCompression(val, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile); // Convert the compressed image to base64

      reader.addEventListener("load", () => {
        let imageLoader = reader.result;

        // Set the compressed image as base64
        setImage(imageLoader);
      });
    } catch (error) {
      console.log("Error during image compression:", error);
    }
  };

  const addMovieClick =async () => {
    try {
      const res=await axios.post('https://my-ticket-b9fg.vercel.app/api/movie/add-movie',{
        movieName:name,
        language,
        duration,
        certificate,
        trailerId,
        image,
        genre
      })
      if(res.data.success){
        setIsLogin(false)
      }
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  const addupcomingMovieClick =async () => {
    try {
      const res=await axios.post('https://my-ticket-b9fg.vercel.app/api/movie/add-upcoming-movie',{
        movieName:name,
        language,
        duration,
        certificate,
        trailerId,
        image,
        genre
      })
      if(res.data.success){
        setIsLogin(false)
      }
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex h-full overflow-auto hide-scrollbar relative items-center box-border">
      <div className="w-full h-full pt-[30px] pb-[30px]">
        <h1 className="font-QBold text-[25px] mb-[30px] text-center">
          Add Movie
        </h1>
        
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none capitalize w-[90%] bg-gray-100 text-gray-500"
            type="text"
            placeholder="Movie name"
          />
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <input
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="outline-none capitalize w-[90%] bg-gray-100 text-gray-500"
            type="text"
            placeholder="Language"
          />
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="outline-none w-[90%] bg-gray-100 text-gray-500"
            type="text"
            placeholder="Duration"
          />
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <input
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            className="outline-none capitalize w-[90%] bg-gray-100 text-gray-500"
            type="text"
            placeholder="Certificate"
          />
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="outline-none capitalize w-[90%] bg-gray-100 text-gray-500"
            type="text"
            placeholder="Genre"
          />
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <div className="file-input flex justify-between items-center w-full">
            <input
              type="file"
              id="file"
              className="file"
              accept=".jpg,.jpeg,.png"
              placeholder="Image"
              onChange={store}
            />

            <label
              className="cursor-pointer font-QRegular w-full text-gray-400 max-[425px]:text-[12px]"
              htmlFor="file"
            >
              Photo
            </label>
          </div>
        </div>
        <div className="bg-gray-100 w-[70%] px-[3%] py-[2%] mx-auto flex justify-between items-center font-QRegular mb-[10px]">
          <input
            value={trailerId}
            onChange={(e) => setTrailerId(e.target.value)}
            className="outline-none  w-[90%] bg-gray-100 text-gray-500"
            type="text"
            placeholder="Trailer Id"
          />
        </div>
        {error && (
          <h1 className="mb-[10px] text-[15px] font-QRegular text-center text-red-600">
            {error}
          </h1>
        )}
        <div className="flex mx-[2%] justify-between" >
        <h1
          onClick={addMovieClick}
          className=" cursor-pointer text-center flex items-center font-QSemi text-[#CE567F] max-[715px]:text-[13px] border-[1px] justify-center  w-[30%] max-[425px]:w-[45%] border-[#CE567F] mt-[30px] p-[2%]"
        >
          Add Popular Movie
        </h1>
        <h1
          onClick={addupcomingMovieClick}
          className=" cursor-pointer text-center flex items-center font-QSemi text-[#CE567F] max-[715px]:text-[13px] border-[1px] justify-center  w-[30%] max-[425px]:w-[45%] border-[#CE567F] mt-[30px] p-[2%]"
        >
          Add upcoming Movie
        </h1>
        </div>
       
        <div className="h-[30px]"></div>
      </div>

      <div
        onClick={() => setIsLogin(false)}
        className="absolute cursor-pointer top-[10px] right-[20px] text-[22px] text-gray-500"
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
};

export default AddMovie;
