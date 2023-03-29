import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function updateComment(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }
  const { message } = req.body

  try {
    await prisma.comment.update({
      where: { id },
      data: { message }
    })

    return res.json({ msg: "Comment updated successfully" })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  try {
    await prisma.comment.delete({
      where: {
        id
      }
    })

    return res.json({ msg: "Comment deleted successfully" })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") return updateComment(req, res)
  if (req.method === "DELETE") return deleteComment(req, res)
}

export default handler