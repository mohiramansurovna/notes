import {darkColors, lightColors} from '@/Edits';
import {useNoteStore} from '@/store/note';
import {useTheme} from 'next-themes';
import React from 'react';
import {useTranslation} from 'react-i18next';

function BackgroundColor() {
    const {resolvedTheme} = useTheme();
    const {state, setProperty} = useNoteStore();
    const {t} = useTranslation();
    return (
        <div className='py-5 text-lg w-48 bg-asidebg h-screen overflow-y-scroll dark:bg-darkasidebg '>
            <label className='flex flex-row justify-around w-full items-center'>
                {t('chooseHere')}
                <input
                    className='w-12 h-12 p-0 m-0 border border-[#171717] outline outline-[#171717] -outline-offset-4 outline-4 rounded-full'
                    type='color'
                    value={state.backgroundColor}
                    onChange={(e) => {
                        setProperty('backgroundColor', e.target.value);
                    }}
                />
            </label>
            {(resolvedTheme === 'light' ? lightColors : darkColors).map((each, index: number) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setProperty('backgroundColor', each.hex);
                        }}
                        className={`w-full h-12 relative add-after border border-white hover:border-white`}
                        style={{backgroundColor: each.hex}}
                        data-text={each.name}></button>
                );
            })}
        </div>
    );
}
export default React.memo(BackgroundColor);
