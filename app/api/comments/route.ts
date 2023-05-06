import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/prisma/client';

export async function POST(req: Request) {
  const { message, postId } = await req.json()
  const userId = headers().get("userid") as string

  try {
    const data = await prisma.comment.create({
      data: {
        message,
        userId,
        postId
      }
    })

    return NextResponse.json({ msg: "Comment added successfully", commentId: data.id })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
