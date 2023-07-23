// pages/api/tweet.js

import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionUser = req.session.get('user');

  // console.log(sessionUser)

  if (!sessionUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { id, reply } = req.body;

    const createReply = await prisma.reply.create({
      data: { 
        tweetId : Number(id), 
        content : reply,
        authorId : "1",
        name: sessionUser.name 
    },
    });


    res.status(200).json({ message: 'Tweet created' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default withIronSession(handler, {
  password: "apslfjguenmdksjflsnq249567ajsnfgmskd",
  cookieName: 'my-session-cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
