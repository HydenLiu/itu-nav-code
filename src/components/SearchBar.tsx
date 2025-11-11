'use client'

import { useBaiduSearch } from '@/api/useBaiduSearch'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface SearchBarProps {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isBaidu, setIsBaidu] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const { data: searchOptions } = useBaiduSearch(searchValue)

  const [showSuggestions, setShowSuggestions] = useState(false)

  const doSearch = (value?: string) => {
    const searchText = value || searchValue
    if (searchText.length < 1) {
      alert('请输入搜索内容')
      return
    }
    if (isBaidu) {
      window.open(`https://www.baidu.com/s?wd=${searchText}`)
    } else {
      window.open(`https://www.google.com/search?q=${searchText}`)
    }
    onSearch(searchText)
  }

  return (
    <div className="pt-20 pb-8 text-center">
      <div className="mb-6 flex justify-center">
        <Image
          src={isBaidu ? '/baidu.png' : '/google.png'}
          alt={isBaidu ? '百度' : '谷歌'}
          width={120}
          height={40}
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => setIsBaidu(!isBaidu)}
        />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                doSearch()
                setShowSuggestions(false)
              }
            }}
            onFocus={() => searchOptions.length > 0 && setShowSuggestions(true)}
            placeholder="请输入搜索内容"
            className="focus:ring-primary w-full rounded-full bg-white/90 px-6 py-4 pr-14 text-gray-800 placeholder-gray-400 shadow-lg backdrop-blur-md focus:ring-2 focus:outline-none"
          />
          <button
            onClick={() => doSearch()}
            className="bg-primary hover:bg-primary/90 absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-white transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>

        {showSuggestions && searchOptions.length > 0 && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md">
            {searchOptions.map((option: string, index: number) => (
              <div
                key={index}
                className="hover:bg-primary/10 cursor-pointer px-6 py-3 text-left text-gray-700 transition-colors"
                onClick={() => {
                  setSearchValue(option)
                  doSearch(option)
                  setShowSuggestions(false)
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
