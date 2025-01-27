import React from 'react';
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5';

export default function Success({success}: {success: string}) {
    return (
        <p className='bg-[#2bd3714f] pl-4 py-1 text-md font-semibold w-full text-emerald-800 border border-emerald-800 rounded-lg flex flex-row justify-start gap-2 mt-4'>
        
            <IoCheckmarkDoneCircleOutline className='mt-1 text-lg' />
            {success}
        </p>
    );
}
