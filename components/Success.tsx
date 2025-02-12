import React from 'react';
import {useTranslation} from 'react-i18next';
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5';

export default function Success({success}: {success?: number}) {
    const {t} = useTranslation();
    return success
        ? success != 0 && (
              <p className='bg-[#00ff6a4f] dark:bg-transparent pl-4 py-1 text-md font-semibold w-full text-emerald-700 border border-emerald-700 rounded-lg flex flex-row justify-start gap-2 mt-4'>
                  <IoCheckmarkDoneCircleOutline className='mt-1 text-lg' />
                  {t('success' + success)}
              </p>
          )
        : null;
}
