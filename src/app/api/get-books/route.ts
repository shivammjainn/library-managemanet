import { books } from '@/constants/books';
import { NextResponse } from 'next/server';

export function GET() {
  try{
    return NextResponse.json({ data: books, status: 200 });
  }
  catch(error){
    return NextResponse.json({
      message:'failed to fetch books'
    },
  {status:500}
  )
  }
}
