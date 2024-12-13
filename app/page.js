import Image from "next/image";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";
import axios from "axios";

export default async function Home() {
  
  const res = await axios.get("http://localhost:3000/api/movie/get-movie", {
    cache: "no-store", // To disable caching, if necessary
  });
  
  return (
    <div >
      
      <NavBar/>
      <Banner/>
      <Movies moviesDetails={res.data} />
      <UpcomingMovies/>
    </div>
  );
}
