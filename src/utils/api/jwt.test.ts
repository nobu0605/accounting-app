import { signJwt, verifyJwt } from '@/utils/api/jwt'

describe('check password strength', () => {
  test('success verifyJwt', async () => {
    const token = await signJwt({ id: 1 })
    const result = await verifyJwt(token)
    expect(result.id).toEqual(1)
  })

  test('failure verifyJwt', async () => {
    let result = null
    const token = await signJwt({ id: 1 })
    try {
      result = await verifyJwt(token + 'a')
    } catch (error) {
      console.error(error)
    }
    expect(result).toEqual(null)
  })
})
