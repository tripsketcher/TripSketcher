import axios from 'axios'
import { BASE_URL } from 'utils/const/api'
import {
  handleSendCodeError,
  handleCheckCodeError,
  handleEmailDuplicationError,
  handleSubmitJoinInfoError,
} from './axios'
import {
  AsyncErrorResponse,
  SendCodeResponse,
  CheckCodeResponse,
  checkDuplicationResponse,
  JoinRequest,
  JoinResponse,
} from 'types/async'

// # Join
// Todo: {data: 내용}부분으로 응답 형식이 정해져 있는 건 data없는 형식으로 고치기
// ## Email
export const checkDuplicationApi = async (email: string): Promise<checkDuplicationResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/users/email`, { email })
  //   return  true
  // } catch (error) {
  //   return handleEmailDuplicationError(error)
  // }
  return false
}

export const sendVerificationCodeApi = async (email: string): Promise<SendCodeResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/users/email`, { email })
  //   return apiRes.data
  //   // return {data: 'success'}
  // } catch (error) {
  //   return handleSendCodeError(error)
  // }
  return 'success'
}

export const checkVerificationCodeApi = async (code: string): Promise<CheckCodeResponse> => {
  // try {
  //   const apiRes = await axios.post(`${BASE_URL}/api/uses/email/code`, { code })
  //   // return apiRes.data
  //   return { data: 'success' }
  // } catch (error) {
  //   return handleCheckCodeError(error)
  // }
  return 'success'
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
