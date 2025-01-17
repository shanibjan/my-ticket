import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // Extract `id` from `params`
   
    const users = await User.find();
    const matchedMovies = users.filter((user) =>
      user.interestedMovies.includes(id)
    );

    return NextResponse.json(
      {
        length: matchedMovies.length,
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
