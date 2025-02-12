'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useTheme} from 'next-themes';
import {useTranslation} from 'react-i18next';
import {useSession} from 'next-auth/react';
export default function GlobalSettingsProvider() {
    const user = useCurrentUser();
    const router = useRouter();
    const {setTheme} = useTheme();
    const {i18n} = useTranslation();
    const session = useSession();
    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
        if (user?.mode) {
            setTheme(user.mode);
        }
        if (user?.theme) {
            document.documentElement.style.setProperty('--main', `var(--${user.theme})`);
            document.documentElement.style.setProperty('--darkmain', `var(--${user.theme}d)`);
            document.documentElement.style.setProperty('--shadow', `var(--${user.theme}sh)`);
        }
        if (user?.font) {
            document.documentElement.style.setProperty('--font', `${user.font}px`);
        }
        if (user?.language && user.language !== i18n.language) {
            i18n.changeLanguage(user.language as 'en' | 'ru' | 'uz');
        }
    }, [user, session]);
    return null;
}
