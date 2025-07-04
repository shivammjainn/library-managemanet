import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { email, name, oldEmail } = await req.json();
  try {
    if (!email || !name) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 400 }
      );
    }
    const result = await pool.query(
      `UPDATE public.users SET email = $1, name = $2 WHERE email=$3 RETURNING *`,
      [email, name, oldEmail]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User updated successfully", user: result.rows[0], oldEmail },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { error: "Database error" + err },
      { status: 500 }
    );
  }
}
