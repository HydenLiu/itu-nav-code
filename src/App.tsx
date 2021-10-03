import React from 'react'
import { Root, Routes } from 'react-static'
import { Spin } from 'antd'
import { Router } from '@reach/router'
import 'antd/dist/antd.min.css'
import './styles/app.scss'

function App() {
  // loading
  const fallbackView = <div className='center-container'><Spin size='large' /></div>

  return (
    <Root>
      <React.Suspense fallback={fallbackView}>
        <Router>
          <Routes path='*' />
        </Router>
      </React.Suspense>
    </Root>
  )
}

export default App
