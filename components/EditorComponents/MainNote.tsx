'use client';
import Navigation from '@/components/EditorComponents/Navigation';
import Note from '@/components/EditorComponents/Note';
import {useNoteStore} from '@/zustand-store/note';
import {State, Stickers} from '@/types';

import React, {useEffect, useState} from 'react';
export default function MainNote({
    note,
    id,
}: {
    note: {title: string; text: string; createdDate: string; icon: string; state: State, stickers:Stickers};
    id: string;
}) {
    const {setInitialState} = useNoteStore();
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        setInitialState({
            state: note.state,
            title: note.title,
            text: note.text,
            createdDate: note.createdDate,
            icon: note.icon,
            stickers:note.stickers,
        });
        setChanged(true);
    }, [note]);
    return (
        changed && (
            <main className='fixed w-screen h-screen p-0 m-0 overflow-y-scroll bg-bg'>
                <Note id={id} />
                <Navigation />
            </main>
        )
    );
}
