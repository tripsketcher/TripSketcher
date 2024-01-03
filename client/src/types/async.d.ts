import { EmailErrorMessage } from './auth'
import { EmailErrorMessage } from 'types/auth'
import { User } from './user'

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

// # Login
export interface LoginRequest {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string | null
}

// # UserInfo
export interface UserInfoResponse {
  data: User | null
}
