import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

type paramsType = { params: { id: string } }

export async function PUT(req: Request, { params }: paramsType) {
  const { message } = await req.json()
  const { id } = params

  try {
    await prisma.comment.update({
      where: { id },
      data: { message }
    })

    return NextResponse.json({ msg: "Comment updated successfully" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: paramsType) {
  const { id } = params

  try {
    await prisma.comment.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ msg: "Comment deleted successfully" })

  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 })
  }
}
