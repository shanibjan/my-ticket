import connectDB from "@/config/db";

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  await connectDB();
  const razorpay = new Razorpay({
    key_id: "rzp_test_VYT3qiUFj68Unw",
    key_secret: "UUu8gOXV8YOdqIS2gYtQCTOv",
  });
  try {
    const { amount } = await req.json();
   

    const options = {
      amount: amount, // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt#1",
    };
    const order = await razorpay.orders.create(options);
   

    return NextResponse.json(
      order,

      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    console.error("Error adding movie:", error);
    return NextResponse.json(
      { message: "Error adding movie", error: error.message },
      { status: 500 }
    );
  }
}
