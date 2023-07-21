import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";
import { AiTwotoneSecurityScan } from 'react-icons/ai';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const sessionUser = req.session.get('user');

  console.log(sessionUser)

  const tweets = (await prisma.tweet.findMany()).reverse();



  const userData = await prisma.user.findMany({
  })

  const usernameData: string[] = []

  userData.map((user) => {
    usernameData.push(user.name)
  })

  // console.log(tweets)

    tweets.map(async (tweet) => {
      try {
        const dt = await prisma.like.findMany({
          where: { 
            name : sessionUser.name,
            tweetId : tweet.id,         
          },
        })
  
        if(dt.length === 0){
          await prisma.like.create({
            data: {
                tweetId : tweet.id,
                authorId : tweet.authorId,
                name : sessionUser.name,
                isLiked : false
            },
          })
        }
      } catch (error) {
        console.log(error)
      }
    })
    
  const likes = (await prisma.like.findMany(
    {
      where: { name : sessionUser.name },
    }
  ))

  // console.log(likes)

  // await prisma.like.deleteMany({
  //   where: {
  //     name: {
  //       equals: "admin"
  //     }
  //   }
  // })

  // await prisma.like.deleteMany({
  //   where: {
  //     name: {
  //       equals: "test"
  //     }
  //   }
  // })

  let i = 0

  likes.map((like) => {
    for(i = 0; i < tweets.length; i++){
      if(like.tweetId === tweets[i].id){
        tweets[i]['isLiked'] = like.isLiked
      }
    }
  }
  )

  // console.log(tweets)

  res.status(200).json({ message: "find tweets", tweets });

};

export default withIronSession(handler, {
    password: "apslfjguenmdksjflsnq249567ajsnfgmskd",
    cookieName: 'my-session-cookie',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
