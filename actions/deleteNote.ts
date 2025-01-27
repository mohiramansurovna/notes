'use server';
import {db} from '@/lib/db';

export default async function deleteNote(id: string) {
    try {
        await db.note.delete({where: {id}});
        return {success: 'Note deleted successfully'};
    } catch (err) {
        console.log(err);
        return {error: 'Error saving note'};
    }
}
