import { NextResponse } from 'next/server';
import { books } from '@/constants/Books';
export function GET() {
  return NextResponse.json(books);
}
