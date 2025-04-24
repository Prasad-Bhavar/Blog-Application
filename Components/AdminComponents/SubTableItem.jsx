import React from 'react'

const SubTableItem = ({ email, date, deleteEmail, mongoId }) => {
    const emailDate = new Date(date).toLocaleDateString();
    return (
        <tr className='bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-left'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                {email ? email : "N/A"}
            </th>
            <td className='px-6 py-4 hidden sm:block'>
                {emailDate ? emailDate : "N/A"}
            </td>
            <td onClick={() => deleteEmail(mongoId)} className='px-6 py-4 cursor-pointer text-red-500 '>
                X
            </td>
        </tr>
    )
}

export default SubTableItem
