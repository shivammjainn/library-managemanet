import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  
  try{
    if (!id) {
    return NextResponse.json({ message: "Book ID is required" }, { status: 400 });
  }
    const result =await pool.query(`DELETE FROM public.book_table WHERE id=${id}`);
    return NextResponse.json({message:"book deleted",status:200})
  }catch(err){
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
