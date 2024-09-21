'use client'
import { User } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useRouter, usePathname } from 'next/navigation'
import React, { createContext, FC, useEffect, useState, useContext } from 'react'
import { Snackbar } from '@/components/ui/Snackbar'
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
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [pathName])

  async function checkAuth() {
    if (publicRoutes.includes(pathName)) {
      return
    }

    const result: AxiosResponse<User | null> = await axios.post(`/auth/me`)

    if (!result.data) {
      setIsError(true)
      router.push('/login')
    } else {
      setUser(result.data)
      if (!localStorage.getItem(fiscalYearLocalStorageKey)) {
        const res = await axios.get(`/fiscal-year`)
        localStorage.setItem(fiscalYearLocalStorageKey, JSON.stringify(res.data))
      }
    }
  }

  return (
    <>
      {isError && (
        <Snackbar
          vertical='top'
          horizontal='center'
          isOpen={isError}
          onClose={() => setIsError(false)}
          autoHideDuration={4000}
          key={'top' + 'center'}
          message={'Your session has expired. Please log in again.'}
          severity='error'
          variant='filled'
        />
      )}
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </>
  )
}

export { AuthContext, AuthProvider }
