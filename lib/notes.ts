'use server';
import {State, Sticker} from '@/types';
import {db} from './db';

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date).replace(',', '');
}
export async function getNoteById(id: string) {
    try {
        const note = await db.note.findUnique({
            where: {id},
            select: {
                createdDate: true,
                edits: true,
                text: true,
                title: true,
                icon: true,
                stickers: true,
            },
        });
        if (!note) return null;
        const state = JSON.parse(note.edits as string) as State;
        const stickers = JSON.parse(note.stickers as string) as Sticker[];
        return {
            createdDate: formatDate(note.createdDate),
            text: note.text,
            title: note.title,
            icon: note.icon,
            state,
            stickers,
        };
    } catch (err) {
        return null;
    }
}

export async function getUserNotes(userId:string){
    try{
        return await db.note.findMany({
            where:{userId},
            select:{
                id:true,
                title:true,
                icon:true,
            }
        })
    }catch{
        return null
    }
}
export async function getUserNotesDashboard(userId:string){
    try{
        const notes= await db.note.findMany({
            where:{userId},
            select:{
                id:true,
                title:true,
                icon:true,
                createdDate:true,
                edits:true,
                text:true
            }
        })
        return notes.map((note)=>{
            const state=JSON.parse(note.edits as string) as State
            return {
                id:note.id,
                title:note.title,
                icon:note.icon,
                createdDate:formatDate(note.createdDate),
                serverDate:note.createdDate,
                edits:state,
                text:note.text
            }
        })
    }catch{
        return null
    }
}