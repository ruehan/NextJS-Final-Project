import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const sessionUser = req.session.get('user');

  console.log(sessionUser)

  if (!sessionUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: sessionUser.email },
  });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ isLoggedIn: true, user });
};

export default withIronSession(handler, {
  password: "apslfjguenmdksjflsnq249567ajsnfgmskd",
  cookieName: 'my-session-cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
