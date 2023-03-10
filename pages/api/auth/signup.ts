import type { NextApiRequest, NextApiResponse } from 'next';
import { genSalt, hash } from 'bcryptjs';
import prisma from '../../../prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, password } = req.body

    const isUserExisting = await prisma.user.findFirst({ where: { email } })
    if (isUserExisting) return res.status(422).json({ message: "User Already Exists...!" })

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    await prisma.user.create({
      data: { name, email, password: hashed }
    })

    return res.json({ message: "User created successful" })
  }
}