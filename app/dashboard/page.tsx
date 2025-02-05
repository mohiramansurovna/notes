'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import SideBar from '@/components/EditorComponents/SideBar';
export default function page() {
    const user = useCurrentUser();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user, user?.theme]);

    return (
        user && (
            <>
                <SideBar />
                <h1 className='absolute-center'>Hello here is ur notes</h1>
            </>
        )
    );
}
