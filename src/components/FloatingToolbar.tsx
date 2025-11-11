'use client'

import { Github, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { ColorResult } from 'react-color'

interface FloatingToolbarProps {
  color: string
  ghostClose: boolean
  onColorChange: (color: ColorResult) => void
  onToggleGhost: () => void
  onOpenImageDrawer: () => void
}

export default function FloatingToolbar({
  color,
  ghostClose,
  onColorChange,
  onToggleGhost,
  onOpenImageDrawer,
}: FloatingToolbarProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  return (
    <div className="fixed right-6 bottom-6 flex flex-col space-y-3">
      {/* 颜色选择器 */}
      {/* <div className="relative">
        <button
          className="h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          style={{ backgroundColor: color }}
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
          title="主题颜色"
        />
        {displayColorPicker && (
          <div className="absolute right-0 bottom-14">
            <div
              className="fixed inset-0"
              onClick={() => setDisplayColorPicker(false)}
            />
            <SketchPicker color={color} onChange={onColorChange} disableAlpha />
          </div>
        )}
      </div> */}

      {/* 透明模式切换 */}
      {/* <button
        className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center ${
          ghostClose ? 'bg-white text-primary' : 'bg-primary text-white'
        }`}
        onClick={onToggleGhost}
        title={ghostClose ? '切换到透明模式' : '切换到白底模式'}
      >
        {ghostClose ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button> */}

      {/* 切换背景 */}
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl ${
          ghostClose ? 'bg-primary text-white' : 'text-primary bg-white'
        }`}
        onClick={onOpenImageDrawer}
        title="切换封面"
      >
        <ImageIcon className="h-6 w-6" />
      </button>

      {/* GitHub */}
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl ${
          ghostClose ? 'bg-primary text-white' : 'text-primary bg-white'
        }`}
        onClick={() => window.open('https://github.com/HydenLiu')}
        title="项目详情"
      >
        <Github className="h-6 w-6" />
      </button>
    </div>
  )
}
