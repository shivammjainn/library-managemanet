import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const result = await pool.query("SELECT role FROM users WHERE email = $1", [
      email,
    ]);
    const role = result.rows[0]?.role;

    if (!role) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ role }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Server error", err }, { status: 500 });
  }
}
