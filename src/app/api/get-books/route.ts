import pool from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM public.book_table ORDER BY id ASC"
    );
    const books = result.rows;
    return NextResponse.json({ data: books, status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
