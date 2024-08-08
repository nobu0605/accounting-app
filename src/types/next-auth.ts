import { Session as DefaultSession } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'
export type Session = {
  user: {
    id: string
  } & DefaultSession['user']
  expires: DefaultSession['expires']
}

export type JWT = {
  id: string
} & DefaultJWT
