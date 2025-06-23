import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET;

if (!KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

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
      { expiresIn: '1h' } 
    );

    return NextResponse.json({ token });

  } catch (error) {
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}
