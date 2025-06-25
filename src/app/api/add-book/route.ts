

import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db'; 

export async function POST(req: NextRequest) {
  try {
    const { name, description, author,detail } = await req.json();

    if (!name || !description || !author|| !detail) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const maxIdResult = await pool.query('SELECT MAX(id) FROM public.book_table');
    const maxId = maxIdResult.rows[0].max || 0;
    const newId = Number(maxId) + 1;

    const insertQuery = `
      INSERT INTO public.book_table (id, book_name, description, book_author,detail)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [newId, name, description, author,detail]);
    const newBook = result.rows[0];

    return NextResponse.json(
      { message: 'Book added successfully', book: newBook },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
