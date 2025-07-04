import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { email, disable } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }
    const result = await pool.query(
      `UPDATE public.users SET disabled = $1 WHERE email = $2 RETURNING *`,
      [!disable, email]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "user status updated", result },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "error updating status", err },
      { status: 500 }
    );
  }
}
