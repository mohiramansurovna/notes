import type {Config} from 'tailwindcss';
export let baseFontSize = 16;
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
                // shadow: '#D1C6FA',
                text: '#4A4459',
                darktext: '#fee9ce',
                icon: '#000000DD',
                darkicon: '#f9f9f9',

                darkshadow: 'var(--shadow)',
                shadow: 'var(--shadow)',
                main: 'var(--main)',
                darkmain: 'var(--darkmain)',
                darkbg: '#181818',
                asidebg: '#f8fafccc',
                darkasidebg: '#171717DD',
                activebg: '#D1C6FA',
                primarytext: '#1f2937',
                darkprimarytext: '#f9fafb',
                primarybg: '#9ca3af',
                darkprimarybg: '#1f2937',
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
            fontSize: {
                sm: `var(--font-sm)`,
                base: `var(--font-base)`,
                lg: `var(--font)`,
                xl: `var(--font-xl)`,
                '2xl': `var(--font-2xl)`,
                '3xl': `var(--font-3xl)`,
                '4xl': `var(--font-4xl)`,
            },
            borderRadius: {
                '50': '50px',
            },
            boxShadow:{
                left: '-3px -1px 10px 0 var(--shadow)',
                up: '-1px -1px 10px 0 var(--shadow)',
            }
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
