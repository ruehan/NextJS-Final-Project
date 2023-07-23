import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';



const MenuLayout = () => {

    const router = useRouter();
    const { data: user } = useSWR('/api/user');

    return (
        <div className="border-r-2 border-gray flex flex-col items-end relative">
        <input
          type="button"
          value="Home"
          onClick={() => router.push('/')}
          className="w-2/5 h-12 mt-4 rounded-3xl mr-12 font-bold text-2xl hover:bg-gray-200 cursor-pointer duration-300"
        />
        <input
          type="button"
          value="Profile"
          onClick={() => router.push(`/profile/${user.user.name}`)}
          className="w-2/5 h-12 mt-4 rounded-3xl mr-12 font-bold text-2xl hover:bg-gray-200 cursor-pointer duration-300"
        />
        <input
          type="button"
          value="Tweet"
          onClick={() => router.push('/create-tweet')}
          className="w-2/5 h-12 mt-4 rounded-3xl border-2 border-gray-300 text-white bg-blue-500 mr-12 cursor-pointer"
        />
        <div className="mr-8 mt-8 absolute bottom-8">
          <div className="font-bold">{user.user.name.toUpperCase()}</div>
          <div className="text-gray-500">{user.user.email.toUpperCase()}</div>
        </div>
        </div>
    )
}

export default MenuLayout;