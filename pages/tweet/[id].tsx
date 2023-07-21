
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../layout/MenuLayout';
import moment from 'moment';

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
//   console.log(id)
  const { data: tweet, error: tweetError } = useSWR(`/api/tweet/${id}`);

  if (!tweet) {
    return <div>Loading...</div>;
  }

  if (tweetError) {
    return <div>Error fetching tweet</div>;
  }

  function unix_timestamp(t: string){  
    return moment(t).format('YYYY-MM-DD HH:mm:ss')
  }


  return (
    <>
      <div className="w-full h-screen grid grid-cols-3">
        <Layout />
        <div className="border-r-2 border-gray overflow-scroll scrollbar-hide border-b-2">
          <div className="">
            <h1 className="font-bold text-2xl p-4 sticky top-0 z-10 bg-white/30 backdrop-blur-sm h-24">Tweet</h1>
            <div className="flex flex-col border-t-2 border-b-2 border-gray-100 hover:bg-gray-100 duration-300">
                <div className="flex p-8 items-center" >
                  <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-orange-200 bg-cover rounded-full border-2 border-white" ></div>
                  <div className="font-bold ml-4">{tweet.tweet.authorId}</div>
                  <div className="text-gray-400 text-sm ml-4" >{unix_timestamp(tweet.tweet.createdAt)}</div>
                  
                </div>
                <div className="pl-8 pr-8 pb-8 hover:bg-gray:100 cursor-pointer">{tweet.tweet.content}</div>
            </div>
          </div>
        </div>
        <div className="border-r-2 border-gray-100"></div>
      </div>
    </>
  );
};

export default TweetPage;
