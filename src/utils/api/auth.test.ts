import { verifyPassword, hashPassword } from '@/utils/api/auth'

describe('check password strength', () => {
  const password = 'Password123'

  test('success verifyPassword', async () => {
    const hashedPassword = await hashPassword(password)
    expect(await verifyPassword(password, hashedPassword)).toEqual(true)
  })

  test('failure verifyPassword', async () => {
    const hashedPassword = await hashPassword(password)
    expect(await verifyPassword('password123', hashedPassword)).toEqual(false)
  })
})
