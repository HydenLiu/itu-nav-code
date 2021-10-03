/**
 * 封装fetch
 */
class Request {
  async get(url: string) {
    const response = await fetch(url)
    return await response.json()
  }
  async post(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return await response.json()
  }
}

export default new Request()
