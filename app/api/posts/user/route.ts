import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = searchParams.get("limit") || 10
  const skip = searchParams.get("skip")

  const userId = headers().get("userid") as string

  try {
    const posts = await prisma.post.findMany({
      skip: Number(skip),
      take: Number(limit),
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(posts)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
