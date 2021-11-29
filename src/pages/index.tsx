import React, { useState, useEffect, useCallback } from 'react'
import { Card, Input, message, Button, Tooltip, Switch, Spin, Row, Col, Drawer, AutoComplete } from 'antd'
// import TextLoop from 'react-text-loop'
import { SketchPicker } from 'react-color'
import { SearchOutlined, GithubOutlined, RedoOutlined, WeiboOutlined, PictureOutlined } from '@ant-design/icons'
import baidu from '@/assets/baidu.png'
import google from '@/assets/google.png'
import { myJsonp } from '@/utils'
import Request from '@/utils/request'
import { setLocal, getLocal } from '@/utils/auth'
import '@/styles/ghost.scss'
import NavBar from '@/components/NavBar'
import MainLeft from '@/components/MianLeft'
import ImageDrawer from '@/components/ImageDrawer'
import './index.scss'

const { Search } = Input

interface iWeiboHot {
  id: number,
  color?: string,
  hot_word: string,
  hot_word_num: string
}

interface iResule {
  q: string,
  sa: string
}

export default () => {
  const bgImg = getLocal('bg') || 'https://sunupdong.gitee.io/itudb-image/background-images/win_bg1.jpg'
  const itudb_theme = getLocal('itudb_theme') || '#f09393'

  const [isBaidu, setIsBaidu] = useState(true)
  const [count, setCount] = useState(1)
  const [hotData, setHotData] = useState([])
  const [hotAllData, setHotAllData] = useState([])
  const [isLoad, setIsLoad] = useState(false) // loading
  const [isImgShow, setIsImgShow] = useState(false) // 图片弹窗
  const [backgroundImage, setBackgroundImage] = useState(bgImg) // 背景图片
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [color, setColor] = useState('#000')
  const [searchOptions, setSearchOptions] = useState([])

  // 获取微博热搜
  const getWebHotList = useCallback(() => {
    setIsLoad(true)
    Request.get('https://v2.alapi.cn/api/new/wbtop?num=50&token=YaXkpHvm3IgSheyj').then(({ data }) => {
      const resList = data.map((item: iWeiboHot, i: number) => {
        const obj = item
        if (i === 0) obj.color = '#ff2a2a'
        else if (i === 1) obj.color = '#f90'
        else if (i === 2) obj.color = '#fc0'
        obj.id = i + 1
        return obj
      })
      setHotData(() => resList.slice(0, 10))
      setHotAllData(resList)
    }).finally(() => {
      setIsLoad(false)
    })
  }, [])

  const setBodyColor = useCallback((color) => {
    document.getElementsByTagName('body')[0].style.setProperty('--primaryColor', color)
    document.getElementsByTagName('body')[0].style.setProperty('--primaryVirtualColor', color + '80')
  }, [])

  useEffect(() => {
    setBodyColor(itudb_theme)
    setColor(itudb_theme)
    getWebHotList()
  }, [])

  // 刷新
  const refresh = useCallback(() => {
    if (count >= 4) setCount(0)
    else setCount(count + 1)
    const hots = hotAllData.slice(count * 10, count * 10 + 10)
    setHotData(hots)
  }, [hotAllData, count])

  // 透明模式
  const currentGhostClose = getLocal('isGhost') || false
  const [ghostClose, setGhostClose] = useState(currentGhostClose)

  // 搜索
  const doSearch = (value: string) => {
    if (value.length < 1) {
      message.error('请输入搜索内容')
      return
    }
    if (isBaidu) {
      window.open(`https://www.baidu.com/s?wd=${value}`)
    } else {
      window.open(`https://www.google.com/search?q=${value}`)
    }
  }

  const searchResult = (listData: iResule []) =>
    listData.map(item => {
      return {
        value: item.q,
        label: (
          <div key={item.sa}> {item.q} </div>
        )
      }
    })

  const handleSearch = (value: string) => {
    myJsonp('https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=' + value).then(res => {
      // @ts-ignore
      setSearchOptions(res.g ? searchResult(res.g) : [])
    })
  }

  // 切换是否透明
  const toggleGhost = (checked: boolean, e: MouseEvent) => {
    e.preventDefault()
    setLocal('isGhost', checked)
    setGhostClose(checked)
  }

  // 微博热搜
  const renderViewByHot = hotData.map(item =>
    <a href={item.url} target='_blank' key={item.id} rel='noreferrer'>
      <Card.Grid className='hot-list-item'>
        <div className='resource-name jc-start ai-center hot-list-content'>
          <span style={{ background: item.color }} className={item.color ? ' text-white' : ''}>
            {item.id}
          </span>
          <p>{item.hot_word}</p>
        </div>
        <div>{item.hot_word_num}</div>
      </Card.Grid>
    </a>
  )

  // 获取图片
  const chooseImg = useCallback((val) => {
    setBackgroundImage(val)
  }, [])

  // 修改主题颜色
  const handleChangeColor = (color: any) => {
    const { hex } = color
    setColor(hex)
    setBodyColor(hex)
    setLocal('itudb_theme', hex)
  }

  return (
    <main className={`main pb-px-60 ${ghostClose ? '' : 'ghost'}`}>
      <NavBar />
      <div className='next-box'>
        <div className='bg' style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div style={{ textAlign: 'center', margin: '120px 0 34px' }}>
          <img src={isBaidu ? baidu : google} alt={isBaidu ? '百度' : '谷歌'} className='search-logo'
            onClick={() => setIsBaidu(!isBaidu)}
          />
        </div>
        <div className='search-wrapper'>
          <AutoComplete
            backfill
            dropdownMatchSelectWidth={252}
            style={{ width: 300 }}
            options={searchOptions}
            onSearch={handleSearch}
            dropdownClassName='dropdownClassName'
          >
            <Search
              enterButton={<Button type={ghostClose ? 'primary' : 'ghost'}><SearchOutlined /></Button>}
              size='large'
              className='search'
              onSearch={doSearch}
            />
          </AutoComplete>
        </div>
        <Row justify='space-between'>
          <Col span={15}>
            <MainLeft />
          </Col>
          <Col span={8}>
            <div className='card-wrapper'>
              <div className='resource-title jc-between ai-center'>
                <h3 className='cursor-pointer' onClick={() => window.open('https://weibo.com/')}>
                  <WeiboOutlined /> 微博热搜 :
                </h3>
                <span className='cursor-pointer' onClick={refresh}>换一批 <RedoOutlined /></span>
              </div>
              {
                <Card className='card' bordered={false}>
                  <Spin spinning={isLoad} className='loading-spin'>
                    {renderViewByHot}
                  </Spin>
                </Card>
              }
            </div>
          </Col>
        </Row>

        <div className='fix-group'>
          <div className='color-po-a'>
            <Tooltip title='主题颜色'>
              <Button size='small' shape='round'
                style={{ backgroundColor: color }}
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
              > </Button>
            </Tooltip>
            {displayColorPicker && <div>
              <div className='color-cover' onClick={() => setDisplayColorPicker(false)} />
              <SketchPicker className='color-group' width='220px' disableAlpha color={color} onChange={handleChangeColor} />
            </div>}
          </div>
          <Switch
            checkedChildren='白底'
            unCheckedChildren='透明'
            checked={ghostClose}
            onChange={toggleGhost}
            className='ml-px-8'
          />
          <Tooltip title='切换封面'>
            <Button type={ghostClose ? 'primary' : 'ghost'} size='small' shape='round' icon={<PictureOutlined />}
              className='ml-px-8'
              onClick={() => setIsImgShow(true)}
            />
          </Tooltip>
          <Tooltip title='项目详情'>
            <Button type={ghostClose ? 'primary' : 'ghost'} size='small' shape='round' icon={<GithubOutlined />}
              className='ml-px-8'
              onClick={(e) => {
                e.preventDefault()
                window.open('https://github.com/sunupdong')
              }}
            />
          </Tooltip>
        </div>
      </div>
      <Drawer
        title='背景图片'
        placement='right'
        visible={isImgShow}
        onClose={() => setIsImgShow(false)}
        width={600}
      >
        <ImageDrawer chooseImg={chooseImg} />
      </Drawer>
    </main>
  )
}
