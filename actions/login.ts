'use server';
import {getUserByEmail} from '@/lib/users';
import {LoginSchema} from '@/schemas';
import {z} from 'zod';
import bcryptjs from 'bcryptjs';
import {signIn} from '@/auth';
import {AuthError} from 'next-auth';
export default async function login(values: z.infer<typeof LoginSchema>) {
    const verifications = LoginSchema.safeParse(values);
    if (!verifications.success) return {error: 3};
    const {email, password} = verifications.data;
    const user = await getUserByEmail(email);
    if (!user || !user.password) return {error: 7};
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) return {error: 6};

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        return {success: 5};
    } catch (error) {
        if (error instanceof AuthError && error.type === 'CredentialsSignin') {
            return {error: 3};
        } else {
            return {error: 8};
        }
    }
}
