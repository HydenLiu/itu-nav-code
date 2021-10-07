import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { parseTime } from '@/utils'
import './index.scss'

const localStorage = window.localStorage

const NavBar = () => {
  const currentGhostClose = localStorage.getItem('isGhost') ? JSON.parse(localStorage.getItem('isGhost')) : false
  const [theDate, setTheDate] = useState('')
  const [logoTile, setLogoTitle] = useState('')
  const [logo, setLogo] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const time = parseTime(new Date(), '{y} 年 {m} 月 {d} 日 {h}:{i}:{s} 星期{a}')
      setTheDate(time)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    const logoT = currentGhostClose ? '' : '-black'
    setLogoTitle(logoT)
    setLogo(logoT)
  }, [currentGhostClose])


  return (
    <section className='nav-wrapper'>
      <div className='next-box jc-between ai-center'>
        <div className='jc-start ai-center'>
          <Image width={24} src={require(`@/assets/logo${logo}.png`)} preview={false}/>
          <img src={require(`@/assets/logo-title${logoTile}.png`)} className='ml-px-10 logo-title' alt='艾兔网' />
        </div>
        <div className='time'>
          {theDate}
        </div>
      </div>
    </section>
  )
}

export default NavBar
