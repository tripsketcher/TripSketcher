import axios from 'axios'
import { BASE_URL } from 'utils/const/api'
import { SendCodeErrorHandler, checkCodeErrorHandler } from './axios'
import { AsyncErrorResponse, SendCodeResponse, CheckCodeResponse, checkDuplicationResponse } from 'types/async'
// import { isSendCodeErrorResponse } from 'utils/typeFilter'

// # Join

// ## Email
export const checkDuplicationApi = async (email: string): Promise<checkDuplicationResponse | AsyncErrorResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/users/email`, { email })
  //   return apiRes.data
  // } catch (error) {
  //   const errorResult = axiosErrorHandler(error)
  //   if (isSendCodeErrorResponse(errorResult)) {
  //     return errorResult
  //   }
  //   return errorResult
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
  //   return SendCodeErrorHandler(error)
  // }
  return { data: 'success' }
}

export const checkVerificationCodeApi = async (code: string): Promise<CheckCodeResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/uses/email/code`, { code })
  //   // return apiRes.data
  //   return { data: 'success' }
  // } catch (error) {
  //   return checkCodeErrorHandler(error)
  // }
  return { data: 'success' }
}
