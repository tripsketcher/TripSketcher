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
  nickname: string
  phone: string
}
export type JoinResResult = 'success' | 'fail'

// ## Email
export interface checkDuplicationResponse {
  data: boolean
}

export interface SendCodeResponse {
  data: 'success' | 'fail' | EmailErrorMessage | 'tooManyRequest'
}

export interface CheckCodeResponse {
  data: 'success' | 'fail' | EmailErrorMessage
}
// ## Nickname
// -
interface DuplicateNickNameResponse {}