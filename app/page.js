
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";
import axios from "axios";

const Home = async ({  }) => {
  let moviesDetails = [];
  let upcomingMovies = [];


  try {
    const res = await fetch("https://my-ticket-b9fg.vercel.app/api/movie/get-movie", {
      method: "GET",
      cache: "no-store", // Ensures fresh data is fetched on every request
    });
    const data = await res.json();
    if(res){
      moviesDetails = data.releasingMovies;
      upcomingMovies = data.upcomingMovies;
    }
    
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

export default Home;