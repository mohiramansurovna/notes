import React from 'react';
import {State} from '@/types';
import Link from 'next/link';
const initialState: State = {
    color: 'black',
    backgroundColor: '#1a1a1b',
    fontWeight: 'light',
    fontSize: '16',
    fontStyle: 'normal',
    fontFamily: 'sans',
    textDecoration: 'none',
    textTransform: 'none',
    letterSpacing: 1,
    lineHeight: 'inherit',
    textAlign: 'left',
    textShadow: 'none',
    marginLeft: 20,
    marginTop: 20,
};
const littleStyles:State = {
    color: '#50AB88',
    backgroundColor: '#0f1413',
    fontWeight: 'light',
    fontSize: '29',
    fontStyle: 'normal',
    fontFamily: 'oregano',
    textDecoration: 'none',
    textTransform: 'none',
    letterSpacing: 1,
    lineHeight: 'inherit',
    textAlign: 'center',
    textShadow: ['5', '6', '4', '#000000'],
    marginLeft: 20,
    marginTop: 204,
};
export const templates:{name:string, text:string, author:string, state:State}[] = [
    {name: 'default', text: 'New Note', author: 'lyrica', state: initialState},
    {name: 'little styles', text: 'Little Styles', author: 'mira0720', state: littleStyles},
];
export default function Templates() {
    return (
        <div className='flex flex-row flex-wrap items-start justify-start w-full gap-8 p-5'>
            {templates.map((template, index) => (
                <Link
                    href={`/dashboard/note/create?template=${index}`}
                    key={index}
                    className='h-48 p-2 shadow-inner rounded-sm w-52 shadow-gray-600 dark:shadow-shadow'>
                    <p
                        className='text-[15px] w-full h-32 text-wrap rounded-sm p-4 text-ellipsis overflow-hidden'
                        style={{
                            color: template.state.color,
                            backgroundColor: template.state.backgroundColor,
                            fontWeight: template.state.fontWeight,
                            fontStyle: template.state.fontStyle,
                            fontFamily: template.state.fontFamily,
                            textDecoration: template.state.textDecoration,
                            textTransform: template.state.textTransform,
                            letterSpacing: template.state.letterSpacing + 'px',
                            lineHeight: template.state.lineHeight,
                            textAlign: template.state.textAlign,
                            textShadow:
                                template.state.textShadow === 'none'
                                    ? 'none'
                                    : template.state.textShadow[0] +
                                      'px ' +
                                      template.state.textShadow[1] +
                                      'px ' +
                                      template.state.textShadow[2] +
                                      'px ' +
                                      template.state.textShadow[3],
                        }}>
                        {template.text}
                    </p>
                    <h3 className='ml-2'>{template.name}</h3>
                    <p className='text-[10px] ml-2 text-primarytext dark:text-darkprimarytext'>
                        by {template.author}
                    </p>
                </Link>
            ))}
        </div>
    );
}
