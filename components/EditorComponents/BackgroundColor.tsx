import {darkColors, lightColors} from '@/Edits';
import {Action, State} from '@/types';
import {useTheme} from 'next-themes';
import React from 'react';

export default function ColorText({
    state,
    dispatch,
}: {
    state: State;
    dispatch: React.Dispatch<Action>;
}) {
    const {resolvedTheme} = useTheme();
    return (
        <div className='py-5 text-lg w-48 bg-asidebg h-screen overflow-y-scroll dark:bg-darkasidebg '>
            <label className='flex flex-row justify-around w-full items-center'>
                Chose here
                <input
                    className='w-12 h-12 p-0 m-0 border border-[#171717] outline outline-[#171717] -outline-offset-4 outline-4 rounded-full'
                    type='color'
                    value={state.color}
                    onChange={(e) => {
                        dispatch({type: 'color', payload: e.target.value});
                    }}
                />
            </label>
            {
                (resolvedTheme==='light'?lightColors:darkColors).map((each, index: number) => {
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                dispatch({type: 'backgroundColor', payload: each.hex});
                            }}
                            className={`w-full h-12 relative add-after border border-white hover:border-white`}
                            style={{backgroundColor: each.hex}}
                            data-text={each.name}>
                        </button>
                    );
                })
            }
        </div>
    );
}
