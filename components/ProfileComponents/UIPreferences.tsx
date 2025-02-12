import editUIPreferences from '@/actions/editUIPreferences';
import {User} from '@prisma/client';
import {useTheme} from 'next-themes';
import React, {Dispatch, SetStateAction, useEffect, useState, useTransition} from 'react';
import {FaMoon, FaSun} from 'react-icons/fa6';
import {IoLanguageOutline} from 'react-icons/io5';
import {MdOutlineDesktopWindows} from 'react-icons/md';
import Success from '../Success';
import Error from '../Error';
import {useSession} from 'next-auth/react';
import {useTranslation} from 'react-i18next';

export default function UIPreferences({
    user,
    setThemes,
    color,
    theme,
}: {
    user: User;
    setThemes: Dispatch<SetStateAction<'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'pink'>>;
    color: '#600bd5' | '#01ff88' | '#ffff33' | '#fc2f00' | '#ec7d10' | '#ec0868';
    theme: 'purple' | 'green' | 'yellow' | 'red' | 'orange' | 'pink';
}) {
    const {setTheme} = useTheme();
    const [language, setLanguage] = useState<'en' | 'ru' | 'uz'>(
        user.language ? (user.language as 'en' | 'ru' | 'uz') : 'en'
    );
    const [font, setFont] = useState<string>(user.font as string);
    const [mode, setMode] = useState<'system' | 'dark' | 'light'>(
        user.mode as 'system' | 'dark' | 'light'
    );
    const [isLoading, setTransition] = useTransition();
    const [success, setSuccess] = useState<number>();
    const [error, setError] = useState<number>();
    const session = useSession();
    const {t} = useTranslation();
    useEffect(() => {}, [theme]);

    const save = () => {
        setError(0);
        setSuccess(0);
        setTransition(async () => {
            await editUIPreferences({theme, language, font, mode}, user.id).then(
                (res: {success?: number; error?: number}) => {
                    if (res.error) {
                        setError(res.error);
                    } else if (res.success) {
                        setSuccess(res.success);
                        session.update();
                    }
                }
            );
        });
    };
    return (
        <div
            id='uipreferences'
            className={`flex flex-col w-3/4 ml-20 py-16 border border-transparent border-dashed`}
            style={{borderTopColor: color}}>
            <h2 className='w-full text-3xl font-semibold'>{t('uiPreferences')}</h2>
            <div id='themes'>
                <h3 className='my-5 text-xl font-semibold'>{t('themes')}</h3>
                <div className='grid grid-rows-1 grid-cols-6 w-full h-32 gap-4 text-center *:py-12'>
                    <div
                        onClick={() => setThemes('purple')}
                        className={`${
                            theme != 'purple' ? 'bg-asidebg dark:bg-darkasidebg' : 'bg-[#600bd520]'
                        } border border-[#600bd5] rounded-lg`}>
                        <p>{t('purple')}</p>
                    </div>
                    <div
                        onClick={() => setThemes('green')}
                        className={`${
                            theme != 'green' ? 'bg-asidebg dark:bg-darkasidebg' : 'bg-[#01ff8820]'
                        } border border-[#01ff88] rounded-lg`}>
                        <p>{t('green')}</p>
                    </div>
                    <div
                        onClick={() => setThemes('yellow')}
                        className={`${
                            theme != 'yellow' ? 'bg-asidebg dark:bg-darkasidebg' : 'bg-[#ffff3320]'
                        } border border-[#ffff33] rounded-lg`}>
                        <p>{t('yellow')}</p>
                    </div>
                    <div
                        onClick={() => setThemes('orange')}
                        className={`${
                            theme != 'orange' ? 'bg-asidebg dark:bg-darkasidebg' : 'bg-[#ec7d1020]'
                        } border border-[#ec7d10] rounded-lg`}>
                        <p>{t('orange')}</p>
                    </div>
                    <div
                        onClick={() => setThemes('red')}
                        className={`${
                            theme != 'red' ? 'bg-asidebg dark:bg-darkasidebg' : 'bg-[#fc2f0020]'
                        } border border-[#fc2f00] rounded-lg`}>
                        <p>{t('red')}</p>
                    </div>
                    <div
                        onClick={() => setThemes('pink')}
                        className={`${
                            theme != 'pink' ? 'bg-asidebg dark:bg-darkasidebg' : 'bg-[#ec086820]'
                        } border border-[#ec0868] rounded-lg`}>
                        <p>{t('pink')}</p>
                    </div>
                </div>
            </div>
            <div id='language'>
                <h3 className='my-5 text-xl font-semibold'>
                    {t('language')}
                    <IoLanguageOutline
                        size={20}
                        className={`inline text-[${color}] ml-1`}
                    />
                </h3>
                <select
                    value={language}
                    className={`rounded-md px-2 w-1/3 h-8 py-1 mt-1 outline-[${color}] border border-[${color}]`}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'ru' | 'uz')}>
                    <option value='en'>English</option>
                    <option value='ru'>Русский</option>
                    <option value='uz'>O'zbek</option>
                </select>
            </div>
            <div id='fontsize'>
                <h3 className='my-5 text-xl font-semibold'>{t('fontSize')}</h3>
                <input
                    type='range'
                    min='14'
                    max='20'
                    step='0.1'
                    className='w-1/3'
                    value={font}
                    onChange={(e) => {
                        setFont(e.target.value);
                    }}
                />
                <p style={{fontSize: font + 'px'}}>
                    <span style={{color}} className='text-3xl'>"""</span>
                    {t('fontSizeText')}
                    <span style={{color}} className='text-3xl'>"""</span>
                </p>
            </div>
            <div id='darkmode'>
                <h3 className='my-5 text-xl font-semibold'>{t('darkMode')}</h3>
                <div className='flex flex-row w-1/2 justify-between'>
                    <button
                        className={`border border-[${color}] rounded-lg p-4`}
                        name='mode'
                        onClick={() => {
                            setTheme('system');
                            setMode('system');
                        }}>
                        <MdOutlineDesktopWindows size={25} />
                    </button>
                    <button
                        className={`border border-[${color}] rounded-lg p-4`}
                        name='mode'
                        onClick={() => {
                            setTheme('dark');
                            setMode('dark');
                        }}>
                        <FaMoon size={25} />
                    </button>
                    <button
                        className={`border border-[${color}] rounded-lg p-4`}
                        name='mode'
                        onClick={() => {
                            setTheme('light');
                            setMode('light');
                        }}>
                        <FaSun size={25} />
                    </button>
                </div>
                <p className='font-normal text-start text-lg my-3 opacity-90'>
                    {t('darkModeText')}
                </p>
            </div>
            <div className='flex flex-row justify-end mt-10'>
                <button
                    disabled={isLoading}
                    onClick={save}
                    className={`px-12 py-1 border border-[${color}] rounded-md font-normal outline-none mt-3 w-1/3`}>
                    {t('save')}
                </button>
            </div>
            <Success success={success} />
            <Error error={error} />
        </div>
    );
}
