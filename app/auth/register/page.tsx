'use client';
import SignUp from '@/components/AuthComponents/SignUp';
import {useRouter} from 'next/navigation';
import React from 'react';

export default function page() {
    const router = useRouter();
    return (
        <div>
            <SignUp router={router} />
        </div>
    );
}
