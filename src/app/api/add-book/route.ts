import { NextRequest, NextResponse } from 'next/server';
import { books } from '@/constants/Books';

export async function POST(req: NextRequest) {
  try {
    const { name, description, author } = await req.json();

    if (!name || !description || !author) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

    books.push({
      id: newId,
      name,
      description,
      author,
    });

    return NextResponse.json(
      { 
        message: 'Book added successfully',
        book: { id: newId, name, description, author }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}