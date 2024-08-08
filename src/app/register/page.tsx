'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { errorColor } from '@/constants/datePicker'
import { AuthContainer } from '@/features/auth/components/AuthContainer'
import { registerSchema, RegisterSchemaType } from '@/features/register/schema'
import axios from '@/utils/axios'

export default function Register() {
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

  const onSubmit = (data: RegisterSchemaType) => {
    console.log(data)
    axios.post('/register', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthContainer>
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
          label={
            <>
              Fiscal Start Date <StyledRequiredAsterisk> *</StyledRequiredAsterisk>
            </>
          }
          value={watch('fiscalStartDate')}
          onChange={(newValue) => {
            setValue('fiscalStartDate', newValue ?? dayjs())
          }}
          onError={(error) => {
            handleDateError(error, 'fiscalStartDate')
          }}
          slotProps={{
            textField: {
              helperText: errors.fiscalStartDate?.message,
            },
          }}
          sx={errorColor(!!errors?.fiscalStartDate)}
        />
        <DatePicker
          label={
            <>
              Fiscal End Date
              <StyledRequiredAsterisk> *</StyledRequiredAsterisk>
            </>
          }
          value={watch('fiscalEndDate')}
          onChange={(newValue) => {
            setValue('fiscalEndDate', newValue ?? dayjs())
          }}
          slotProps={{
            textField: {
              helperText: errors.fiscalEndDate?.message,
            },
          }}
          onError={(error) => {
            handleDateError(error, 'fiscalEndDate')
          }}
          sx={errorColor(!!errors?.fiscalEndDate)}
        />
        <DatePicker
          label={
            <>
              Founded Date<StyledRequiredAsterisk> *</StyledRequiredAsterisk>
            </>
          }
          value={watch('foundedDate')}
          onChange={(newValue) => {
            setValue('foundedDate', newValue ?? dayjs())
          }}
          slotProps={{
            textField: {
              helperText: errors.foundedDate?.message,
            },
          }}
          onError={(error) => {
            handleDateError(error, 'foundedDate')
          }}
          sx={errorColor(!!errors?.foundedDate)}
        />
        <Button type='submit'>Register</Button>
      </AuthContainer>
    </form>
  )
}

const StyledRequiredAsterisk = styled('span')`
  color: #d32f2f;
  font-size: 20px;
`
