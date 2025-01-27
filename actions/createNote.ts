'use server'

import { State } from "@/types"
import { db } from "@/lib/db"
import { NoteSchema } from "@/schemas"
import { z } from "zod"

export default async function createNote(values:z.infer<typeof NoteSchema>,state:State,userId:string){
    let jsonState=JSON.stringify(state);

    const formValues=NoteSchema.safeParse(values)
    if(!formValues.success)return {error:'Invalid saving values'}
    const {title,text,icon}=formValues.data
    try{
        const res=await db.note.create({
            data:{
                userId,
                edits:jsonState,
                text,
                title,
                icon
            }
        })
        return {success:'Note saved successfully',id:res.id}
    }catch(err){
        console.log(err)
        return {error:'Error saving note'}
    }

}