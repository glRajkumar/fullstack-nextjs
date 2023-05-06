import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

type paramsType = { params: { id: string } }

export async function GET(req: Request, { params }: paramsType) {
  const { id } = params

  try {
    const posts = await prisma.post.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json(posts)

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: paramsType) {
  const { id } = params

  try {
    await prisma.post.delete({
      where: { id }
    })
    return NextResponse.json({ msg: "Post deleted successfully" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
