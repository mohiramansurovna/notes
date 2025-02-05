'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import React from 'react';
import Profile from '@/components/ProfileComponents/Profile';
import useCurrentUser from '@/hooks/useCurrentUser';
import UIPreferences from '@/components/ProfileComponents/UIPreferences';
import { RiHome6Line } from "react-icons/ri";
import { User } from 'next-auth';

export default function Settings() {
  const router=useRouter();
    const user = useCurrentUser();
    return (
        <>
          <header>
            <button onClick={()=>router.replace('/dashboard')}><RiHome6Line size={30}/></button>
          </header>
            <nav className='flex flex-col  justify-start items-start w-40 h-screen gap-5 pl-5 pt-20 text-xl font-semibold fixed'>
                <Link href='#profile'>Profile Data</Link>
                <Link href='#uipreferences'>UI Preferences</Link>
                <ul className='flex flex-col justify-center pl-4 -my-2 text-lg'>
                    <li>
                        <Link
                            href='#themes'>
                            Themes
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='language'>
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
                <main className='w-[calc(100vw-15rem)] h-screen absolute right-0 top-0 scroll-smooth'>
                
                        <Profile user={user as any} router={router}/>
        
                       <UIPreferences user={user as any}/> 
                    

                </main>
            )}
        </>
    );
}
