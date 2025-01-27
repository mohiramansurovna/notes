'use server'

import { State } from "@/types"
import { db } from "@/lib/db"
import { NoteSchema } from "@/schemas"
import { z } from "zod"

export default async function editNote(values:z.infer<typeof NoteSchema>,state:State, id:string){
    let jsonState=JSON.stringify(state);

    const formValues=NoteSchema.safeParse(values)
    if(!formValues.success)return {error:'Invalid saving values'}
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
                icon
            }
        })
        return {success:'Note saved successfully'}
    }catch(err){
        console.log(err)
        return {error:'Error saving note'}
    }

}