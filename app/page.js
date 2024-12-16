import Image from "next/image";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";
import axios from "axios";

export default async function Home() {
  
  const res = await axios.get("https://my-ticket-b9fg.vercel.app/api/movie/get-movie", {
    cache: "no-store", // To disable caching, if necessary
  });
  const upcoming = await axios.get("https://my-ticket-b9fg.vercel.app/api/movie/get-upcoming-movie", {
    cache: "no-store", // To disable caching, if necessary
  });
  console.log(upcoming.data);
  

  
  return (
    <div >
      
      <NavBar/>
      <Banner/>
      <Movies moviesDetails={res.data} />
      <UpcomingMovies moviesDetails={upcoming.data} />
    </div>
  );
}
