'use client'

import { getLocal, setLocal } from '@/lib/storage'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ColorResult } from 'react-color'
import FloatingToolbar from './FloatingToolbar'
import ImageDrawer from './ImageDrawer'
import MainLeft from './MainLeft'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import WeiboHotList from './WeiboHotList'

export default function HomePage() {
  const [isImgShow, setIsImgShow] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(1)
  const [color, setColor] = useState('#f09393')
  const [ghostClose, setGhostClose] = useState(false)
  const [mounted, setMounted] = useState(false)

  const setBodyColor = useCallback((color: string) => {
    document.documentElement.style.setProperty('--primary-color', color)
    document.documentElement.style.setProperty(
      '--primary-virtual-color',
      color + '80',
    )
  }, [])

  useEffect(() => {
    setMounted(true)

    const savedBg = getLocal<number>('bg')
    if (savedBg && typeof savedBg === 'number') {
      setBackgroundImage(+savedBg)
    }

    const savedTheme = getLocal<string>('itudb_theme') || '#f09393'
    setColor(savedTheme)
    setBodyColor(savedTheme)

    const savedGhost = getLocal<boolean>('isGhost') ?? false
    setGhostClose(savedGhost)
  }, [setBodyColor])

  const toggleGhost = () => {
    const newValue = !ghostClose
    setLocal('isGhost', newValue)
    setGhostClose(newValue)
  }

  const handleChangeColor = (colorResult: ColorResult) => {
    const { hex } = colorResult
    setColor(hex)
    setBodyColor(hex)
    setLocal('itudb_theme', hex)
  }

  if (!mounted) {
    return null
  }

  return (
    <main className={`min-h-screen pb-16 ${ghostClose ? '' : 'ghost-mode'}`}>
      <NavBar isGhostMode={ghostClose} />

      <div className="relative">
        <Image
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          src={require(
            `@/assets/images/background-images/win_bg${backgroundImage}.jpg`,
          )}
          alt=""
          fetchPriority="high"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={() => {}} />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <MainLeft />
            </div>

            <div className="lg:col-span-1">
              <WeiboHotList />
            </div>
          </div>

          <FloatingToolbar
            color={color}
            ghostClose={ghostClose}
            onColorChange={handleChangeColor}
            onToggleGhost={toggleGhost}
            onOpenImageDrawer={() => setIsImgShow(true)}
          />
        </div>
      </div>

      <ImageDrawer
        isOpen={isImgShow}
        onClose={() => setIsImgShow(false)}
        onSelectImage={setBackgroundImage}
      />
    </main>
  )
}
