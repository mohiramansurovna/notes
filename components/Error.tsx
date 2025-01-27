import React from 'react';
import {CiWarning} from 'react-icons/ci';

export default function Error({error}: {error: string}) {
    return (
        <p className='bg-[#d32b2b4f] pl-4 py-1 text-md font-semibold w-full text-red-800 border border-red-800 rounded-lg flex flex-row justify-start gap-2 mt-4'>
            <CiWarning className='mt-1'/>
            {error}
        </p>
    );
}
