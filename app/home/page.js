
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";
import axios from "axios";

export default async function Home() {
  let moviesDetails = [];
  let upcomingMovies = [];


  try {
    const res = await axios.get("https://my-ticket-b9fg.vercel.app/api/movie/get-movie", {
      cache: "no-store",
    });
    console.log(res.data);
    
    moviesDetails = res.data.releasingMovies;
    upcomingMovies = res.data.upcomingMovies;
    console.log(upcomingMovies);
    
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
      <Banner />
      <Movies moviesDetails={moviesDetails} />
      <UpcomingMovies moviesDetails={upcomingMovies} />
    </div>
  );
}
