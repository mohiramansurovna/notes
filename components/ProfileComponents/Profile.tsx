'use client';
import React, {useState, useTransition, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {EditProfileSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import Error from '@/components/Error';
import Success from '../Success';
import editProfile from '@/actions/editProfile';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {FaPen} from 'react-icons/fa';
import useImageUrl from '@/hooks/useImageUrl';
import {ProfileImage} from '@/types';
import {useSession} from 'next-auth/react';
import {User} from '@prisma/client';
import {useTranslation} from 'react-i18next';
export default function Profile({
    user,
    color,
}: {
    user: User;
    color: '#600bd5' | '#01ff88' | '#ffff33' | '#fc2f00' | '#ec7d10' | '#ec0868';
}) {
    const [error, setError] = useState<number>(1);
    const [success, setSuccess] = useState<number>(1);
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<{url: string; miniUrl: string | null}>({
        url: user.imageUrl as string,
        miniUrl: user.miniImageUrl as string,
    });
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const session = useSession();
    const {t} = useTranslation();
    //uploading the image
    const getImageUrl = useImageUrl(setProgress, user.imageUrl);

    const imageUpload = async () => {
        if (!file) return;
        await getImageUrl(file).then((res) => {
            if (res.status === 200) {
                setImageUrl({url: res.url, miniUrl: res.miniUrl});
            } else {
                setError(4);
            }
        });
    };
    useEffect(() => {
        startTransition(() => {
            setError(0);
            setSuccess(0);
            imageUpload();
        });
    }, [file]);

    //submitting the form
    const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
        setError(0);
        setSuccess(0);
        const send = file ? imageUrl : null;
        startTransition(() => {
            //there will be edit profile action
            editProfile(values, user.email as string, send as ProfileImage).then((res) => {
                if (res.error) {
                    setError(res.error);
                    form.reset();
                } else if(res.success) {
                    setSuccess(res.success);
                    setFile(null);
                    session.update();
                }
            });
        });
    };

    const form = useForm<z.infer<typeof EditProfileSchema>>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            name: user.name ? user.name : '',
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
    });
    return (
        <form
            id='profile'
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete='off'
            className='grid grid-rows-3 grid-cols-1 md:px-24 w-full pt-12 md:grid-rows-1 md:grid-cols-3 md:py-12'>
            <div className='w-full h-full flex flex-col justify-center items-center gap-3'>
                <div className='w-full h-1/2 md:h-2/3 *:w-1/2 md:*:w-2/3 *:aspect-square grid place-items-center relative'>
                    <div className='-z-10 absolute rounded-full border border-double border-[#ff5df2] bg-[#ff5df233] animate-circle-2'></div>
                    <div className='-z-10 absolute rounded-full border border-double border-[#15a9e0] bg-[#15a9e033] animate-circle-1'></div>
                    <label
                        htmlFor='inputImage'
                        className='absolute z-20 flex flex-col justify-center gap-3 items-center pl-4 bg-transparent rounded-full hover:bg-[#00000099] group'>
                        <FaPen className='w-full text-transparent text-center group-hover:text-white' />
                        <p className='text-xl text-transparent group-hover:text-white'>
                            {t('editProfileImage')}
                        </p>
                        <input
                            type='file'
                            id='inputImage'
                            className='hidden'
                            accept='image/*'
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        />
                    </label>
                    <img
                        alt='alt image'
                        className='z-10 absolute object-cover object-center rounded-full'
                        src={imageUrl.url || user.imageUrl || '/avatar.jpg'}
                    />
                </div>
                <div
                    className='w-2/3 h-2 border rounded-xl'
                    style={{borderColor: color}}>
                    <div
                        className='h-full transition-all duration-150'
                        style={{width: `${progress}%`, backgroundColor: color}}></div>
                </div>
                <h3
                    aria-disabled={isPending}
                    className='z-10 text-lg md:text-xl font-semibold text-center disabled:opacity-10 disabled:blur-md'>
                    {user.name}
                </h3>
            </div>
            <fieldset
                disabled={isPending}
                className='flex flex-col justify-start align-middle row-span-2 md:col-span-2 transition-opacity duration-75 disabled:opacity-40'>
                <h2 className='w-full mt-12 text-3xl font-semibold'>{t('profile')}</h2>
                <label
                    htmlFor='name'
                    className='pl-2 mt-10 text-lg font-semibold'>
                    {t('name')}
                </label>
                <input
                    className={`rounded-md px-2 py-1 mt-1 outline-[${color}]  border border-[${color}]`}
                    id='name'
                    type='text'
                    {...form.register('name')}
                />
                <label
                    htmlFor='password'
                    className='pl-2 mt-4 text-lg font-semibold'>
                    {t('currentPassword')}
                </label>
                <input
                    className={`rounded-md px-2 py-1 mt-1 outline-[${color}]  border border-[${color}]`}
                    id='password'
                    type='password'
                    {...form.register('password')}
                />
                <label
                    htmlFor='newPassword'
                    className='pl-2 mt-4 text-lg font-semibold'>
                    {t('newPassword')}
                </label>
                <input
                    className={`rounded-md px-2 py-1 mt-1 outline-[${color}] border border-[${color}]`}
                    id='newPassword'
                    type='password'
                    {...form.register('newPassword')}
                />
                <label
                    htmlFor='confirmPassword'
                    className='pl-2 mt-4 text-lg font-semibold'>
                    {t('confirmPassword')}
                </label>
                <input
                    className={`rounded-md px-2 py-1 mt-1 outline-[${color}] border border-[${color}]`}
                    id='confirmPassword'
                    type='password'
                    {...form.register('confirmPassword')}
                />
                <Error error={error} />
                <Success success={success} />
                <div className='flex flex-row justify-end mt-10'>
                    <button
                        type='submit'
                        className={`px-12 py-1 border border-[${color}] rounded-md font-normal outline-none mt-3 w-1/3`}>
                        {t('save')}
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
