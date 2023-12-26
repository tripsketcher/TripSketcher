import axios from 'axios'
import { BASE_URL } from 'utils/const/api'
import {
  handleSendCodeError,
  handleCheckCodeError,
  handleEmailDuplicationError,
  handleSubmitJoinInfoError,
  handleSubmitLoginInfoError,
} from './axios'
import {
  AsyncErrorResponse,
  SendCodeResponse,
  CheckCodeResponse,
  checkDuplicationResponse,
  JoinRequest,
  JoinResponse,
  LoginRequest,
  LoginResponse,
} from 'types/async'
// import { isSendCodeErrorResponse } from 'utils/typeFilter'

// # Join

// ## Email
export const checkDuplicationApi = async (email: string): Promise<checkDuplicationResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/users/email`, { email })
  //   return { data: true }
  // } catch (error) {
  //   return handleEmailDuplicationError(error)
  // }
  return { data: false }
}

// 인증 코드 발송 Api

export const sendVerificationCodeApi = async (email: string): Promise<SendCodeResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/users/email`, { email })
  //   return apiRes.data
  //   // return {data: 'success'}
  // } catch (error) {
  //   return handleSendCodeError(error)
  // }
  return { data: 'success' }
}

export const checkVerificationCodeApi = async (code: string): Promise<CheckCodeResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/uses/email/code`, { code })
  //   // return apiRes.data
  //   return { data: 'success' }
  // } catch (error) {
  //   return handleCheckCodeError(error)
  // }
  return { data: 'success' }
}

// ## Submit button
export const submitJoinInfoApi = async (args: JoinRequest): Promise<JoinResponse> => {
  // try {
  //   await axios.post(`${BASE_URL}/users/user`, {
  //     args,
  //   })

  //   return 'success'
  // } catch (error) {
  //   return handleSubmitJoinInfoError(error)
  // }
  return 'success'
}

// # Login
export const submitLoginInfoApi = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post('API_ENDPOINT', { email, password })
    return { accessToken: response.headers['authorization'] }
  } catch (error) {
    return handleSubmitLoginInfoError(error)
  }
}
