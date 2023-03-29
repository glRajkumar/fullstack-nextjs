import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function createComment(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers.userid as string
  const { message, postId } = req.body

  try {
    const data = await prisma.comment.create({
      data: {
        message,
        userId,
        postId
      }
    })

    return res.json({ msg: "Comment added successfully", commentId: data.id })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") return createComment(req, res)
}

export default handler