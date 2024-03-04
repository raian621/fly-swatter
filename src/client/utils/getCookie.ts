export default function getCookie(name: string, cookieString:string): string|null {
  const cookies = cookieString.split(';')
  let cookie = undefined

  cookies.find(kvPair => {
    const [key, value] = kvPair.split('=')
    if (key.trim() === name) {
      cookie = value
      return
    }
  })
  
  return cookie || null
} 