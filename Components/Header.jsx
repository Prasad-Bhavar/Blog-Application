import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);


        const res = await axios.post('/api/email',formData);
        if (res.data.success) {
            toast.success(res.data.message);
            setEmail('');
        } else {
            toast.error("An error occurred");
        }
        // console.log(res);
    }
    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex items-center justify-between'>
                <Image src={assets.logo} alt="logo" width={180} className="w-auto sm:w-[130px] w-[100px]" />
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000] hover:shadow-none transition-all duration-300'> Get Started<Image src={assets.arrow} alt="arrow" width={16} className='w-auto' /></button>
            </div>
            <div className='text-center my-8'>
                <h1 className='text-3xl font-bold sm:text-5xl'>Latest Blogs</h1>
                <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, nisi vel, ex culpa doloribus ab exercitationem</p>

                <form onSubmit={handleSubmit} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000] hover:shadow-none transition-all duration-300'>
                    <input name='email' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='w-full pl-2 outline-none' />
                    <button className='border-1  px-4 py-4 sm:px-8 active:bg-gray-600 active:text-white transition-all duration-300 cursor-pointer'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}

export default Header
