import { books } from '@/constants/books';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, description, author } = await req.json();

    if (!name || !description || !author) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const newBook = { id: books.length+1, name, description, author };
    books.push(newBook)

    return NextResponse.json(
      { message: 'Book added successfully', book: newBook },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
