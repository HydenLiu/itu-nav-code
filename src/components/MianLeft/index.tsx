import React from 'react'
import { Avatar, Card, Tabs, Tooltip } from 'antd'
import { BankOutlined, ToolOutlined } from '@ant-design/icons'
import { CommunityData, onlineData } from '@/utils/resourceData'

const { TabPane } = Tabs

const MainLeft = () => {
  const oss = 'https://itudb.oss-cn-hangzhou.aliyuncs.com/'

  // 社区
  const renderViewByTabCommunityData = CommunityData.map((resource, index) =>
    <a href={resource.link} target='_blank' key={index} rel='noreferrer'>
      <Card.Grid className='gird-style'>
        <Avatar shape='square' className={`bg-${resource.background}`} src={oss + 'community/' + resource.icon} />
        <div className='resource-name'>{resource.name}</div>
      </Card.Grid>
    </a>
  )

  // 在线工具
  const renderViewByTabOnlineData = onlineData.map((resource, index) =>
    <a href={resource.link} target='_blank' key={index} rel='noreferrer'>
      <Card.Grid className='gird-style'>
        <Tooltip placement='bottom' title={resource.presentation} color='rgb(24, 144, 255, 0.8)'>
          <Avatar shape='square' src={oss + 'onlineTools/' + resource.icon} />
        </Tooltip>
        <div className='resource-name'>{resource.name}</div>
        <div className='resource-name font-12 text-faild'>{resource.presentation}</div>
      </Card.Grid>
    </a>
  )

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane
        key='1'
        tab={<h3> <BankOutlined /> 社区 </h3>}
      >
        <div className='card-wrapper'>
          {
            <Card className='card' bordered={false}>
              {renderViewByTabCommunityData}
            </Card>
          }
        </div>
      </TabPane>
      <TabPane
        key='2'
        tab={<h3> <ToolOutlined /> 在线工具 </h3>}
      >
        <div className='card-wrapper'>
          {
            <Card className='card' bordered={false}>
              {renderViewByTabOnlineData}
            </Card>
          }
        </div>
      </TabPane>
    </Tabs>
  )
}

export default MainLeft
