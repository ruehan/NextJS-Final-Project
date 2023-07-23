
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log(id)

  try {
    if (req.method === 'GET') {
        const reply = await prisma.reply.findMany({
          where: { tweetId: Number(id) },
        });
    
        if (!reply) {
          return res.status(404).json({ message: 'Reply not found' });
        }
    
        res.status(200).json({ reply });
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
  } catch (error) {
    console.log(error)
  }
}
