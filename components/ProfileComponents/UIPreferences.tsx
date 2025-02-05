import {User} from '@prisma/client';
import React, {useEffect, useState} from 'react';
import {IoLanguageOutline} from 'react-icons/io5';

export default function UIPreferences({user}: {user: User}) {
    const [theme, setTheme] = useState<'purple' | 'green' | 'yellow' | 'orange' | 'red' | 'pink'>(
        user.theme as 'purple' | 'green' | 'yellow' | 'orange' | 'red' | 'pink'
    );
    const [language, setLanguage]=useState<'en'|'ru'|'uz'>();
    useEffect(() => {
        document.documentElement.style.setProperty('--active', `var(--${theme})`);
        document.documentElement.style.setProperty('--shadow', `var(--${theme}sh)`);
    }, [theme]);
    const onClick=()=>{

    }
    return (
        <div
            id='uipreferences'
            className='flex flex-col h-screen w-3/4 ml-20'>
            <h2 className='w-full mt-12 text-3xl font-semibold'>UI Preferences</h2>
            <div id='themes'>
                <h3 className='my-5 text-xl font-semibold'>Themes</h3>
                <div className='grid grid-rows-1 grid-cols-6 w-full h-32 gap-4 text-center *:py-12'>
                    <div
                        onClick={() => setTheme('purple')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#600bd5] rounded-lg'>
                        <p>Purple</p>
                    </div>
                    <div
                        onClick={() => setTheme('green')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#01ff88] rounded-lg'>
                        <p>Green</p>
                    </div>
                    <div
                        onClick={() => setTheme('yellow')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#ffff33] rounded-lg'>
                        <p>Yellow</p>
                    </div>
                    <div
                        onClick={() => setTheme('orange')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#ec7d10] rounded-lg'>
                        <p>Orange</p>
                    </div>
                    <div
                        onClick={() => setTheme('red')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#fc2f00] rounded-lg'>
                        <p>Red</p>
                    </div>
                    <div
                        onClick={() => setTheme('pink')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#ec0868] rounded-lg'>
                        <p>Pink</p>
                    </div>
                </div>
            </div>
            <div id='language'>
                <h3 className='my-5 text-xl font-semibold'>
                    Language{' '}
                    <IoLanguageOutline
                        size={20}
                        className='inline text-darkshadow'
                    />
                </h3>
                <select className='rounded-md px-2 w-1/3 h-8 py-1 mt-1 outline-darkactivebg border border-darkactivebg' onChange={(e)=>setLanguage(e.target.value as 'en'|'ru'|'uz')}>
                    <option value='en'>English</option>
                    <option value='ru'>Russian</option>
                    <option value='uz'>Uzbek</option>
                </select>
            </div>
            <div>
              <h3 className='my-5 text-xl font-semibold'>Font Size</h3>
              <input type='range' min='15' max='22' step='0.1' className='w-1/3 range' />
            </div>
        </div>
    );
}
