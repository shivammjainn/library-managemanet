import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

const KEY = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const isAdmin = username === "admin" && password === "admin";

    const userQuery = `INSERT INTO public.user_table (name, "isAdmin") VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(userQuery, [username, isAdmin]);

    const token = jwt.sign(
      {
        username,
        admin: isAdmin,
      },
      KEY!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: `Welcome ${isAdmin ? "Admin" : "User"} ${result.rows[0].name}`,
      status: 200,
      token
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
