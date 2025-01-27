import Link from 'next/link';
import React from 'react';

export default function Home() {
    return (
        <main className='w-screen h-[calc(100vh-100px) p-4 grid grid-cols-7 grid-rows-3 gap-4'>
            <div className='bg-primary rounded-3xl row-span-2'></div>
            <div className='bg-primary rounded-3xl col-span-2'></div>
            <div className='bg-primary rounded-3xl'></div>
            <div className='bg-transparent rounded-3xl'></div>
            <div className='bg-primary rounded-3xl row-span-2'></div>
            <div className='bg-primary rounded-3xl'></div>
            <div className='bg-primary rounded-3xl row-span-2'></div>
            <div className='bg-transparent rounded-3xl col-span-3 flex flex-col items-center justify-center gap-4 pt-8'>
                <h2 className='font-kite-one font-thin text-2xl text-center leading-relaxed'>Turn your emotions into words,<br/>softly and truly.</h2>
                <Link href='/auth/register' className='bg-highlight py-1 px-3 rounded-full font-semibold text-white hover:bg-activehighlight'>Get Started</Link>
            </div>
            <div className='bg-primary rounded-3xl row-span-2'></div>
            <div className='bg-primary rounded-3xl'></div>
            <div className='bg-primary rounded-3xl'></div>
            <div className='bg-transparent rounded-3xl'></div>
            <div className='bg-primary rounded-3xl col-span-2'></div>
        </main>
    );
}
