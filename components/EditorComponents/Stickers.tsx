import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useNoteStore } from '@/zustand-store/note';

const getStickers = async () => {
    const response = await fetch('/api/stickers');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const stickers = await response.json();
    return stickers;
};

export default function Stickers() {
    const { addSticker } = useNoteStore();
    const [stickers, setStickers] = useState<string[]>([]);

    useEffect(() => {
        const fetchStickers = async () => {
            try {
                const stickers = await getStickers();
                setStickers(stickers);
            } catch (error) {
                console.error('Failed to fetch stickers:', error);
            }
        };
        fetchStickers();
    }, []);

    return (
        <div className='grid grid-cols-3 md:flex md:flex-col py-3 justify-start w-screen h-56 gap-5 px-5 overflow-x-hidden overflow-y-scroll text-lg md:px-0 md:py-5 md:h-screen md:w-48 md:items-start bg-asidebg dark:bg-darkasidebg scroll-smooth'>
            {stickers.map((sticker, index) => (
                <div
                    key={index}
                    className='w-full h-full md:h-28 place-items-center font-light border border-transparent border-b-[#00000022] border-x-[#00000011] dark:border-b-[#ffffff22] py-3 pl-3 outline-none hover:bg-[#00000011]'
                    onClick={() => addSticker(sticker)}
                    >
                    <Image src={`/stickers/${sticker}.png`} alt={sticker} width={100} height={100} />
                </div>
            ))}
        </div>
    );
}
