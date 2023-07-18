import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();

  const { data: user, error: userError } = useSWR('/api/user');

  console.log(user, userError)

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

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="max-w-xl h-5/6 flex-1 shadow-2xl rounded-2xl relative">
        <h1 className=" text-center text-2xl mt-4">안녕하세요! {user.user.name}님</h1>
        <a href="/create-tweet" className="absolute bottom-4 right-4 flex justify-items-center w-12 h-12 bg-blue-400 text-white text-2xl rounded-full">+</a>
        </div>
      </div>
    </>
  ) 

};



export default Home