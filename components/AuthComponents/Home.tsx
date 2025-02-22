'use client';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const texts = [
        "greet2",
        "greet3",
        "greet4",
        "greet5",
        "greet6",
        "greet7",
        "greet8",
    ];
    const [index, setIndex] = useState<string|null>("greet1");
    const {t}=useTranslation()
    useEffect(() => {
        let index=1
        const animationInterval = setInterval(() => {
            setIndex(texts[index]);
            index++;
            if (index === texts.length) {
                clearInterval(animationInterval);
                setIndex(null)
            }
        }, 7000);
        return () => {
            clearInterval(animationInterval);
        };
    }, []);
    return (
        <main className='w-screen h-[calc(100vh-100px)] p-4 grid grid-cols-7 grid-rows-3 gap-4'>
            <div className='row-span-2 bg-activebg rounded-50 opacity-5 lg:opacity-20'></div>
            <div className='col-span-2 bg-activebg rounded-50'>
                <Image
                    src='/rafiki.svg'
                    width={300}
                    height={250}
                    alt=''
                    priority={false}
                    className='relative -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2'
                />
            </div>
            <div className='bg-activebg lg:opacity-40 opacity-10 rounded-50'></div>
            <div className='rounded-50'></div>
            <div className='z-20 row-span-2 bg-activebg rounded-50 opacity-5 lg:opacity-20'></div>
            <div className='bg-activebg rounded-50 opacity-10 lg:opacity-20'></div>
            <div className='z-20 row-span-2 bg-activebg rounded-50 opacity-10 lg:opacity-20'></div>
            <div className='z-10 flex flex-col items-center justify-center col-span-3 pt-8 rounded-50 '>
                {index ? (
                    <h2 className='h-24 text-4xl font-thin text-center lg:text-2xl animate-heading font-kite-one'>
                        {t(index)}
                    </h2>
                ) : (
                    <h2 className='h-24 text-4xl font-thin text-center lg:text-2xl animate-up font-kite-one'>
                        {t("greet8")} <span className='font-semibold text-shadow'>Lyrica</span>
                    </h2>
                )}
                <div className='bg-gray-50 dark:bg-[#101010] hidden lg:block z-10 w-full border-2 border-transparent border-t-shadow ' />
                
            </div>
            <div className='row-span-2 opacity-10 bg-activebg rounded-50 lg:opacity-60'></div>
            <div className='bg-[#0C1021] rounded-50'>
                <Image
                    src='/moon.svg'
                    width={200}
                    height={200}
                    alt=''
                    priority={false}
                    className='relative -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                />
            </div>
            <div className='bg-activebg opacity-10 lg:opacity-40 rounded-50'></div>
            <div className='rounded-50'></div>
            <div className='bg-[#0C1021] rounded-50 col-span-2'>
                <Image
                    src='/pana.svg'
                    width={220}
                    height={200}
                    alt=''
                    className='relative -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                    priority={false}
                />
            </div>
        </main>
    );
}
