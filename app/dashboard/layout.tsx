import type {Metadata} from 'next';
import '../globals.css';
import {SessionProvider} from 'next-auth/react';
import {EdgeStoreProvider} from '@/lib/edgestore';
import {
    Quicksand,
    Akronim,
    Courgette,
    Dongle,
    Doto,
    Ephesis,
    Kite_One,
    Love_Light,
    Montez,
    Ms_Madi,
    NTR,
    Offside,
    Oregano,
} from 'next/font/google';
import {Providers} from '../providers';
import I18nProvider from '@/components/I18nProvider';
import {Suspense} from 'react';
import Loading from '@/components/Loading';
import GlobalSettingsProvider from '@/components/GlobalSettingsProvider';

const quicksand = Quicksand({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-quicksand',
});

const akronim = Akronim({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-akronim',
});
const courgette = Courgette({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-courgette',
});
const dongle = Dongle({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    variable: '--font-dongle',
});
const doto = Doto({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-doto',
});
const ephesis = Ephesis({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-ephesis',
});
const kite_one = Kite_One({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-kite-one',
});
const love_light = Love_Light({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-love-light',
});
const montez = Montez({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montez',
});
const ms_madi = Ms_Madi({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-ms-madi',
});
const ntr = NTR({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-ntr',
});
const offside = Offside({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-offside',
});
const oregano = Oregano({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-oregano',
});

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
        <html
            suppressHydrationWarning
            lang='en'
            className={`${quicksand.variable} font-sans`}>
            <head>
                <link
                    rel='preconnect'
                    href='https://fonts.googleapis.com'
                />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                />
            </head>
            <body className='w-screen h-screen p-0 m-0 overflow-x-hidden bg-slate-50 dark:bg-[#181818] font-sans'>
                <I18nProvider>
                    <Suspense fallback={<Loading />}>
                        <EdgeStoreProvider basePath='/api/edgestore'>
                            <SessionProvider>
                                <Providers>
                                    <GlobalSettingsProvider />
                                    {children}
                                </Providers>
                            </SessionProvider>
                        </EdgeStoreProvider>
                    </Suspense>
                </I18nProvider>
            </body>
        </html>
    );
}
