
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import Layout from '../layout/MenuLayout';
import moment from 'moment';
import { useState } from 'react';

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
//   console.log(id)
  const { data: tweet, error: tweetError } = useSWR(`/api/tweet/${id}`);
  const { data: replies, error: replyError } = useSWR(`/api/reply/${id}`);

  console.log(replies)

  const [reply, setReply] = useState('');

  if (!tweet) {
    return <div>Loading...</div>;
  }

  if (tweetError) {
    return <div>Error fetching tweet</div>;
  }

  function unix_timestamp(t: string){  
    return moment(t).format('YYYY-MM-DD HH:mm:ss')
  }

  const clickReply = async () => {
    await fetch('/api/create-reply', {
      method: 'POST',
      body: JSON.stringify({ id : id, reply : reply}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setReply("")

    mutate(`/api/reply/${id}`)
    // router.push(`/tweet/${id}`)
  }

  if(!replies) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full h-screen grid grid-cols-3">
        <Layout />
        <div className="border-r-2 border-gray overflow-scroll scrollbar-hide border-b-2">
          <div className="">
            <h1 className="font-bold text-2xl p-4 sticky top-0 z-10 bg-white/30 backdrop-blur-sm h-24">Tweet</h1>
            <div className="flex flex-col border-t-2 border-b-2 border-gray-100">
                <div className="flex p-8 items-center" >
                  <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-orange-200 bg-cover rounded-full border-2 border-white" ></div>
                  <div className="font-bold ml-4">{tweet.tweet.authorId}</div>
                  <div className="text-gray-400 text-sm ml-4" >{unix_timestamp(tweet.tweet.createdAt)}</div>
                  
                </div>
                <div className="pl-8 pr-8 pb-8">{tweet.tweet.content}</div>
            </div>
          </div>
          <div className="w-full h-16 border-b-2 border-gray-100 flex items-center">
              <input
              type="text"
              placeholder="Tweet your reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-10/12 h-12 mt-4 mb-4"
            />
            <input
              type="button"
              placeholder="Username"
              value="Reply"
              onClick={clickReply}
              className="w-2/12 h-12 mt-4 rounded-3xl bg-blue-300 font-bold text-white mb-4"
            />
          </div>
          {replies.reply.map((reply: any) => (
            <div className="flex flex-col border-t-2 border-b-2 border-gray-100">
                <div className="flex p-8 items-center" >
                  <div className="w-12 h-12 bg-[url('https://nomadcoders.co/m.svg')] bg-orange-200 bg-cover rounded-full border-2 border-white" ></div>
                  <div className="font-bold ml-4">{reply.name}</div>
                  <div className="text-gray-400 text-sm ml-4" >{unix_timestamp(reply.createdAt)}</div>
                  
                </div>
                <div className="pl-8 pr-8 pb-8">{reply.content}</div>
            </div>
          ))}
        </div>
         
        {/* <div className="border-r-2 border-gray-100"></div> */}
      </div>
    </>
  );
};

export default TweetPage;
