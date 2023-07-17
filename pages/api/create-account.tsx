
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    const user = await prisma.user.create({
      data: { 
        name:username, 
        email:email, 
        password:password },
    });

    res.status(200).json({ message: 'Account created', user });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
