"use client"
import SubTableItem from '@/Components/AdminComponents/SubTableItem'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
  const [emails, setEmails] = useState([]);
  const fetchEmails = async () => {
    const res = await axios.get('/api/email');
    setEmails(res.data.emails);
  }

  const deleteEmail = async (id) => {
    const res = await axios.delete(`/api/email`,{
      params:{
        id:id
      }
    });
    if(res.data.success){
      toast.success(res.data.message);
      fetchEmails();
    }else{
      toast.error('Failed to delete email');
    }
  }

  useEffect(() => {
    fetchEmails();
  }, []);
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-2xl font-bold'>Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-900 dark:bg-gray-900 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Email Suscriptions
              </th>
              <th scope='col' className='hidden sm:block px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <SubTableItem key={email._id} email={email.email} date={email.date} deleteEmail={deleteEmail} mongoId={email._id}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
