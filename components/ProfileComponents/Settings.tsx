'use client';
import Link from 'next/link';
import React from 'react';
import Profile from './Profile';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import UIPreferences from './UIPreferences';
export default function Settings({router}:{router:AppRouterInstance}) {
    const user = useCurrentUser();
    return (
        <>
            <nav className='flex flex-col  justify-start items-start w-40 h-screen gap-5 pl-5 pt-20 text-gray-900 text-xl font-semibold'>
                <Link href='#profile'>Profile Data</Link>
                <h2>UI Preferences</h2>
                <ul className='flex flex-col justify-center pl-4 -my-2 text-gray-700 text-lg'>
                    <li>
                        <Link
                            href=''>
                            Themes
                        </Link>
                    </li>
                    <li>
                        <Link
                            href=''>
                            Language
                        </Link>
                    </li>
                    <li>
                        <Link
                            href=''>
                            Font size
                        </Link>
                    </li>
                    <li>
                        <Link
                            href=''>
                            Accessibility
                        </Link>
                    </li>
                </ul>
                <Link href=''>Data Saving</Link>
            </nav>
            {user && (
                <main className='w-[calc(100vw-15rem)] h-screen absolute right-0 top-0 bg-asidebg'>
                    <div id='profile'>
                        <Profile user={user as any} router={router}/>
                    </div>
                    <div>
                       <UIPreferences/> 
                    </div>

                </main>
            )}
        </>
    );
}
