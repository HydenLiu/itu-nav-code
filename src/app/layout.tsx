import type { Metadata } from 'next'
import { QueryProvider } from '@/components/QueryProvider'

import './globals.css'

export const metadata: Metadata = {
  title: '艾兔网 - ITU导航',
  description: '一个简洁的技术导航网站',
  keywords: '导航,技术,开发,前端,后端',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}

