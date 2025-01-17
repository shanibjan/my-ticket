import { NextResponse } from "next/server";

export async function handler(req) {
    if(req.method==="POST"){
        
    }
  try {
    const { click } = await req.json();

    console.log(click);

    if (!click) {
      return NextResponse.json(
        {
          success: true,
          message: "Seat booked successfully",
          date: false,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Seat booked successfully",
        date: click,
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
