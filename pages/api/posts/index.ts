import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
  const userId = "clfgbjwh1000290ukuzi5qo4w"

  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return res.send(posts)

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, userId } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        userId
      }
    })

    return res.json({ id: post.id, msg: "Post created successfully" })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function updatePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, title } = req.body

    await prisma.post.update({
      where: { id },
      data: { title }
    })

    return res.json({ msg: "Post updated successfully" })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getAllPosts(req, res)

  } else if (req.method === "POST") {
    return createPost(req, res)

  } else if (req.method === "PUT") {
    return updatePost(req, res)

  }
}

export default handler