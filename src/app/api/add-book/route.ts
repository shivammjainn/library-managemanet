import { NextRequest, NextResponse } from 'next/server';
import { books } from '@/constants/Books';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const author = formData.get('author') as string;

  const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

  books.push({
    id: newId,
    name,
    description,
    author,
  });

  return NextResponse.redirect(new URL('/', req.url));
}
