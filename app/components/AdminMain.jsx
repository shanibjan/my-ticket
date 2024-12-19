"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AddMovie from "../components/AddMovie";
import AddShows from "./AddShows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const AdminMain = ({ initialMovies,initialUpcomingMovies }) => {
  console.log(initialMovies);
  
  const [movies, setMovies] = useState(initialMovies);
  const [upcomingMovies, setUpcomingMovies] = useState(initialUpcomingMovies);
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/movie/get-movie");
      setMovies(res.data.moviesName); // Update the state with new data
    } catch (error) {
      console.error("Error re-fetching movies:", error);
    }
  };

  const fetchUpcomingMovies=async()=>{
    try {
      const upcoming = await axios.get("http://localhost:3000/api/movie/get-upcoming-movie", {
        cache: "no-store",
      });
     setUpcomingMovies(upcoming.data.moviesName) ;
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  }

  const [admin, setAdmin] = useState();
  const fetchAdmin = async () => {
    try {
      setAdmin(JSON.parse(localStorage.getItem("my-ticket-admin")));
    } catch (error) {}
  };

  const [isLogin, setIsLogin] = useState(false);
  const [isAddMovie, setIsAddMovie] = useState(false);
  const [isAddShow, setIsAddShow] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const success = params.get("success");

  useEffect(() => {
    fetchMovies();
    fetchUpcomingMovies()
  }, [isAddMovie]);

  useEffect(() => {
    fetchAdmin();
  }, [isLogin]);
  const adminLogin = () => {
    setIsLogin(true);
  };
  const adminLogout = () => {
    localStorage.removeItem("my-ticket-admin");
    router.push("/");
  };
  const handleDataFromLogin = (data) => {
    if (data === false) {
      setIsLogin(data);
    }
  };

  const handleDataFromAddMovie = (data) => {
    if (data === false) {
      setIsAddMovie(data);
    }
  };

  const handleDataFromAddShows = (data) => {
    if (data === false) {
      setIsAddShow(data);
    }
  };

  const deleteMovies = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/movie/delete-movie/${id}`);
      fetchMovies();

    } catch (error) {}
  };
  return (
    <div>
      <div>
        {success === "true" ? (
          <h1
            onClick={adminLogout}
            className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#417AB2] max-[715px]:text-[13px] border-[1px] border-[#417AB2]  p-[1%]"
          >
            Admin Logout
          </h1>
        ) : (
          <h1
            onClick={adminLogin}
            className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#417AB2] max-[715px]:text-[13px] border-[1px] border-[#417AB2]  p-[1%]"
          >
            Admin Login
          </h1>
        )}
        <AnimatePresence>
          {isLogin && (
            <div className="overlay">
              <div className=" overlay-content fixed w-full flex h-screen justify-center items-center ">
                <motion.div
                  className="w-[50%] max-[1000px]:w-[80%] max-[900px]:w-[90%] h-[500px] bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <AdminLogin onDataSend={handleDataFromLogin} />
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
        {admin && (
          <div>
            {success === "true" && (
              <div className="flex justify-evenly mt-[60px] px-[2%]">
                <div className="w-[50%] ">
                  <h1
                    onClick={() => setIsAddMovie(true)}
                    className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F]  p-[1%]"
                  >
                    Add Movies
                  </h1>
                  <div className="flex my-[50px] justify-between" >
                    <div className="w-[45%] gap-y-[20px] grid" >
                      <h1 className="font-QSemi" >Movies</h1>
                      {movies &&
                        movies.map((movie, i) => {
                          return (
                            <div
                              key={i}
                              className="w-full flex justify-between items-center px-[3%] py-[1%] mx-auto border-[1px] border-gray-300"
                            >
                              <h1 className="font-QRegular">{movie.movieName}</h1>
                              <FontAwesomeIcon
                                onClick={() => deleteMovies(movie._id)}
                                className="text-[#CE567F] cursor-pointer"
                                icon={faTrash}
                              />
                            </div>
                          );
                        })}
                    </div>

                    <div className="w-[45%] gap-y-[30px] grid" >
                      <h1 className="font-QSemi" >Upcoming movies</h1>
                      {upcomingMovies &&
                        upcomingMovies.map((movie, i) => {
                          return (
                            <div
                              key={i}
                              className="w-full flex justify-between items-center px-[3%] py-[1%] mx-auto border-[1px] border-gray-300"
                            >
                              <h1 className="font-QRegular">{movie.movieName}</h1>
                              <FontAwesomeIcon
                                onClick={() => deleteMovies(movie._id)}
                                className="text-[#CE567F] cursor-pointer"
                                icon={faTrash}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="w-[50%]">
                  <h1
                    onClick={() => setIsAddShow(true)}
                    className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F]  p-[1%]"
                  >
                    Add Shows
                  </h1>
                  <div>
                    <h1>Pushpa</h1>
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence>
              {isAddMovie && (
                <div className="overlay">
                  <div className=" overlay-content fixed w-full flex h-screen justify-center items-center ">
                    <motion.div
                      className="w-[50%] max-[1000px]:w-[80%] max-[900px]:w-[90%] h-[500px] bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AddMovie
                        movies={movies}
                        onDataSend={handleDataFromAddMovie}
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              {isAddShow && (
                <div className="overlay">
                  <div className=" overlay-content fixed w-full flex h-screen justify-center items-center ">
                    <motion.div
                      className="w-[50%] max-[1000px]:w-[80%] max-[900px]:w-[90%] h-[500px] bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AddShows movies={movies} onDataSend={handleDataFromAddShows} />
                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMain;
