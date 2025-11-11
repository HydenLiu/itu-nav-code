import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useBaiduSearch = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return useQuery({
    queryKey: ['baiduSearch', debouncedValue],
    enabled: !!debouncedValue,
    queryFn: async () => {
      const res = await fetch(`/api/baidu?value=${debouncedValue}`)
      if (!res.ok) {
        throw new Error('Failed to fetch baidu search')
      }
      return res.json()
    },
    select: (data) => data?.g?.map((item: any) => item.q) || [],
  })
}
