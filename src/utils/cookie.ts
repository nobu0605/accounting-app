export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  console.log('value: ', value)

  console.log('parts: ', parts)
  if (parts.length === 2) {
    const cookieValue = parts[1].split(';')[0]
    return cookieValue
  }

  return null
}
