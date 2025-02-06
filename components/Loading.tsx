'use client'
import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import {useTranslation} from 'react-i18next';
export default function Loading() {
    const {t} = useTranslation();
    return (
        <div className='absolute-center flex flex-col items-center'>
            <AiOutlineLoading3Quarters
                size={30}
                className='animate-spin'
            />
            <p>{t('loading')}</p>
        </div>
    );
}
