import React, { Suspense } from "react";
import AdminMain from "../components/AdminMain";
import axios from "axios";
const fetchMovie = async () => {
  try {
    const res = await axios.get("https://my-ticket-b9fg.vercel.app/api/movie/get-movie");

    return res.data.moviesName;
  } catch (error) {
    console.log(error);
  }
};


const AdminMainPage = async ({}) => {
  const movies = await fetchMovie();
 

  return (
    <div>
      <Suspense>
        <AdminMain
          initialMovies={movies}
          
        />
      </Suspense>
    </div>
  );
};

export default AdminMainPage;
