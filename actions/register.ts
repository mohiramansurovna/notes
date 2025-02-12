'use server';
import {getUserByEmail} from '@/lib/users';
import {RegisterSchema} from '@/schemas';
import {z} from 'zod';
import bcryptjs from 'bcryptjs';
import {db} from '@/lib/db';
export default async function register(values: z.infer<typeof RegisterSchema>) {
    const verifications = RegisterSchema.safeParse(values);
    if (!verifications.success) return {error: 3};
    const {email, password, name} = verifications.data;
    const user = await getUserByEmail(email);
    if (user) return {error: 10};
    const hashedPassword = await bcryptjs.hash(password, 10);

    try {
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    } catch {
        return {error: 8};
    }

    return {success: 6};
}
