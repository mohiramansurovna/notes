'use client';

import {useTranslation} from 'react-i18next';

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    const on = (lang:'en'|'ru') => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className='top-44 left-44 z-20 absolute'>
            <button onClick={() => on('en')}>English</button>
            <button onClick={() => on('ru')}>Русский</button>
        </div>
    );
};

export default LanguageSwitcher;
