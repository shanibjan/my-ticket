import React, { Suspense } from "react";
import AdminMain from "../components/AdminMain";
import axios from "axios";
const fetchMovie = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/movie/get-movie");

    return res.data.moviesName;
  } catch (error) {
    console.log(error);
  }
};
const fetchUpcomingMovies = async () => {
  try {
    const upcoming = await axios.get(
      "http://localhost:3000/api/movie/get-upcoming-movie",
      {
        cache: "no-store",
      }
    );
    return upcoming.data.moviesName;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
  }
};

const AdminMainPage = async ({}) => {
  const movies = await fetchMovie();
  const upcomingMovies = await fetchUpcomingMovies();

  return (
    <div>
      <Suspense>
        <AdminMain
          initialMovies={movies}
          initialUpcomingMovies={upcomingMovies}
        />
      </Suspense>
    </div>
  );
};

export default AdminMainPage;
