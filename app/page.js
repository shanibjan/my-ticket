import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import UpcomingMovies from "./components/UpcomingMovies";

export const dynamic = "force-dynamic"; // Ensures dynamic rendering

const Home = async () => {
  let moviesDetails = [];
  let upcomingMovies = [];

  try {
    const res = await fetch("https://my-ticket-b9fg.vercel.app/api/movie/get-movie", {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    moviesDetails = data.releasingMovies || [];
    upcomingMovies = data.upcomingMovies || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  try {
    await fetch("https://my-ticket-b9fg.vercel.app/api/remove-expired-show", {
      method: "GET",
    });
  } catch (error) {
    console.error("Error removing expired shows:", error);
  }

  return (
    <div>
      <NavBar />
      <Banner />
      <Movies moviesDetails={moviesDetails} />
      <UpcomingMovies moviesDetails={upcomingMovies} />
    </div>
  );
};

export default Home;
