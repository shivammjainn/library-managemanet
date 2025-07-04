import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
const KEY = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 500 }
      );
    }

    const userQuery = "SELECT * FROM public.users WHERE email = $1";
    const result = await pool.query(userQuery, [email]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (result.rows[0].disabled) {
      return NextResponse.json(
        { error: "User account is disabled" },
        { status: 403 }
      );
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const isAdmin = user.role === "admin";
    const username = user.name;
    const userEmail = user.email;
    const token = jwt.sign(
      {
        username,
        userEmail,
        admin: isAdmin,
      },
      KEY!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: `Welcome ${isAdmin ? "Admin" : "User"} ${result.rows[0].name}`,
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
