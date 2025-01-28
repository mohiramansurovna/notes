'use client'
import { useTheme } from "next-themes"
import {FiSun, FiMoon} from 'react-icons/fi'
import {useState, useEffect} from 'react'

export default function ThemeSwitch() {
    const [mounted,setMounted]=useState(false)
    const {setTheme, resolvedTheme} = useTheme()
    useEffect(() => setMounted(true), [])
    if (!mounted) return (
        <div></div>
    )
    if (resolvedTheme==='dark'){
        return (
            <FiSun onClick={()=>setTheme('light')} className='m-3 cursor-pointer' size={24}/>
        )
    }
    if (resolvedTheme==='light'){
        return (
            <FiMoon onClick={()=>setTheme('dark')} className='m-3 cursor-pointer' size={24}/>
        )
    }
}