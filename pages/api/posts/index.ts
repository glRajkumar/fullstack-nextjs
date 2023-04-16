import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
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

    return res.send(posts)

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.headers.userid as string
    const { title, description } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        description,
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
    const { id, title, description } = req.body

    await prisma.post.update({
      where: { id },
      data: { title, description }
    })

    return res.json({ msg: "Post updated successfully" })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getAllPosts(req, res)
  if (req.method === "POST") return createPost(req, res)
  if (req.method === "PUT") return updatePost(req, res)
}

export default handler