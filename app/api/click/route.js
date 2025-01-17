// /app/api/store-condition/route.js
import { NextResponse } from "next/server";

let click = false; // Temporary in-memory storage

export async function POST(request) {
  const { click: newCondition } = await request.json();
  click = newCondition;
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ click });
}
