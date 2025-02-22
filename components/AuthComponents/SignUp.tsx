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
import {useTheme} from 'next-themes';
import { useTranslation } from 'react-i18next';

export default function SignUp({router}: {router: AppRouterInstance}) {
    const [error, setError] = useState<number>();
    const [success, setSuccess] = useState<number>();
    const [isPending, startTransition] = useTransition();
    const {resolvedTheme} = useTheme();
    const {t}=useTranslation()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError(0);
        setSuccess(0);
        startTransition(() => {
            setError(undefined);
            setSuccess(undefined);
            register(values).then((res: {error?: number; success?: number}) => {
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
            }, 1000);
        }
    }, [success]);
    return (
        <main className='w-screen h-screen'>
            <Image
                src='/signUp2.svg'
                width={300}
                height={250}
                alt='bloob'
                className='absolute bottom-0 left-0 -z-10'
            />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={isPending}
                    className='flex flex-col justify-center align-middle w-full lg:w-80 h-screen absolute md:px-44 lg:left-1/4  lg:px-0 px-8  disabled:opacity-40 transition-opacity duration-75 bg-[#f9fafbcc] dark:bg-[#101010ef]'>
                    <h2 className='w-full mt-12 text-3xl font-semibold text-center'>{t('signUp')}</h2>
                    <label
                        htmlFor='name'
                        className='pl-2 mt-10 text-lg font-semibold'>
                        {t('name')}
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#65558F]  border border-[#65558F]'
                        id='name'
                        type='text'
                        {...form.register('name')}
                    />
                    <label
                        htmlFor='email'
                        className='pl-2 mt-4 text-lg font-semibold'>
                        {t('email')}
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#65558F] border border-[#65558F]'
                        id='email'
                        type='email'
                        {...form.register('email')}
                    />
                    <label
                        htmlFor='password'
                        className='pl-2 mt-4 text-lg font-semibold'>
                        {t('password')}
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#65558F]  border border-[#65558F]'
                        id='password'
                        type='password'
                        {...form.register('password')}
                    />
                    <Error error={error} />
                    <Success success={success} />
                    <div className='flex flex-row justify-between w-full gap-2 mt-10 font-semibold'>
                        <Link
                            href='/auth/'
                            className='px-12 py-1 border border-[#65558F] rounded-md text-[#65558F] outline-none'>
                            {t('back')}
                        </Link>
                        <button
                            type='submit'
                            className='px-12 py-1 bg-[#65558F] rounded-md text-white outline-none'>
                            {t('signUp')}
                        </button>
                    </div>
                    {/* <Socials
                        color='#65558F'
                        signIn={false}
                    /> */}
                    <Link
                        href='/auth/login'
                        className='z-20 w-full mt-4 text-center outline-none hover:underline underline-offset-4'>
                        {t('haveAccount')}
                    </Link>
                </fieldset>
            </form>
            <Image
                src='/signUp1.svg'
                width={600}
                height={600}
                alt='bloob'
                className='absolute top-0 right-0 -z-10'
            />
            <div className='overflow-hidden w-[500px] h-[500px] absolute bottom-0 right-0'>
                
            {resolvedTheme === 'dark' ? (
                <Image
                src='/signUp.svg'
                    width={500}
                    height={500}
                    alt='icon'
                    className='absolute bottom-[50px] right-[-50px] -z-10'
                    />
                ) : (
                    <Image
                    src='/signUpLight.svg'
                    width={500}
                    height={500}
                    alt='icon'
                    className='absolute bottom-[50px] right-[-50px] -z-10'
                    />
                )}
                </div>
        </main>
    );
}
