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
import { LuDelete } from 'react-icons/lu';
import { IoSettingsOutline,IoMenuOutline } from 'react-icons/io5';
import { IoIosLogOut  } from 'react-icons/io';
import {LuPencil} from 'react-icons/lu';
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
                className={`absolute bottom-0 left-0 -z-10 hidden h-36 w-${
                    long ? '36' : 'full'
                } flex-col items-start justify-start overflow-clip text-nowrap rounded-md bg-activebg dark:bg-darkactivebg text-lg hover:flex peer-hover:flex`}>
                <Link
                    href='/dashboard/settings'
                    className='flex flex-row items-center justify-start w-full gap-2 pt-2 pl-8 h-1/3 rounded-t-md hover:bg-primarybg dark:hover:bg-darkprimarybg'>
                    <IoSettingsOutline />
                    Settings
                </Link>
                <button
                    onClick={async () => await signOut({redirectTo: '/'})}
                    className='flex flex-row items-center justify-start w-full gap-2 pb-1 pl-8 h-1/3 rounded-b-md hover:bg-primarybg dark:hover:bg-darkprimarybg'>
                    <IoIosLogOut />
                    Sign Out
                </button>
                {long && (
                    <h3 className='w-24 py-2 pr-2 ml-12 font-semibold text-right text-primarytext dark:text-darkprimarytext h-1/3 overflow-clip text-ellipsis'>
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
    const session=useSession()
    const [notes, setNotes] = useState<{id: string; icon: string; title: string}[]>();
    useEffect(() => {
        if (!user?.id) return;
        getUserNotes(user.id).then((notes: {id: string; icon: string; title: string}[] | null) => {
            if (!notes) return;
            setNotes(notes);
        });
    }, [user?.id]);

    const handleDeleteNote = useCallback(async (noteId: string) => {
        await deleteNote(noteId);
        session.update()
    }, []);

    //ui___________________________________________________________________________
    const [long, setLong] = useState(true);
    const asideRef = useRef<HTMLElement | null>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
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
        user && (
            <aside
                className={`${
                    long ? 'w-16' : 'w-52'
                } fixed z-10 flex h-full flex-col justify-between bg-asidebg py-4 shadow-lg shadow-shadow dark:bg-darkasidebg dark:shadow-darkshadow
                 transition-all duration-100`}
                ref={asideRef}>
                <section className='flex flex-col justify-center w-full px-2 align-middle h-1/4'>
                    <ThemeSwitch/>
                    <IoMenuOutline size={25} onClick={()=>{setLong(!long)}} className='m-3 text-icon dark:text-darkicon'/>
                    <Link
                        href='/dashboard/note/create'
                        className={`${
                            long ? 'w-[50px]' : 'flex flex-row w-full'
                        } h-[50px] items-center justify-between rounded-2xl bg-activebg dark:bg-darkactivebg`}>
                        {!long && (
                            <p className='m-3 font-medium text-center text-text dark:text-darktext text-fit'>
                                New Note
                            </p>
                        )}
                        <LuPencil size={20} className='m-4 text-icon dark:text-darkicon'/>
                    </Link>
                </section>
                <hr className='h-[.2px] border-none bg-icon dark:bg-darkicon' />
                <section
                    className={`${
                        long ? '' : 'gap-0 mt-[47px]'
                    } flex min-h-[50vh] flex-col justify-start gap-4`}>
                    {notes?(
                        notes.map((note) => {
                            return (
                                <div
                                    key={note.id}
                                    className='flex flex-row w-full border-2 border-transparent hover:border-y-activebg dark:hover:border-y-darkactivebg'>
                                    <Link
                                        href={`/dashboard/note/${note.id}`}
                                        className={`${
                                            long
                                                ? 'flex-col w-full justify-center align-middle'
                                                : 'flex-row w-[176px] -mr-[18px] justify-start items-start p-3 rounded-r-full z-10'
                                        } flex gap-1 overflow-clip hover:bg-activebg dark:hover:bg-darkactivebg`}>
                                        <SendIcon icon={note.icon} />
                                        <p className='w-full h-full pt-1 mx-1 font-medium duration-100 text-start text-text dark:text-darktext text-fit textdot'>
                                            {note.title}
                                        </p>
                                    </Link>
                                    {!long && (
                                        <div className='text-lg rounded-l-full overflow-clip text-nowrap hover:bg-activebg dark:hover:bg-darkactivebg'>
                                            <button
                                                onClick={() => handleDeleteNote(note.id)}
                                                className='w-full h-full pl-5 text-xl text-icon dark:text-darkicon'>
                                                <LuDelete className='m-1'/>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className='w-full h-full px-1 pt-20 text-text dark:text-darktext'>loading, please wait :)</div>
                    )}
                </section>
                <ProfileSection
                    long={long}
                    user={user}
                />
            </aside>
        )
    );
}
