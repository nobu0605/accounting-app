'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { AuthContainer } from '@/features/auth/components/AuthContainer'
import { loginSchema, LoginSchemaType } from '@/features/login/schema'

export default function Login() {
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
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    console.log('result: ', result)
    if (result?.ok) {
      console.log('Signed in successfully')
    } else {
      console.error('Sign-in failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthContainer>
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
      </AuthContainer>
    </form>
  )
}
