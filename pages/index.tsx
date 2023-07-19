import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import CreateTweetPage from "./create-tweet";

const Home = () => {
  const router = useRouter();

  const { data: user, error: userError } = useSWR('/api/user');

  const { data: tweet, error: tweetError } = useSWR(`/api/tweet`);

  const [showModal, setShowModal] = useState(false);

  function unix_timestamp(t: string){  
    return moment(t).format('YYYY-MM-DD HH:mm:ss')
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

  return (
    <>

      <div className="w-full h-screen grid grid-cols-3">
        <div className="border-r-2 border-gray flex flex-col items-end">
        <input
          type="button"
          value="Home"
          onClick={() => router.push('/')}
          className="w-2/5 h-12 mt-4 rounded-3xl mr-12 font-bold text-2xl"
        />
        <input
          type="button"
          value="Profile"
          onClick={() => router.push(`/profile/${user.user.name}`)}
          className="w-2/5 h-12 mt-4 rounded-3xl mr-12 font-bold text-2xl"
        />
        <input
          type="button"
          value="Tweet"
          onClick={() => router.push('/create-tweet')}
          className="w-2/5 h-12 mt-4 rounded-3xl border-2 border-gray-300 text-white bg-blue-500 mr-12"
        />
        </div>
        <div className="border-r-2 border-gray overflow-scroll scrollbar-hide border-b-2">
          <div className="">
            <h1 className="font-bold text-2xl p-4 sticky top-0 z-10 bg-white/30 backdrop-blur-sm h-24">Home</h1>
            
            {tweet.tweets.map((tweet: any) => (
              <div className="flex flex-col border-t-2 border-b-2 border-gray-100 z-10 hover:bg-gray-100 duration-300">
                <div className="flex p-8 items-center hover:bg-sky:100">
                  <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-orange-200 bg-cover rounded-full border-2 border-white"></div>
                  <div className="font-bold ml-4">{tweet.authorId}</div>
                  <div className="text-gray-400 text-sm ml-4">{unix_timestamp(tweet.createdAt)}</div>
                </div>
                <div className="pl-8 pr-8 pb-8 hover:bg-gray:100">{tweet.content}</div>
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