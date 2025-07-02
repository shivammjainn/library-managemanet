import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();
    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 });
    }
    const newRole='admin'
    const result = await pool.query(
      "UPDATE public.users SET role = $1 WHERE email = $2 RETURNING *",
      [newRole, email]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Role updated successfully", user: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error",error }, { status: 500 });
  }
}
