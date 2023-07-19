import { useState } from 'react';
import { useRouter } from 'next/router';
import LoginModal from '../component/loginmodal';

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

  const onClick = () => {
    router.push('/log-in');
  };

  return (
    <div className="w-full h-screen grid grid-cols-2">
        <div className="bg-[url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')]"></div>
        <div className="flex flex-col w-full h-screen justify-center p-8">
            <div>
                <div className="text-6xl font-bold mb-16">Happening now</div>
                <div className="text-2xl font-bold">Join Twitter today.</div>
            </div>
            <div>
            <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full items-start ">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-1/3 h-12 mt-4 rounded-3xl border-2 border-gray-300 "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-1/3 h-12 mt-4 rounded-3xl border-2 border-gray-300" 
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-1/3 h-12 mt-4 rounded-3xl border-2 border-gray-300 "
        />
        
        
        <button type="submit" className="bg-blue-500 text-white mt-4 rounded-3xl w-1/3 h-12 text-md border-2 border-gray-300">Create Account</button>
        
        <div className="flex-1 mt-12 w-full">
                <p>Already have an account?</p>
                {/* <a href="/log-in" className="text-blue-500 ml-2">로그인하기</a> */}
                <input
                  type="button"
                  value="Sign in"
                  onClick={onClick}
                  className="w-1/3 h-12 mt-4 rounded-3xl border-2 border-gray-300 text-blue-500"
                />
              </div>
        </div>
      </form>
            </div>
        </div>
        
    </div>
  );
};

export default CreateAccountPage;
