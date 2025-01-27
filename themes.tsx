export type Theme = 'regular' | 'purple'|'minimalist';

type eachTheme = {
    bg: string;
    asidebg: string;
    activebg: string;
    text: string;
    primary1: string;
    primary2: string;
    primary3: string;
}
type themes={
    [key in Theme]:eachTheme
}

export const theme:themes= {
    'regular':{
        bg: '#ffffff',
        asidebg: '#e7e0ec' ,
        activebg: '#D1C6FA',
        text: '#4A4459',
        primary1: '#A8D5BA',
  		primary2: '#F6E3D3',
  		primary3: '#A8C9D5',
    },
    'purple': {
        bg: '#28293d',
        asidebg: '#555184',
        activebg: '2e3061',
        text: '#fee9ce',
        primary1: '#9997bc',
        primary2: '#b2a6be',
        primary3: '#674786',
    },
    'minimalist':{
        bg: '#ffffff',
        asidebg: 'transparent',
        activebg: '#D1C6FA',
        text: '#000',
        primary1: '#cff0ea',
        primary2: '#d1ecdc',
        primary3: '#d8e0f1',
    }
};
