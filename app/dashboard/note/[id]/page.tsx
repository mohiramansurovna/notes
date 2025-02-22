import MainNote from '@/components/EditorComponents/MainNote';
import {getNoteById} from '@/lib/notes';

import React from 'react';
export default async function page({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    let note=null;
    try{
        note = await getNoteById(id)
    }catch(error){
        console.log('Error from note/id/page',error)
    }
    return (
        note && (
            <>
                <MainNote note={note} id={id} />
            </>
        )
    );
}
