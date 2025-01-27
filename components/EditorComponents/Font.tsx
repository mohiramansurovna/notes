import React from 'react'
import { fonts } from '@/Edits';
import { Action, State } from '@/types';
export default function Font({state, dispatch}:{state:State, dispatch:React.Dispatch<Action>}) {
    return (
        <div
            className='open-shut bg-[#A8D5BA] font-serif text-xl flex flex-col justify-start py-5 items-start'>
            {fonts.map((each, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            dispatch({type: 'fontFamily', payload: each.name});
                        }}
                        className={`bg-[${state.fontFamily == each.name ? '#87caa2' : '#A8C9D5'}] font-${each.name} w-full text-start border border-transparent border-b-[#00000011] h-12 px-5 outline-none`}>
                        <p>{each.ui}</p>
                    </button>
                );
            })}
        </div>
    );
}
