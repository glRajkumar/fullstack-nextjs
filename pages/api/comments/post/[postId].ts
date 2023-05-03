import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function getAllComments(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query as { postId: string }
  const { skip, limit = 10 } = req.query

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

    return res.send(comments)

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getAllComments(req, res)
}

export default handler