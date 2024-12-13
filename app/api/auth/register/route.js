import User from "@/models/userModel";
import { hashPassword } from "@/helpers/authHelper";
import { NextResponse } from "next/server";

// POST request handler for user signup
export async function POST(req) {
  try {
    const { name, phone, password } = await req.json(); // Parse the JSON body

    // Check if required fields are provided
    if (!name || !phone || !password) {
      return NextResponse.json(
        { success: false, message: "All Fields Are Required" },
        { status: 400 }
      );
    }

    // Validate phone number length
    if (phone.length !== 13) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Check if the user already exists with the same phone number
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Already Registered With This Number" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    console.log(password);

    // Create a new user and save to the database
    const user = await new User({
      name,
      phone,
      password: hashedPassword,
    }).save();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
        user: {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          password: hashedPassword, // Do not expose password in real-world scenarios
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error in Signup", error: error.message },
      { status: 500 }
    );
  }
}
