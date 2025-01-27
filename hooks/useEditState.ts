'use client';
import {State, Action, Fonts} from '@/types';
import {useReducer} from 'react';
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'color':
            return {...state, color: action.payload as string};
        case 'backgroundColor':
            return {...state, backgroundColor: action.payload as string};
        case 'fontWeight':
            return {...state, fontWeight: action.payload as string};
        case 'fontSize':
            return {...state, fontSize: action.payload as number};
        case 'fontStyle':
            return {...state, fontStyle: action.payload as 'normal' | 'italic'};
        case 'fontFamily':
            return {
                ...state,
                fontFamily: action.payload as Fonts,
            };
        case 'textDecoration':
            return {
                ...state,
                textDecoration: action.payload as
                    | 'none'
                    | 'underline'
                    | 'overline'
                    | 'line-through'
                    | 'blink',
            };
        case 'textTransform':
            return {
                ...state,
                textTransform: action.payload as 'none' | 'capitalize' | 'uppercase' | 'lowercase',
            };
        case 'letterSpacing':
            return {...state, letterSpacing: action.payload as number};
        case 'lineHeight':
            return {...state, lineHeight: action.payload as number};
        case 'textAlign':
            return {...state, textAlign: action.payload as 'left' | 'right' | 'center' | 'justify'};
        case 'wordSpacing':
            return {...state, wordSpacing: action.payload as number};
        case 'textShadow':
            return {...state, textShadow: action.payload as [string, string, string] | 'none'};
        case 'marginLeft':
            return {...state, marginLeft: action.payload as number};
        case 'marginTop':
            return {...state, marginTop: action.payload as number};
        default:
            return state;
    }
}
const initialState: State = {
    color: 'black',
    backgroundColor: '#a8bff3',
    fontWeight: '500',
    fontSize: 25,
    fontStyle: 'normal',
    fontFamily: 'irina-sans',
    textDecoration: 'none',
    textTransform: 'none',
    letterSpacing: 1,
    lineHeight: 'inherit',
    textAlign: 'left',
    wordSpacing: 1,
    textShadow: 'none',
    marginLeft: 20,
    marginTop: 20,
};
function init(): State {
    return initialState;
}
export default function useEditState() {
    const [state, dispatch] = useReducer(reducer, initialState, init);
    return {state, dispatch}
}
