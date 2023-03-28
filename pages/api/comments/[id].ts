import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  try {

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") return deleteComment(req, res)
}

export default handler