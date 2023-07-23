import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Layout from "./layout/MenuLayout";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Home = () => {
  const router = useRouter();

  const MySwal = withReactContent(Swal)

  const { data: user, error: userError } = useSWR('/api/user');

  const { data: tweet, error: tweetError, mutate: tweetMutate } = useSWR(`/api/tweet`);

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

    await requestUpdate(e.target.id)

    MySwal.fire({
      title: tweet.tweets.find((tweet) => tweet.id == e.target.id).isLiked ? '좋아요를 취소했습니다.' : '좋아요를 눌렀습니다.',
    })
    
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
                <div className="white-space: pre-wrap; pl-8 pr-8 pb-8 hover:bg-gray:100  relative"  >
                  <div className="w-full z-30 absolute opacity-0 cursor-pointer" id={tweet.id} onClick={e => handleTweetClick(e.target.id)}>{tweet.content}</div>
                  {tweet.content.split("\n").map((line: string) => (
                    <span className="z-0">
                    {line}
                    <br />
                  </span>
                  ))
                  }
                </div>
                <div className="relative flex">
                  <div className="absolute w-12 h-12 left-8 bottom-2 z-30 " onClick={clickLike} id={tweet.id}></div>
                  {tweet.isLiked ? <AiFillHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 cursor-pointer z-0" /> :
                  <AiOutlineHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 cursor-pointer z-0" />}
                  <div className="ml-4 text-gray-500">{tweet.likedUser.length > 1 ? tweet.likedUser.join(", ") : tweet.likedUser}</div>
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