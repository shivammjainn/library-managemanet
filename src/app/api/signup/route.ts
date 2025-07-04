import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const KEY = process.env.JWT_SECRET;
import bcrypt from "bcrypt";
const saltRounds = 10;
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    const role = "user";
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "missing credintial" },
        { status: 500 }
      );
    }

    const checkQuery = "SELECT * FROM public.users WHERE email = $1";
    const existingUser = await pool.query(checkQuery, [email]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userQuery = `INSERT INTO public.users(
	email, name, password,role)
	VALUES ($1, $2, $3,$4)
    RETURNING *;
    `;
    const result = await pool.query(userQuery, [
      email,
      name,
      hashedPassword,
      role,
    ]);
    const user = result.rows[0];
    const isAdmin = user.role === "admin";
    const username = user.email;
    const token = jwt.sign(
      {
        username,
        admin: isAdmin,
      },
      KEY!,
      { expiresIn: "1h" }
    );
    return NextResponse.json({
      message: `Welcome ${isAdmin ? "Admin" : "User"} ${user.name}`,
      status: 200,
      token,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
