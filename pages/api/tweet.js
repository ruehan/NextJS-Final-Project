import { withIronSession } from 'next-iron-session';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";
import { AiTwotoneSecurityScan } from 'react-icons/ai';

const prisma = new PrismaClient();

const handler = async (req, res) => {

  const sessionUser = req.session.get('user');

  console.log(sessionUser)

  const tweets = (await prisma.tweet.findMany()).reverse();

  const userData = await prisma.user.findMany({
  })

  const usernameData = []

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

  const likesData = (await prisma.like.findMany(
    {}
  ))

  let i = 0
  let likedUser = []


  likes.map((like) => {
    for(i = 0; i < tweets.length; i++){
      if(like.tweetId === tweets[i].id){
        tweets[i]['isLiked'] = like.isLiked
      }
    }
  }
  )

  let object = {}

  let data = []

  console.log(tweets)

  tweets.map((tweet) => {
    for(i = 0; i < likesData.length; i++){
      if(tweet.id === likesData[i].tweetId){
        if(likesData[i].isLiked === true){
          data.push(likesData[i].name)
        }
      }
    }
    tweet['likedUser'] = data
    data = []
  }
  )

  res.status(200).json({ message: "find tweets", tweets });

};

export default withIronSession(handler, {
    password: "apslfjguenmdksjflsnq249567ajsnfgmskd",
    cookieName: 'my-session-cookie',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
