import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { getQueries } from '../../../utils';

type paramsType = { params: { postId: string } }

export async function GET(req: Request, { params }: paramsType) {
  const { skip, limit = 10 } = getQueries(req, ["limit", "skip"])
  const { postId } = params

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
