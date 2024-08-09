'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Alert from '@mui/material/Alert'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { AuthLayout } from '@/features/auth/components/AuthLayout'
import { loginSchema, LoginSchemaType } from '@/features/login/schema'
import axios from '@/utils/client/axios'

export default function Login() {
  const [isLoginError, setIsLoginError] = useState(false)
  const router = useRouter()
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
    try {
      await axios.post('/login', {
        email: data.email,
        password: data.password,
      })
      router.push('/')
    } catch (error) {
      console.error('error: ', error)
      setIsLoginError(true)
      setTimeout(() => {
        setIsLoginError(false)
      }, 2000)
    }
  }

  return (
    <>
      {isLoginError && <Alert severity='error'>Invalid username or password.</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthLayout>
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
          <Button type='submit'>Login</Button>
        </AuthLayout>
      </form>
    </>
  )
}
