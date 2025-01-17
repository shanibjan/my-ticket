
import User from "@/models/userModel";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    
    
    const { id } = await params; // Extract `id` from `params`
console.log(id);

    // Fetch the movie by ID
    const user = await User.findById(id);
   
    
    const userInterestedMovies=await User.findById(id).select('interestedMovies')
   
    // Check if the movie exists
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "No user found",
        },
        { status: 404 } // 404 for not found
      );
    }

    // Return the movie data
    return NextResponse.json(
      {
       
        
        movies:userInterestedMovies.interestedMovies
      },
      { status: 200 } // 200 for success
    );
  } catch (error) {
    console.log(error);
    
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
