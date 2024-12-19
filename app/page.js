import Image from "next/image";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";
import axios from "axios";

export default async function Home() {
  let moviesDetails = [];
  let upcomingMovies = [];

  try {
    const res = await axios.get("http://localhost:3000/api/movie/get-movie", {
      cache: "no-store",
    });
   
   
    
    moviesDetails = res.data.movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  try {
    const upcoming = await axios.get("http://localhost:3000/api/movie/get-upcoming-movie", {
      cache: "no-store",
    });
    upcomingMovies = upcoming.data.movies;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
  }

  return (
    <div>
      <NavBar />
      <Banner />
      <Movies moviesDetails={moviesDetails} />
      <UpcomingMovies moviesDetails={upcomingMovies} />
    </div>
  );
}

