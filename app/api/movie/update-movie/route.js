import connectDB from "@/config/db";
import Movie from "@/models/movieModel";

import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectDB();
  try {
    const { id,updatedStatus } = await req.json();
   
    
    
    const updatedMovie=await Movie.findByIdAndUpdate(id,
        {status:updatedStatus, 
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is applied
      })
    // Validate the data
   
    
       
    return NextResponse.json(
      {
        success: true,
        message: "Movie updated successfully.",
        updatedMovie
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
