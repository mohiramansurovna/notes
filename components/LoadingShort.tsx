import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

export default function LoadingShort() {
    return (
        <AiOutlineLoading3Quarters
            size={10}
            className='animate-spin opacity-80'
        />
    );
}
