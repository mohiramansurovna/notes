'use client';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import Profile from '@/components/ProfileComponents/Profile';
import useCurrentUser from '@/hooks/useCurrentUser';
import UIPreferences from '@/components/ProfileComponents/UIPreferences';
import { IoArrowBackOutline } from "react-icons/io5";
import DataSaving from '@/components/ProfileComponents/DataSaving';

export default function Settings() {
    const router = useRouter();
    const user = useCurrentUser();
    return (
        <>
            <header className='fixed bg-shadow dark:bg-darkshadow  w-full h-2 pt-2 pl-4 z-10'>
                <button onClick={() => router.replace('/dashboard')}>
                    <IoArrowBackOutline size={30} />
                </button>
            </header>
            <nav className='flex flex-col  justify-start items-start w-44 h-screen gap-5 pl-5 pt-20 text-xl fixed'>
                <Link href='#profile'className='active:text-darkshadow'>Profile Data</Link>
                <Link href='#uipreferences'className='active:text-darkshadow'>UI Preferences</Link>
                <ul className='flex flex-col justify-center pl-4 -my-2 text-lg'>
                    <li>
                        <Link href='#themes' className='active:text-darkshadow'>Themes</Link>
                    </li>
                    <li>
                        <Link href='#language'className='active:text-darkshadow'>Language</Link>
                    </li>
                    <li>
                        <Link href='#fontsize'className='active:text-darkshadow'>Font size</Link>
                    </li>
                    <li>
                        <Link href='#darkmode'className='active:text-darkshadow'>Dark mode</Link>
                    </li>
                </ul>
                <Link href='#datasaving'className='active:text-darkshadow'>Data Sharing</Link>
                <Link href='#datasaving'className='active:text-darkshadow'>Help</Link>
            </nav>
            {user && (
                <main className='w-[calc(100vw-15rem)] h-screen pt-8 absolute right-0 top-0 scroll-smooth'>
                    <Profile
                        user={user as any}
                        router={router}
                    />
                    <UIPreferences user={user as any} />
                    <DataSaving />
                </main>
            )}
        </>
    );
}
