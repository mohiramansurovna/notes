'use client';
import {State, Action} from '@/types';
import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Edit from './Edit';
import Font from './Font';
import ColorText from './ColorText';
import BackgroundColor from './BackgroundColor';

function PreNavigation({state, dispatch}: {state: State; dispatch: React.Dispatch<Action>}) {
    const [editing, setEditing] = useState<
        'edit' | 'font' | 'colorText' | 'backgroundColor' | null
    >(null);
    const asideRef = useRef(null);

    //this is for closing the navigation
    useEffect(() => {
        function handler(event: MouseEvent) {
            //@ts-ignore
            if (asideRef.current && !asideRef.current.contains(event.target)) {
                setEditing(null);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    return (
        <aside
            ref={asideRef}
            className='fixed top-0 w-[264px]  right-0 flex flex-row justify-start h-full align-middle transition-all duration-150 shadow-lg shadow-gray-400'
            style={{width:editing?'264px':'64px'}}>
            <nav className='flex flex-col justify-start w-16 h-full bg-asidebg'>
                <button
                    className='flex flex-col justify-center w-16 h-12 align-middle'
                    onClick={() => {
                        setEditing('edit');
                    }}>
                    <Image
                        width={30}
                        height={30}
                        src='/Edit 3.svg'
                        alt='Menu'
                        className='self-center'
                    />
                </button>
                <button
                    className='w-16 h-12 text-2xl text-center bg-primary1 font-alkatra'
                    onClick={() => {
                        setEditing('font');
                    }}>
                    Aa
                </button>
                <button
                    className='flex flex-col justify-center w-16 h-12 align-middle bg-primary2'
                    onClick={() => {
                        setEditing('colorText');
                    }}>
                    <Image
                        src='/Colorfilter.svg'
                        alt='style'
                        height={30}
                        width={30}
                        className='self-center'
                    />
                </button>
                <button
                    className='flex flex-col justify-center w-16 h-12 align-middle bg-primary3'
                    onClick={() => {
                        setEditing('backgroundColor');
                    }}>
                    <Image
                        src='/Paint Palette.svg'
                        alt='background-color'
                        height={30}
                        width={30}
                        className='self-center'
                    />
                </button>
                <button
                    className='flex flex-col justify-center w-16 h-screen align-middle'
                    onClick={() => {
                        setEditing(null);
                    }}></button>
            </nav>
            {editing === 'edit' ? (
                <Edit
                    state={state}
                    dispatch={dispatch}
                />
            ) : editing === 'font' ? (
                <Font
                    state={state}
                    dispatch={dispatch}
                />
            ) : editing === 'colorText' ? (
                <ColorText
                    state={state}
                    dispatch={dispatch}
                />
            ) : editing === 'backgroundColor' ? (
                <BackgroundColor
                    state={state}
                    dispatch={dispatch}
                />
            ) : null}
        </aside>
    );
}
const Navigation = React.memo(PreNavigation);
export default Navigation;
