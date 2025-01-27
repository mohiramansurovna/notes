import type {Metadata} from 'next';
import '../globals.css';
import {SessionProvider} from 'next-auth/react';
import {EdgeStoreProvider} from '@/lib/edgestore';
import SideBar from '@/components/EditorComponents/SideBar';
import {Quicksand} from 'next/font/google'

const quicksand=Quicksand({
    subsets:['latin'],
    weight:['300','400','500','600','700'],
    variable:'--font-quicksand'

})
export const metadata: Metadata = {
    title: 'Notes | Home',
    description: 'Generated by create next app',
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang='en' className={`${quicksand.variable} font-sans`}>
            <head>
                <link
                    rel='preconnect'
                    href='https://fonts.googleapis.com'
                />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Akronim&family=Alkatra:wght@400..700&family=Courgette&family=Doto:wght@100..900&family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Kite+One&family=Miltonian&display=swap'
                    rel='preload'
                />
            </head>
            <body className='m-0 h-screen w-screen overflow-x-hidden p-0'>
                <EdgeStoreProvider basePath='/api/edgestore'>
                    <SessionProvider>
                        <SideBar/>
                        {children}
                    </SessionProvider>
                </EdgeStoreProvider>
            </body>
        </html>
    );
}
