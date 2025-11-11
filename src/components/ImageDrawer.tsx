'use client'

import { setLocal } from '@/lib/storage'
import { Dialog } from '@base-ui-components/react/dialog'
import Image from 'next/image'

interface ImageDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (img: number) => void
}

export default function ImageDrawer({
  isOpen,
  onClose,
  onSelectImage,
}: ImageDrawerProps) {
  const emptyList = Array.from({ length: 8 }, (_, k) => k + 1)

  const selectImg = (img: number) => {
    setLocal('bg', img)
    onSelectImage(img)
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-entering:animate-in data-[entering]:fade-in data-exiting:animate-out data-[exiting]:fade-out fixed inset-0 bg-black/25 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Popup className="data-entering:animate-in data-[entering]:fade-in data-[entering]:zoom-in-95 data-exiting:animate-out data-[exiting]:fade-out data-[exiting]:zoom-out-95 w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <Dialog.Title className="text-lg leading-6 font-medium text-gray-900">
                  选择背景图片
                </Dialog.Title>
                <Dialog.Close className="rounded-full p-2 transition-colors hover:bg-gray-100">
                  <svg
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Dialog.Close>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {emptyList.map((num) => {
                  const img = require(
                    `@/assets/images/background-images/win_bg${num}.jpg`,
                  )
                  return (
                    <div
                      key={num}
                      className="group hover:ring-primary relative aspect-video cursor-pointer overflow-hidden rounded-lg transition-all hover:ring-4"
                      onClick={() => selectImg(num)}
                    >
                      <Image
                        src={img}
                        alt={`背景图片 ${num}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                        <span className="font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                          选择此图片
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Dialog.Popup>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
