"use client"
import React, { useEffect, useState } from 'react'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios'
import { toast } from 'react-toastify'


const page = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      setBlogs(res.data.blogs);
      // console.log(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBlog = async (mongoId) => {
    
      const res = await axios.delete(`/api/blog`, {
        params: {
          id: mongoId
        }
      });
      // console.log(res.data);
      toast.success(res.data.message);
      fetchBlogs();  
  }
  
  useEffect(() => {
    setLoading(true);
    fetchBlogs();
    setLoading(false);
  }, [])


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 s,:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-sm text text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Author name
              </th>
              <th scope='col' className=' px-6 py-3'>
                Blog Title
              </th>
              <th scope='col' className=' px-6 py-3'>
                Date
              </th>
              <th scope='col' className=' px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr>
              <td colSpan={4} className='text-center'>
                Loading...
              </td>
            </tr> :
              blogs.map((blog, index) => (
                <BlogTableItem key={index} mongoId={blog._id} authorImg={blog.authorImg} title={blog.title} author={blog.author} date={blog.date} deleteBlog={deleteBlog} />
              ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default page
