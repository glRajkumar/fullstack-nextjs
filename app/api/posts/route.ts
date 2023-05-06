import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/prisma/client';

import { getQueries } from '../utils';

export async function GET(req: Request) {
  const { skip, limit = 10 } = getQueries(req, ["limit", "skip"])

  try {
    const posts = await prisma.post.findMany({
      skip: Number(skip),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
    })

    return NextResponse.json(posts)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json()
    const userId = headers().get("userid") as string

    const post = await prisma.post.create({
      data: {
        title,
        description,
        userId
      }
    })

    return NextResponse.json({ id: post.id, msg: "Post created successfully" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, description } = await req.json()

    await prisma.post.update({
      where: { id },
      data: { title, description }
    })

    return NextResponse.json({ msg: "Post updated successfully" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
