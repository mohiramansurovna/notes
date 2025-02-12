'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import SideBar from '@/components/EditorComponents/SideBar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {useTranslation} from 'react-i18next';
import Notes from '@/components/DashboardComponents/Notes';
import Templates from '@/components/DashboardComponents/Templates';

export default function page() {
    const user = useCurrentUser();
    const {t} = useTranslation();
    return (
        user?.id && (
            <>
                <SideBar />
                <main className='flex flex-col items-start justify-start w-full px-44 h-full gap-4 p-5 text-lg'>
                    <h1 className='w-full text-start font-semibold'><span className='text-shadow font-bold'>T</span>emplate<span className='text-shadow font-bold'>s</span></h1>
                    <Templates/>
                    <h1 className='w-full text-start font-semibold'><span className='text-shadow font-bold'>Y</span>our Note<span className='text-shadow font-bold'>s</span></h1>
                    <Notes userId={user.id} />
                </main>
            </>
        )
    );
}
