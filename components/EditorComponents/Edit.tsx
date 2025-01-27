import {Action, State} from '@/types';
import React from 'react';
import {
    CiTextAlignLeft,
    CiTextAlignCenter,
    CiTextAlignRight,
    CiTextAlignJustify,
} from 'react-icons/ci';
import dynamic from 'next/dynamic';
const FaStarHalfAlt = dynamic(() => import('react-icons/fa').then((mod) => mod.FaStarHalfAlt));
const ImItalic = dynamic(() => import('react-icons/im').then((mod) => mod.ImItalic));
const RiLetterSpacing2 = dynamic(() =>
    import('react-icons/ri').then((mod) => mod.RiLetterSpacing2)
);
const RiLineHeight2 = dynamic(() => import('react-icons/ri').then((mod) => mod.RiLineHeight2));
const MdLensBlur = dynamic(() => import('react-icons/md').then((mod) => mod.MdLensBlur));
const IoMdColorFill = dynamic(() => import('react-icons/io').then((mod) => mod.IoMdColorFill));

export default function Edit({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) {
    return (
        <div className='flex flex-col items-start justify-start py-5 text-lg open-shut bg-[#E7E0EC]'>
            <div className='border border-t-[#00000022] pb-2'>
                <h3 className='w-full pb-2'>Font</h3>
                <div className='flex flex-row justify-around w-full mb-2'>
                    <button
                        onClick={() => {
                            dispatch({
                                type: 'fontStyle',
                                payload: state.fontStyle === 'italic' ? 'normal' : 'italic',
                            });
                        }}
                        className={`rounded-sm p-1 hover:bg-[#00000011] ${state.fontStyle==='italic'?'border':''}`}
            >
                        <ImItalic />
                    </button>
                    <select
                        value={state.fontWeight}
                        id='fontWeight'
                        className='bg-transparent outline-none'
                        onChange={(e) => {
                            dispatch({type: 'fontWeight', payload: e.target.value});
                        }}>
                        <option
                            value='thin'
                            className={`bg-[${
                                state.fontWeight == 'thin' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Thin
                        </option>
                        <option
                            value='extralight'
                            className={`bg-[${
                                state.fontWeight == 'extralight' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Extra light
                        </option>
                        <option
                            value='light'
                            className={`bg-[${
                                state.fontWeight == 'light' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Light
                        </option>
                        <option
                            value='normal'
                            className={`bg-[${
                                state.fontWeight == 'normal' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Normal
                        </option>
                        <option
                            value='medium'
                            className={`bg-[${
                                state.fontWeight == 'medium' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Medium
                        </option>
                        <option
                            value='semibold'
                            className={`bg-[${
                                state.fontWeight == 'semibold' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Semibold
                        </option>
                        <option
                            value='bold'
                            className={`bg-[${
                                state.fontWeight == 'bold' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Bold
                        </option>
                        <option
                            value='extrabold'
                            className={`bg-[${
                                state.fontWeight == 'extrabold' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Extra Bold
                        </option>
                        <option
                            value='black'
                            className={`bg-[${
                                state.fontWeight == 'black' ? '#b887dc' : 'inherit'
                            }] text-sm font-thin hover:bg-[#a55cd8] hover:text-white`}>
                            Black
                        </option>
                    </select>
                </div>
                <div className='flex flex-row justify-around w-full px-4 mb-2'>
                    <input
                        className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                        value={state.fontSize}
                        onChange={(e) => dispatch({type: 'fontSize', payload: e.target.value})}
                        type='number'
                    />
                    <select
                        className='w-3/4 text-center bg-transparent outline-none'
                        value={state.textDecoration}
                        onChange={(e) => {
                            dispatch({type: 'textDecoration', payload: e.target.value});
                        }}>
                        <option
                            className={`bg-[${
                                state.textDecoration == 'none' ? '#b887dc' : 'inherit'
                            }]`}
                            value='none'>
                            None
                        </option>
                        <option
                            className={`bg-[${
                                state.textDecoration == 'underline' ? '#b887dc' : 'inherit'
                            }]`}
                            value='underline'>
                            Underline
                        </option>
                        <option
                            className={`bg-[${
                                state.textDecoration == 'overline' ? '#b887dc' : 'inherit'
                            }]`}
                            value='overline'>
                            Overline
                        </option>
                        <option
                            className={`bg-[${
                                state.textDecoration == 'line-through' ? '#b887dc' : 'inherit'
                            }]`}
                            value='line-through'>
                            Line-through
                        </option>
                    </select>
                </div>
                <div className='flex flex-row justify-around w-full px-4 mb-2'>
                    <button
                        onClick={() => {
                            const colorc = state.color;
                            dispatch({type: 'color', payload: state.backgroundColor});
                            dispatch({type: 'backgroundColor', payload: colorc});
                        }}
                        data-text='text align left'
                        className='flex w-1/4 flex-col items-center justify-center rounded-md border border-[#00000044] bg-inherit outline-none'>
                        <FaStarHalfAlt />
                    </button>
                    <select
                        className='w-3/4 text-center bg-transparent outline-none'
                        value={state.textTransform}
                        onChange={(e) => {
                            dispatch({type: 'textTransform', payload: e.target.value});
                        }}>
                        <option
                            
                            className={`bg-[${state.textTransform == 'none' ? '#b887dc' : 'inherit'}]`}
                            value='none'>
                            None
                        </option>
                        <option
                            className={`bg-[${state.textTransform == 'capitalize' ? '#b887dc' : 'inherit'}]`}
                            value='capitalize'>
                            Capitalize
                        </option>
                        <option
                            className={`bg-[${state.textTransform == 'uppercase' ? '#b887dc' : 'inherit'}]`}
                            value='uppercase'>
                            Uppercase
                        </option>
                        <option
                            className={`bg-[${state.textTransform == 'lowercase' ? '#b887dc' : 'inherit'}]`}
                            value='lowercase'>
                            lowercase
                        </option>
                    </select>
                </div>
            </div>
            <div className='w-full border border-y-[#00000022] pb-2'>
                <h3 className='w-full pb-2'>Text</h3>
                <div className='flex flex-row justify-around w-1/2 mb-2'>
                    <button
                        onClick={() => {
                            dispatch({
                                type: 'textAlign',
                                payload: 'left',
                            });
                        }}
                        data-text='text align left'
                        className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] ${state.textAlign==='left'?'border':''}`}>
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
                        className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] ${state.textAlign==='center'?'border':''}`}>
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
                        className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] ${state.textAlign==='right'?'border':''}`}>
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
                        className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] ${state.textAlign==='justify'?'border':''}`}>
                        <CiTextAlignJustify />
                    </button>
                </div>
                <div className='flex flex-row items-center justify-around w-full mb-2'>
                    <RiLineHeight2 className='w-4 -mr-5' />
                    <input
                        className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                        value={state.lineHeight}
                        onChange={(e) => dispatch({type: 'lineHeight', payload: e.target.value})}
                        type='number'
                    />
                    <RiLetterSpacing2 className='w-4 -mr-5' />
                    <input
                        className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                        value={state.letterSpacing}
                        onChange={(e) => dispatch({type: 'letterSpacing', payload: e.target.value})}
                        type='number'
                    />
                </div>
            </div>
            <div className='w-full border border-y-[#00000022] pb-2'>
                <h3 className='w-full pb-2'>Text</h3>
                <div className='flex flex-row items-center justify-around w-full mb-2'>
                    <RiLineHeight2 className='w-4 -mr-5' />
                    <input
                        className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                        value={state.lineHeight}
                        onChange={(e) => dispatch({type: 'lineHeight', payload: e.target.value})}
                        type='number'
                    />
                    <RiLetterSpacing2 className='w-4 -mr-5' />
                    <input
                        className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                        value={state.letterSpacing}
                        onChange={(e) => dispatch({type: 'letterSpacing', payload: e.target.value})}
                        type='number'
                    />
                </div>
                <div className='flex flex-row items-center justify-around w-full mb-2'>
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
                </div>
            </div>
        </div>
    );
}
