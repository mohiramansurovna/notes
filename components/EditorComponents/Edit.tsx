import {Action, State} from '@/types';
import React, {use, useEffect, useState} from 'react';
import {
    CiTextAlignLeft,
    CiTextAlignCenter,
    CiTextAlignRight,
    CiTextAlignJustify,
} from 'react-icons/ci';
import {FaStarHalfAlt} from 'react-icons/fa';
import {ImItalic} from 'react-icons/im';
import {IoMdColorFill} from 'react-icons/io';
import {MdLensBlur} from 'react-icons/md';
import {RiLetterSpacing2, RiLineHeight2} from 'react-icons/ri';
import {TbAxisX, TbAxisY} from 'react-icons/tb';
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
import { BiHorizontalLeft } from "react-icons/bi";

const Font = ({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) => {
    //TODO:every font has diffrent weight and i should not add weight that is not approprite
    return (
        <div>
            <h3 className='w-full my-2 text-xl border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                Font
            </h3>
            <div className='grid w-full grid-cols-4 grid-rows-3 gap-2 mb-2 gap-y-3'>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'fontStyle',
                            payload: state.fontStyle === 'italic' ? 'normal' : 'italic',
                        });
                    }}
                    className={`border p-1 ${
                        state.fontStyle === 'italic'
                            ? ''
                            : 'border-[#00000022] dark:border-[#ffffff22]'
                    }`}>
                    <ImItalic />
                </button>
                <select
                    value={state.fontWeight}
                    id='fontWeight'
                    className='col-span-3 text-base outline-none bg-asidebg dark:bg-darkasidebg'
                    onChange={(e) => {
                        dispatch({type: 'fontWeight', payload: e.target.value});
                    }}>
                    <option
                        value='thin'
                        className='font-thin text-text dark:text-darktext'>
                        Thin
                    </option>
                    <option
                        value='extralight'
                        className='font-extralight text-text dark:text-darktext'>
                        Extra light
                    </option>
                    <option
                        value='light'
                        className='font-light text-text dark:text-darktext'>
                        Light
                    </option>
                    <option
                        value='normal'
                        className='font-normal text-text dark:text-darktext'>
                        Normal
                    </option>
                    <option
                        value='medium'
                        className='font-medium text-text dark:text-darktext'>
                        Medium
                    </option>
                    <option
                        value='semibold'
                        className='font-semibold text-text dark:text-darktext'>
                        Semibold
                    </option>
                    <option
                        value='bold'
                        className='font-bold text-text dark:text-darktext'>
                        Bold
                    </option>
                    <option
                        value='extrabold'
                        className='font-extrabold text-text dark:text-darktext'>
                        Extra Bold
                    </option>
                    <option
                        value='black'
                        className='font-black text-text dark:text-darktext'>
                        Black
                    </option>
                </select>

                <input
                    className='border border-[#00000022] dark:border-[#ffffff22] bg-inherit outline-none'
                    value={state.fontSize}
                    onChange={(e) => dispatch({type: 'fontSize', payload: e.target.value})}
                    type='number'
                />
                <select
                    className='col-span-3 text-base outline-none bg-asidebg dark:bg-darkasidebg'
                    value={state.textDecoration}
                    onChange={(e) => {
                        dispatch({type: 'textDecoration', payload: e.target.value});
                    }}>
                    <option
                        className='text-text dark:text-darktext'
                        value='none'>
                        None
                    </option>
                    <option
                        className='underline text-text dark:text-darktext'
                        value='underline'>
                        Underline
                    </option>
                    <option
                        className='text-text dark:text-darktext overline'
                        value='overline'>
                        Overline
                    </option>
                    <option
                        className='line-through text-text dark:text-darktext'
                        value='line-through'>
                        Line-through
                    </option>
                </select>

                <button
                    onClick={() => {
                        const colorc = state.color;
                        dispatch({type: 'color', payload: state.backgroundColor});
                        dispatch({type: 'backgroundColor', payload: colorc});
                    }}
                    data-text='text align left'
                    className='border border-[#00000022] dark:border-[#ffffff22] bg-inherit outline-none p-1.5'>
                    <FaStarHalfAlt />
                </button>
                <select
                    className='col-span-3 text-base outline-none bg-asidebg dark:bg-darkasidebg'
                    value={state.textTransform}
                    onChange={(e) => {
                        dispatch({type: 'textTransform', payload: e.target.value});
                    }}>
                    <option value='none'>None</option>
                    <option value='capitalize'>Capitalize</option>
                    <option value='uppercase'>UPPERCASE</option>
                    <option value='lowercase'>lowercase</option>
                </select>
            </div>
        </div>
    );
};
const Text = ({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) => {
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                Text
            </h3>
            <div className='flex flex-row px-5 justify-around w-1/2 mb-2'>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'textAlign',
                            payload: 'left',
                        });
                    }}
                    data-text='text align left'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'left' ? 'border' : ''
                    }`}>
                    <CiTextAlignLeft />
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'textAlign',
                            payload: 'center',
                        });
                    }}
                    data-text='text align center'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'center' ? 'border' : ''
                    }`}>
                    <CiTextAlignCenter />
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'textAlign',
                            payload: 'right',
                        });
                    }}
                    data-text='text align right'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'right' ? 'border' : ''
                    }`}>
                    <CiTextAlignRight />
                </button>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'textAlign',
                            payload: 'justify',
                        });
                    }}
                    data-text='text align justify'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'justify' ? 'border' : ''
                    }`}>
                    <CiTextAlignJustify />
                </button>
            </div>
            <div className='flex flex-row px-2 items-center justify-around w-full mb-2'>
                <RiLineHeight2 className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] dark:border-[#ffffff44] bg-inherit outline-none'
                    value={state.lineHeight}
                    onChange={(e) => dispatch({type: 'lineHeight', payload: e.target.value})}
                    type='number'
                />
                <RiLetterSpacing2 className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] dark:border-[#ffffff44] bg-inherit outline-none'
                    value={state.letterSpacing}
                    onChange={(e) => dispatch({type: 'letterSpacing', payload: e.target.value})}
                    type='number'
                />
            </div>
        </div>
    );
};
const Paper = ({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) => {
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                Paper
            </h3>
            <div className='flex flex-row items-center justify-around w-full mb-2'>
                <AiOutlineVerticalAlignTop  className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.marginTop}
                    onChange={(e) => dispatch({type: 'marginTop', payload: e.target.value})}
                    type='number'
                />
                <BiHorizontalLeft className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.marginLeft}
                    onChange={(e) => dispatch({type: 'marginLeft', payload: e.target.value})}
                    type='number'
                />
            </div>
            {/* <div className='flex flex-row items-center justify-around w-full mb-2'>
                <MdLensBlur className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.lineHeight}
                    onChange={(e) => dispatch({type: 'lineHeight', payload: e.target.value})}
                    type='number'
                />
                <IoMdColorFill className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.letterSpacing}
                    onChange={(e) => dispatch({type: 'letterSpacing', payload: e.target.value})}
                    type='number'
                />
            </div> */}
        </div>
    );
};
const Shadow = ({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) => {
    const [shadow, setShadow] = useState(state.textShadow=='none'?['0','0','0','#00000000']:state.textShadow);
    useEffect(()=>{
        dispatch({type:'textShadow', payload: shadow});
    },[shadow])
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                Shadow
            </h3>
            <button onClick={() => dispatch({type: 'textShadow', payload: 'none'})}>Unset</button>
            <div className='flex flex-row items-center justify-around w-full mb-2'>
                <TbAxisX className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={shadow[0]}
                    onChange={(e) =>setShadow([e.target.value, shadow[1], shadow[2], shadow[3]])}
                    type='number'
                />
                <TbAxisY className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={shadow[1]}
                    onChange={(e) => setShadow([shadow[0], e.target.value, shadow[2], shadow[3]])}
                    type='number'
                />
            </div>
            <div className='flex flex-row items-center justify-around w-full mb-2'>
                <MdLensBlur className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={shadow[2]}
                    onChange={(e) => setShadow([shadow[0],shadow[1], e.target.value,shadow[3]])}
                    type='number'
                />
                <IoMdColorFill className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.textShadow[3]}
                    onChange={(e) => setShadow([shadow[0], shadow[1],shadow[2], e.target.value])}
                    type='color'
                />
            </div>
        </div>
    );
};
export default function Edit({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) {
    return (
        <div className='flex flex-col items-start justify-start w-48 gap-5 py-5 text-lg bg-asidebg dark:bg-darkasidebg h-screen overflow-y-scroll scroll-smooth'>
            <Font
                state={state}
                dispatch={dispatch}
            />
            <Text
                state={state}
                dispatch={dispatch}
            />
            <Shadow
                state={state}
                dispatch={dispatch}
            />
            <Paper
                state={state}
                dispatch={dispatch}
            />
        </div>
    );
}
