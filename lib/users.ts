'use server';
import { User } from '@prisma/client';
import {db} from './db';

export async function getUserById(id: string) {
    try {
        const user = await db.user.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                imageUrl: true,
                miniImageUrl: true,
                accounts: true,
                notes: true,
                theme: true,
            },
        });

        return user;
    } catch {
        return null;
    }
}
export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({where: {email}});
        return user;
    } catch {
        return null;
    }
}
