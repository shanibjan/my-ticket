
"use client";


import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ShowDetails from "../components/ShowDetails";
import SeatsRow from "../components/SeatsRow";
import MovieConfirmation from "../components/MovieConfirmation";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Seats = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const id = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isPayment, setIsPayment] = useState(false);
  const [poster, setPoster] = useState();
  const [seatQ, setSeatQ] = useState();
  const [days, setDays] = useState();
  const [showsWithDates, setShowsWithDates] = useState([]);

  const dataFetch = async () => {
    try {
      const resShows = await axios.get(
        `https://my-ticket-b9fg.vercel.app/api/show/get-show/${id}`
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
      const res = await axios.get(
        `https://my-ticket-b9fg.vercel.app/api/movie/get-movie/${id}`
      );
      if (res) {
        setPoster(res.data.image.image);
      }
    } catch (error) {
      console.error("Error fetching poster:", error);
    }
  };

  useEffect(() => {
    if (id && date) {
      dataFetch();
      posterFetch();
    }
  }, [id, date]);

  const handleDataChange = (data) => {
    setIsPayment(data);
  };

  const seatHandle = (s) => {
    setSeatQ(s);
  };

  const day = (s) => {
    if (s) {
      setDays(s);
    }
  };

  if (!id || !date) {
    return <p>Invalid URL parameters. Please provide both "id" and "date".</p>;
  }

  return (
    <div>
      <NavBar l={isPayment} />
      {isLoading ? (
        <p>Loading...</p>
      ) : isPayment ? (
        <MovieConfirmation
          poster={poster}
          seatQuantity={seatQ}
          day={days}
        />
      ) : (
        <>
          <ShowDetails show={showsWithDates} day={day} />
          <SeatsRow
            show={showsWithDates}
            seatLength={seatHandle}
            onDataChange={handleDataChange}
          />
        </>
      )}
    </div>
  );
};

export default Seats;
