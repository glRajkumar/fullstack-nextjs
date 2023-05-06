import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/prisma/client';

import { getQueries } from '../../utils';

export async function GET(req: Request) {
  const { skip, limit = 10 } = getQueries(req, ["limit", "skip"])
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
