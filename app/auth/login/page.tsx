'use client';
import {SignIn} from '@/components/AuthComponents/SignIn';
import {useRouter} from 'next/navigation';
import React from 'react';

export default function page() {
    const router = useRouter();
    return <SignIn router={router} />;
}
