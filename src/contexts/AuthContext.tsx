'use client'
import { User } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useRouter, usePathname } from 'next/navigation'
import React, { createContext, FC, useEffect, useState } from 'react'
import axios from '@/utils/client/axios'

const AuthContext = createContext<User | null>(null)

const urlsWithoutAuth = ['/register', '/login']

type Props = {
  children: React.ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const pathName = usePathname()

  useEffect(() => {
    checkAuth()
  }, [pathName])

  async function checkAuth() {
    if (urlsWithoutAuth.includes(pathName)) {
      return
    }

    const result: AxiosResponse<User | null> = await axios.post(`/auth/me`)

    if (!result.data) {
      router.push('/login')
    } else {
      setUser(result.data)
    }
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
