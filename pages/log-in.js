import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LogInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const MySwal = withReactContent(Swal)

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, password)

    const response = await fetch('/api/log-in', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {

      MySwal.fire({
        title: '로그인 성공.',
      })

      
      router.push('/');
    } else {

      MySwal.fire({
        title: '아이디 또는 비밀번호가 일치하지 않습니다.',
      })

      
      console.error('Failed to log in');
    }
  };

  const onClick = () => {
    router.push('/create-account');
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
                className="w-1/3 h-12 mt-4 rounded-3xl border-2 border-gray-300"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-1/3 h-12 mt-4 rounded-3xl border-2 border-gray-300"
              />
        
        <button type="submit" className="bg-blue-500 text-white mt-4 rounded-3xl w-1/3 h-12 text-md border-2 border-gray-300">Sign in</button>
        
        <div className="flex-1 mt-12 w-full">
                <p>Don't have an account?</p>
                <input
                  type="button"
                  value="Create Account"
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

export default LogInPage;
