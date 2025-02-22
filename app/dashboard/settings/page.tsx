'use client';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import React, {useEffect, useRef, useState} from 'react';
import Profile from '@/components/ProfileComponents/Profile';
import useCurrentUser from '@/hooks/useCurrentUser';
import UIPreferences from '@/components/ProfileComponents/UIPreferences';
import {IoArrowBackOutline} from 'react-icons/io5';
import DataSaving from '@/components/ProfileComponents/DataSaving';
import {useTranslation} from 'react-i18next';
import {IoMenuOutline} from 'react-icons/io5';
import {useDebounce} from '@/hooks/useDebounce';
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
    const [long, setLong] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setLong(false);
        }
    };
    const debouncedHandler = useDebounce(handleClickOutside, 300);

    useEffect(() => {
        document.addEventListener('mousedown', debouncedHandler);
        return () => {
            document.removeEventListener('mousedown', debouncedHandler);
        };
    }, []);

    return (
        <>
            <header
                className={`fixed w-full h-2 pt-6 pl-4 z-30`}
                style={{backgroundColor: colors[theme]}}>
                <button onClick={() => router.replace('/dashboard')}>
                    <IoArrowBackOutline size={25} />
                </button>
            </header>
            <main className='w-screen h-screen flex flex-row justify-start items-start overflow-y-hidden'>
                <section ref={navRef}>
                    <IoMenuOutline
                        size={25}
                        onClick={() => {
                            setLong((prev) => !prev);
                        }}
                        className='fixed z-30 top-16 left-4'
                    />
                    <nav
                        className={`${
                            long ? 'flex' : 'hidden'
                        } fixed bg-gray-50 dark:bg-[#101010] md:relative flex-col justify-start items-start w-max mr-12 h-full gap-5 px-4 pt-28 text-xl text-nowrap z-20`}>
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
                </section>

                {user && (
                    <section className='w-full h-full flex flex-col justify-start items-start px-10 overflow-y-scroll'>
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
                    </section>
                )}
            </main>
        </>
    );
}
