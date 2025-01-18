import connectDB from "@/config/db";
import Movie from "@/models/movieModel";
import showTime from "@/models/showTimeModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const movies = await Movie.find();
    const moviesName = await Movie.find().select("_id movieName status");
    const show = await showTime.find();

    
    const upcomingMovies = movies.filter(
      (movie) => movie.status === "upcoming"
    );

    const releasingMovies = movies.filter((obj1) =>
      show.some((obj2) => obj1._id.toString() === obj2.movie.toString())
    );
    console.log(releasingMovies);
    
    
    

    return NextResponse.json(
      {
        success: true,
        message: "Movie found successfully",
        movies,
        moviesName,
        releasingMovies,
        upcomingMovies,
      },
      { status: 200 }
    ); // Return response with status 200
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
