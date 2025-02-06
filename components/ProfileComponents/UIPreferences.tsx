import editUIPreferences from '@/actions/editUIPreferences';
import {User} from '@prisma/client';
import {useTheme} from 'next-themes';
import React, {useEffect, useState, useTransition} from 'react';
import {FaMoon, FaSun} from 'react-icons/fa6';
import {IoLanguageOutline} from 'react-icons/io5';
import {MdOutlineDesktopWindows} from 'react-icons/md';
import Success from '../Success';
import Error from '../Error';

export default function UIPreferences({user}: {user: User}) {
    const [theme, setThemes] = useState<'purple' | 'green' | 'yellow' | 'orange' | 'red' | 'pink'>(
        user.theme as 'purple' | 'green' | 'yellow' | 'orange' | 'red' | 'pink'
    );
    const {setTheme} = useTheme();
    const [language, setLanguage] = useState<'en' | 'ru' | 'uz'>('en');
    const [font, setFont] = useState<string>('13');
    const [mode, setMode] = useState<'system' | 'dark' | 'light'>('system');
    const [isLoading, setTransition] = useTransition();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    useEffect(() => {
        document.documentElement.style.setProperty('--active', `var(--${theme})`);
        document.documentElement.style.setProperty('--shadow', `var(--${theme}sh)`);
    }, [theme]);

    const save = () => {
        setTransition(async () => {
            setError('');
            setSuccess('');
            await editUIPreferences({theme, language, font, mode}, user.id).then(
                (res: {success?: string; error?: string}) => {
                    if (res.error) {
                        setError(res.error);
                    } else if (res.success) {
                        setSuccess(res.success);
                    }
                }
            );
        });
    };
    return (
        <div
            id='uipreferences'
            className='flex flex-col w-3/4 ml-20 py-16 border border-transparent border-t-darkshadow border-dashed'>
            <h2 className='w-full mt-12 text-3xl font-semibold'>UI Preferences</h2>
            <div id='themes'>
                <h3 className='my-5 text-xl font-semibold'>Themes</h3>
                <div className='grid grid-rows-1 grid-cols-6 w-full h-32 gap-4 text-center *:py-12'>
                    <div
                        onClick={() => setThemes('purple')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#600bd5] rounded-lg'>
                        <p>Purple</p>
                    </div>
                    <div
                        onClick={() => setThemes('green')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#01ff88] rounded-lg'>
                        <p>Green</p>
                    </div>
                    <div
                        onClick={() => setThemes('yellow')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#ffff33] rounded-lg'>
                        <p>Yellow</p>
                    </div>
                    <div
                        onClick={() => setThemes('orange')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#ec7d10] rounded-lg'>
                        <p>Orange</p>
                    </div>
                    <div
                        onClick={() => setThemes('red')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#fc2f00] rounded-lg'>
                        <p>Red</p>
                    </div>
                    <div
                        onClick={() => setThemes('pink')}
                        className='bg-asidebg dark:bg-darkasidebg border border-[#ec0868] rounded-lg'>
                        <p>Pink</p>
                    </div>
                </div>
            </div>
            <div id='language'>
                <h3 className='my-5 text-xl font-semibold'>
                    Language
                    <IoLanguageOutline
                        size={20}
                        className='inline text-darkshadow'
                    />
                </h3>
                <select
                    className='rounded-md px-2 w-1/3 h-8 py-1 mt-1 outline-darkactivebg border border-darkactivebg'
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'ru' | 'uz')}>
                    <option value='en'>English</option>
                    <option value='ru'>Russian</option>
                    <option value='uz'>Uzbek</option>
                </select>
            </div>
            <div id='fontsize'>
                <h3 className='my-5 text-xl font-semibold'>Font Size</h3>
                <input
                    type='range'
                    min='14'
                    max='24'
                    step='0.1'
                    className='w-1/3'
                    onChange={(e) => {
                        setFont(e.target.value);
                    }}
                />
                <p
                    style={{fontSize: font + 'px'}}
                    className='text-darkshadow'>
                    "Current text will be the avarage size in the application, all other sizes will
                    be adjusted to this value. Size can be bigger and smaller than this"
                </p>
            </div>
            <div id='darkmode'>
                <h3 className='my-5 text-xl font-semibold'>Dark Mode</h3>
                <div className='flex flex-row w-1/2 justify-between'>
                    <button
                        className='border border-darkactivebg rounded-lg p-4'
                        name='mode'
                        onClick={() => {
                            setTheme('system');
                        }}>
                        <MdOutlineDesktopWindows size={25} />
                    </button>
                    <button
                        className='border border-darkactivebg rounded-lg p-4'
                        name='mode'
                        onClick={() => {
                            setTheme('dark');
                        }}>
                        <FaMoon size={25} />
                    </button>
                    <button
                        className='border border-darkactivebg rounded-lg p-4'
                        name='mode'
                        onClick={() => {
                            setTheme('light');
                        }}>
                        <FaSun size={25} />
                    </button>
                </div>
                <p className='font-normal text-start text-lg my-3 opacity-90'>
                    By default, the app uses your system's theme mode. You can change the mode
                    anytime using the sidebar. If you set your preferred mode here, it will be
                    linked to your account and apply across all your devices, regardless of their
                    system settings. Don't worry—you can still adjust it through the sidebar
                    whenever you like.
                </p>
            </div>
            <div className='flex flex-row justify-end mt-10'>
                <Success success={success} />
                <Error error={error}/>
                <button
                    disabled={isLoading}
                    onClick={save}
                    className='px-12 py-1 bg-darkactivebg border border-darkactivebg rounded-md font-normal text-white hover:bg-darkactivebg outline-none mt-3 w-1/3'>
                    Save
                </button>
            </div>
        </div>
    );
}
