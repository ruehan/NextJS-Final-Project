
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

    <div className="w-full h-screen grid grid-cols-3">
        <div className="border-r-2 border-gray flex flex-col items-end">
        <input
          type="button"
          value="Home"
          onClick={() => router.push('/')}
          className="w-2/5 h-12 mt-4 rounded-3xl mr-12 font-bold text-2xl"
        />
        <input
          type="button"
          value="Profile"
          onClick={() => router.push(`/profile/${user.user.name}`)}
          className="w-2/5 h-12 mt-4 rounded-3xl mr-12 font-bold text-2xl"
        />
        <input
          type="button"
          value="Tweet"
          onClick={() => router.push('/create-tweet')}
          className="w-2/5 h-12 mt-4 rounded-3xl border-2 border-gray-300 text-white bg-blue-500 mr-12"
        />
        </div>
        <div className="border-r-2 border-gray border-b-2">
          <div className="">
            <h1 className="font-bold text-2xl p-4 sticky top-0 z-10 bg-white/30 backdrop-blur-sm h-24">Tweet</h1>
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
        <div className="border-r-2 border-gray-100"></div>
      </div>

    // <div className="w-full h-screen flex items-center justify-center ">
    //     <div className="max-w-xl h-5/6 flex-1 shadow-2xl rounded-2xl relative bg-white">
    //   <h1 className=" text-center text-2xl mt-4">Create Tweet</h1>
      
    // </div>
    // </div>
  );
};

export default CreateTweetPage;
