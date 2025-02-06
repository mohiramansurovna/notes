'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import SideBar from '@/components/EditorComponents/SideBar';
import {useTheme} from 'next-themes';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {useTranslation} from 'react-i18next';

export default function page() {
    const user = useCurrentUser();
    const router = useRouter();
    const {setTheme} = useTheme();
    const {t, i18n} = useTranslation();
    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
        if (user?.mode) {
            setTheme(user.mode);
        }
        if (user?.theme) {
            document.documentElement.style.setProperty('--active', `var(--${user.theme})`);
            document.documentElement.style.setProperty('--shadow', `var(--${user.theme}sh)`);
        }
        if (user?.font) {
            document.documentElement.style.setProperty('--font', `${user.font}px`);
        }
        if (user?.language) {
            i18n.changeLanguage(user.language);
        }
    }, [user]);

    return (
        user && (
            <>
                <SideBar />
                <h1 className='absolute-center'>{t('welcome')}</h1>
            </>
        )
    );
}
