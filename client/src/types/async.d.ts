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
export interface checkDuplicationResponse {
  data: true | false | null
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
