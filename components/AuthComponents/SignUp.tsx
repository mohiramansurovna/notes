'use client';
import React, {useState, useTransition, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {RegisterSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import register from '@/actions/register';
import Link from 'next/link';
import Image from 'next/image';
import Error from '@/components/Error';
import Success from '../Success';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Socials from './Socials';

export default function SignUp({router}: {router: AppRouterInstance}) {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            setError(undefined);
            setSuccess(undefined);
            register(values).then((res: {error?: string; success?: string}) => {
                if (res.error) {
                    setError(res.error);
                    form.reset();
                }
                if (res.success) {
                    setSuccess(res.success);
                }
            });
        });
    };
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                router.push('/auth/login');
            }, 3000);
        }
    }, [success]);
    return (
        <main className='w-screen h-screen bg-primary'>
            <Image
                src='/blob 1.svg'
                width={250}
                height={250}
                alt='bloob'
                className='absolute bottom-0 left-0 '
            />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={isPending}
                    className='flex flex-col justify-start align-middle w-80 h-3/4 absolute top-1/2 left-1/4 -translate-y-2/3 disabled:opacity-40 transition-opacity duration-75'>
                    <h2 className='w-full mt-12 text-3xl font-semibold text-center'>Sign Up</h2>
                    <label
                        htmlFor='name'
                        className='mt-10 pl-2 font-semibold text-lg'>
                        Name
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#65558F]  border border-[#65558F]'
                        id='name'
                        type='text'
                        {...form.register('name')}
                    />
                    <label
                        htmlFor='email'
                        className='mt-4 pl-2  font-semibold text-lg'>
                        Email
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#65558F] border border-[#65558F]'
                        id='email'
                        type='email'
                        {...form.register('email')}
                    />
                    <label
                        htmlFor='password'
                        className='mt-4 pl-2 font-semibold text-lg'>
                        Password
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#65558F]  border border-[#65558F]'
                        id='password'
                        type='password'
                        {...form.register('password')}
                    />
                    {error && <Error error={error} />}
                    {success && <Success success={success} />}
                    <div className='flex flex-row justify-between mt-10'>
                        <Link
                            href='/auth/'
                            className='px-12 py-1 border border-[#65558F] rounded-md text-[#65558F] font-semibold hover:bg-[#dcd0f8] outline-none'>
                            Cancel
                        </Link>
                        <button
                            type='submit'
                            className='px-12 py-1 border bg-[#65558F] rounded-md font-normal text-white hover:bg-[#45307c] outline-none'>
                            Register
                        </button>
                    </div>
                    <Socials color='#65558F' signIn={false} />
                    <Link
                        href='/auth/login'
                        className='mt-4 text-center hover:underline underline-offset-4 outline-none'>
                        Already has an account?
                    </Link>
                </fieldset>
            </form>
            <Image
                src='/Vector.svg'
                width={600}
                height={600}
                alt='bloob'
                className='absolute top-0 right-0'
            />
            <Image
                src='/Creative writing.gif'
                width={350}
                height={350}
                alt='icon'
                className='absolute top-[50px] right-[50px]'
            />
        </main>
    );
}
