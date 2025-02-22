import {create} from 'zustand';
import {State, Stickers} from '@/types';
interface NoteStore {
    state: State;
    title: string;
    text: string;
    createdDate: string;
    icon: string;
    stickers: Stickers;
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
        stickers: Stickers;
    }) => void;
    addSticker: (name: string) => void;
    removeSticker: (stickerId: string) => void;
    updateSticker: (
        stickerId: string,
        position?: {x: number; y: number},
        size?: {width: number; height: number}
    ) => void;
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
    stickers: {},

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

    //TODO:find a way of saving the stickers with index not with img data
    addSticker: (name: string) => {
        const newId = Date.now().toString();
        set((state) => ({
            stickers: {
                ...state.stickers,
                [newId]: {
                    name: name,
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                },
            },
        }));
    },
    removeSticker: (stickerId) =>
        set((state) => {
            const newStickers = {...state.stickers};
            delete newStickers[stickerId];
            console.log(newStickers)
            return {stickers: newStickers};
        }),

    updateSticker: (
        stickerId: string,
        position?: {x: number; y: number},
        size?: {width: number; height: number}
    ) =>
        set((state) => ({
            stickers: {
                ...state.stickers,
                [stickerId]: {
                    ...state.stickers[stickerId],
                    size: size ?? state.stickers[stickerId].size,
                    position: position ?? state.stickers[stickerId].position,
                },
            },
        })),
}));
