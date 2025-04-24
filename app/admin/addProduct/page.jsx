"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';


const page = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: '',
        description: '',
        category: '',
        author: 'ally john',
        authorImg: '/author_img.png',

    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
        // console.log(data);
        
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(data);
        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('author',data.author);
        formData.append('authorImg',data.authorImg);
        formData.append("image",image);
        
        const response = await axios.post('/api/blog',formData);
        if(response.data.success){
            toast.success(response.data.message);
            setImage(false);
            setData({
                title: '',
                description: '',
                category: 'Startup',
                author: 'ally john',
                authorImg: '/author_img.png',
            });
        }else{
            toast.error(response.data.message);
        }
    }
    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor='thumbnail'>
                    <Image className='mt-4 cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='upload' width={140} height={70} />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='thumbnail' className='hidden' required />
                <p className='text-xl mt-4'>Blog title</p>
                <input onChange={onChangeHandler} name='title' value={data.title} type='text' placeholder='Enter blog title' className='w-full sm:w-[500px] border-2 border-gray-300 rounded-md p-2 mt-4 focus:outline-blue-500' required />
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea onChange={onChangeHandler} name='description' value={data.description} type='text' placeholder='Enter blog content' className='w-full sm:w-[500px] border-2 border-gray-300 rounded-md p-2 mt-4 focus:outline-blue-500 h-[150px]' required />
                <p className='text-xl mt-4'>Blog Category</p>
                <select name='category' onChange={onChangeHandler} value={data.category} className='w-40 border-2 border-gray-300 rounded-md p-2 mt-4 focus:outline-blue-500'
                required  >
                    <option value=''>Select Category</option>
                    <option value='Startup'>Startup</option>
                    <option value='Technology'>Technology</option>
                    <option value='Lifestyle                    '>Marketing</option>

                </select>
                <br />
                <button className='mt-5 w-40 h-12 bg-black text-white rounded-md cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]'>Upload</button>
            </form>
        </>
    )
}

export default page
