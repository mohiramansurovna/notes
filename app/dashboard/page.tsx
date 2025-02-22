'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import SideBar from '@/components/EditorComponents/SideBar';
import {useTranslation} from 'react-i18next';
import Notes from '@/components/DashboardComponents/Notes';
import Templates from '@/components/DashboardComponents/Templates';
import {useState} from 'react';
import {MdOutlineExpandMore} from 'react-icons/md';
import {MdNavigateNext} from 'react-icons/md';

export default function page() {
    const user = useCurrentUser();
    const {t} = useTranslation();
    const [showTemplates, setShowTemplates] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    return (
        user?.id && (
            <>
                <SideBar />
                <main className='flex flex-col items-start justify-start w-full pt-12 ml-12 md:ml-20 h-full gap-4 p-5 text-lg'>
                    <button onClick={() => setShowTemplates((prev) => !prev)}>
                        <h1 className='w-full text-start font-semibold flex items-center justify-start'>
                            <span className='text-shadow font-bold'>E</span>xplore template
                            <span className='text-shadow font-bold'>s</span>
                            <MdOutlineExpandMore
                                size={25}
                                className={`${
                                    showTemplates ? '' : '-rotate-90'
                                } transition-all duration-150`}
                            />
                        </h1>
                    </button>

                    {showTemplates && <Templates />}
                    <h1 className='w-full text-start font-semibold'>
                        <span className='text-shadow font-bold'>Y</span>our Note
                        <span className='text-shadow font-bold'>s</span>
                    </h1>
                    <Notes userId={user.id} />
                </main>
            </>
        )
    );
}
