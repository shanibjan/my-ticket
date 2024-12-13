import NavBar from "../components/NavBar";
import React, { Suspense } from "react";
import UpcomingMovies from "../components/UpcomingMovies";
import MoviesDetails from "../components/MovieDetails";
import ShowTime from "../components/ShowTime";
import axios from "axios";

const MoviePage =async ({searchParams}) => {
  
  const { id } = await searchParams;
  const res= await axios.get(`http://localhost:3000/api/movie/get-movie/${id}`)
  console.log(res.data.data);
  
  
  

  

  
  

  
  return (
    <div>
      <NavBar />
      <Suspense>
        <MoviesDetails movieDetails={res.data.data} />
      </Suspense>

      <ShowTime />
      <UpcomingMovies />
    </div>
  );
};

export default MoviePage;
