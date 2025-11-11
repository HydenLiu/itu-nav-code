import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 时间格式化
 */
export function parseTime(time: string | number | Date, cFormat: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (_result, key: string) => {
    // @ts-ignore
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * JSONP 请求
 */
export function myJsonp(url: string) {
  if (typeof window === 'undefined') return Promise.reject('Not in browser')

  const container = document.getElementsByTagName('head')[0]
  const fnName = `jsonp_${new Date().getTime()}`
  const script = document.createElement('script')
  script.src = `${url}&callback=${fnName}`
  script.type = 'text/javascript'
  container.appendChild(script)

  return new Promise((resolve, reject) => {
    // @ts-ignore
    window[fnName] = function (res) {
      container.removeChild(script)
      // @ts-ignore
      delete window[fnName]
      resolve(res)
    }

    script.onerror = function () {
      container.removeChild(script)
      // @ts-ignore
      delete window[fnName]
      reject('Something error happened!')
    }
  })
}

/**
 * 防抖
 * @param fn 函数
 * @param delay 延迟时间
 * @returns 函数
 */
export const debounce = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
) => {
  let timer: NodeJS.Timeout
  return (...args: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
