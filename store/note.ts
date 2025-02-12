import {create} from 'zustand';
import {State, Sticker} from '@/types';
import {StaticImageData} from 'next/image';
interface NoteStore {
    state: State;
    title: string;
    text: string;
    createdDate: string;
    icon: string;
    stickers: Sticker[];
    setProperty: <K extends keyof State>(key: K, value: State[K]) => void;
    setNoteDetails: (details: {
        title?: string;
        text?: string;
        createdDate?: string;
        icon?: string;
    }) => void;
    setInitialState: (note: {
        state: State;
        title: string;
        text: string;
        createdDate: string;
        icon: string;
        stickers: Sticker[];
    }) => void;
    addSticker: (sticker: {name: string; id: string; src: StaticImageData}) => void;
    updateSticker: (
        stickerId: number,
        updates: {position?: {x: number; y: number}; size?: {width: number; height: number}}
    ) => void;
    removeSticker: (stickerId: number) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    state: {
        color: '#000000',
        backgroundColor: '#FFFFFF',
        fontWeight: 'normal',
        fontSize: '16px',
        fontStyle: 'normal',
        fontFamily: 'sans',
        textDecoration: 'none',
        textTransform: 'none',
        letterSpacing: 0,
        lineHeight: 1,
        textAlign: 'left',
        textShadow: 'none',
        marginLeft: 0,
        marginTop: 0,
    },
    title: '',
    text: '',
    createdDate: '',
    icon: '',
    stickers: [],

    setProperty: (key, value) =>
        set((state) => ({
            state: {...state.state, [key]: value},
        })),

    setNoteDetails: (details) =>
        set((state) => ({
            title: details.title ?? state.title,
            text: details.text ?? state.text,
            createdDate: details.createdDate ?? state.createdDate,
            icon: details.icon ?? state.icon,
        })),

    setInitialState: (note) =>
        set(() => ({
            state: note.state,
            title: note.title,
            text: note.text,
            createdDate: note.createdDate,
            icon: note.icon,
            stickers: note.stickers,
        })),

    addSticker: (sticker: {name: string; id: string; src: StaticImageData}) =>
        set((state) => ({
            stickers: [
                ...state.stickers,
                {
                    ...sticker,
                    position: {x: 50, y: 50},
                    size: {width: 100, height: 100},
                },
            ],
        })),

    updateSticker: (
        stickerId: number,
        updates: {position?: {x: number; y: number}; size?: {width: number; height: number}}
    ) =>
        set((state) => ({
            stickers: state.stickers.map((sticker, index) =>
                index === stickerId ? {...sticker, ...updates} : sticker
            ),
        })),

    removeSticker: (stickerId: number) =>
        set((state) => ({
            ...state,
            stickers: [
                ...state.stickers.slice(0, stickerId),
                ...state.stickers.slice(stickerId + 1),
            ],
        })),
}));
