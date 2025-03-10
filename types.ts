import { StaticImageData } from "next/image";

export type Fonts =
    | 'akronim'
    | 'alkatra'
    | 'courgette'
    | 'dongle'
    | 'doto'
    | 'ephesis'
    | 'kiteone'
    | 'lovelight'
    | 'montez'
    | 'msmadi'
    | 'ntr'
    | 'offside'
    | 'oregano'
    | 'sans';

export type State = {
    color: string;
    backgroundColor: string;
    fontWeight:
        | 'thin'
        | 'extralight'
        | 'light'
        | 'normal'
        | 'medium'
        | 'semibold'
        | 'bold'
        | 'extrabold'
        | 'black';
    fontSize: string;
    fontStyle: 'normal' | 'italic';
    fontFamily: Fonts;
    textDecoration: 'none' | 'underline' | 'overline' | 'line-through' | 'blink';
    textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    letterSpacing: number;
    lineHeight: number | 'inherit';
    textAlign: 'left' | 'right' | 'center' | 'justify';
    textShadow: [string, string, string, string] | 'none';
    marginLeft: number;
    marginTop: number;
};

export type Sticker = {
    name: string;
    position: {x: number; y: number};
    size: {width: number; height: number};
};

export type Stickers={
    [id:string]:Sticker
}

export type Note = {
    state: State;
    title: string;
    text: string;
    createdDate: string;
    icon: string;
    stickers: Stickers;
};
export type ProfileImage = {
    url: string;
    miniUrl: string | null;
};
