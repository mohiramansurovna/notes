'use client';
import editNote from '@/actions/editNote';
import {NoteSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import Icon from './Icon';
import dynamic from 'next/dynamic';
import {useDebounce} from '@/hooks/useDebounce';
import {useTranslation} from 'react-i18next';
import {useNoteStore} from '@/store/note';
import Error from '@/components/Error';
import Success from '@/components/Success';
import {Rnd} from 'react-rnd';
import Image, {StaticImageData} from 'next/image';
import { Sticker } from '@/types';
const BiSolidSave = dynamic(() => import('react-icons/bi').then((mod) => mod.BiSolidSave));
const AiOutlineFullscreen = dynamic(() =>
    import('react-icons/ai').then((mod) => mod.AiOutlineFullscreen)
);
type CurrenStickers = {
    [index: number]: {
        size: {
            width: number;
            height: number;
        };
        position: {
            x: number;
            y: number;
        };
        src: StaticImageData;
        name: string;
    };
};
function PreNote({id}: {id: string}) {
    const {title, text, icon, state, createdDate, stickers, updateSticker} = useNoteStore();
    const [error, setError] = useState<number>(0);
    const [success, setSuccess] = useState<number>(0);
    const [dragging, setDragging] = useState(false);
    const [currentSticker, setCurrentSticker] = useState<CurrenStickers>({});
    useEffect(() => {
        //loading the stickers into currentSticker
        let current: CurrenStickers = {};
        stickers.map((sticker, index: number) => {
            current[index] = {
                position: {x: sticker.position.x, y: sticker.position.y},
                size: {width: sticker.size.width, height: sticker.size.height},
                src: sticker.src,
                name: sticker.name,
            };
        });
        setCurrentSticker(current);
    }, [stickers]);
    //TODO:add error handling
    const {t} = useTranslation();
    const form = useForm<z.infer<typeof NoteSchema>>({
        resolver: zodResolver(NoteSchema),
        defaultValues: {
            title: title,
            text: text,
            icon: icon,
        },
    });
    const onSubmit = (values: z.infer<typeof NoteSchema>) => {
        editNote(values, state, id, Object.values(currentSticker) as Sticker[]).then((res) => {
            if (res.error) {
                setError(res.error);
            } else if (res.success) {
                setSuccess(res.success);
            }
        });
    };

    const debounced = useDebounce(form.watch, 1000);
    let textArea = useRef<HTMLTextAreaElement>(null).current;
    useEffect(() => {
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    }, [debounced]);

    const fullScreenRef = useRef<HTMLDivElement>(null);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement && fullScreenRef.current) {
            fullScreenRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    const memoizedStyles = useMemo(
        () => ({
            color: state.color,
            backgroundColor: state.backgroundColor,
            fontWeight: state.fontWeight,
            fontSize: state.fontSize + 'px',
            fontStyle: state.fontStyle,
            fontFamily: state.fontFamily,
            textDecoration: state.textDecoration,
            textTransform: state.textTransform,
            letterSpacing: state.letterSpacing + 'px',
            lineHeight: state.lineHeight,
            textAlign: state.textAlign,
            textShadow:
                state.textShadow === 'none'
                    ? 'none'
                    : state.textShadow[0] +
                      'px ' +
                      state.textShadow[1] +
                      'px ' +
                      state.textShadow[2] +
                      'px ' +
                      state.textShadow[3],
            paddingLeft: state.marginLeft + 'px',
            paddingTop: state.marginTop + 'px',
            paddingRight: state.marginLeft + 'px',
            paddingBottom: state.marginTop + 'px',
        }),
        [state]
    );
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='absolute z-0 w-5/6 h-full py-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
            <div className='flex flex-row items-center justify-end w-full'>
                <button
                    type='button'
                    onClick={toggleFullScreen}
                    className={`rounded-md border border-transparent px-3 py-2 text-xl font-normal outline-none`}>
                    <AiOutlineFullscreen />
                </button>
                <button
                    type='submit'
                    className={`border-transparent rounded-md border px-3 py-2 text-xl font-normal outline-none`}>
                    <BiSolidSave />
                </button>
            </div>
            <div className='flex flex-row items-center justify-start w-full h-12 px-3 overflow-clip text-ellipsis'>
                <Icon form={form} />
                <input
                    type='text'
                    {...form.register('title')}
                    aria-autocomplete='none'
                    className={`text-asideIcon h-full w-full bg-transparent font-kite-one text-xl outline-none`}
                />
            </div>

            <Error error={error} />
            <Success success={success} />
            <div className='relative w-full h-full' ref={fullScreenRef}>

            <textarea
                {...form.register('text')}
                ref={(el) => {
                    form.register('text').ref(el);
                    textArea = el;
                }}
                className='mt-8 min-h-[calc(100vh-200px)] w-full resize-y outline-none'
                style={memoizedStyles}
                placeholder='start your writing from here...'
                disabled={dragging}
            />

            {Object.entries(currentSticker).map(([index, sticker]) => (
                <Rnd
                    key={index}
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
                            [index]: {
                                ...prev[parseInt(index)],
                                position: {
                                    x: d.x,
                                    y: d.y,
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
                            [index]: {
                                ...prev[parseInt(index)],
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
                    bounds='parent'>
                    <Image
                        src={sticker.src}
                        alt={sticker.name}
                        className={`${
                            dragging ? 'border border-shadow' : ''
                        } w-full h-full object-contain hover:border hover:border-shadow`}
                        />
                </Rnd>
            ))}
            </div>
            <h3 className={`-mt-2 mb-8 h-12 w-full p-4 font-sans font-thin`}>
                {t('createdAt')} {createdDate}
            </h3>
        </form>
    );
}

// const Note = React.memo(PreNote);
export default PreNote;
