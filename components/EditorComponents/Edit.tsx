import React, {useEffect, useState} from 'react';
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
import {AiOutlineVerticalAlignTop} from 'react-icons/ai';
import {BiHorizontalLeft} from 'react-icons/bi';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import {useNoteStore} from '@/store/note';

const Font = () => {
    const {t} = useTranslation();
    const {state, setProperty} = useNoteStore();
    //TODO:every font has diffrent weight and i should not add weight that is not approprite
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                {t('font')}
            </h3>
            <div className='grid w-full grid-cols-4 grid-rows-3 gap-2 mb-2 gap-y-3'>
                <button
                    onClick={() => {
                        setProperty(
                            'fontStyle',
                            state.fontStyle === 'italic' ? 'normal' : 'italic'
                        );
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
                        setProperty(
                            'fontWeight',
                            e.target.value as
                                | 'thin'
                                | 'extralight'
                                | 'light'
                                | 'normal'
                                | 'medium'
                                | 'semibold'
                                | 'bold'
                                | 'extrabold'
                                | 'black'
                        );
                    }}>
                    <option
                        value='thin'
                        className='font-thin'>
                        {t('thin')}
                    </option>
                    <option
                        value='extralight'
                        className='font-extralight '>
                        {t('extraLight')}
                    </option>
                    <option
                        value='light'
                        className='font-light '>
                        {t('light')}
                    </option>
                    <option
                        value='normal'
                        className='font-normal '>
                        {t('normal')}
                    </option>
                    <option
                        value='medium'
                        className='font-medium '>
                        {t('medium')}
                    </option>
                    <option
                        value='semibold'
                        className='font-semibold '>
                        {t('semiBold')}
                    </option>
                    <option
                        value='bold'
                        className='font-bold '>
                        {t('bold')}
                    </option>
                    <option
                        value='extrabold'
                        className='font-extrabold '>
                        {t('extraBold')}
                    </option>
                    <option
                        value='black'
                        className='font-black '>
                        {t('black')}
                    </option>
                </select>

                <input
                    className='border border-[#00000022] dark:border-[#ffffff22] bg-inherit outline-none'
                    value={state.fontSize}
                    onChange={(e) => setProperty('fontSize', e.target.value)}
                    type='number'
                />
                <select
                    className='col-span-3 text-base outline-none bg-asidebg dark:bg-darkasidebg'
                    value={state.textDecoration}
                    onChange={(e) => {
                        setProperty(
                            'textDecoration',
                            e.target.value as 'none' | 'underline' | 'overline' | 'line-through'
                        );
                    }}>
                    <option value='none'>{t('none')}</option>
                    <option
                        className='underline '
                        value='underline'>
                        {t('underline')}
                    </option>
                    <option
                        className=' overline'
                        value='overline'>
                        {t('overline')}
                    </option>
                    <option
                        className='line-through '
                        value='line-through'>
                        {t('lineThrough')}
                    </option>
                </select>

                <button
                    onClick={() => {
                        const colorc = state.color;
                        setProperty('color', state.backgroundColor);
                        setProperty('backgroundColor', colorc);
                    }}
                    data-text='text align left'
                    className='border border-[#00000022] dark:border-[#ffffff22] bg-inherit outline-none p-1.5'>
                    <FaStarHalfAlt />
                </button>
                <select
                    className='col-span-3 text-base outline-none bg-asidebg dark:bg-darkasidebg'
                    value={state.textTransform}
                    onChange={(e) => {
                        setProperty(
                            'textTransform',
                            e.target.value as 'none' | 'capitalize' | 'uppercase' | 'lowercase'
                        );
                    }}>
                    <option value='none'>{t('none')}</option>
                    <option value='capitalize'>{t('capitalize')}</option>
                    <option value='uppercase'>{t('uppercase')}</option>
                    <option value='lowercase'>{t('lowercase')}</option>
                </select>
            </div>
        </div>
    );
};
const Text = React.memo(() => {
    const {state, setProperty} = useNoteStore();
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                {t('text')}
            </h3>
            <div className='flex flex-row justify-around w-1/2 px-5 mb-2'>
                <button
                    onClick={() => {
                        setProperty('textAlign', 'left');
                    }}
                    data-text='text align left'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'left' ? 'border' : ''
                    }`}>
                    <CiTextAlignLeft />
                </button>
                <button
                    onClick={() => {
                        setProperty('textAlign', 'center');
                    }}
                    data-text='text align center'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'center' ? 'border' : ''
                    }`}>
                    <CiTextAlignCenter />
                </button>
                <button
                    onClick={() => {
                        setProperty('textAlign', 'right');
                    }}
                    data-text='text align right'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'right' ? 'border' : ''
                    }`}>
                    <CiTextAlignRight />
                </button>
                <button
                    onClick={() => {
                        setProperty('textAlign', 'justify');
                    }}
                    data-text='text align justify'
                    className={`add-after relative rounded-sm p-1 hover:bg-[#00000011] dark:hover:bg-[#ffffff11] ${
                        state.textAlign === 'justify' ? 'border' : ''
                    }`}>
                    <CiTextAlignJustify />
                </button>
            </div>
            <div className='flex flex-row items-center justify-around w-full px-2 mb-2'>
                <RiLineHeight2 className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] dark:border-[#ffffff44] bg-inherit outline-none'
                    value={state.lineHeight}
                    onChange={(e) => setProperty('lineHeight', parseInt(e.target.value))}
                    type='number'
                />
                <RiLetterSpacing2 className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] dark:border-[#ffffff44] bg-inherit outline-none'
                    value={state.letterSpacing}
                    onChange={(e) => setProperty('letterSpacing', parseInt(e.target.value))}
                    //TODO:letter spacing is parsing into int, do i need it???
                    type='number'
                />
            </div>
        </div>
    );
});
const Paper = React.memo(() => {
    const {state, setProperty} = useNoteStore();
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                {t('paper')}
            </h3>
            <div className='flex flex-row items-center justify-around w-full mb-2'>
                <AiOutlineVerticalAlignTop className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.marginTop}
                    onChange={(e) => setProperty('marginTop', parseInt(e.target.value))}
                    type='number'
                />
                <BiHorizontalLeft className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.marginLeft}
                    onChange={(e) => setProperty('marginLeft', parseInt(e.target.value))}
                    type='number'
                />
            </div>
        </div>
    );
});
const Shadow = React.memo(() => {
    const {state, setProperty} = useNoteStore();
    const [shadow, setShadow] = useState<'none' | [string, string, string, string]>(
        state.textShadow === 'none' ? ['0', '0', '0', '#000000'] : state.textShadow
    );
    useEffect(() => {
        setProperty('textShadow', shadow);
    }, [shadow]);
    return (
        <div>
            <h3 className='w-full my-2 border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22]'>
                {t('shadow')}
            </h3>
            <button onClick={() => setProperty('textShadow', 'none')}>Unset</button>
            <div className='flex flex-row items-center justify-around w-full mb-2'>
                <TbAxisX className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={shadow[0]}
                    onChange={(e) => setShadow([e.target.value, shadow[1], shadow[2], shadow[3]])}
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
                    onChange={(e) => setShadow([shadow[0], shadow[1], e.target.value, shadow[3]])}
                    type='number'
                />
                <IoMdColorFill className='w-4 -mr-5' />
                <input
                    className='w-1/4 rounded-md border border-[#00000044] bg-inherit outline-none'
                    value={state.textShadow[3]}
                    onChange={(e) => setShadow([shadow[0], shadow[1], shadow[2], e.target.value])}
                    type='color'
                />
            </div>
        </div>
    );
});
export default function Edit() {
    return (
        <div className='flex flex-col items-start justify-start w-48 h-screen gap-5 py-5 overflow-x-hidden overflow-y-scroll text-lg bg-asidebg dark:bg-darkasidebg scroll-smooth'>
            <Font />
            <Text />
            <Shadow />
            <Paper />
        </div>
    );
}
