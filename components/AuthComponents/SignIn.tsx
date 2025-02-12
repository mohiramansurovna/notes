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
export function SignIn({router}: {router: AppRouterInstance}) {
    const [success, setSuccess] = useState<number>();
    const [error, setError] = useState<number>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError(0)
        setSuccess(0)
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
            <Image
                unoptimized={true}
                src='/Notes.gif'
                alt='logo'
                width={320}
                height={300}
                className='absolute top-1/4'
            />
            <Image
                src='/Vector (1).svg'
                alt='logo'
                width={750}
                height={750}
                className='absolute-center w-auto h-auto'
            />
            <Image
                unoptimized={true}
                src='/Notebook.gif'
                alt='logo'
                width={200}
                height={200}
                className='absolute top-5 right-10'
            />
            <Image
                src='/blob (1) 1.svg'
                alt='logo'
                width={250}
                height={250}
                className='absolute top-1/2 right-10 w-auto h-auto'
            />

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={isPending}
                    className='flex flex-col justify-start align-middle w-80 h-3/4 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 transition-opacity duration-75 disabled:opacity-30'>
                    <h2 className='w-full mt-12 text-3xl font-semibold text-center'>
                        Welcome Back!
                    </h2>
                    <label
                        htmlFor='email'
                        className='mt-4 pl-2  font-semibold text-lg'>
                        Email
                    </label>
                    <input
                        className='rounded-md px-2 py-1 mt-1 outline-[#a468b3] border border-[#c3a8ca]'
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
                        className='rounded-md px-2 py-1 mt-1 outline-[#a468b3]  border border-[#c3a8ca]'
                        id='password'
                        type='password'
                        {...form.register('password')}
                    />
                    <Error error={error} />
                    <Success success={success} />
                    <div className='flex flex-row justify-between mt-10'>
                        <Link
                            href='/auth/'
                            className='px-12 py-1 border border-[#a468b3] rounded-md text-[#a468b3] font-semibold hover:bg-[#eed1f8] outline-none'>
                            Cancel
                        </Link>
                        <button
                            type='submit'
                            className='px-12 py-1 border bg-[#a468b3] rounded-md font-normal text-white hover:bg-[#9f5ab1] outline-none'>
                            Login
                        </button>
                    </div>
                    <Socials color='#a468b3' signIn/>
                    <Link
                        href='/auth/register'
                        className='mt-4 text-center hover:underline underline-offset-4 outline-none'>
                        Don't have an account?
                    </Link>
                </fieldset>
            </form>
        </main>
    );
}
