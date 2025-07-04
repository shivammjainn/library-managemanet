import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  try {
    await pool.query(`DELETE FROM public.users WHERE email = $1`, [email]);
    return NextResponse.json(
      { message: "User deleted successfully", email },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting user:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
