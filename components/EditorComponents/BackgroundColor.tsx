import { backgroundColors } from '@/Edits';
import { Action, State } from '@/types';
import React from 'react'

export default function BackgroundColor({state, dispatch}:{state:State, dispatch:React.Dispatch<Action>}) {
    return (
        <div
            className='open-shut bg-[#A8C9D5] font-serif text-xl flex flex-col justify-start py-5 items-start'>
            <label className='flex flex-row w-full justify-between '>
                Chose here
                <input
                    className=' h-12 w-1/2 outline-none m-0 p-0 border-none'
                    type='color'
                    value={state.backgroundColor}
                    onChange={(e) => {
                        dispatch({type: 'backgroundColor', payload: e.target.value});
                    }}
                />
            </label>
            {backgroundColors.map((each, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            dispatch({type: 'backgroundColor', payload: each.hex});
                        }}
                        className='w-full text-start my-[1px] h-12'>
                        <div
                            className={`w-full h-full bg-[${each.hex}] capitalize font-sans font-light text-center content-center add-after relative`}
                            data-text={each.name}></div>
                    </button>
                );
            })}
        </div>
    );
}
