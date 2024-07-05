'use server'

import { NextResponse } from 'next/server';
import NextAuth from "next-auth"
import { authOptions } from "@/auth"

export async function GET(request: Request) {
  console.log("API Route Hit:", request.url);
  try {
    return await NextAuth(authOptions)(request, NextResponse);
  } catch (error) {
    console.error("NextAuth Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
