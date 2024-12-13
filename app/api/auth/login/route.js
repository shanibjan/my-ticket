import User from "@/models/userModel";
import { comparePassword } from "@/helpers/authHelper";
import { NextResponse } from "next/server";

// POST request handler for login
export async function POST(req) {
  try {
    const { phone, password } = await req.json(); // Parse the request body

    console.log(phone);

    if (!phone || !password) {
      return NextResponse.json(
        { success: false, message: "All Fields Are Required" },
        { status: 400 }
      );
    }

    if (phone.length !== 13) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ phone });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Not Registered with this Number" },
        { status: 400 }
      );
    }

    const match = await comparePassword(password, existingUser.password);

    if (!match) {
      return NextResponse.json(
        { success: false, message: "Invalid Password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          phone: existingUser.phone,
          password: existingUser.password,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in login", error: error.message },
      { status: 500 }
    );
  }
}
