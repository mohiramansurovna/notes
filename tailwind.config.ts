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
                bg: 'var(--bg)',
                asidebg: 'var(--asidebg)',
                activebg: 'var(--activebg)',
                text: 'var(--text)',
                primary1: 'var(--primary1)',
                primary2: 'var(--primary2)',
                primary3: 'var(--primary3)',
                primary: '#d9d9d9',
                secondary: '#f6daef',
                highlight: '#65558f',
				activehighlight: '#8472b1',
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
