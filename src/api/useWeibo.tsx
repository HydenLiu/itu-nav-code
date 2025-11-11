import { useQuery } from '@tanstack/react-query'

interface WeiboHotItem {
  emoticon: string
  flag: number
  label_name: string
  note: string
  num: number
  rank: number
  realpos: number
  topic_flag: number
  word: string
  word_scheme: string
  topic_ad?: number
}

export const useWeibo = () => {
  return useQuery<WeiboHotItem[], Error>({
    queryKey: ['weiboHotList'],
    queryFn: async () => {
      const url = `/api/weibo`
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error('获取微博热搜失败')
      }

      const resData = (await res.json()) || {}
      const hotList =
        resData?.data?.realtime?.reduce(
          (acc: WeiboHotItem[], v: WeiboHotItem) => {
            if (!v?.topic_ad) {
              acc.push(v)
            }
            return acc
          },
          [],
        ) || []
      return hotList
    },
  })
}
