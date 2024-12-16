import connectDB from "@/config/db";

import upcomingMovie from "@/models/upcomingMovieModel";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()
  try {
    const movies = await upcomingMovie.find(); // Fetch all movies from the database
    return NextResponse.json(movies, { status: 200 }); // Return response with status 200
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
