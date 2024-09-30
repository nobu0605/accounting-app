'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Snackbar } from '@/components/ui/Snackbar'
import { TextField } from '@/components/ui/TextField'
import { AuthFormLayout } from '@/features/auth/components/AuthFormLayout'
import { registerSchema, RegisterSchemaType } from '@/features/register/schema'
import axios, { originalAxios } from '@/utils/client/axios'

export default function Register() {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Internal Server Error')
  const {
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      industryClass: '',
      numberOfEmployees: 0,
      fiscalStartDate: dayjs(),
      fiscalEndDate: dayjs(),
      foundedDate: dayjs(),
    },
  })
  const router = useRouter()
  const handleDateError = (
    error: ReactNode,
    fieldName: 'fiscalStartDate' | 'fiscalEndDate' | 'foundedDate',
  ) => {
    if (!error) {
      return clearErrors(fieldName)
    }

    if (error) {
      setError(fieldName, {
        type: 'manual',
        message: error as string,
      })
    }
  }

  const onSubmit = async (data: RegisterSchemaType) => {
    setIsLoading(true)
    try {
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 6000)
      setErrorMessage(`Currently, registration is suspended.
      Please use the demo account from the login screen instead.`)
      setIsLoading(false)
      return

      // registration is suspended
      await axios.post('/auth/register', data)
      router.push('/login')
    } catch (error) {
      if (originalAxios.isAxiosError(error)) {
        setErrorMessage(error?.response?.data.error.message)
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 2000)
      }
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
          message={errorMessage}
          severity='error'
          variant='filled'
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthFormLayout>
          <h1>Create an account</h1>
          <TextField
            name='userName'
            label='User Name'
            value={watch('userName')}
            onChange={(e) => setValue('userName', e.target.value)}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            required
          />
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
            placeholder='Example: Password123'
          />
          <TextField
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            value={watch('confirmPassword')}
            onChange={(e) => setValue('confirmPassword', e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            required
            placeholder='Example: Password123'
          />
          <TextField
            name='companyName'
            label='Company Name'
            type='text'
            value={watch('companyName')}
            onChange={(e) => setValue('companyName', e.target.value)}
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
            required
          />
          <TextField
            name='industryClass'
            label='Industry Class'
            type='text'
            value={watch('industryClass')}
            onChange={(e) => setValue('industryClass', e.target.value)}
            error={!!errors.industryClass}
            helperText={errors.industryClass?.message}
          />
          <TextField
            name='numberOfEmployees'
            label='Number Of Employees'
            type='number'
            value={watch('numberOfEmployees')}
            onChange={(e) => setValue('numberOfEmployees', Number(e.target.value))}
            error={!!errors.numberOfEmployees}
            helperText={errors.numberOfEmployees?.message}
          />
          <DatePicker
            label={'Fiscal Start Date'}
            value={watch('fiscalStartDate')}
            onChange={(newValue) => {
              setValue('fiscalStartDate', newValue ?? dayjs())
            }}
            onError={(error) => {
              handleDateError(error, 'fiscalStartDate')
            }}
            errorMessage={errors.fiscalStartDate?.message}
            isError={!!errors?.fiscalStartDate}
            required
          />
          <DatePicker
            label={'Fiscal End Date'}
            value={watch('fiscalEndDate')}
            onChange={(newValue) => {
              setValue('fiscalEndDate', newValue ?? dayjs())
            }}
            onError={(error) => {
              handleDateError(error, 'fiscalEndDate')
            }}
            errorMessage={errors.fiscalEndDate?.message}
            isError={!!errors?.fiscalEndDate}
            required
          />
          <DatePicker
            label={'Founded Date'}
            value={watch('foundedDate')}
            onChange={(newValue) => {
              setValue('foundedDate', newValue ?? dayjs())
            }}
            onError={(error) => {
              handleDateError(error, 'foundedDate')
            }}
            errorMessage={errors.foundedDate?.message}
            isError={!!errors?.foundedDate}
            required
          />
          <Button disabled={isLoading} type='submit'>
            Register
          </Button>
        </AuthFormLayout>
      </form>
    </>
  )
}
