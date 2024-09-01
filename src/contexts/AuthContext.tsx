'use client'
import { User } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useRouter, usePathname } from 'next/navigation'
import React, { createContext, FC, useEffect, useState, useContext } from 'react'
import { fiscalYearLocalStorageKey } from '@/constants/localStorageKeys'
import { publicRoutes } from '@/features/auth/constant'
import axios from '@/utils/client/axios'

const AuthContext = createContext<User | null>(null)

type Props = {
  children: React.ReactNode
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const pathName = usePathname()

  useEffect(() => {
    checkAuth()
  }, [pathName])

  async function checkAuth() {
    if (publicRoutes.includes(pathName)) {
      return
    }

    const result: AxiosResponse<User | null> = await axios.post(`/auth/me`)

    if (!result.data) {
      router.push('/login')
    } else {
      setUser(result.data)
      if (!localStorage.getItem(fiscalYearLocalStorageKey)) {
        const res = await axios.get(`/fiscal-year/${result.data.companyId}`)
        localStorage.setItem(fiscalYearLocalStorageKey, JSON.stringify(res.data))
      }
    }
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
