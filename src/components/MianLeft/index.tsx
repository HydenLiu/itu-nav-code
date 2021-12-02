import React from 'react'
import { Avatar, Card, Tabs, Tooltip } from 'antd'
import * as Icons from '@ant-design/icons'
import mainList from '@/utils/resourceData'
import { getLocal } from '@/utils/auth'

const { TabPane } = Tabs

interface IResource {
  icon: string,
  link: string,
  name: string,
  presentation?: string,
  background?: string
}

const MainLeft = () => {
  const oss = 'https://img.itudb.cn/'
  const itudb_theme = getLocal('itudb_theme') ? getLocal('itudb_theme') : '#f09393'

  const IconCustom = (name: string) => {
    return (
      React.createElement(Icons && (Icons as any)[name])
    )
  }

  const MainRender = mainList.map((main, index) => {
    return (
      <TabPane
        key={index}
        tab={<h3> {IconCustom(main.icon)} {main.title} </h3>}
      >
        <div className='card-wrapper'>
          <Card className='card' bordered={false}>
            {
              main.list.map((resource: IResource) =>
                <a href={resource.link} target='_blank' key={resource.name} rel='noreferrer'>
                  <Card.Grid className='gird-style'>
                    <Tooltip placement='bottom' title={resource.presentation} color={itudb_theme}>
                      <Avatar shape='square' className={`bg-${resource.background}`} src={oss + main.key + '/' + resource.icon} />
                    </Tooltip>
                    <div className='resource-name'>{resource.name}</div>
                  { resource.presentation && <div className='resource-name font-12 text-faild'>{resource.presentation}</div>}
                  </Card.Grid>
                </a>
              )
            }
          </Card>
        </div>
      </TabPane>
    )
  })

  return (
    <Tabs defaultActiveKey='0'>
      {MainRender}
    </Tabs>
  )
}

export default MainLeft
