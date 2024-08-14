import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

const secret = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : (() => {
      throw new Error('JWT_SECRET is not defined')
    })()
export const tokenMaxAge = 60 * 60 // 1 hour

export const signJwt = async (payload: JWTPayload): Promise<string> => {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid payload')
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('3d')
    .sign(secret)
}

export const verifyJwt = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, secret)
  return payload as JWTPayload
}
