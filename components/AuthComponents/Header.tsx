'use client';
import Link from 'next/link';
import React, {useState} from 'react';
import ThemeSwitch from '../ThemeSwitch';
import {HiMiniLanguage} from 'react-icons/hi2';
import {useTranslation} from 'react-i18next';

export default function HeaderHome() {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState<'en' | 'ru' | 'uz'>(
        i18n.language as 'en' | 'ru' | 'uz'
    );
    return (
        <header className='w-screen h-[100px] px-2 md:px-12 flex flex-row justify-between items-center'>
            <h1 className='text-2xl font-semibold'>
                <span className='text-shadow'>L</span>yrica
            </h1>
            <nav className='flex flex-row items-center justify-between gap-4 min-w-72'>
                <ThemeSwitch />
                <Link
                    className='px-3 py-1 font-semibold rounded-full bg-main dark:bg-darkmain'
                    href='/auth/register'>
                    {t('signUp')}
                </Link>
                <Link
                    className='py-1 font-semibold underline-offset-2 hover:underline'
                    href='/auth/login'>
                    {t('signIn')}
                </Link>
                <button
                    onClick={() => {
                        i18n.changeLanguage(
                            language === 'en' ? 'ru' : language === 'ru' ? 'uz' : 'en'
                        );
                        setLanguage(language === 'en' ? 'ru' : language === 'ru' ? 'uz' : 'en');
                    }}>
                    <p className='inline m-1 font-semibold uppercase'>{language}</p>
                    <HiMiniLanguage
                        size={24}
                        className='inline'
                    />
                </button>
            </nav>
        </header>
    );
}
