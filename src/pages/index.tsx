import React, { useState, useEffect } from 'react'
import { Avatar, Card, Input, message, Button, Tooltip, Switch, Spin } from 'antd'
import { SearchOutlined, GithubOutlined } from '@ant-design/icons'
import baidu from '../assets/baidu.png'
import google from '../assets/google.png'
import resourceData from '../utils/resourceData'
import axios from 'axios'
import './index.css'
import './ghost.css'

const { Search } = Input

const gridStyle = {
  width: '25%',
  textAlign: 'center',
  fontSize: '13px',
  color: '#555'
}

const localStorage = window.localStorage

export default () => {
  const [isBaidu, setIsBaidu] = useState(true)
  const [hotData, setHotData] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    setIsLoad(true)

    axios.get('https://v2.alapi.cn/api/new/wbtop?num=50&token=YaXkpHvm3IgSheyj')
    // @ts-ignore
      .then(({ data }) => {
        return data
        // @ts-ignore
      }).then(({ data }) => {
        setHotData(data)
      }).finally(() => {
        setIsLoad(false)
      })
  }, [])

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

  const toggleGhost = (checked: boolean) => {
    localStorage.setItem('isGhost', JSON.stringify(checked))
    setGhostClose(checked)
  }

  const renderViewByTabKey = resourceData.map((resource, index) =>
    <a href={resource.link} target='_blank' key={index} rel='noreferrer'>
      {/* @ts-ignore*/}
      <Card.Grid style={gridStyle}>
        <Avatar shape='square' src={resource.icon} />
        <div className='resource-name'>{resource.name}</div>
      </Card.Grid>
    </a>
  )

  const renderViewByHot = hotData.map((item, index) =>
    <a href={item.url} target='_blank' key={index} rel='noreferrer'>
      <Card.Grid className='hot-list-item'>
        <div className='resource-name'>{index + 1}. {item.hot_word}</div>
        <div>{item.hot_word_num}</div>
      </Card.Grid>
    </a>
  )

  return (
    <div className={`index${ghostClose ? '' : ' ghost'}`}>
      <div className='bg' />
      <div style={{ textAlign: 'center', margin: '104px 0 34px' }}>
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
      <div className='card-wrapper'>
        {
          <Card className='card' bordered={false}>
            {renderViewByTabKey}
          </Card>
        }
      </div>
      <div className='card-wrapper mt-px-40'>
        <h3 className='resource-name'>微博热搜 : </h3>
        {
          <Card className='card' bordered={false}>
            <Spin spinning={isLoad} className='loading-spin'>
              {renderViewByHot}
            </Spin>
          </Card>
        }
      </div>
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
            onClick={() => window.open('https://github.com/sunupdong')}
          />
        </Tooltip>
      </div>
    </div>
  )
}
