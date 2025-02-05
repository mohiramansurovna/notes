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
import { ProfileImage } from '@/types';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
export default function Profile({user}: {user:User; router: AppRouterInstance}) {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<{url:string,miniUrl:string|null}>({url:user.imageUrl as string,miniUrl:user.miniImageUrl as string});
    const [file, setFile] = useState<File|null>(null);
    const [progress, setProgress]=useState<number>(0);
    const session=useSession()

    //uploading the image
    const getImageUrl=useImageUrl(setProgress, user.imageUrl);
    
    const imageUpload=async()=>{
        if(!file)return;
        await getImageUrl(file).then((res)=>{
            if(res.status===200){
                setImageUrl({url:res.url,miniUrl:res.miniUrl});
            }else{
                setError('Error uploading image');
            }
        })
    }
    useEffect(()=>{
        imageUpload(); 
    },[file])

    //submitting the form 
    const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
        setError('');
        setSuccess('');
        const send=file?imageUrl:null;
        startTransition(() => {
            //there will be edit profile action
            editProfile(values, user.email as string,send as ProfileImage).then((res) => {
                if (res.error) {
                    setError(res.error);
                    form.reset();
                } else {
                    setSuccess(res.success);
                    setFile(null)
                    session.update()
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
        <div id='profile'>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete='off'
                className='flex flex-row justify-around items-center h-screen w-full '>
                <fieldset
                    disabled={isPending}
                    className='flex flex-col justify-start align-middle w-1/2 h-3/4 -translate-y-12 disabled:opacity-40 transition-opacity duration-75'>
                    <h2 className='w-full mt-12 text-3xl font-semibold'>Profile Data</h2>
                    <label
                        htmlFor='name'
                        className='mt-10 pl-2 font-semibold text-lg'>
                        Name
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-darkshadow  border border-darkshadow'
                        id='name'
                        type='text'
                        {...form.register('name')}
                    />
                    <label
                        htmlFor='password'
                        className='mt-4 pl-2 font-semibold text-lg'>
                        Current Password
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-darkshadow  border border-darkshadow'
                        id='password'
                        type='password'
                        {...form.register('password')}
                    />
                    <label
                        htmlFor='newPassword'
                        className='mt-4 pl-2  font-semibold text-lg'>
                        New Password
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-darkshadow border border-darkshadow'
                        id='newPassword'
                        type='password'
                        {...form.register('newPassword')}
                    />
                    <label
                        htmlFor='confirmPassword'
                        className='mt-4 pl-2  font-semibold text-lg'>
                        Confirm Password
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-darkshadow border border-darkshadow'
                        id='confirmPassword'
                        type='password'
                        {...form.register('confirmPassword')}
                    />
                    {error && <Error error={error} />}
                    {success && <Success success={success} />}
                    <div className='flex flex-row justify-between mt-10'>
                        <Link
                            href='/auth/'
                            className='px-12 py-1 border border-darkshadow rounded-md text-darkshadow font-semibold hover:bg-[#dcd0f8] outline-none'>
                            Cancel
                        </Link>
                        <button
                            type='submit'
                            className='px-12 py-1 bg-darkactivebg border border-darkactivebg rounded-md font-normal text-white hover:bg-darkactivebg outline-none'>
                            Save
                        </button>
                    </div>
                </fieldset>
                <div className='z-10'>
            <div className='w-[250px] h-[250px] rounded-full border border-double border-[#ff5df2] bg-[#ff5df233] animate-circle-2 absolute -z-10'></div>

            <div className='w-[250px] h-[250px] rounded-full border border-double border-[#15a9e0] bg-[#15a9e033] animate-circle-1 absolute -z-10'></div>
            <label
                htmlFor='inputImage'
                className='absolute w-[200px] h-[200px] rounded-full translate-y-4 translate-x-3 z-20 hover:bg-[#00000099] bg-transparent *:hover:text-white  flex flex-col justify-center align-middle pl-4'>
                <FaPen className='text-transparent text-2xl w-full text-center' />
                <p className='text-transparent text-xl w-full'>Edit profile image</p>
                <input
                    type='file'
                    id='inputImage'
                    className='hidden'
                    accept='image/*'
                    onChange={(e)=>setFile(e.target.files?e.target.files[0]:null)}
                />
                <div className='w-full h-[6px] bg-transparent border border-darkshadow translate-y-32 rounded-xl'>
                    <div className='h-full bg-darkshadow transition-all duration-150' style={{width:`${progress}%`}}></div>
                </div>
            </label>
            <img
                alt='alt image'
                className='w-[200px] h-[200px] rounded-full z-10 translate-y-4 translate-x-3 object-cover object-center'
                src={
                    imageUrl?
                    imageUrl.url
                    :user.imageUrl?
                    user.imageUrl:'/avatar.jpg'}
            />
            <h3
                aria-disabled={isPending}
                className='text-center font-semibold text-2xl z-10 translate-y-5 disabled:opacity-10 disabled:blur-md'>
                {user.name}
            </h3>
        </div>
            </form>
        </div>
    );
}
