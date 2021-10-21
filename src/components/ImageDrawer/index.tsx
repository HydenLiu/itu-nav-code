import React, { useCallback } from 'react'
import { Image } from 'antd'
import { setLocal } from '@/utils/auth'
import './index.scss'

interface iProps {
  chooseImg: (v: string) => void
}

const ImageDrawer = (props: iProps) => {
  const { chooseImg } = props

  const emptyList = Array.from({ length: 8 }, (_, k) => k + 1)

  const selectImg = useCallback((img: string) => {
    setLocal('bg', img)
    chooseImg(img)
  }, [chooseImg])

  return (
    <section className='image-wrap'>
      {
        emptyList.map(num => {
          const img = `https://itudb.oss-cn-hangzhou.aliyuncs.com/background-images/win_bg${num}.jpg`
          return (
            <Image
              key={num}
              width={200}
              onClick={() => selectImg(img)}
              src={img}
              preview={false}
            />
          )
        })
      }
    </section>
  )
}

export default ImageDrawer
