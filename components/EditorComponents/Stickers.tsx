import React from 'react';
import Image from 'next/image';
import { stickers } from './ResizableNotes';
import { useNoteStore } from '@/store/note';
export default function Stickers() {
    const { addSticker } = useNoteStore();
    return (
        <div className='flex flex-row items-start justify-start w-48 flex-wrap h-screen py-5 overflow-y-scroll text-xl bg-asidebg dark:bg-darkasidebg'>
            {stickers.map((sticker) => (
                <div
                onClick={()=>{addSticker(sticker)}}
                    className={`w-1/2 h-24 text-start font-light border border-transparent border-b-[#00000022] border-x-[#00000011] dark:border-b-[#ffffff22] py-3 pl-3 outline-none hover:bg-[#00000011]`}
                    key={sticker.id}>
                    <Image
                        width={100}
                        height={100}
                        alt={sticker.name}
                        src={sticker.src}
                    />
                </div>
            ))}
        </div>
    );
}
