import Link from 'next/link'
import React from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'

export default function ErrorComponent({error}: {error:string}) {
  return (
    <div className='absolute-center  p-5 border rounded-lg bg-asidebg border-asideIcon text-3xl text-text flex flex-col justify-around items-center'><MdOutlineErrorOutline/>{error}<Link href='/dashboard' className='text-sm underline pt-2'>back to dashboard</Link></div>
  )
}
