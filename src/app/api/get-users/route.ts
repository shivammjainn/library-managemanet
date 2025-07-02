import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const result= await pool.query("SELECT * FROM public.users ORDER BY id ASC")
        const users=result.rows;
        return NextResponse.json({data:users,status:200})
    }catch(err){
        return NextResponse.json({error:"database error"},{status:500});
    }
}