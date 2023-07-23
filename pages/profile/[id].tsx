
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../layout/MenuLayout';

const ProfilePage = () => {
  const router = useRouter();
  const { data: user, error: userError } = useSWR('/api/user');

  const clickLogout = () => {
    router.push('/log-in');
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
          <div className="p-4">
            <div className="font-bold text-xl ">{user.user.name.toUpperCase()}</div>
            <div className="text-sm text-gray-600">{user.user.email.toUpperCase()}</div>
          </div>
        </div>
        <div className="border-r-2 border-gray-100"></div>
      </div>
    </>
  ) 
};

export default ProfilePage;
