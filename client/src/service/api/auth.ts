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
  CheckCodeRequest,
  CheckCodeResponse,
  checkDuplicationResponse,
  JoinRequest,
  JoinResponse,
} from 'types/async'

// # Join
// Todo: {data: 내용}부분으로 응답 형식이 정해져 있는 건 data없는 형식으로 고치기
// ## Email
export const checkDuplicationApi = async (email: string): Promise<checkDuplicationResponse> => {
  try {
    await axios.get(`${BASE_URL}/api/users/email/${email}`)
    return false
  } catch (error) {
    return handleEmailDuplicationError(error)
  }
}

export const sendVerificationCodeApi = async (email: string): Promise<SendCodeResponse> => {
  try {
    const apiRes = await axios.post(`${BASE_URL}/api/users/email`, { email })
    const tryCount = apiRes.data.data
    if (tryCount > 5) {
      alert(`하루 이메일 전송 횟수는 이메일당 10번으로 제한됩니다. 이메일 시도 횟수 : ${tryCount}`)
    }
    return 'success'
  } catch (error) {
    return handleSendCodeError(error)
  }
}

export const checkVerificationCodeApi = async (args: CheckCodeRequest): Promise<CheckCodeResponse> => {
  console.log(args)
  try {
    await axios.post(`${BASE_URL}/api/users/email/code`, { ...args })
    return 'success'
  } catch (error) {
    return handleCheckCodeError(error)
  }
  // return 'success'
}

// ## Submit button
export const submitJoinInfoApi = async (args: JoinRequest): Promise<JoinResponse> => {
  try {
    await axios.post(`${BASE_URL}/api/users/join`, {
      ...args,
    })
    return 'success'
  } catch (error) {
    return handleSubmitJoinInfoError(error)
  }
  // return 'success'
}
