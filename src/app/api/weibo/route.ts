import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = 'https://weibo.com/ajax/side/hotSearch'

    const res = await fetch(url, {
      headers: {
        Referer:
          'https://weibo.com/newlogin?tabtype=search&gid=&openLoginLayer=0&url=https%3A%2F%2Fweibo.com%2F',
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: '获取微博热搜失败' },
        { status: res.status },
      )
    }

    const data = await res.json()

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('微博热搜 API 错误:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
