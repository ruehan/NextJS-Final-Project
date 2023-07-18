
import { useRouter } from 'next/router';
import useSWR from 'swr';

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: tweet, error: tweetError } = useSWR(`/api/tweet/${id}`);

  if (!tweet) {
    return <div>Loading...</div>;
  }

  if (tweetError) {
    return <div>Error fetching tweet</div>;
  }

  return (
    <div>
      <h1>Tweet</h1>
      <p>ID: {tweet.id}</p>
      <p>Content: {tweet.content}</p>
      <p>Author: {tweet.author}</p>
    </div>
  );
};

export default TweetPage;
