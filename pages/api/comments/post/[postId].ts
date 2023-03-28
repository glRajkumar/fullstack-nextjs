import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function getAllComments(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query as { postId: string }
  console.log(postId)
  try {
    return postId
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getAllComments(req, res)
}

export default handler