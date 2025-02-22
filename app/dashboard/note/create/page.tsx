'use client';
import Navigation from '@/components/EditorComponents/Navigation';
import NewNote from '@/components/EditorComponents/NewNote';
import {useRouter} from 'next/navigation';
export default function page() {
    const router = useRouter();
    return (
        <>
            <NewNote router={router} />
            <Navigation />
        </>
    );
}
