
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import Layout from '../layout/MenuLayout';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import moment from 'moment';

const ProfilePage = () => {
  const router = useRouter();
  const { data: user, error: userError } = useSWR('/api/user');

  const { data: tweet, error: tweetError } = useSWR(`/api/tweet`);

  const clickLogout = () => {
    router.push('/log-in');
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

    console.log(e.target)
    console.log(e.target.id)

    if (!tweet) return;

    await requestUpdate(e.target.id)
    
    mutate('/api/tweet')  
  }

  const handleTweetClick = (id: number) => {
    router.push(`/tweet/${id}`)
}

  return (
    <>
      <div className="w-full h-screen grid grid-cols-3">
        <Layout />
        <div className="border-r-2 border-gray overflow-scroll scrollbar-hide border-b-2">
          <div className="relative">
            <h1 className="font-bold text-2xl p-4 sticky top-0 z-10 bg-white/30 backdrop-blur-sm h-24">{user.user.name.toUpperCase()}</h1>  
            <div className="w-full h-40 bg-gray-200 "></div>     
            <div className="h-32 w-32 bg-orange-200 bg-[url('https://nomadcoders.co/m.svg')] bg-cover rounded-full -mt-16 ml-4 border-2 border-white"></div>       
            <div>
              <input
                type="button"
                value="Logout"
                onClick={clickLogout}
                className="w-24 h-12 mt-4 rounded-3xl border-2 border-gray-300 absolute right-2 bottom-0 font-bold" 
              />
            </div>
          </div>
          <div className="p-4 ">
            <div className="font-bold text-xl ">{user.user.name.toUpperCase()}</div>
            <div className="text-sm text-gray-600">{user.user.email.toUpperCase()}</div>
            {
              tweet && tweet.tweets.map((tweet: any) => (
                tweet.authorId === user.user.name && (
                  <div className="flex flex-col border-t-2 border-b-2 border-gray-100">
                  <div className="flex p-8 items-center" >
                    <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-orange-200 bg-cover rounded-full border-2 border-white" ></div>
                    <div className="font-bold ml-4">{tweet.authorId}</div>
                    <div className="text-gray-400 text-sm ml-4" >{unix_timestamp(tweet.createdAt)}</div>
                  </div>
                  <div className="pl-8 pr-8 pb-8 hover:bg-gray:100 cursor-pointer" id={tweet.id} onClick={e => handleTweetClick(e.target.id)}>{tweet.content}</div>
                  <div className="relative flex">
                    <div className="absolute w-12 h-12 left-8 bottom-2 z-30 "  onClick={clickLike} id={tweet.id}></div>
                    {tweet.isLiked ? <AiFillHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 cursor-pointer" /> :
                    <AiOutlineHeart className="ml-8 mb-4 w-8 h-8 z-30 text-red-500 cursor-pointer" />}
                    <div className="ml-4 text-gray-500">{tweet.likedUser.join(", ")}</div>
                  </div>
                </div>
                )
              ))
            }
          </div>
        </div>
        <div className="border-r-2 border-gray-100">
        </div>
      </div>
      
    </>
  ) 
};

export default ProfilePage;
