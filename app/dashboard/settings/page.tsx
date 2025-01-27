'use client'
import Settings from '@/components/ProfileComponents/Settings'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
  const router=useRouter()
  return (
    <div>
      <Settings router={router}/>
    </div>
  )
}
