import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { parseTime } from '@/utils'
import './index.scss'

const localStorage = window.localStorage

const NavBar = () => {
  const currentGhostClose = localStorage.getItem('isGhost') ? JSON.parse(localStorage.getItem('isGhost')) : false
  const [theDate, setTheDate] = useState('')
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
    setLogo(logoT)
  }, [currentGhostClose])


  return (
    <section className='nav-wrapper'>
      <div className='next-box jc-between ai-center'>
        <div className='jc-start ai-center'>
          <Image width={24} src={require(`@/assets/logo${logo}.png`)} preview={false}/>
          <h3 className='ml-px-10 nav-title'>艾兔网</h3>
        </div>
        <div className='time'> {theDate} </div>
      </div>
    </section>
  )
}

export default NavBar
