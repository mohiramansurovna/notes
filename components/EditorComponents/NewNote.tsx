import createNote from '@/actions/createNote';
import {NoteSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React, {useState, useEffect, useMemo, useRef, memo} from 'react';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {State} from '@/types';
import ErrorComponent from './ErrorComponent';
import Icon from './Icon';
import { useDebounce } from '@/hooks/useDebounce';
import dynamic from 'next/dynamic';
import useCurrentUserId from '@/hooks/useCurrentUserId';
const BiSolidSave = dynamic(() => import('react-icons/bi').then((mod) => mod.BiSolidSave));
const AiOutlineFullscreen = dynamic(() =>
    import('react-icons/ai').then((mod) => mod.AiOutlineFullscreen)
);


function PreNewNote({state, router}: {state: State; router: AppRouterInstance}) {
    const userId = useCurrentUserId();
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof NoteSchema>>({
        resolver: zodResolver(NoteSchema),
        defaultValues: {
            title: 'Untitled',
            text: '',
            icon: '0',
        },
    });

    const onSubmit = (values: z.infer<typeof NoteSchema>) => {
        if (!userId)return;
        createNote(values, state, userId).then((res) => {
            if (res.error) {
                setError(res.error);
            } else {
                router.replace('/dashboard/note/' + res.id);
            }
        });
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
    
    //this is for adjusting the height
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
    return error?<ErrorComponent error={error}/>:(
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
                <Icon form={form} color={state.color} backgroundColor={state.backgroundColor}/>
                <input
                    type='text'
                    {...form.register('title')}
                    className='text-asideIcon h-full w-full bg-transparent font-kite-one text-2xl outline-none'
                />
            </div>
            <textarea
                {...form.register('text')}
                className='min-h-[calc(100vh-150px)] w-full outline-none'
                style={memoizedStyles}
                placeholder='start your writing from here...'
            />
        </form>
    );
}

const NewNote=React.memo(PreNewNote);
export default NewNote;