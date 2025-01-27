import {db} from '@/lib/db';

export async function getAccountById(id: string) {
    try {
        return await db.account.findFirst({
            where: {userId:id},
        });
    } catch {
        return null;
    }
}
