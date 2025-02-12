import React from 'react';
import { useTranslation } from 'react-i18next';
import {CiWarning} from 'react-icons/ci';

export default function Error({error}: {error?: number}) {
    const {t}=useTranslation();
    return (
        error? error != 0 && (
            <p className='bg-[#d32b2b4f] dark:bg-transparent pl-4 py-1 text-md font-semibold w-full text-red-700 border border-red-700 rounded-lg flex flex-row justify-start gap-2 mt-4'>
                <CiWarning className='mt-1' />
                {t("error"+error)}
            </p>
        ):null
    );
}
