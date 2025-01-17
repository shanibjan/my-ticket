import connectDB from "@/config/db";
import Movie from "@/models/movieModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const { userId, movieId } = await req.json();

    // Validate the data
    if (!userId || !movieId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if(!user){
        return NextResponse.json(
            { message: "User not registered" },
            { status: 400 }
          );
    }
    if (!user.interestedMovies.includes(movieId)) {
      user.interestedMovies.push(movieId);
     
    } else {
      user.interestedMovies = user.interestedMovies.filter(
        (movie) => movie.toString() !== movieId
      );
     
    }
    await user.save();
   

    return NextResponse.json(
      {
        
        interestedMovies:user.interestedMovies,
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
