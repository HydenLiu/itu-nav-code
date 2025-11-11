'use client'

import { useWeibo } from '@/api/useWeibo'
import { cn } from '@/lib/utils'
import { Flame, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function WeiboHotList() {
  const [count, setCount] = useState(0)
  const { data: getWeiboHotList = [], refetch, isLoading } = useWeibo()
  const list = getWeiboHotList?.slice(count, count + 10)

  // 换一批
  const handleChangeList = () => {
    if (count + 10 >= getWeiboHotList?.length) {
      setCount(0)
    } else {
      setCount(count + 10)
    }
  }
  return (
    <div className="rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center space-x-2 text-lg font-bold text-gray-800">
          <Flame className="h-5 w-5 text-orange-500" />
          <span
            className="hover:text-primary cursor-pointer transition-colors"
            onClick={() => refetch()}
          >
            微博热搜
          </span>
        </h3>
        <button
          onClick={() => handleChangeList()}
          className="hover:text-primary flex items-center space-x-1 text-sm text-gray-600 transition-colors"
        >
          <span>换一批</span>
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
          </div>
        ) : (
          list?.map((item) => (
            <a
              key={item.note}
              href={`https://s.weibo.com/weibo?q=${encodeURIComponent(item.word_scheme)}&t=31&band_rank=${item.rank + 1}&Refer=top`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-lg p-3 transition-all hover:bg-white/50"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <span
                  className={cn(
                    `flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold`,
                    // item.color ? 'text-white' : 'text-gray-600 bg-gray-100'
                  )}
                  // style={item.color ? { backgroundColor: item.color } : {}}
                >
                  {item.topic_ad ? '🔥' : item.rank + 1}
                </span>
                <p className="group-hover:text-primary truncate text-sm text-gray-800 transition-colors">
                  {item.note}
                </p>
              </div>
              <span className="ml-2 shrink-0 text-xs text-gray-500">
                {item.num}
              </span>
            </a>
          ))
        )}
      </div>
    </div>
  )
}
