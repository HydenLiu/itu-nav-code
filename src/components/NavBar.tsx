'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { parseTime } from '@/lib/utils'

interface NavBarProps {
  isGhostMode: boolean
}

export default function NavBar({ isGhostMode }: NavBarProps) {
  const [theDate, setTheDate] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const time = parseTime(new Date(), '{y} 年 {m} 月 {d} 日 {h}:{i}:{s} 星期{a}')
      setTheDate(time || '')
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <nav className={`w-full py-4 px-6 ${isGhostMode ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'} transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src={isGhostMode ? '/logo.png' : '/logo-black.png'}
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <h3 className={`text-xl font-title font-bold ${isGhostMode ? 'text-gray-800' : 'text-white'}`}>
            艾兔网
          </h3>
        </div>
        <div className={`font-digital text-lg ${isGhostMode ? 'text-gray-700' : 'text-white/90'}`}>
          {theDate}
        </div>
      </div>
    </nav>
  )
}

