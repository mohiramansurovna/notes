import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DataSaving({color}: {color: '#600bd5' | '#01ff88' | '#ffff33' | '#fc2f00' | '#ec7d10' | '#ec0868'}) {
  const {t}=useTranslation();
  return (
    <div className={`flex flex-col w-full md:px-24 pt-12 border h-max border-transparent border-dashed`} style={{borderTopColor:color}} id='datasaving'>
       <h2 className='w-full mt-12 text-3xl font-semibold'>{t('dataSharing')}</h2>
            
    </div>
  )
}
