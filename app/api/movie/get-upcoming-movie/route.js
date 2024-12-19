import connectDB from "@/config/db";

import upcomingMovie from "@/models/upcomingMovieModel";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()
  try {
    const movies = await upcomingMovie.find();
    const moviesName = await upcomingMovie.find().select("_id movieName") // Fetch all movies from the database
    return NextResponse.json( {
      success: true,
      message: "Movie found successfully",
      movies,
      moviesName
    },
    { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
