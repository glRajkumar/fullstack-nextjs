import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

async function createComment(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers.userid as string

  try {

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function updateComment(req: NextApiRequest, res: NextApiResponse) {
  try {

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") return createComment(req, res)
  if (req.method === "PUT") return updateComment(req, res)
}

export default handler