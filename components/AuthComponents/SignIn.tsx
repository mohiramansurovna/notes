'use client';
import {LoginSchema} from '@/schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import login from '@/actions/login';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Error from '@/components/Error';
import Success from '@/components/Success';
import {useTransition} from 'react';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Socials from './Socials';
import {useTheme} from 'next-themes';
import {useTranslation} from 'react-i18next';
export function SignIn({router}: {router: AppRouterInstance}) {
    const [success, setSuccess] = useState<number>();
    const [error, setError] = useState<number>();
    const [isPending, startTransition] = useTransition();
    const {resolvedTheme} = useTheme();
    const {t} = useTranslation();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError(0);
        setSuccess(0);
        startTransition(() => {
            login(values).then((res) => {
                if (res.error) {
                    setError(res.error);
                }
                if (res.success) {
                    setSuccess(res.success);
                }
            });
        });
    };
    useEffect(() => {
        if (success) {
            router.push('/dashboard');
        }
    }, [success]);
    return (
        <main>
            {resolvedTheme === 'dark' ? (
                <Image
                    src='/signInDark.svg'
                    alt='logo'
                    width={750}
                    height={750}
                    className='absolute w-auto h-auto top-4 left-4'
                />
            ) : (
                <Image
                    src='/signIn.svg'
                    alt='logo'
                    width={750}
                    height={750}
                    className='absolute w-auto h-auto top-4 left-4'
                />
            )}

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={isPending}
                    className='absolute flex flex-col justify-center w-full h-full align-middle transition-opacity duration-75 lg:w-80 md:px-44 lg:left-1/2 disabled:opacity-30 p-8 bg-[#f9fafbdd] dark:bg-[#101010cc]'>
                    <h2 className='w-full mt-12 text-2xl font-semibold text-center text-nowrap'>
                        {t('readyToWriteYourLyrics')}
                    </h2>
                    <label
                        htmlFor='email'
                        className='pl-2 mt-4 text-lg font-semibold'>
                        {t('email')}
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#7E57C2] border border-[#7E57C2]'
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
                        className='rounded-md px-2 py-1 mt-1 outline-[#7E57C2]  border border-[#7E57C2]'
                        id='password'
                        type='password'
                        {...form.register('password')}
                    />
                    <Error error={error} />
                    <Success success={success} />
                    <div className='flex flex-row justify-between mt-10'>
                        <Link
                            href='/auth/'
                            className='px-12 py-1 border border-[#7E57C2] rounded-md text-[#7E57C2] font-semibold outline-none'>
                            {t('back')}
                        </Link>
                        <button
                            type='submit'
                            className='px-12 py-1 bg-[#7E57C2] rounded-md font-normal text-white outline-none'>
                            {t('signIn')}
                        </button>
                    </div>
                    {/* <Socials
                        color='#7E57C2'
                        signIn
                    /> */}
                    <Link
                        href='/auth/register'
                        className='mt-4 text-center outline-none hover:underline underline-offset-4'>
                        {t('noAccount')}
                    </Link>
                </fieldset>
            </form>
        </main>
    );
}
