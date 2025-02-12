import {darkColors, lightColors} from '@/Edits';
import {useNoteStore} from '@/store/note';
import {useTheme} from 'next-themes';
import React from 'react';
import {useTranslation} from 'react-i18next';

function ColorText() {
    const {state, setProperty} = useNoteStore();
    const {resolvedTheme} = useTheme();
    const {t} = useTranslation();
    return (
        <div className='w-48 h-screen py-5 overflow-y-scroll text-lg bg-asidebg dark:bg-darkasidebg '>
            <label className='flex flex-row items-center justify-around w-full'>
                {t('chooseHere')}
                <input
                    className='w-12 h-12 p-0 m-0 border border-[#171717] outline outline-[#171717] -outline-offset-4 outline-4 rounded-full'
                    type='color'
                    value={state.color}
                    onChange={(e) => {
                        setProperty('color', e.target.value);
                    }}
                />
            </label>
            {(resolvedTheme === 'dark' ? lightColors : darkColors).map((each, index: number) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setProperty('color', each.hex);
                        }}
                        className={`w-full h-12 relative add-after border border-white hover:border-white`}
                        style={{backgroundColor: each.hex}}
                        data-text={each.name}></button>
                );
            })}
        </div>
    );
}
export default React.memo(ColorText);
