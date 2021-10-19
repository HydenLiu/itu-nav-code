import React, { useState, useEffect, useCallback } from 'react'
import { Card, Input, message, Button, Tooltip, Switch, Spin, Row, Col, Drawer, Alert } from 'antd'
import TextLoop from 'react-text-loop';
import { SearchOutlined, GithubOutlined, RedoOutlined, WeiboOutlined, PictureOutlined } from '@ant-design/icons'
import baidu from '@/assets/baidu.png'
import google from '@/assets/google.png'
import Request from '@/utils/request'
import '@/styles/ghost.scss'
import NavBar from '@/components/NavBar'
import MainLeft from '@/components/MianLeft'
import ImageDrawer from '@/components/ImageDrawer'
import './index.scss'

const {Search} = Input

const localStorage = window.localStorage

interface iWeiboHot {
  id: number,
  color?: string,
  hot_word: string,
  hot_word_num: string
}

export default () => {
  const bgImg = localStorage.getItem('bg') || 'https://itudb.oss-cn-hangzhou.aliyuncs.com/background-images/win_bg0.jpg'

  const [isBaidu, setIsBaidu] = useState(true)
  const [count, setCount] = useState(1)
  const [hotData, setHotData] = useState([])
  const [hotAllData, setHotAllData] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  const [isImgShow, setIsImgShow] = useState(false) // 图片弹窗
  const [backgroundImage, setBackgroundImage] = useState(bgImg)

  // 获取微博热搜
  const getWebHotList = useCallback(() => {
    setIsLoad(true)
    Request.get('https://v2.alapi.cn/api/new/wbtop?num=50&token=YaXkpHvm3IgSheyj').then(({data}) => {
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

  useEffect(() => {
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
  const currentGhostClose = localStorage.getItem('isGhost') ? JSON.parse(localStorage.getItem('isGhost')) : false
  const [ghostClose, setGhostClose] = useState(currentGhostClose)

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

  const toggleGhost = (checked: boolean, e: MouseEvent) => {
    e.preventDefault()
    localStorage.setItem('isGhost', JSON.stringify(checked))
    setGhostClose(checked)
  }

  const renderViewByHot = hotData.map(item =>
    <a href={item.url} target='_blank' key={item.id} rel='noreferrer'>
      <Card.Grid className='hot-list-item'>
        <div className='resource-name jc-start ai-center hot-list-content'>
          <span style={{background: item.color}} className={item.color ? ' text-white' : ''}>
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

  return (
    <main className={`main pb-px-60 ${ghostClose ? '' : 'ghost'}`}>
      <NavBar />
      <div className='next-box'>
        <div className='bg' style={{backgroundImage: `url(${backgroundImage})`}} />
        <div style={{textAlign: 'center', margin: '120px 0 34px'}}>
          <img src={isBaidu ? baidu : google} alt={isBaidu ? '百度' : '谷歌'} className='search-logo'
               onClick={() => setIsBaidu(!isBaidu)}
          />
        </div>
        <div className='search-wrapper'>
          <Search
            enterButton={<Button type={ghostClose ? 'primary' : 'ghost'}><SearchOutlined /></Button>}
            size='large'
            className='search'
            onSearch={doSearch}
          />
        </div>
        <div className="birth">
          <Alert
            banner
            showIcon
            type="error"
            icon={<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
            </svg>}
            message={
              <TextLoop mask>
                <div>宝贝生日快乐！！！（鲜花，鲜花）</div>
                <div>祝宝贝永远幸福！！！</div>
                <div>祝宝贝天天开心</div>
                <div>东东爱你（鼓掌，呱唧呱唧）</div>
              </TextLoop>
            }
          />
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
          <Switch
            checkedChildren='白底'
            unCheckedChildren='透明'
            checked={ghostClose}
            onChange={toggleGhost}
          />
          <Tooltip title="切换封面">
            <Button type={ghostClose ? 'primary' : 'ghost'} size="small" shape="round" icon={<PictureOutlined />}
                    style={{marginLeft: 8}}
                    onClick={() => setIsImgShow(true)} />
          </Tooltip>
          <Tooltip title='项目详情'>
            <Button type={ghostClose ? 'primary' : 'ghost'} size='small' shape='round' icon={<GithubOutlined />}
                    style={{marginLeft: 8}}
                    onClick={(e) => {
                      e.preventDefault()
                      window.open('https://github.com/sunupdong')
                    }}
            />
          </Tooltip>
        </div>
      </div>
      <Drawer
        title="背景图片"
        placement="right"
        visible={isImgShow}
        onClose={() => setIsImgShow(false)}
        width={600}
      >
        <ImageDrawer chooseImg={chooseImg} />
      </Drawer>
    </main>
  )
}
