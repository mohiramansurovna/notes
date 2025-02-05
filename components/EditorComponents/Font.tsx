import React from 'react'
import { fonts } from '@/Edits';
import { Action, State } from '@/types';
export default function Font({state, dispatch}:{state:State, dispatch:React.Dispatch<Action>}) {
    return (
        <div
            className='flex flex-col items-center justify-start w-48 h-screen py-5 overflow-y-scroll text-xl bg-asidebg dark:bg-darkasidebg'>
            {fonts.map((each, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            dispatch({type: 'fontFamily', payload: each.name});
                        }}
                        className={`w-full  text-start font-light border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22] py-3 pl-3 outline-none hover:bg-[#00000011]`}
                        style={{fontFamily:each.name,backgroundColor:state.fontFamily===each.name?'#00000044':''}}
                        >
                        <p>{each.ui}</p>
                    </button>
                );
            })}
        </div>
    );
}
