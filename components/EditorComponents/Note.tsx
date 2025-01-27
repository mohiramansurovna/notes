'use client';
import editNote from '@/actions/editNote';
import {NoteSchema} from '@/schemas';
import {State} from '@/types';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useMemo, useRef} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import Icon from './Icon';
import dynamic from 'next/dynamic';
import { useDebounce } from '@/hooks/useDebounce';
const BiSolidSave = dynamic(() => import('react-icons/bi').then((mod) => mod.BiSolidSave));
const AiOutlineFullscreen = dynamic(() =>
    import('react-icons/ai').then((mod) => mod.AiOutlineFullscreen)
);
function PreNote({
    state,
    id,
    values,
}: {
    state: State;
    id: string;
    values: {createdDate: string; icon: string; text: string; title: string};
}) {
    const form = useForm<z.infer<typeof NoteSchema>>({
        resolver: zodResolver(NoteSchema),
        defaultValues: {
            title: values.title,
            text: values.text,
            icon: values.icon,
        },
    });
    const onSubmit = (values: z.infer<typeof NoteSchema>) => {
        editNote(values, state, id);
    };
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const debounced = useDebounce(form.watch, 1000);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [debounced]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement && textAreaRef.current) {
            textAreaRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    const memoizedStyles = useMemo(() => ({
        color: state.color,
        backgroundColor: state.backgroundColor,
        fontWeight: state.fontWeight,
        fontSize: state.fontSize,
        fontStyle: state.fontStyle,
        fontFamily: state.fontFamily,
        textDecoration: state.textDecoration,
        textTransform: state.textTransform,
        letterSpacing: state.letterSpacing,
        lineHeight: state.lineHeight,
        textAlign: state.textAlign,
        textShadow: state.textShadow === 'none' ? 'none' : state.textShadow.join(' '),
        marginLeft: state.marginLeft,
        marginTop: state.marginTop,
    }), [state]);
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='absolute left-1/2 top-1/2 z-0 h-full w-3/4 -translate-x-1/2 -translate-y-1/2 py-10'>
            <div className='flex w-full flex-row items-center justify-end'>
            <button
                    type='button'
                    onClick={toggleFullScreen}
                    className={`text-[${state.color}] rounded-md border border-transparent px-3 py-2 text-xl font-normal outline-none`}>
                    <AiOutlineFullscreen />
                </button>
                <button
                    type='submit'
                    className={`text-[${state.color}] border-transparent rounded-md border px-3 py-2 text-xl font-normal outline-none`}
                    >
                    <BiSolidSave />
                </button>
            </div>
            <div className='flex h-12 w-full flex-row items-center justify-start overflow-clip text-ellipsis px-3'>
                <Icon
                    form={form}
                    color={state.color}
                    backgroundColor={state.backgroundColor}
                />
                <input
                    type='text'
                    {...form.register('title')}
                    aria-autocomplete='none'
                    className={`text-[${state.color}] text-asideIcon h-full w-full bg-transparent font-kite-one text-xl outline-none`}
                />
            </div>
            <textarea
                {...form.register('text')}
                ref={textAreaRef}
                className='mt-8 min-h-[calc(100vh-200px)] w-full resize-y outline-none'
                style={memoizedStyles}
                placeholder='start your writing from here...'
            />
            <h3
                className={`bg-[${state.backgroundColor}] text-[${state.color}] text-[${
                    state.textAlign == 'right' ? 'left' : 'right'
                }] -mt-2 mb-8 h-12 w-full p-4 font-sans font-thin`}>
                Created at {values.createdDate}
            </h3>
        </form>
    );
}

const Note = React.memo(PreNote);
export default Note;
