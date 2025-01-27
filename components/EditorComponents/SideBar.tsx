'use client';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCurrentUser from '@/hooks/useCurrentUser';
import {signOut} from 'next-auth/react';
import deleteNote from '@/actions/deleteNote';
import {SendIcon} from './Icon';
import {useDebounce} from '@/hooks/useDebounce';
import dynamic from 'next/dynamic';
import {get} from 'http';
import {getUserNotes} from '@/lib/notes';
const MdDeleteOutline = dynamic(() => import('react-icons/md').then((mod) => mod.MdDeleteOutline));
const IoSettingsOutline = dynamic(() =>
    import('react-icons/io5').then((mod) => mod.IoSettingsOutline)
);
const IoIosLogOut = dynamic(() => import('react-icons/io').then((mod) => mod.IoIosLogOut));

const ProfileSection = memo(({long, user}: {long: boolean; user: any}) => {
    return (
        <section
            className={`${
                long ? '' : 'flex flex-row justify-start pl-6'
            } relative z-10 w-full self-center px-3`}>
            <img
                className='peer z-10 h-10 w-10 rounded-full object-cover object-center'
                src={
                    user.miniImageUrl
                        ? user.miniImageUrl
                        : user.imageUrl
                        ? user.imageUrl
                        : '/avatar.jpg'
                }
                alt='User Avatar'
                loading='lazy'
            />
            {!long && (
                <h3 className='peer ml-4 overflow-clip text-ellipsis py-2 pr-2 text-right font-semibold text-gray-800'>
                    {user.name}
                </h3>
            )}
            <div
                className={`absolute bottom-0 left-0 -z-10 hidden h-36 w-${
                    long ? '36' : 'full'
                } flex-col items-start justify-start overflow-clip text-nowrap rounded-md bg-activebg text-lg hover:flex peer-hover:flex`}>
                <Link
                    href='/dashboard/settings'
                    className='flex h-1/3 w-full flex-row items-center justify-start gap-2 rounded-t-md pl-8 pt-2 hover:bg-gray-400'>
                    <IoSettingsOutline />
                    Settings
                </Link>
                <button
                    onClick={async () => await signOut({redirectTo: '/'})}
                    className='flex h-1/3 w-full flex-row items-center justify-start gap-2 rounded-b-md pb-1 pl-8 hover:bg-gray-400'>
                    <IoIosLogOut />
                    Sign Out
                </button>
                {long && (
                    <h3 className='ml-12 h-1/3 w-24 overflow-clip text-ellipsis py-2 pr-2 text-right font-semibold text-gray-800'>
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
        notes && (
            <aside
                className={`${
                    long ? 'w-16' : 'w-52'
                } fixed z-10 flex h-full flex-col justify-between bg-asidebg py-4 shadow-lg shadow-gray-400 transition-all duration-100`}
                ref={asideRef}>
                <section className='flex h-1/4 w-full flex-col justify-center px-2 align-middle'>
                    <Image
                        src='/Menu.svg'
                        width={45}
                        height={45}
                        alt='Menu'
                        onClick={() => setLong(!long)}
                        loading='lazy'
                    />

                    <Link
                        href='/dashboard/note/create'
                        className={`${
                            long ? 'w-[50px]' : 'flex flex-row w-full'
                        } h-[50px] items-center justify-between rounded-2xl bg-activebg`}>
                        {!long && (
                            <p className='text-asideIcon text-fit m-3 text-center font-irina-sans font-medium'>
                                New Note
                            </p>
                        )}
                        <Image
                            src='/icon.svg'
                            width={25}
                            height={25}
                            alt='New Note'
                            className='m-3'
                            loading='lazy'
                        />
                    </Link>
                </section>
                <hr className='h-[.2px] border-none bg-[#292d3299]' />
                <section
                    className={`${
                        long ? '' : 'gap-0 mt-[47px]'
                    } flex min-h-[50vh] flex-col justify-start gap-4`}>
                    {notes.map((note) => {
                        return (
                            <div
                                key={note.id}
                                className='flex w-full flex-row'>
                                <Link
                                    href={`/dashboard/note/${note.id}`}
                                    className={`${
                                        long
                                            ? 'flex-col w-full justify-center align-middle'
                                            : 'flex-row w-44 justify-start items-start p-3'
                                    } peer flex gap-1 overflow-clip hover:bg-activebg`}>
                                    <SendIcon icon={note.icon} />
                                    <p className='text-asideText text-fit textdot mx-1 max-w-full text-center font-semibold duration-100'>
                                        {note.title}
                                    </p>
                                </Link>
                                {!long && (
                                    <div className='peer:block z-10 overflow-clip text-nowrap p-0 text-lg'>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className='text-asideIcon h-full text-2xl hover:bg-activebg'>
                                            <MdDeleteOutline />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>
                <ProfileSection
                    long={long}
                    user={user}
                />
            </aside>
        )
    );
}
