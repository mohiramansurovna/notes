import SideBar from '@/components/EditorComponents/SideBar';
import Loading from '@/components/Loading';
import React, {Suspense} from 'react';

export default function layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <SideBar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
    );
}
