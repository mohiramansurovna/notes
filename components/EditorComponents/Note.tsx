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
    
    const debounced = useDebounce(form.watch, 1000);
    const textArea = document.getElementById('text');
    useEffect(() => {
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    }, [debounced]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement && textArea) {
            textArea.requestFullscreen();
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
            className='absolute z-0 w-3/4 h-full py-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
            <div className='flex flex-row items-center justify-end w-full'>
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
            <div className='flex flex-row items-center justify-start w-full h-12 px-3 overflow-clip text-ellipsis'>
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
                id='text'
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
