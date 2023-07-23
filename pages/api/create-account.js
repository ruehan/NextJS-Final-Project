import { PrismaClient } from '@prisma/client';
import { withIronSession } from 'next-iron-session';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    const user = await prisma.user.create({
      data: { 
        name:username, 
        email:email, 
        password:password },
    });

    req.session.set('user', { email: user.email, name: user.name });
    await req.session.save();

    res.status(200).json({ message: 'Account created', user });
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