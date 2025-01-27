import Link from 'next/link'
import React from 'react'

export default function HeaderHome() {
  return (
    <header className='w-screen h-[100px] px-12 flex flex-row justify-between items-end pb-8'>
      <h1 className='font-kite-one text-2xl font-semibold'><span className='text-asideIcon'>N</span>otes</h1>
      <div className='flex flex-row justify-between max-w-44 min-w-36 w-1/6'>
      <Link className='bg-highlight py-1 px-3 rounded-full font-semibold text-white hover:bg-activehighlight' href='/auth/register'>Sign Up</Link>
      <Link className='py-1 font-semibold text-highlight underline-offset-2  hover:underline' href='/auth/login'>Sign In</Link>
      </div>
    </header>
  )
}
