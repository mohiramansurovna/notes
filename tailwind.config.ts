import { plugin } from 'postcss';
import type {Config} from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                asidebg: '#ffffffCC',
                darkasidebg: '#171717DD',
                shadow: '#D1C6FA',
                darkshadow: 'var(--shadow)',
                activebg: '#D1C6FA',
                darkactivebg: 'var(--active)',
                text: '#4A4459',
                darktext: '#fee9ce',
                icon: '#000000DD',
                darkicon: '#f9f9f9',
                primarytext: '#1f2937',
                darkprimarytext: '#f9fafb',
                primarybg: '#9ca3af',
                darkprimarybg: '#1f2937',
                primary1: '#d8f5ef',
                darkprimary1: '#99d6d4',
                primary2: '#747fbe',
                darkprimary2: '#02075a',
                primary3: '#f4dcff',
                darkprimary3: '#fbbafe',
                primary4: '#94bbe1',
                darkprimary4: '#0c2eef',
            },
            fontFamily: {
                akronim: ['var(--font-akronim)'],
                alkatra: ['var(--font-alkatra)'],
                courgette: ['var(--font-courgette)'],
                dongle: ['var(--font-dongle)'],
                doto: ['var(--font-doto)'],
                ephesis: ['var(--font-ephesis)'],
                kiteone: ['var(--font-kite-one)'],
                lovelight: ['var(--font-love-light)'],
                montez: ['var(--font-montez)'],
                msmadi: ['var(--font-ms-madi)'],
                ntr: ['var(--font-ntr)'],
                offside: ['var(--font-offside)'],
                oregano: ['var(--font-oregano)'],
                sans: ['var(--font-quicksand)'],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
