'use client';
import React, {useEffect, useRef, useState} from 'react';
import Edit from './Edit';
import Font from './Font';
import ColorText from './ColorText';
import BackgroundColor from './BackgroundColor';
import {RiQuillPenAiLine} from 'react-icons/ri';
import {PiTextAaDuotone} from 'react-icons/pi';
import {MdOutlineBrush} from 'react-icons/md';
import {VscSymbolColor} from 'react-icons/vsc';
import {GiFlowerTwirl} from 'react-icons/gi';
import Stickers from './Stickers';
function PreNavigation() {
    const [editing, setEditing] = useState<
        'edit' | 'font' | 'colorText' | 'backgroundColor' | 'stickers' | null
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
            className={`fixed z-10 flex flex-col bottom-0 right-0 shadow-up  md:flex-row`}            
            >
            <nav className='flex px-3 md:px-0 flex-row items-center justify-center w-screen h-16 gap-4 md:flex-col md:pt-4 md:w-16 md:h-screen bg-asidebg dark:bg-darkasidebg'>
                <button
                    className={`w-13 h-13 p-3 rounded-2xl  ${
                        editing === 'edit'
                            ? 'text-main dark:text-darkmain'
                            : 'hover:bg-main dark:hover:bg-darkmain'
                    } `}
                    onClick={() => {
                        setEditing('edit');
                    }}>
                    <RiQuillPenAiLine size={30} />
                </button>
                <button
                    className={`w-13 h-13 p-3 rounded-2xl  ${
                        editing === 'font'
                            ? 'text-main dark:text-darkmain'
                            : 'hover:bg-main dark:hover:bg-darkmain'
                    }`}
                    onClick={() => {
                        setEditing('font');
                    }}>
                    <PiTextAaDuotone size={30} />
                </button>
                <button
                    className={`w-13 h-13 p-3 rounded-2xl ${
                        editing === 'colorText'
                            ? 'text-main dark:text-darkmain'
                            : 'hover:bg-main dark:hover:bg-darkmain'
                    }`}
                    onClick={() => {
                        setEditing('colorText');
                    }}>
                    <MdOutlineBrush size={30} />
                </button>
                <button
                    className={`w-13 h-13 p-3 rounded-2xl ${
                        editing === 'backgroundColor'
                            ? 'text-main dark:text-darkmain'
                            : 'hover:bg-main dark:hover:bg-darkmain'
                    }`}
                    onClick={() => {
                        setEditing('backgroundColor');
                    }}>
                    <VscSymbolColor size={30} />
                </button>
                <button
                    className={`w-13 h-13 p-3 rounded-2xl ${
                        editing === 'stickers'
                            ? 'text-main dark:text-darkmain'
                            : 'hover:bg-main dark:hover:bg-darkmain'
                    }`}
                    onClick={() => {
                        setEditing('stickers');
                    }}>
                    <GiFlowerTwirl size={30} />
                </button>

                <button
                    className='flex flex-col justify-center w-16 h-screen align-middle'
                    onClick={() => {
                        setEditing(null);
                    }}></button>
            </nav>
            {editing === 'edit' ? (
                <Edit />
            ) : editing === 'font' ? (
                <Font />
            ) : editing === 'colorText' ? (
                <ColorText />
            ) : editing === 'backgroundColor' ? (
                <BackgroundColor />
            ) : editing === 'stickers' ? (
                <Stickers/>
            ) : null}
        </aside>
    );
}
const Navigation = React.memo(PreNavigation);
export default Navigation;
