'use server'

import { State, Sticker } from "@/types"
import { db } from "@/lib/db"
import { NoteSchema } from "@/schemas"
import { z } from "zod"

export default async function editNote(values:z.infer<typeof NoteSchema>,state:State, id:string, stickers:Sticker[]){
    let jsonState=JSON.stringify(state);
    let stickerJson=JSON.stringify(stickers)
    const formValues=NoteSchema.safeParse(values)
    if(!formValues.success)return {error:2}
    const {title,text,icon}=formValues.data
    try{
        await db.note.update({
            where:{
                id
            },
            data:{
                edits:jsonState,
                text,
                title,
                icon,
                stickers:stickerJson
            }
        })
        return {success:1}
    }catch(err){
        console.log(err)
        return {error:2}
    }

}