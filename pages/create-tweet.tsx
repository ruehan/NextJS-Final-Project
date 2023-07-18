
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';

const CreateTweetPage = () => {
  const [content, setContent] = useState('');
  const router = useRouter();
  const { data: user } = useSWR('/api/user');

  console.log(user)

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!user) {
      console.error('User not logged in');
      return;
    }

    const newTweet = {
      authorId: user.user.name,
      content,
    };

    try {
      await fetch('/api/create-tweet', {
        method: 'POST',
        body: JSON.stringify(newTweet),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      mutate('/api/user'); // Refresh user data
      setContent(''); // Clear input field
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center ">
        <div className="max-w-xl h-5/6 flex-1 shadow-2xl rounded-2xl relative">
      <h1 className=" text-center text-2xl mt-4">Create Tweet</h1>
      {user && (
        <form onSubmit={handleSubmit}>
            <div>{user.user.name}</div>
          <div className="flex flex-col w-10/12 h-max justify-center items-center self-center ml-14">
          <textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 mt-4 p-4 rounded-2xl border-solid border-2 border-black"
          />
          <button type="submit">Tweet</button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default CreateTweetPage;
