'use client';
import {State, Action} from '@/types';
import React, {useEffect, useRef, useState} from 'react';
import Edit from './Edit';
import Font from './Font';
import ColorText from './ColorText';
import BackgroundColor from './BackgroundColor';
import { RiQuillPenAiLine } from "react-icons/ri";
import { PiTextAaDuotone } from "react-icons/pi";
import { MdOutlineBrush } from "react-icons/md";
import { VscSymbolColor } from "react-icons/vsc";

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
            className={`fixed top-0 w-[${editing?'264px':'64px'}] right-0 flex  flex-row justify-start h-full align-middle transition-all duration-150 shadow-lg shadow-shadow dark:shadow-darkshadow`}
            >
            <nav className='flex flex-col justify-center items-center gap-4 w-16 pt-4 h-full text-icon dark:text-darkicon bg-asidebg dark:bg-darkasidebg'>
                <button
                    className='w-13 h-13 p-3 rounded-2xl hover:bg-activebg dark:hover:bg-darkactivebg'
                    onClick={() => {
                        setEditing('edit');
                    }}>
                    <RiQuillPenAiLine size={30} />
                </button>
                <button
                    className='w-13 h-13 p-3 rounded-2xl hover:bg-activebg dark:hover:bg-darkactivebg'
                    onClick={() => {
                        setEditing('font');
                    }}>
                    <PiTextAaDuotone size={30} />
                </button>
                <button
                    className='w-13 h-13 p-3 rounded-2xl hover:bg-activebg dark:hover:bg-darkactivebg'
                    onClick={() => {
                        setEditing('colorText');
                    }}>
                    <MdOutlineBrush size={30} />
                </button>
                <button
                    className='w-13 h-13 p-3 rounded-2xl hover:bg-activebg dark:hover:bg-darkactivebg'
                    onClick={() => {
                        setEditing('backgroundColor');
                    }}>
                    <VscSymbolColor size={30} />
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
