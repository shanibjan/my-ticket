import NavBar from "../components/NavBar";
import React, { Suspense } from "react";
import UpcomingMovies from "../components/UpcomingMovies";
import MoviesDetails from "../components/MovieDetails";
import ShowTime from "../components/ShowTime";
import axios from "axios";

const MoviePage = async ({ searchParams }) => {
  const id = searchParams?.id; // Check if ID exists
  let a = null;
  const upcoming = await axios.get(
    "https://my-ticket-b9fg.vercel.app/api/movie/get-upcoming-movie",
    {
      cache: "no-store", // To disable caching, if necessary
    }
  );

  try {
    const res = await axios.get(
      `https://my-ticket-b9fg.vercel.app/api/movie/get-movie/${id}`
    );

   

    return (
      <div>
        <NavBar />
        <Suspense>
          <MoviesDetails movieDetails={res.data.data} />
        </Suspense>
        <ShowTime />
        <UpcomingMovies moviesDetails={upcoming.data} />
      </div>
    );
  } catch (error) {
    try {
      const rese = await axios.get(
        `https://my-ticket-b9fg.vercel.app/api/movie/get-upcoming-movie/${id}`
      );

      a = rese.data.data;
    } catch (error) {
      console.log(error);
    }
    console.log(error);

    return (
      <div>
        <NavBar />
        <Suspense>
          <MoviesDetails movieDetails={a} />
        </Suspense>
        
        <UpcomingMovies moviesDetails={upcoming.data} />
      </div>
    ); 
  }
};

export default MoviePage;
