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

const AdminMain = ({ initialMovies, initialUpcomingMovies }) => {
  //
  const [isMovie, setIsMovie] = useState("movies");
  const [filteredShow, setFilteredShow] = useState([]);
  const [movies, setMovies] = useState(initialMovies);
  const [upcomingMovies, setUpcomingMovies] = useState(initialUpcomingMovies);
  const [dates, setDates] = useState([]);
  const [isDate, setIsDate] = useState("");
  const [admin, setAdmin] = useState();

  const generateNext7Dates = () => {
    const dates = [];
    const currentDate = new Date();

    for (let i = 0; i < 5; i++) {
      const futureDate = new Date(currentDate); // Clone the current date

      futureDate.setDate(currentDate.getDate() + i); // Add i days to the current date

      const formattedDate = futureDate
        .toLocaleDateString("en-US", {
          month: "short", // Short month name (e.g., DEC)
          day: "2-digit", // Two-digit day (e.g., 18)
        })
        .toUpperCase()
        .replace(" ", "-");

      dates.push(formattedDate);
      setDates(dates);
    }

   
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/movie/get-movie");
      setMovies(res.data.moviesName); // Update the state with new data
    } catch (error) {
      console.error("Error re-fetching movies:", error);
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
      setUpcomingMovies(upcoming.data.moviesName);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  

  const fetchFilteredShow = async () => {
    try {
      if (isDate) {
        const res = await axios.get(
          `http://localhost:3000/api/show/get-show/get-date/${isDate}`
        );
        setFilteredShow([]);
        res.data.matchMovie.forEach((s) => {
          s.showsTime.forEach((w) => {
            setFilteredShow((prev) => [...new Set([...prev, w])]); // Use Set to avoid duplicates
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsDate(dates[0]);
  }, [dates]);
  useEffect(() => {
    generateNext7Dates();
  }, []);
  useEffect(() => {
    fetchFilteredShow();
  }, [isDate]);

  
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
    fetchUpcomingMovies();
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
              <div className="flex justify-between mt-[60px] px-[2%]">
                <div className="w-[45%] ">
                  <h1
                    onClick={() => setIsAddMovie(true)}
                    className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F]  p-[1%]"
                  >
                    Add Movies
                  </h1>
                  <div className="flex justify-between mt-[50px]">
                    <h1
                      onClick={() => setIsMovie("movies")}
                      className={`font-QSemi px-[3%] cursor-pointer py-[1%] ${
                        isMovie === "movies"
                          ? "border-[1px] text-[#CE567F] border-[#CE567F]  "
                          : ""
                      }`}
                    >
                      Movies
                    </h1>
                    <h1
                      onClick={() => setIsMovie("upcoming")}
                      className={`font-QSemi px-[3%] cursor-pointer py-[1%] ${
                        isMovie === "upcoming"
                          ? "border-[1px] text-[#CE567F] border-[#CE567F]  "
                          : ""
                      }`}
                    >
                      Upcoming movies
                    </h1>
                  </div>

                  <div className=" my-[50px] ">
                    <div className=" w-full">
                      {isMovie === "movies" && (
                        <div className="grid gap-y-[20px]">
                          {movies &&
                            movies.map((movie, i) => {
                              return (
                                <div
                                  key={i}
                                  className="w-full flex justify-between items-center px-[3%] py-[1%] mx-auto border-[1px] border-gray-300"
                                >
                                  <h1 className="font-QRegular">
                                    {movie.movieName}
                                  </h1>
                                  <FontAwesomeIcon
                                    onClick={() => deleteMovies(movie._id)}
                                    className="text-[#CE567F] cursor-pointer"
                                    icon={faTrash}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>

                    <div className=" w-full">
                      {isMovie === "upcoming" && (
                        <div className="grid gap-y-[20px]">
                          {upcomingMovies &&
                            upcomingMovies.map((movie, i) => {
                              return (
                                <div
                                  key={i}
                                  className="w-full flex justify-between items-center px-[3%] py-[1%] mx-auto border-[1px] border-gray-300"
                                >
                                  <h1 className="font-QRegular">
                                    {movie.movieName}
                                  </h1>
                                  <FontAwesomeIcon
                                    onClick={() => deleteMovies(movie._id)}
                                    className="text-[#CE567F] cursor-pointer"
                                    icon={faTrash}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[45%]">
                  <h1
                    onClick={() => setIsAddShow(true)}
                    className=" mx-auto cursor-pointer flex w-[20%] justify-center font-QSemi items-center text-[#CE567F] max-[715px]:text-[13px] border-[1px] border-[#CE567F]  p-[1%]"
                  >
                    Add Shows
                  </h1>
                  <div className="flex justify-between mt-[50px]">
                    {dates.map((date, i) => {
                      return (
                        <h1
                          key={i}
                          onClick={() => setIsDate(date)}
                          className={`font-QSemi px-[3%] cursor-pointer py-[1%] ${
                            isDate === date
                              ? "border-[1px] text-[#CE567F] border-[#CE567F]  "
                              : ""
                          }`}
                        >
                          {date}
                        </h1>
                      );
                    })}
                  </div>
                  <div className="flex justify-between my-[50px]">
                    {filteredShow &&
                      filteredShow.map((show, i) => {
                        return (
                          <span
                            key={i}
                            className=" text-center border-[1px] text-[#21C179] border-gray-200 px-[2%] py-[1%] font-QMedium "
                          >
                            <h1>{show}</h1>
                          </span>
                        );
                      })}
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
                      <AddShows
                        movies={movies}
                        onDataSend={handleDataFromAddShows}
                      />
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
