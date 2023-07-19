import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();

  const { data: user, error: userError } = useSWR('/api/user');

  const { data: tweet, error: tweetError } = useSWR(`/api/tweet`);


  // console.log(tweet.tweets)

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
      {/* <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-xl h-5/6 flex-1 shadow-2xl rounded-2xl relative">
        <h1 className=" text-center text-2xl mt-4">안녕하세요! {user.user.name}님</h1>
        <a href="/create-tweet" className="absolute bottom-4 right-4 flex justify-items-center w-12 h-12 bg-blue-400 text-white text-2xl rounded-full">+</a>
        <a href="/create-tweet" className="absolute bottom-20 right-4 flex justify-items-center w-12 h-12 bg-blue-400 text-white text-2xl rounded-full">P</a>
        </div>
      </div> */}
      <div className="w-full h-screen grid grid-cols-3">
        <div className="border-r-2 border-gray"></div>
        <div className="border-r-2 border-gray">
          <div className="">
            <h1 className="font-bold text-2xl p-4">Home</h1>

            {tweet.tweets.map((tweet: any) => (
              <div className="flex flex-col border-t-2 border-b-2 border-gray-100 ">
                <div className="flex p-8 items-center">
                  <div className="w-12 h-12 bg-black rounded-full"></div>
                  <div className="font-bold ml-4">{tweet.authorId}</div>
                  <div className="text-gray-400 text-sm ml-4">{user.user.email}</div>
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