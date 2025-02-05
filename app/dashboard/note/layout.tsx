import SideBar from '@/components/EditorComponents/SideBar';
import React from 'react';

export default function layout({children}:{children:React.ReactNode}) {
    return (
        <div>
            <SideBar />
            {children}
        </div>
    );
}
