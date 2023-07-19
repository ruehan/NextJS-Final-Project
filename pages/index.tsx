import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();

  const { data: user, error: userError } = useSWR('/api/user');

  const { data: tweet, error: tweetError } = useSWR(`/api/tweet`);

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
        <div className="border-r-2 border-gray"></div>
        <div className="border-r-2 border-gray">
          <div className="">
            <h1 className="font-bold text-2xl p-4">Home</h1>
            
            
            {tweet.tweets.map((tweet: any) => (
              <div className="flex flex-col border-t-2 border-b-2 border-gray-100 ">
                <div className="flex p-8 items-center">
                  <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-cover rounded-full"></div>
                  <div className="font-bold ml-4">{tweet.authorId}</div>
                  <div className="text-gray-400 text-sm ml-4">{unix_timestamp(tweet.createdAt)}</div>
                </div>
                <div className="pl-8">{tweet.content}</div>
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