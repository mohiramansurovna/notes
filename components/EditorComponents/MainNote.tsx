'use client';
import Navigation from '@/components/EditorComponents/Navigation';
import Note from '@/components/EditorComponents/Note';

import {Action, Fonts, State} from '@/types';
import React, {useEffect, useReducer, useState} from 'react';

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'color':
            return {...state, color: action.payload as string};
        case 'backgroundColor':
            return {...state, backgroundColor: action.payload as string};
        case 'fontWeight':
            return {...state, fontWeight: action.payload as 'thin'|'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'};
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
        case 'textShadow':
            return {...state, textShadow: action.payload as [string, string, string] | 'none'};
        case 'marginLeft':
            return {...state, marginLeft: action.payload as number};
        case 'marginTop':
            return {...state, marginTop: action.payload as number};
        case 'init':
            return {...(action.payload as State)};
        default:
            return state;
    }
}
const initialState: State = {
    color: 'black',
    backgroundColor: '#dcd1f3',
    fontWeight: 'normal',
    fontSize: 25,
    fontStyle: 'normal',
    fontFamily: 'irina-sans',
    textDecoration: 'none',
    textTransform: 'none',
    letterSpacing: 1,
    lineHeight: 'inherit',
    textAlign: 'left',
    textShadow: 'none',
    marginLeft: 20,
    marginTop: 20,
};
function init(): State {
    return initialState;
}

export default function MainNote({
    note,
    id,
}: {
    note: {title: string; text: string; createdDate: string; icon: string; state: State};
    id: string;
}) {
    const [state, dispatch] = useReducer(reducer, initialState, init)
    const [values, setValues] = useState<{
        title: string;
        text: string;
        createdDate: string;
        icon: string;
    }>();
    useEffect(() => {
        dispatch({type: 'init', payload: note.state});
        setValues({
            title: note.title,
            text: note.text,
            createdDate: note.createdDate,
            icon: note.icon,
        });
    }, [note]);
    return (
        values && (
            <main className='fixed w-screen h-screen p-0 m-0 overflow-y-scroll bg-bg'>
                <Note
                    values={values}
                    id={id}
                    state={state}
                />
                <Navigation
                    state={state}
                    dispatch={dispatch}
                />
            </main>
        )
    );
}
