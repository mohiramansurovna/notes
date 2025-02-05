import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
export default function loading() {
    return (
      
            <div className='absolute-center flex flex-col items-center'>
                <AiOutlineLoading3Quarters
                    size={30}
                    className='animate-spin'
                />
                We are uploading you notes
            </div>
    
    );
}
