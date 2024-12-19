import connectDB from "@/config/db";
import showTime from "@/models/showTimeModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB()
  try {
   
    const { movie } = await params;
   
    
    
    
    
    const matchMovie = await showTime.findOne({ movie })
    
    
    const matchDates = await showTime.findOne({ movie }).select("show.date")
    
    
    const uniqueDates=matchDates.show.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.date === item.date)
    );
    
   
    
  
    
    
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
      
        movie,
        matchMovie,
        uniqueDates
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
