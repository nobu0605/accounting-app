import { verifyPassword, hashPassword } from '@/utils/api/auth'

describe('verifyPassword', () => {
  const password = 'Password123'

  test('success', async () => {
    const hashedPassword = await hashPassword(password)
    expect(await verifyPassword(password, hashedPassword)).toEqual(true)
  })

  test('failure', async () => {
    const hashedPassword = await hashPassword(password)
    expect(await verifyPassword('password123', hashedPassword)).toEqual(false)
  })
})
