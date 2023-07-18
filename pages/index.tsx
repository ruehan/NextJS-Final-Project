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
      <div>안녕하세요! {user.user.name}님</div>
      <a href="/create-tweet">+</a>
    </>
  ) 

};



export default Home