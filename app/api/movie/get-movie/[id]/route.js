import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    console.log(req);
    
    const { id } = await params; // Extract `id` from `params`

    // Fetch the movie by ID
    const movie = await Movie.findById(id);

    // Check if the movie exists
    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          message: "No movie found",
        },
        { status: 404 } // 404 for not found
      );
    }

    // Return the movie data
    return NextResponse.json(
      {
        success: true,
        message: "Movie found successfully",
        data: movie,
      },
      { status: 200 } // 200 for success
    );
  } catch (error) {
    // Handle errors and send a proper response
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching movie",
        error: error.message,
      },
      { status: 500 } // 500 for server errors
    );
  }
}
