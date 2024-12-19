import connectDB from "@/config/db";
import showTime from "@/models/showTimeModel";
import { NextResponse } from "next/server";


export async function POST(req) {
    await connectDB()
  try {
    const { date, showsTime, movie} = await req.json();
    

    // Validate the data
    if (
      !date ||
      !showsTime ||
      !movie 
     
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    let showAndMovie={showsTime,date}
   
    

    let existingShow = await showTime.findOne({ movie });
   
   
    
    if (existingShow && existingShow.show.some((show) => show.showsTime === showsTime)) {
      return NextResponse.json(
        { message: "Show time already exists for this date" },
        { status: 400 }
      );
    }

    if(!existingShow){
      existingShow= new showTime({movie})
    }
    existingShow.show.push(showAndMovie)
     await existingShow.save();
     console.log(existingShow.show);
     
    
    return NextResponse.json(
      {
        success: true,
        message: "Show added successfully.",
        existingShow,
      },
      { status: 201 }
    );
    // if (existingMovie) {
    //   return NextResponse.json(
    //     { message: "This movie already exists" },
    //     { status: 400 }
    //   );
    // }

    // Save the new movie
    // const movie = await new Movie({
    //     movieName, language, duration, certificate, genre, image, trailerId 
    // }).save();

    // return NextResponse.json(
    //   {
    //     success: true,
    //     message: "Movie added successfully.",
    //     movie,
    //   },
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Error adding movie:", error);
    return NextResponse.json(
      { message: "Error adding movie", error: error.message },
      { status: 500 }
    );
  }
}
