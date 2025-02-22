'use server';

import {State, Stickers} from '@/types';
import {db} from '@/lib/db';
import {NoteSchema} from '@/schemas';
import {z} from 'zod';

export default async function createNote(
    values: z.infer<typeof NoteSchema>,
    state: State,
    userId: string,
    stickers:Stickers
) {
    let jsonState = JSON.stringify(state);
    let stickersJson=JSON.stringify(stickers);
    const formValues = NoteSchema.safeParse(values);
    if (!formValues.success) return {error: 2};
    const {title, text, icon} = formValues.data;
    try {
        const res = await db.note.create({
            data: {
                userId,
                edits: jsonState,
                text,
                title,
                icon,
                stickers:stickersJson
            },
        });
        return {success: 1, id: res.id};
    } catch (err) {
        console.log(err);
        return {error: 1};
    }
}
