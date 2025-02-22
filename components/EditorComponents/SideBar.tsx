'use client';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import useCurrentUser from '@/hooks/useCurrentUser';
import {signOut, useSession} from 'next-auth/react';
import deleteNote from '@/actions/deleteNote';
import {SendIcon} from './Icon';
import {useDebounce} from '@/hooks/useDebounce';
import {getUserNotes} from '@/lib/notes';
import ThemeSwitch from '../ThemeSwitch';
import {LuDelete} from 'react-icons/lu';
import {IoSettingsOutline, IoMenuOutline} from 'react-icons/io5';
import {IoIosLogOut} from 'react-icons/io';
import {LuPencil} from 'react-icons/lu';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';
import {LuLayoutDashboard} from 'react-icons/lu';

const ProfileSection = memo(({long, user}: {long: boolean; user: any}) => {
    return (
        <section
            className={`${
                long ? '' : 'flex flex-row justify-start pl-6'
            } relative z-10 w-full self-center px-3`}>
            <img
                className='z-10 object-cover object-center w-10 h-10 rounded-full peer'
                src={
                    user.miniImageUrl
                        ? user.miniImageUrl
                        : user.imageUrl
                        ? user.imageUrl
                        : '/avatar.jpg'
                }
                alt='User Avatar'
                loading='lazy'
                fetchPriority='low'
            />
            {!long && (
                <h3 className='py-2 pr-2 ml-4 font-semibold text-right text-primarytext dark:text-darkprimarytext peer overflow-clip text-ellipsis'>
                    {user.name}
                </h3>
            )}
            <div
                className={`absolute -bottom-2 left-0 -z-10 hidden h-36 w-${
                    long ? '44' : 'full'
                } flex-col items-start justify-start overflow-clip text-nowrap rounded-md bg-main dark:bg-darkmain text-lg hover:flex peer-hover:flex`}>
                <Link
                    href='/dashboard/settings'
                    className='flex flex-row items-center justify-start w-full gap-2 p-1 pt-2 pl-8 h-1/3 rounded-t-md hover:bg-primarybg dark:hover:bg-darkprimarybg'>
                    <IoSettingsOutline />
                    {t('settings')}
                </Link>
                <button
                    onClick={async () => await signOut({redirectTo: '/'})}
                    className='flex flex-row items-center justify-start w-full gap-2 p-1 pb-1 pl-8 h-1/3 hover:bg-primarybg dark:hover:bg-darkprimarybg'>
                    <IoIosLogOut />
                    {t('logout')}
                </button>
                {long && (
                    <h3 className='w-24 py-2 pr-2 ml-12 font-semibold text-center text-primarytext dark:text-darkprimarytext h-1/3 overflow-clip text-ellipsis'>
                        {user.name}
                    </h3>
                )}
            </div>
        </section>
    );
});
export default function SideBar() {
    //data_________________________________________________________________________
    const user = useCurrentUser();
    const {t} = useTranslation();
    const session = useSession();
    const [notes, setNotes] = useState<{id: string; icon: string; title: string}[]>();
    useEffect(() => {
        if (!user?.id) return;
        getUserNotes(user.id).then((notes: {id: string; icon: string; title: string}[] | null) => {
            if (!notes) return;
            setNotes(notes);
        });
    }, [user]);
    const handleDeleteNote = useCallback(async (noteId: string) => {
        await deleteNote(noteId);
        session.update();
    }, []);

    //ui___________________________________________________________________________
    const [long, setLong] = useState(true);
    const navRef = useRef<HTMLElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setLong(true);
        }
    };
    const debouncedHandler = useDebounce(handleClickOutside, 300);

    useEffect(() => {
        document.addEventListener('mousedown', debouncedHandler);
        return () => {
            document.removeEventListener('mousedown', debouncedHandler);
        };
    }, []);

    return (
        <nav ref={navRef}>
            <IoMenuOutline
                size={25}
                onClick={() => {
                    setLong(prev=>!prev);
                }}
                className='fixed z-30 top-8 left-4'
            />
            {user && (
                <aside
                className={`${
                        long ? 'hidden md:w-16 md:flex' : 'flex w-52'
                    } fixed z-20 h-full flex-col justify-start bg-asidebg py-4 shadow-lg shadow-shadow dark:bg-darkasidebg
                 transition-all duration-100`}
                    >
                    <section className='flex flex-col justify-start w-full h-48 px-2 mt-12 align-middle'>
                        <ThemeSwitch/>
                        <Link
                            href='/dashboard/'
                            className={`${
                                long ? 'w-[50px]' : 'flex flex-row w-full'
                            } h-[50px] my-2 items-center justify-between rounded-2xl border border-transparent hover:border-main dark:hover:border-darkmain`}>
                            {!long && (
                                <p className='m-3 font-medium text-center text-fit'>
                                    {t('dashboard')}
                                </p>
                            )}
                            <LuLayoutDashboard
                                size={20}
                                className='m-3'
                            />
                        </Link>
                        <Link
                            href='/dashboard/note/create'
                            className={`${
                                long ? 'w-[50px]' : 'flex flex-row w-full'
                            } h-[50px] items-center justify-between rounded-2xl bg-main dark:bg-darkmain`}>
                            {!long && (
                                <p className='m-3 font-medium text-center text-fit'>
                                    {t('newNote')}
                                </p>
                            )}
                            <LuPencil
                                size={20}
                                className='m-4'
                            />
                        </Link>
                    </section>
                    <hr className='w-full h-1 my-4 border-main dark:border-darkmain' />
                    <section
                        className={`${
                            long ? '' : 'gap-0'
                        } flex flex-col justify-start gap-4 h-full overflow-y-scroll scrollbar-hide`}>
                        {notes ? (
                            notes.map((note) => {
                                return (
                                    <div
                                        key={note.id}
                                        className='flex flex-row w-full h-15'>
                                        <Link
                                            href={`/dashboard/note/${note.id}`}
                                            className={`${
                                                long
                                                    ? 'flex-col w-full justify-center align-middle'
                                                    : 'flex-row w-[176px] -mr-[18px] justify-start items-start p-3 rounded-r-full z-10'
                                            } flex overflow-clip hover:bg-activebg dark:hover:text-darkbg`}>
                                            <SendIcon icon={note.icon} />
                                            <p
                                                className={`w-full h-full pt-1 mx-1 font-medium text-center duration-100 textdot`}>
                                                {note.title}
                                            </p>
                                        </Link>
                                        {!long && (
                                            <div className='text-lg rounded-l-full overflow-clip text-nowrap hover:bg-activebg dark:hover:text-darkbg'>
                                                <button
                                                    onClick={() => handleDeleteNote(note.id)}
                                                    className='w-full h-full pl-5 text-xl'>
                                                    <LuDelete className='m-1' />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className='w-full h-full px-1 pt-20'>loading, please wait :)</div>
                        )}
                    </section>
                    <ProfileSection
                        user={user}
                        long={long}
                    />
                </aside>
            )}
        </nav>
    );
}
