import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const KEY = "shivam";

export async function POST(req: NextRequest) {
  const body = await req.formData();

  const username = body.get('username');
  const password = body.get('password');

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const isAdmin = username === "admin" && password === "admin";

  const token = jwt.sign(
    {
      username,
      admin: isAdmin,
    },
    KEY,
    { expiresIn: 100}
  );

  return NextResponse.json({ token });
}
