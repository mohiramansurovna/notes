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
                asidebg:"#ffffff99",
                darkasidebg:"#171717CC",
                shadow:"#00000033",
                darkshadow:"#600bd5",
                activebg:"#D1C6FA",
                darkactivebg:"#3A0860",
                text:"#4A4459",
                darktext:"#fee9ce",
                icon:"#000000AA",
                darkicon:"#f9f9f9",
                primarytext:'#1f2937',
                darkprimarytext:'#f9fafb',
                primarybg:'#9ca3af',
                darkprimarybg:'#1f2937',
            },
            fontFamily: {
                'irina-sans': ['Irina Sans', 'sans-serif'],
                'kite-one': ['Kite One', 'sans-serif'],
                alkatra: ['Alkatra', 'sans-serif'],
                courgette: ['Courgette', 'cursive'],
                doto: ['Doto', 'cursive'],
                miltonian: ['Miltonian', 'cursive'],
                akronim: ['Akronim', 'cursive'],
                sans:['var(--font-quicksand)']
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
