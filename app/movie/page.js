import NavBar from "../components/NavBar";
import React, { Suspense } from "react";
import UpcomingMovies from "../components/UpcomingMovies";
import MoviesDetails from "../components/MovieDetails";
import ShowTime from "../components/ShowTime";
import axios from "axios";

const MoviePage = async ({ searchParams }) => {
  const { id } = await searchParams; // Check if ID exists
  let movieDetails = null;
  let upcomingMovieDetail = null;
  let showDetail = null;
  let showDetailDate = null;
  const upcoming = await axios.get(
    "http://localhost:3000/api/movie/get-upcoming-movie",
    {
      cache: "no-store", // To disable caching, if necessary
    }
  );
  console.log(upcoming.data);
  

  try {
    const resShows=await axios.get(`http://localhost:3000/api/show/get-show/${id}`)
   
    
    if(resShows){
      showDetail=resShows.data.matchMovie.show
      showDetailDate=resShows.data.uniqueDates
    }
  } catch (error) {
    
  }

  try {
    const res = await axios.get(
      `http://localhost:3000/api/movie/get-movie/${id}`
    );

    if (res) {
      upcomingMovieDetail = res.data.data;
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const rese = await axios.get(
      `http://localhost:3000/api/movie/get-upcoming-movie/${id}`
    );

    movieDetails = rese.data.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <NavBar />
      <Suspense>
        <MoviesDetails movieDetails={movieDetails || upcomingMovieDetail} />
      </Suspense>
      <ShowTime showDetailDate={showDetailDate} showDetail={showDetail} />
      <UpcomingMovies moviesDetails={upcoming.data.movies} />
    </div>
  );
};

export default MoviePage;
