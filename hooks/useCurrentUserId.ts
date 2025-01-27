'use client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export default function useCurrentUser() {
    const { data: session } = useSession();
    const userId = useMemo(() => session?.user?.id, [session])
    return userId || null;
}
