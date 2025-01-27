import * as z from 'zod';
// This file contain contains all of
// the schemas that zod uses for validation.
export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(6, {
        message: 'Required minimum lenght of the password is 6',
    }),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
});
export const EditProfileSchema = z.object({
    name:z.string().min(1,{
        message:'Name is required'
    }),
    password:z.string().optional(),
    newPassword:z.string().optional(),
    confirmPassword:z.string().optional(),
})

export const NoteSchema = z.object({
    title:z.string().min(1,{
        message:'Title is required'
    }),
    text:z.string().min(1,{
        message:'Text is required'
    }),
    icon:z.string().min(1,{
        message:'Icon is required'
    })
})