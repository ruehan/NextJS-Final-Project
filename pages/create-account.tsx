import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateAccountPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Perform account creation logic
    const response = await fetch('/api/create-account', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/log-in');
    } else {
      console.error('Failed to create account');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div  className="max-w-2xl h-5/6 flex-1 border-solid border-2 border-indigo-600 rounded-2xl bg-black relative">
      <h1 className="text-white text-center text-2xl mt-4">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-10/12 justify-center items-center self-center ml-14">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-3/4 h-12 mt-4 rounded-2xl"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-3/4 h-12 mt-4 rounded-2xl"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-3/4 h-12 mt-4 rounded-2xl"
        />
        
        <button type="submit" className="bg-white mt-4 rounded-2xl w-2/4 h-12 text-xl">Create Account</button>
        
        <div className="text-white flex mt-12">
                <p>이미 계정이 있으신가요?</p>
                <a href="/log-in" className="text-blue-500 ml-2">로그인하기</a>
              </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateAccountPage;
