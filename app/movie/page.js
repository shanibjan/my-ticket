import NavBar from "../components/NavBar";
import React, { Suspense } from "react";
import UpcomingMovies from "../components/UpcomingMovies";
import MoviesDetails from "../components/MovieDetails";
import ShowTime from "../components/ShowTime";
import axios from "axios";
import OverView from "../components/OverView";

const MoviePage = async ({ searchParams }) => {
  const { id } = await searchParams;
   // Check if ID exists
  let movieDetails = null;
  let upcomingMovieDetail = [];
  let showDetail = [];
  let showDetailDate = [];
  

  try {
    const resShows = await axios.get(
      `https://my-ticket-b9fg.vercel.app/api/show/get-show/${id}`
    );

    if (resShows) {
      showDetail = resShows.data.matchMovie.show;
      showDetailDate = resShows.data.uniqueDates;
    }
  } catch (error) {}

  try {
    const res = await axios.get(
      `https://my-ticket-b9fg.vercel.app/api/movie/get-movie/${id}`
    );

    if (res) {
      movieDetails = res.data.data;
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const res = await axios.get("https://my-ticket-b9fg.vercel.app/api/movie/get-movie", {
      cache: "no-store",
    });

    upcomingMovieDetail = res.data.upcomingMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
  try {
    const res = await axios.get("https://my-ticket-b9fg.vercel.app/api/remove-expired-show", {
      cache: "no-store",
    });
    
    
    
  } catch (error) {
    console.error( error);
  }
 
  
  

  return (
    <div>
      <NavBar />
      <Suspense>
        <MoviesDetails movieDetails={movieDetails} />
      </Suspense>
      {movieDetails.status === "releasing" ? (
        <ShowTime showDetailDate={showDetailDate} showDetail={showDetail}  language={movieDetails.language}  />
      ) : (
        <OverView overView={movieDetails.overView} />
      )}

      <UpcomingMovies moviesDetails={upcomingMovieDetail} />
    </div>
  );
};

export default MoviePage;
