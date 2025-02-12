'use server';
import {getUserByEmail} from '@/lib/users';
import {EditProfileSchema} from '@/schemas';
import {z} from 'zod';
import bcryptjs from 'bcryptjs';
import {db} from '@/lib/db';
import {ProfileImage} from '@/types';
export default async function editProfile(
    values: z.infer<typeof EditProfileSchema>,
    email: string,
    imageUrl: ProfileImage | null
) {
    const verifications = EditProfileSchema.safeParse(values);
    if (!verifications.success) return {error: 3};
    const {name, password, newPassword, confirmPassword} = verifications.data;
    const user = await getUserByEmail(email);

    if (imageUrl) {
        try {
            await db.user.update({
                where: {id: user?.id},
                data: {
                    imageUrl: imageUrl.url,
                    miniImageUrl: imageUrl.miniUrl ? imageUrl.miniUrl : '',
                },
            });
            return {success: 2};
        } catch {
            return {error: 4};
        }
    }
    if (password) {
        if (newPassword !== confirmPassword) return {error: 5};
        if (!user?.password || !password) return {error: 7};
        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) return {error: 6};
        const hashedPassword = await bcryptjs.hash(newPassword as string, 10);
        try {
            await db.user.update({
                where: {email},
                data: {
                    name,
                    password: hashedPassword,
                },
            });
        } catch {
            return {error: 8};
        }
    } else {
        try {
            await db.user.update({
                where: {email},
                data: {
                    name,
                },
            });
        } catch {
            return {error: 8};
        }
    }

    return {success: 3};
}
