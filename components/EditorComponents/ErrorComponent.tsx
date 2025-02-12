import Link from 'next/link'
import React from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'

export default function ErrorComponent({error}: {error:string}) {
  return (
    <div className='flex flex-col items-center justify-around p-5 text-3xl border rounded-lg absolute-center bg-asidebg border-asideIcon'><MdOutlineErrorOutline/>{error}<Link href='/dashboard' className='pt-2 text-sm underline'>back to dashboard</Link></div>
  )
}
