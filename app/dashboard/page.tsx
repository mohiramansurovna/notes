'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import {Theme, theme} from '@/themes';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
export default function page() {
    const user = useCurrentUser();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
        if (user?.theme) {
            document.documentElement.style.setProperty('--bg', theme[user?.theme as Theme].bg);
            document.documentElement.style.setProperty(
                '--asidebg',
                theme[user?.theme as Theme].asidebg
            );
            document.documentElement.style.setProperty(
                '--activebg',
                theme[user?.theme as Theme].activebg
            );
            document.documentElement.style.setProperty('--text', theme[user?.theme as Theme].text);
            document.documentElement.style.setProperty(
                '--primary1',
                theme[user?.theme as Theme].primary1
            );
            document.documentElement.style.setProperty(
                '--primary2',
                theme[user?.theme as Theme].primary2
            );
            document.documentElement.style.setProperty(
                '--primary3',
                theme[user?.theme as Theme].primary3
            );
            console.log('set up properly')
        }
    }, [user, user?.theme]);

    return (
        user && (
            <>
                <h1 className='absolute-center'>Hello here is ur notes</h1>
            </>
        )
    );
}
