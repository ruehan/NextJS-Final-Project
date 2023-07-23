import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req, res) => {

    const userSession = req.session.get("user")

    const like = await prisma.like.findMany({
        where: {
            tweetId : Number(req.body.tweetId),
            name : userSession.name
        }
    })

    if(req.method == "POST"){
        console.log("API : like")

        await prisma.like.update({
            where: {
                id : like[0].id
            },
            data: {
                isLiked : !like[0].isLiked
            }
        })
    }

    if(req.method == "GET"){
        console.log("Mutate")
    }

  res.status(200).json({ message: "change heart", like });

};

export default withIronSession(handler, {
    password: "apslfjguenmdksjflsnq249567ajsnfgmskd",
    cookieName: 'my-session-cookie',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
