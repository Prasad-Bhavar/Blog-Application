"use client"
import React, { useEffect, useState } from 'react'
import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from 'next/link'
import axios from 'axios';

const page = ({ params }) => {

  const [data, setData] = useState(null);
  const fetchBlogData = async () => {

    const response = await axios.get(`/api/blog?id=${params.id}`);
    setData(response.data.blog);
    console.log(response.data.blog);
    // or
    // const response2 = await axios.get(`/api/blog?id`,{
    //   params:{
    //     id:params.id
    //   }
    // });
    // console.log(response2.data.blog);
  }

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (data ? <>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href="/">
          <Image src={assets.logo} alt="" width={180} className='w-130px sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000] hover:shadow-none transition-all duration-300'> Get Started<Image src={assets.arrow} alt="arrow" width={16} className='w-auto' /></button>
      </div>
      <div className='text-center my-24'>
        <h1 className='text-2xl font-semibold sm:text-5xl max-w-[700px] mx-auto'>{data.title}</h1>
        <Image src="/author_img.png" alt="" width={90} height={90} className=' w-auto mx-auto mt-6 border border-white rounded-full' />
        <p className='text-sm font-medium text-lg max-w-[700px] mx-auto pt-2'>{data.author}</p>
      </div>
    </div>
    <div className='mx-5 max-w-[800px] md:m-auto mt-[-100px] mb-10 relative top-[-100px]'>
      <Image src={data.image} alt="" width={1280} height={720} className='w-full border-4 border-white rounded-lg' />
      <h1 className='text-2xl font-semibold sm:text-5xl max-w-[700px] mx-auto pt-10'>Introduction</h1>
      {/* <p className='text-sm mt-4 font-medium text-lg max-w-[700px] mx-auto pt-2'>{data.description}</p> */}
      <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }}>
        
      </div>
      <div className='my-24'>
        <p className='text-black font-semibold my-4'>Share this Article on social media</p>
        <div className='flex gap-4'>
          <Image src={assets.facebook_icon} alt="" width={50} height={50} className='w-auto' />
          <Image src={assets.twitter_icon} alt="" width={50} height={50} className='w-auto' />
          <Image src={assets.googleplus_icon} alt="" width={50} height={50} className='w-auto' />
        </div>
      </div>
    </div>
    <Footer />
  </> : <></>
  )
}

export default page
