import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function getPost(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

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

    return res.send(posts)

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function deletePost(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  try {
    await prisma.post.delete({
      where: { id }
    })
    return res.json({ msg: "Post deleted successfully" })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getPost(req, res)
  if (req.method === "DELETE") return deletePost(req, res)
}

export default handler