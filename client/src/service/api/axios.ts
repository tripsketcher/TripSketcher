import axios from 'axios'
import {
  AsyncErrorResponse,
  SendCodeResponse,
  CheckCodeResponse,
  JoinResponse,
  checkDuplicationResponse,
} from 'types/async'

export enum HttpStatusCode {
  BadRequest = 400,
  Unauthorized = 401, // when 401 error ocurred, need to logout whatever
  Forbidden = 403,
  Conflict = 409,
  TooManyRequests = 429,
  // 추가적인 상태 코드
}

// Axios instance
export const $axios = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
})

// Error handling
// export const axiosErrorHandler = (error: unknown): AsyncErrorResponse => {
//   // 1. Axios의 에러 처리
//   // - 비동기 요청에서 처리되는 에러가 여기에 해당된다.
//   // - 서버에서 에러코드를 보내는 것도 여기에 해당된다.
//   if (axios.isAxiosError(error) && error.response) {
//     const statusCode = error.response.status
//     const errorMessage = error.response.data.message || 'An error occurred'

//     return { error: errorMessage, statusCode } // AsyncErrorResponse 형태로 반환
//   }

//   // 2. Axios외의 다른 에러 처리
//   // - 네트워크 오류, 요청 설정 오류, 취소된 요청등으로 인한 에러는 여기서 처리된다.
//   return { error: 'A network or configuration error occurred', statusCode: null }
// }

export const handleEmailDuplicationError = (error: unknown): checkDuplicationResponse => {
  if (axios.isAxiosError(error)) {
    console.log('에러 발생')
    const statusCode = error.response?.status
    switch (statusCode) {
      case HttpStatusCode.Conflict:
        // 409 Conflict 처리
        return { data: true }
      case HttpStatusCode.BadRequest:
        // 400 BadRequest 처리
        alert('요청이 실패되었습니다. 다시 시도해주세요.')
        return { data: null }
    }
    alert('서버와 연결이 불안정합니다. 나중에 다시 시도해주세요.')
    return { data: null }
  } else {
    alert('네트워크나 환경 구성에서  문제가 발생했습니다.')
    return { data: null }
  }
}

export const handleSendCodeError = (error: unknown): SendCodeResponse => {
  if (axios.isAxiosError(error)) {
    console.log('에러 발생')
    const statusCode = error.response?.status
    switch (statusCode) {
      case HttpStatusCode.Conflict:
        // 409 Conflict 처리
        return { data: 'duplicatedEmail' }
      case HttpStatusCode.TooManyRequests:
        // 429 TooManyRequests 처리
        alert('인증 코드 입력 발송 횟수를 초과하였습니다. 시간 만료 이후 다시 시도해주세요.')
        return { data: 'tooManyRequest' }
    }
    alert('서버와 연결이 불안정합니다. 나중에 다시 시도해주세요.')
    return { data: 'fail' }
  } else {
    alert('네트워크나 환경 구성에서  문제가 발생했습니다.')
    return { data: 'fail' }
  }
}

export const handleCheckCodeError = (error: unknown): CheckCodeResponse => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status

    switch (statusCode) {
      case HttpStatusCode.Conflict:
        // 409 Conflict 처리
        return { data: 'duplicatedEmail' }
      case HttpStatusCode.BadRequest:
        // 400 BadRequest 처리
        alert('요청이 실패되었습니다. 다시 시도해주세요.')
        return { data: 'fail' }
      case HttpStatusCode.TooManyRequests:
        // 429 TooManyRequests 처리
        alert('인증 코드 입력 횟수를 초과했습니다. 새로운 인증 코드를 발급 후 다시 시도해주세요.')
        return { data: 'fail' }
    }

    return { data: 'fail' }
  } else {
    // return { error: 'NonAxiosError', message: '비 Axios 에러 발생' }
    alert('비 Axios 에러 발생')
    return { data: 'fail' }
  }
}

export const handleSubmitJoinInfoError = (error: unknown): JoinResponse => {
  if (axios.isAxiosError(error)) {
    console.log('에러 발생')
    const statusCode = error.response?.status
    switch (statusCode) {
      case HttpStatusCode.Forbidden:
        alert('회원 가입 요청이 실패하였습니다. 잠시 후 다시 시도해주세요.')
        return 'fail'
    }
    alert('서버와 연결이 불안정합니다. 나중에 다시 시도해주세요.')
    return 'fail'
  } else {
    alert('네트워크나 환경 구성에서  문제가 발생했습니다.')
    return 'fail'
  }
}
