"use client";
import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import ShowDetails from "../components/ShowDetails";
import SeatsRow from "../components/SeatsRow";
import axios from "axios";

import MovieConfirmation from "../components/MovieConfirmation";
import { useSearchParams } from "next/navigation";
import Head from "next/head";

const Seats = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const id = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isPayment, setIsPayment] = useState(false);
  const [poster, setPoster] = useState();
  const [seatQ, setSeatQ] = useState();
  const [days, setDays] = useState();
  const [showsWithDates, setShowsWithDates] = useState([]); // State for fetched data





const dataFetch = async () => {
  try {
    const resShows = await axios.get(
      `http://localhost:3000/api/show/get-show/${id}`
    );
    if (resShows) {
      const filteredShows = resShows.data.matchMovie.show.filter(
        (show) => show.date === date
      );
      setShowsWithDates(filteredShows);
    }
  } catch (error) {
    console.error("Error fetching shows:", error);
  } finally {
    setIsLoading(false);
  }
};



const posterFetch = async () => {
  try {
    const resShows = await axios.get(
      `http://localhost:3000/api/movie/get-movie/${id}`
    );
   
    
    if (resShows) {
      setPoster(resShows.data.image.image)
    }
  } catch (error) {
    console.error("Error fetching shows:", error);
  } 
};

  useEffect(() => {
    dataFetch();
    posterFetch()
  }, []); // Add dependencies to re-run effect if `id` or `date` changes

  const handleDataChange = (data) => {
   setIsPayment(data);
  };
  const seatHandle=(s)=>{
    setSeatQ(s);
   
    
    
  }

  const day=(s)=>{
    if(s){
      setDays(s);
    }
    
    
  }

  return (
    <>
   
    <div>
      <NavBar l={isPayment} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        {isPayment ? (
          <>
          <MovieConfirmation poster={poster&& poster} seatQuantity={seatQ&&seatQ} day={days && days} />
          </>
        ):(
          <>
          <ShowDetails show={showsWithDates} day={day} />
          <SeatsRow show={showsWithDates} seatLength={seatHandle} onDataChange={handleDataChange} />
          </>
        )}
          

          
        </>
      )}
     
    </div>
    </>
    
  );
};

export default Seats;
