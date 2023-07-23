import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from 'next-iron-session';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;


    const users = await prisma.user.findMany({
        where: { name : username },
    })

    // console.log(users)
    
    if (!users[0] || users[0].password !== password) {
        console.log("Something went wrong")
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.set('user', { email: users[0].email, name: users[0].name });
    await req.session.save();

    // req.session.destory()

    res.status(200).json({ message: 'Logged in', users });
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