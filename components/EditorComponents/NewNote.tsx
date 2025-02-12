import createNote from '@/actions/createNote';
import {NoteSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React, {useState, useEffect, useMemo, useRef} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import Icon from './Icon';
import {useDebounce} from '@/hooks/useDebounce';
import dynamic from 'next/dynamic';
import useCurrentUserId from '@/hooks/useCurrentUserId';
import {useSession} from 'next-auth/react';
import Error from '@/components/Error';
import Success from '@/components/Success';
import {useSearchParams} from 'next/navigation';
import {useNoteStore} from '@/store/note';
import {templates} from '../DashboardComponents/Templates';
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

function PreNewNote({router}: {router: AppRouterInstance}) {
    const userId = useCurrentUserId();
    const session = useSession();
    const [error, setError] = useState<number>();
    const [success, setSuccess] = useState<number>();
    const {state, setInitialState, stickers} = useNoteStore();
    const [dragging, setDragging] = useState(false);

    const [currentSticker, setCurrentSticker] = useState<CurrenStickers>({});
    const form = useForm<z.infer<typeof NoteSchema>>({
        resolver: zodResolver(NoteSchema),
        defaultValues: {
            title: 'Untitled',
            text: ' ',
            icon: '0',
        },
    });
    const templateId = useSearchParams().get('template');
    useEffect(() => {
        if (!templateId) return;
        const ids = parseInt(templateId);
        setInitialState({
            state: templates[ids].state,
            title: templates[ids].name,
            text: templates[ids].text,
            createdDate: 'now',
            icon: '0',
            stickers: [],
        });
    }, [templateId]);
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
    const onSubmit = (values: z.infer<typeof NoteSchema>) => {
        if (!userId) return;
        setError(0);
        setSuccess(0);
        createNote(values, state, userId, Object.values(currentSticker) as Sticker[]).then((res) => {
            if (res.error) {
                setError(res.error);
            } else {
                setSuccess(res.success);
                session.update();
                console.log(state);
                router.replace('/dashboard/note/' + res.id);
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
    //TODO: I cannot set line height as 1.5, cuz i am using parseInt
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='absolute left-1/2 top-1/2 z-0 h-full w-5/6 -translate-x-1/2 -translate-y-1/2 py-10'>
            <div className='flex w-full flex-row items-center justify-end'>
                <button
                    type='button'
                    onClick={toggleFullScreen}
                    className={`text-[${state.color}] rounded-md border border-transparent px-3 py-2 text-xl font-normal outline-none`}>
                    <AiOutlineFullscreen />
                </button>
                <button
                    type='submit'
                    className={`text-[${state.color}] border-transparent rounded-md border px-3 py-2 text-xl font-normal outline-none`}>
                    <BiSolidSave />
                </button>
            </div>
            <div className='flex h-12 w-full flex-row items-center justify-start overflow-clip text-ellipsis px-3'>
                <Icon form={form} />
                <input
                    type='text'
                    {...form.register('title')}
                    className='text-asideIcon h-full w-full bg-transparent font-kite-one text-2xl outline-none'
                />
            </div>
            <Error error={error} />
            <Success success={success} />
            <div
                className='relative w-full h-full'
                ref={fullScreenRef}>
                <textarea
                    {...form.register('text')}
                    ref={(el) => {
                        form.register('text').ref(el);
                        textArea = el;
                    }}
                    className='min-h-[calc(100vh-150px)] w-full outline-none'
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
        </form>
    );
}

export default PreNewNote;
