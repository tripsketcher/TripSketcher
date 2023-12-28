import { EmailErrorMessage } from './auth'
import { EmailErrorMessage } from 'types/auth'

// # Common
export interface AsyncErrorResponse {
  error: string
  message: string
}

// # Join
interface JoinRequest {
  email: string
  password: string
}
export type JoinResponse = 'success' | 'fail'

// ## Email
export type checkDuplicationResponse = true | false | null

export type SendCodeResponse = 'success' | 'fail' | EmailErrorMessage | 'tooManyRequest'

export interface CheckCodeRequest {
  email: string
  code: string
}
export type CheckCodeResponse = 'success' | 'fail' | EmailErrorMessage
