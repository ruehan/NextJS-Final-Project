import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

const Home = () => {
  const router = useRouter();
  const { data: user, error: userError } = useSWR('/api/user');

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

  return <div>Welcome to the home page!</div>; 

};



export default Home