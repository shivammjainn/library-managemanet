import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id || isNaN(id)) {
    return NextResponse.json(
      { message: "Book ID is required" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { name, description, author, detail, available } = body;
  try {
    if (!name || !description || !author) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const result = await pool.query(
      `UPDATE public.book_table
       SET book_name = $1, description = $2, book_author = $3, detail=$4,available=$5
       WHERE id = $6
       RETURNING *;`,
      [name, description, author, detail, available, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Book updated", book: result.rows[0] },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Database error" + err },
      { status: 500 }
    );
  }
}
