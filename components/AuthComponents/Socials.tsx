import React from 'react';
import {FaGithub, FaGoogle, FaFacebook, FaYandex} from 'react-icons/fa6';

export default function Socials({color, signIn}: {color: string, signIn: boolean}) {
    return (
        <div
            className={`border border-t-[${color}] border-transparent mt-4`}>
            <p className='text-center w-full my-4'>or Sign {signIn?'In':'Up'} with</p>
            <div className='grid grid-cols-4 grid-rows-1 gap-1 w-full h-8 *:w-full *:h-full'>
                <div className='*:w-full *:h-full hover:border rounded-md border-black py-1'><FaGoogle  /></div>
                <div className='*:w-full *:h-full hover:border rounded-md border-black py-1'><FaGithub  /></div>
                <div className='*:w-full *:h-full hover:border rounded-md border-black py-1'><FaFacebook/></div>
                <div className='*:w-full *:h-full hover:border rounded-md border-black py-1'><FaYandex/></div>
            </div>
        </div>
    );
}
