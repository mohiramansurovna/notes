import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {Rnd} from 'react-rnd';
import {TiDelete} from 'react-icons/ti';
import {useNoteStore} from '@/zustand-store/note';

type StickerUpdates = {
    [index: string]: {
        position: {x: number; y: number};
        size: {width: number; height: number};
    };
};

export default function StickerBoard({setDragging}: {setDragging: (dragging: boolean) => void}) {
    const {stickers, removeSticker, updateSticker} = useNoteStore();
    const [currentSticker, setCurrentSticker] = useState<StickerUpdates>({});

    //update the stickers' main state after 1 second
    useEffect(() => {
        if (Object.keys(currentSticker).length > 0) {
            const timer = setTimeout(() => {
                for (const [id, update] of Object.entries(currentSticker)) {
                    updateSticker(id, update.position, update.size);
                }
                setCurrentSticker({});
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [currentSticker]);

    return Object.entries(stickers).map(([id, sticker]) => sticker.name &&(
        <Rnd
            key={id}
            default={{
                x: sticker.position.x,
                y: sticker.position.y,
                width: sticker.size.width,
                height: sticker.size.height,
            }}
            onDragStart={(e, d) => {
                setDragging(true);
            }}
            onDragStop={(e, d) => {
                setDragging(false);
                setCurrentSticker((prev) => ({
                    ...prev,
                    [id]: {
                        position: {
                            x: d.x,
                            y: d.y,
                        },
                        size: {
                            width: sticker.size.width,
                            height: sticker.size.height,
                        },
                    },
                }));
            }}
            onResizeStart={(e, d) => {
                setDragging(true);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setDragging(false);
                setCurrentSticker((prev) => ({
                    ...prev,
                    [id]: {
                        size: {
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                        },
                        position: {
                            x: position.x,
                            y: position.y,
                        },
                    },
                }));
            }}
            bounds='parent'
            className='group'>
            <Image
                src={`/stickers/${sticker.name}.png`}
                alt={sticker.name}
                width={sticker.size.width}
                height={sticker.size.height}
                className={`group-hover:border-shadow w-full h-full object-contain border border-transparent`}
            />
            <button
                className='hidden group-hover:block -mt-8 cursor-auto rounded-full'
                onClick={() => removeSticker(id)}>
                <TiDelete
                    size={30}
                    color='red'
                />
            </button>
        </Rnd>
    ));
}
