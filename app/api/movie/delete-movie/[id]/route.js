import connectDB from "@/config/db";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await connectDB()
  try {
    const{id}=await params
    console.log(id);
    
    await Movie.findByIdAndDelete(id);
    // const moviesName = await Movie.find().select("_id movieName") // Fetch all movies from the database
    return NextResponse.json( {
      success: true,
      message: "Movie deleted successfully",
      
    },
    { status: 200 }); // Return response with status 200
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
