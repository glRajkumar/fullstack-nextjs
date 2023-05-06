import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

type paramsType = { params: { postId: string } }

export async function GET(req: Request, { params }: paramsType) {
  const { searchParams } = new URL(req.url)
  const { postId } = params
  const limit = searchParams.get("limit") || 10
  const skip = searchParams.get("skip")

  try {
    const comments = await prisma.comment.findMany({
      skip: Number(skip),
      take: Number(limit),
      where: { postId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
    })

    return NextResponse.json(comments)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
