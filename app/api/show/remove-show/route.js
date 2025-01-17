import connectDB from "@/config/db";
import Movie from "@/models/movieModel";
import showTime from "@/models/showTimeModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const { date, desiredShow } = await req.json();

    const movie = await showTime.findOne({
      show: {
        $elemMatch: { date, showsTime: desiredShow }, // Filters show array to find elements with the specified date
      },
    });

    const filtered = movie.show.filter((show) => {
      return !(
        show.showsTime === desiredShow.toString() &&
        show.date === date.toString()
      );
    });
    movie.show = filtered;
    await movie.save();
    if (movie.show.length === 0) {
     
      await showTime.findByIdAndDelete({ _id: movie._id });
    }
    return NextResponse.json(
      { message: "Show Deleted", show: filtered },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
