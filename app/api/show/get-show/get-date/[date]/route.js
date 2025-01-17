import connectDB from "@/config/db";
import showTime from "@/models/showTimeModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const { date } = await params;

    const matchMovie = await showTime.aggregate([
      {
        $addFields: {
          show: {
            $filter: {
              input: "$show", // The array to filter
              as: "item", // Alias for each array element
              cond: { $eq: ["$$item.date", date] }, // Condition to match the date
            },
          },
        },
      },
      {
        $match: {
          "show.0": { $exists: true }, // Ensure the filtered `show` array is not empty
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field if not needed
          showsTime: "$show.showsTime",
        },
      },
    ]);

    if (!matchMovie) {
      return NextResponse.json(
        {
          success: false,
          message: "No show matched with this date",
        },
        { status: 404 } // 404 for not found
      );
    }

    return NextResponse.json(
      {
        matchMovie,
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
