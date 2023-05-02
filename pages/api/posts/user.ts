import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers.userid as string
  const { skip, limit } = req.query

  try {
    const posts = await prisma.post.findMany({
      skip: Number(skip),
      take: Number(limit),
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return res.send(posts)

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getAllPosts(req, res)
}

export default handler