import React from 'react';
import {fonts} from '@/Edits';
import {useNoteStore} from '@/zustand-store/note';
function Font() {
    const {state, setProperty} = useNoteStore();
    return (
        <div className='grid justify-start w-full h-56 grid-cols-2 gap-5 px-5 py-3 overflow-x-hidden overflow-y-scroll text-lg md:flex md:flex-col md:px-0 md:py-5 md:h-screen md:w-48 md:items-start bg-asidebg dark:bg-darkasidebg scroll-smooth'>
            {fonts.map((each, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setProperty('fontFamily', each.name);
                        }}
                        className={`w-full text-center md:text-start font-light border border-transparent border-b-[#00000022] dark:border-b-[#ffffff22] py-3 pl-3 outline-none hover:bg-[#00000011]`}
                        style={{
                            fontFamily: each.name,
                            backgroundColor: state.fontFamily === each.name ? '#00000044' : '',
                        }}>
                        <p>{each.ui}</p>
                    </button>
                );
            })}
        </div>
    );
}
export default React.memo(Font);
