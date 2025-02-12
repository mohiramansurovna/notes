import {getUserNotesDashboard} from '@/lib/notes';
import {State} from '@/types';
import React, {Suspense, useEffect, useState, useTransition} from 'react';
import Loading from '../Loading';
import Link from 'next/link';
type Note = {
    id: string;
    title: string;
    icon: string;
    createdDate: string;
    serverDate: Date;
    edits: State;
    text: string;
};
export default function Notes({userId}: {userId: string}) {
    const [notes, setNotes] = useState<Note[]>();
    const [isLoading, startTransition] = useTransition();
    const [error, setError] = useState<string>();
    const getNotes = async () => {
        const note = await getUserNotesDashboard(userId);
        if (note) {
            setNotes(note);
        } else {
            setError('Failed to fetch notes');
        }
    };
    useEffect(() => {
        startTransition(() => {
            getNotes();
        });
    }, [userId]);
    return (
        <Suspense fallback={<Loading />}>
            <div className='flex flex-row flex-wrap items-start justify-start w-full gap-8 p-5'>
                {error ? <h1>{error}</h1> : null}
                {isLoading ? <Loading /> : null}
                {notes?.map((note) => {
                    const state = note.edits;
                    return (
                        <Link
                            href={`/dashboard/note/${note.id}`}
                            key={note.id}
                            className='h-48 p-2 shadow-inner rounded-sm w-52 shadow-gray-600 dark:shadow-shadow'>
                            <p  
                                className='text-[16px] w-full h-32 text-wrap rounded-sm p-4 text-ellipsis overflow-hidden'
                                style={{
                                    color: state.color,
                                    backgroundColor: state.backgroundColor,
                                    fontWeight: state.fontWeight,
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
                                }}>
                                {note.text}
                            </p>
                            <h3 className='ml-2'>{note.title}</h3>
                            <p className='text-[10px] ml-2 text-primarytext dark:text-darkprimarytext'>{note.createdDate}</p>
                        </Link>
                    );
                })}
            </div>
        </Suspense>
    );
}
