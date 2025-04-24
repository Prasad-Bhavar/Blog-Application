import { assets } from '@/Assets/assets'
import React from 'react'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row justify-around bg-black text-white  py-10 px-10 items-center'>
            <Image src={assets.logo_light} alt='logo' width={120} />
            <p className='text-white text-sm'>All rights reserved, Copyright 2025</p>
            <div className='flex gap-2'>
                <Image src={assets.facebook_icon} alt='facebook' width={40} />
                <Image src={assets.twitter_icon} alt='instagram' width={40} />
                <Image src={assets.googleplus_icon} alt='google' width={40} />
            </div>
           
        </div>
    )
}

export default Footer
