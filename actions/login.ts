'use server';
import {getUserByEmail} from '@/lib/users';
import {LoginSchema} from '@/schemas';
import {z} from 'zod';
import bcryptjs from 'bcryptjs';
import {signIn} from '@/auth';
import {AuthError} from 'next-auth';
export default async function login(values: z.infer<typeof LoginSchema>) {
    const verifications = LoginSchema.safeParse(values);
    if (!verifications.success) return {error: 'Invalid credentials'};
    const {email, password} = verifications.data;
    const user = await getUserByEmail(email);
    if (!user || !user.password) return {error: 'User not found'};
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) return {error: 'Invalid password'};

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        return {success: 'Signed in'};
    } catch (error) {
        if (error instanceof AuthError && error.type === 'CredentialsSignin') {
            return {error: 'Invalid credentials'};
        } else {
            return {error: 'Something went wrong'};
        }
    }
}
