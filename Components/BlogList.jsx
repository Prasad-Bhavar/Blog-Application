"use client"
// import { blog_data } from '@/Assets/assets'
import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

    const [menu, setMenu] = useState("All");

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get("/api/blog");
            setBlogs(response.data.blogs);
            console.log(response.data.blogs);
        }
        fetchBlogs();
    }, []);


    return (
        <div>
            <div className='flex my-10 gap-6 justify-center'>
                <button onClick={() => setMenu("All")} className={menu === "All" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>All</button>
                <button onClick={() => setMenu("Technology")} className={menu === "Technology" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>Technology</button>
                <button onClick={() => setMenu("Startup")} className={menu === "Startup" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>Startup</button>
                <button onClick={() => setMenu("Lifestyle")} className={menu === "Lifestyle" ? 'bg-black text-white px-4 py-1 rounded-sm' : ""}>Lifestyle</button>
            </div>
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs.filter((item) => menu === "All" ? item : item.category === menu).map((item, index) => {
                    return <BlogItem key={index} title={item.title} image={item.image} category={item.category} description={item.description} id={item._id} />
                })}
            </div>
        </div >
    )
}

export default BlogList
