import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Layout from "./layout/MenuLayout";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

const Home = () => {
  const router = useRouter();

  const { data: user, error: userError } = useSWR('/api/user');

  const { data: tweet, error: tweetError, mutate: tweetMutate } = useSWR(`/api/tweet`);

  // const { data: liked, error: likedError } = useSWR(`/api/like`);


  const handleTweetClick = (id: number) => {
      router.push(`/tweet/${id}`)
  }

  function unix_timestamp(t: string){  
    return moment(t).format('YYYY-MM-DD HH:mm:ss')
  }

  const requestUpdate = async (id) => {
    await fetch('/api/like', {
      method: 'POST',
      body: JSON.stringify({ tweetId : id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const clickLike = async (e) => {

    if (!tweet) return;
    // tweetMutate(...tweet, tweet.tweets, [...tweet.tweets, {isLiked: true}], false)

    await requestUpdate(e.target.id)
    
    mutate('/api/tweet')  
  }

  useEffect(() => {
    if (userError) {
      router.push('/log-in');
    }
  }, [userError]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!user.isLoggedIn) {
    router.push('/log-in');
    return <div>Loading...</div>;
  }

  if(!tweet) {
    return <div>Loading...</div>;
  }

  console.log(tweet)

  return (
    <>
      <div className="w-full h-screen grid grid-cols-3">
        <Layout />
        <div className="border-r-2 border-gray overflow-scroll scrollbar-hide border-b-2">
          <div className="">
            <h1 className="font-bold text-2xl p-4 sticky top-0 z-10 bg-white/30 backdrop-blur-sm h-24">Home</h1>
            
            {tweet.tweets.map((tweet: any) => (
              <div className="flex flex-col border-t-2 border-b-2 border-gray-100 hover:bg-gray-100 duration-300"  >
                <div className="flex p-8 items-center" >
                  <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-orange-200 bg-cover rounded-full border-2 border-white" ></div>
                  <div className="font-bold ml-4">{tweet.authorId}</div>
                  <div className="text-gray-400 text-sm ml-4" >{unix_timestamp(tweet.createdAt)}</div>
                </div>
                <div className="pl-8 pr-8 pb-8 hover:bg-gray:100 cursor-pointer" id={tweet.id} onClick={e => handleTweetClick(e.target.id)}>{tweet.content}</div>
                <div onClick={clickLike} id={tweet.id}>
                  {tweet.isLiked ? <AiFillHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 cursor-pointer" /> :
                  <AiOutlineHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 cursor-pointer" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-r-2 border-gray-100"></div>
      </div>
    </>
  ) 

};



export default Home