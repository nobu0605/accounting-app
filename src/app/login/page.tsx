'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Snackbar } from '@/components/ui/Snackbar'
import { TextField } from '@/components/ui/TextField'
import { fiscalYearLocalStorageKey } from '@/constants/localStorageKeys'
import { AuthFormLayout } from '@/features/auth/components/AuthFormLayout'
import { loginSchema, LoginSchemaType } from '@/features/login/schema'
import axios from '@/utils/client/axios'

export default function Login() {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchemaType) => {
    setIsLoading(true)
    try {
      await axios.post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      const res = await axios.get(`/fiscal-year`)
      localStorage.setItem(fiscalYearLocalStorageKey, JSON.stringify(res.data))
      window.location.href = '/'
    } catch (error) {
      console.error('error: ', error)
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 2000)
      setIsLoading(false)
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
          autoHideDuration={7000}
          key={'top' + 'center'}
          message={'Invalid username or password'}
          severity='error'
          variant='filled'
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormLayout>
          <h1>Login</h1>
          <TextField
            name='email'
            label='Email'
            value={watch('email')}
            onChange={(e) => setValue('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
          <TextField
            name='password'
            label='Password'
            type='password'
            value={watch('password')}
            onChange={(e) => setValue('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
          />
          <Button disabled={isLoading} type='submit'>
            Login
          </Button>
        </AuthFormLayout>
      </form>
    </>
  )
}
