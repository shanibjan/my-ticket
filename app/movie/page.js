import NavBar from "../components/NavBar";
import React, { Suspense } from "react";
import UpcomingMovies from "../components/UpcomingMovies";
import MoviesDetails from "../components/MovieDetails";
import ShowTime from "../components/ShowTime";

const MoviePage = ({}) => {
  return (
    <div>
      <NavBar />
      <Suspense>
        <MoviesDetails />
      </Suspense>

      <ShowTime />
      <UpcomingMovies />
    </div>
  );
};

export default MoviePage;
