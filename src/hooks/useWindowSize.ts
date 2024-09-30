import { useLayoutEffect, useState } from 'react'
import { mobileWidth } from '@/constants/screen'

type ReturnWindowSize = {
  width: number
  height: number
  isMobile: boolean
}

export const useWindowSize = (): ReturnWindowSize => {
  const [size, setSize] = useState([0, 0])
  const isMobile = size[0] < mobileWidth

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return {
    width: size[0],
    height: size[1],
    isMobile,
  }
}
