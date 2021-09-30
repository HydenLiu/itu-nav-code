import React, { useState, useEffect, useCallback } from 'react'
import { Alert, Button } from 'antd'
import './App.css'

interface IData{
  mid: string,
  category: string,
  emoticon: string,
  flag: number,
  is_hot: number,
  note: string,
  num: number,
  onboard_time: number,
  rank: number,
  realpos: number,
  subject_querys: string,
  topic_flag: number,
  word: string
}

function App() {
  const [data, setData] = useState<IData []>([])


  useEffect(() => {
    fetch('/ajax/side/hotSearch')
      .then(response => response.json())
      .then(json => {
        setData(json.data.realtime)
      })
  }, [])

  const goto = useCallback((item: IData) => {
    window.location.href = `https://weibo.com/search?type=1&q=#${item.word}#`
  }, [])

  return (
    <div className='App'>
      <div className='App-header'>
        {
          data.map(item => {
            return (
              <Alert
                key={item.mid}
                message={item.word}
                type='info'
                action={
                  <Button size='small' onClick={() => goto(item)} type='text'>
                    goto
                  </Button>
                }
              />)
          })
        }
      </div>
    </div>
  )
}

export default App
