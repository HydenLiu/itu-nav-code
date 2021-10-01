import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Button, Row, Col } from 'antd'
import axios from 'axios'
import './App.css'

interface IData{
  hot_word: string,
  hot_word_num: string,
  url: string
}

function App() {
  const [data, setData] = useState<IData []>([])


  useEffect(() => {
    axios.get('https://v2.alapi.cn/api/new/wbtop', {
      params: {
        num: 50,
        token: 'YaXkpHvm3IgSheyj'
      }
    }).then(({ data }) => {
      return data
    }).then(({ data }) => {
      setData(data)
    })
  }, [])

  const goto = useCallback((item: IData) => {
    window.location.href = item.url
  }, [])

  return (
    <div className='App'>
      <div className='App-header'>
        <Row justify='space-between' align='middle'>
          {
            data.map(item => {
              return (
                <Col span={10} key={item.hot_word}>
                  <Alert
                    message={item.hot_word}
                    type='info'
                    action={
                      <Button size='small' onClick={() => goto(item)} type='text'>
                        goto
                      </Button>
                    }
                  />
                </Col>
              )
            })
          }
        </Row>
      </div>
    </div>
  )
}

export default App
