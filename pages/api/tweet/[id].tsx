
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log(id)

  try {
    if (req.method === 'GET') {
        const tweet = await prisma.tweet.findUnique({
          where: { id: Number(id) },
        });
    
        if (!tweet) {
          return res.status(404).json({ message: 'Tweet not found' });
        }
    
        res.status(200).json({ tweet });
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
  } catch (error) {
    console.log(error)
  }
}
