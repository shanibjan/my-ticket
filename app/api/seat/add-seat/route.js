import connectDB from "@/config/db";
import showTime from "@/models/showTimeModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const { seats, movie, showTimematch, date } = await req.json();
    const show = await showTime.findOne({ movie });
    const matchedSeats = show.show.filter(
      (s) => s.showsTime === showTimematch && s.date === date
    );
    if (matchedSeats.length > 0) {
        for (const s of seats) {
          if (matchedSeats[0].seats.includes(s)) {
            return NextResponse.json(
              {
                success: false,
                message: "Seat already booked",
              },
              { status: 400 } // 400 for bad request
            );
          } else {
            matchedSeats[0].seats.push(s);
          }
        }
      } 
    // Validate the data
    await show.save();

    return NextResponse.json(
      {
        success: true,
        message: "Seat booked successfully",
        data: matchedSeats[0],
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
