/**
 * LocalStorage 操作工具
 */

export function getLocal<T = any>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const localData = localStorage.getItem(key)
    if (!localData) return null
    return JSON.parse(localData) as T
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

export function setLocal(key: string, value: any): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error writing to localStorage:', error)
  }
}

export function removeLocal(key: string): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

