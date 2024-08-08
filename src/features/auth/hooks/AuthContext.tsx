'use client'
import { User } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useEffect, ReactNode, useState } from 'react'
import axios from '@/utils/axios'
import { getCookie } from '@/utils/cookie'

const AuthContext = createContext<User | null>(null)

// can add the routes don't want to check authentication.
const urlsWithoutAuth = ['/register', '/login']

type Props = {
  children: ReactNode
}

function Auth({ children }: Props) {
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState<string | null>(null)
  // const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // if (status === 'loading') {
    //   return
    // }

    // setToken(token)
    checkAuth()
  }, [pathname])

  async function checkAuth() {
    // if (urlsWithoutAuth.includes(pathname)) {
    //   return
    // }

    const token1 = getCookie('next-auth.session-token')

    console.log('token1: ', token1)
    if (!token) {
      return router.push('/login')
    }

    try {
      const res = await axios.get(`/api/user/${session.token.token.user.id}`)
      setUser(res.data)
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function AuthProvider({ children }: Props) {
  return (
    // <SessionProvider>
    <Auth>{children}</Auth>
    // </SessionProvider>
  )
}

export { AuthContext, AuthProvider }
