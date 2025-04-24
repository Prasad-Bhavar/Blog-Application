
import Image from 'next/image'
import React from 'react'


const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {

    const blogDate = new Date(date);

    return (
        <tr className='bg-white border-b '>
            <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium  whitespace-nowrap '>

                <Image src='/author_img.png' alt='author' width={40} height={40} />
                <p>{author ? author : 'Anynomous'}</p>
            </th>
            <td className='px-6 py-4'>
                {title ? title : 'no title'}
            </td>
            <td className='px-6 py-4'>
                {date ? blogDate.toLocaleDateString('en-US') : "11 Jan 2024"}
            </td>
            <td onClick={() => deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer animate-pulse hover:text-red-500'>
                x
            </td>

        </tr>
    )
}

export default BlogTableItem
