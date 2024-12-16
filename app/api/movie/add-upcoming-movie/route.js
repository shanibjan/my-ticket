import connectDB from "@/config/db";
import upcomingMovie from "@/models/upcomingMovieModel";

import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB()
  try {
    const { movieName, language, duration, certificate, genre, image, trailerId } = await req.json()
   

    // Validate the data
    if (
      !movieName ||
      !language ||
      !duration ||
      !certificate ||
      !genre ||
      !image ||
      !trailerId
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingMovie = await upcomingMovie.findOne({ movieName, language, trailerId });
    console.log(existingMovie);
    

    if (existingMovie) {
      return NextResponse.json(
        { message: "This movie already exists" },
        { status: 400 }
      );
    }

    // Save the new movie
    const movie = await new upcomingMovie({
        movieName, language, duration, certificate, genre, image, trailerId 
    }).save();

    return NextResponse.json(
      {
        success: true,
        message: "Movie added successfully.",
        movie,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding movie:", error);
    return NextResponse.json(
      { message: "Error adding movie", error: error.message },
      { status: 500 }
    );
  }
}
