import React from "react";
import NavBar from "../components/NavBar";

import UpcomingMovies from "../components/UpcomingMovies";
import MoviesDetails from "../components/MovieDetails";
import ShowTime from "../components/ShowTime";

const MoviePage = ({}) => {
  return (
    <div>
      <NavBar />

      <MoviesDetails />
      <ShowTime/>
      <UpcomingMovies />
    </div>
  );
};

export default MoviePage;
