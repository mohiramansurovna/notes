'use server';
import {getUserById} from '@/lib/users';

import {db} from '@/lib/db';
export default async function editUIPreferences(
    {
        theme,
        language,
        font,
        mode,
    }: {theme: string; language: string; font: string; mode: 'system' | 'light' | 'dark'},
    id: string
) {
    const user = await getUserById(id);
    let data: {
        theme?: string;
        language?: string;
        font?: string;
        mode?: 'system' | 'dark' | 'light';
    } = {};
    if (user) {
        if (theme != user?.theme) {
            data.theme = theme;
        }
        if (language != user?.language) {
            data.language = language;
        }
        if (font != user?.font) {
            data.font = font;
        }
        if (mode != user?.mode) {
            data.mode = mode;
        }
    }

    try {
        await db.user.update({
            where: {id: user?.id},
            data,
        });
        return {success: 'UI preferences updated successfully'};
    } catch {
        return {error: 'Something went wrong with updating the preferences'};
    }
}
