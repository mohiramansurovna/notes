'use client'
import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {useTranslation} from 'react-i18next';
export default function Loading() {
    const {t} = useTranslation();
    return (
        <div className='flex flex-col items-center justify-center w-full h-full bg-gray-50  dark:bg-darkbg absolute-center'>
            <AiOutlineLoading3Quarters
                size={30}
                className='animate-spin text-shadow'
            />
            <p>{t('loading')}</p>
        </div>
    );
}
