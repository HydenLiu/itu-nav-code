const localStorage = window.localStorage

export function getLocal(key: string) {
  const localData = localStorage.getItem(key)
  if (!localData) return null
  return JSON.parse(localData);
}

export function setLocal(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocal(key: string) {
  return localStorage.removeItem(key);
}
