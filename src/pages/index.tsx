import React, { useState, useEffect, useCallback } from 'react'
import { Card, Input, message, Button, Tooltip, Switch, Spin, Row, Col } from 'antd'
import { SearchOutlined, GithubOutlined, RedoOutlined, WeiboOutlined } from '@ant-design/icons'
import baidu from '@/assets/baidu.png'
import google from '@/assets/google.png'
import Request from '@/utils/request'
import '@/styles/ghost.scss'
import NavBar from '@/components/NavBar'
import MainLeft from '@/components/MianLeft'
import './index.scss'

const { Search } = Input

const localStorage = window.localStorage

export default () => {
  const [isBaidu, setIsBaidu] = useState(true)
  const [count, setCount] = useState(1)
  const [hotData, setHotData] = useState([])
  const [hotAllData, setHotAllData] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  // 获取微博热搜
  const getWebHotList = useCallback(() => {
    setIsLoad(true)
    Request.get('https://v2.alapi.cn/api/new/wbtop?num=50&token=YaXkpHvm3IgSheyj').then(({ data }) => {
      const resList = data.map((item, i: number) => {
        const obj = item
        if( i === 0) obj.color = '#ff2a2a'
        else if( i === 1) obj.color = '#f90'
        else if( i === 2) obj.color = '#fc0'
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
      console.log(111)
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

  return (
    <main className={`main pb-px-60 ${ghostClose ? '' : 'ghost'}`}>
      <NavBar />
      <div className='next-box'>
        <div className='bg' />
        <div style={{ textAlign: 'center', margin: '120px 0 34px' }}>
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
          {/* <Tooltip title="切换封面">*/}
          {/*  <Button type={ghostClose ? 'primary' : 'ghost'} size="small" shape="round" icon={<PictureOutlined />}*/}
          {/*          style={{ marginLeft: 8 }}*/}
          {/*          onClick={() => setDrawerVisible(true)} />*/}
          {/* </Tooltip>*/}
          <Tooltip title='项目详情'>
            <Button type={ghostClose ? 'primary' : 'ghost'} size='small' shape='round' icon={<GithubOutlined />}
              style={{ marginLeft: 8 }}
              onClick={(e) => {
                e.preventDefault()
                window.open('https://github.com/sunupdong')
              }}
            />
          </Tooltip>
        </div>
      </div>
    </main>
  )
}
