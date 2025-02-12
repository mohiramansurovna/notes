'use client';
import Navigation from '@/components/EditorComponents/Navigation';
import NewNote from '@/components/EditorComponents/NewNote';
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect, useReducer} from 'react';
import {templates} from '@/components/DashboardComponents/Templates';

export default function page() {
    const router = useRouter();
    return (
        <>
            <NewNote router={router} />
            <Navigation />
        </>
    );
}
