'use client';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import React, {useState} from 'react';
import Profile from '@/components/ProfileComponents/Profile';
import useCurrentUser from '@/hooks/useCurrentUser';
import UIPreferences from '@/components/ProfileComponents/UIPreferences';
import {IoArrowBackOutline} from 'react-icons/io5';
import DataSaving from '@/components/ProfileComponents/DataSaving';
import {useTranslation} from 'react-i18next';

export default function Settings() {
    const router = useRouter();
    const user = useCurrentUser();
    const {t} = useTranslation();
    const colors: {
        [key: string]: '#600bd5' | '#01ff88' | '#ffff33' | '#ec7d10' | '#fc2f00' | '#ec0868';
    } = {
        purple: '#600bd5',
        green: '#01ff88',
        yellow: '#ffff33',
        orange: '#ec7d10',
        red: '#fc2f00',
        pink: '#ec0868',
    };
    const [theme, setThemes] = useState<'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'pink'>(
        user?.theme
            ? (user.theme as 'purple' | 'green' | 'pink' | 'red' | 'yellow' | 'orange')
            : 'green'
    );
    return (
        <>
            <header
                className={`fixed w-full h-2 pt-2 pl-4 z-10`}
                style={{backgroundColor: colors[theme]}}>
                <button onClick={() => router.replace('/dashboard')}>
                    <IoArrowBackOutline size={30} />
                </button>
            </header>
            <nav className='flex flex-col justify-start items-start w-max-content h-screen gap-5 px-4 pt-20 text-xl fixed text-nowrap'>
                <Link
                    href='#profile'
                    className={`active:text-[${colors[theme]}]`}>
                    {t('profile')}
                </Link>
                <Link
                    href='#uipreferences'
                    className={`active:text-[${colors[theme]}]`}>
                    {t('uiPreferences')}
                </Link>
                <ul className='flex flex-col justify-center pl-4 -my-2 text-lg'>
                    <li>
                        <Link
                            href='#themes'
                            className={`active:text-[${colors[theme]}]`}>
                            {t('themes')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#language'
                            className={`active:text-[${colors[theme]}]`}>
                            {t('language')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#fontsize'
                            className={`active:text-[${colors[theme]}]`}>
                            {t('fontSize')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='#darkmode'
                            className={`active:text-[${colors[theme]}]`}>
                            {t('darkMode')}
                        </Link>
                    </li>
                </ul>
                <Link
                    href='#datasaving'
                    className={`active:text-[${colors[theme]}]`}>
                    {t('dataSharing')}
                </Link>
                <Link
                    href='#datasaving'
                    className={`active:text-[${colors[theme]}]`}>
                    {t('help')}
                </Link>
            </nav>
            {user && (
                <main className='w-[calc(100vw-15rem)] h-screen pt-8 absolute right-0 top-0 scroll-smooth'>
                    <Profile
                        user={user as any}
                        color={colors[theme]}
                    />
                    <UIPreferences
                        user={user as any}
                        setThemes={setThemes}
                        color={colors[theme]}
                        theme={theme}
                    />
                    <DataSaving color={colors[theme]} />
                </main>
            )}
        </>
    );
}
