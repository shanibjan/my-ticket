import Image from "next/image";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";

export default function Home() {
  return (
    <div >
      
      <NavBar/>
      <Banner/>
      <Movies/>
      <UpcomingMovies/>
    </div>
  );
}
