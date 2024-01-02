import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import { checkDuplicationApi, sendVerificationCodeApi } from 'service/api/auth'
import { EmailMessageType, JoinValidationInfo, ValidateSubmitIsPassFunc } from 'types/auth'
import { messageInfo } from 'utils/const/auth'
import VerificationInput from './VerificationCode'
import { useCheckSubmitValidation } from 'hooks/useCheckSubmitValidation'

const INITIAL_TIME = 180

interface EmailVerificationProps {
  setSubmitPassState: React.Dispatch<React.SetStateAction<boolean>>
  pageExpirationTimeRef?: React.MutableRefObject<number>
}

const EmailVerification = ({ setSubmitPassState, pageExpirationTimeRef }: EmailVerificationProps) => {
  const [emailText, setEmailText] = useState('')
  const [showVerificationSection, setShowVerificationSection] = useState(false)
  const [verificationTime, setVerificationTime] = useState(0)
  const [emailMessage, setEmailMessage] = useState<EmailMessageType | null>(null)

  // Form Submit을 위한 Email 유효성 검증 로직
  const checkEmailIsSubmittable: ValidateSubmitIsPassFunc = (emailMessage) => {
    return emailMessage === 'certifiedEmail'
  }
  useCheckSubmitValidation(emailMessage, checkEmailIsSubmittable, setSubmitPassState)

  // 인증 요청 시간 갱신을 위한 로직
  useEffect(() => {
    let intervalId: number | null = null

    // 인증 타이머가 활성화되어 있고 남아있는 시간이 있다면 1초씩 줄여나간다.
    if (showVerificationSection && verificationTime > 0) {
      intervalId = setInterval(() => {
        setVerificationTime((prev) => prev - 1)
      }, 1000)
    } else if (showVerificationSection && verificationTime === 0) {
      if (intervalId !== null) clearInterval(intervalId)
    } else {
      setShowVerificationSection(false)
      setVerificationTime(INITIAL_TIME)
    }

    // 의존성이 변경되거나 컴포넌트가 unmount 될 때, return에 등록된 함수가 실행되게 된다.
    return () => {
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [showVerificationSection, setShowVerificationSection, verificationTime, setVerificationTime])

  // 디바운스 적용
  const debouncedSave = _.debounce((email) => {
    setEmailText(email)
  }, 500)
  const handleDebouncedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSave(event.currentTarget.value)
  }

  // 이메일 유효성 검사 수행
  // - 디바운스로 인해 이메일이 바뀔 때 마다 유효성 검증 수행
  const checkDuplication = async (email: string): Promise<boolean | null> => {
    const duplicationRes = await checkDuplicationApi(email)
    return duplicationRes
  }
  const checkEmailValidation = async (email: string) => {
    const validEmailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // 이메일 표준 정규식(email regex w3c)
    const tooLongEmailReg = /^.{50,}$/

    if (email.length === 0) {
      setEmailMessage(null)
      return
    }

    if (validEmailReg.test(email)) {
      const isDuplicated = await checkDuplication(email)
      if (tooLongEmailReg.test(email)) {
        setEmailMessage('tooLongEmail')
        return
      }
      if (isDuplicated === null) {
        // 에러가 발생한 경우 이전 값에서 아무 것도 바꾸지 않는다.
        return
      } else if (isDuplicated) {
        setEmailMessage('duplicatedEmail')
        return
      }
      setEmailMessage('needToCertificate')
      return
    }
    setEmailMessage('notEmailFormat')
  }
  useEffect(() => {
    checkEmailValidation(emailText)
  }, [emailText])

  // 서버에 이메일 인증 관련 api 호출
  const handleSendVerificationCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const sendingCodeRes = await sendVerificationCodeApi(emailText)
    console.log(sendingCodeRes, verificationTime)

    if (sendingCodeRes === 'fail') return
    if (sendingCodeRes === 'duplicatedEmail') {
      setEmailMessage('duplicatedEmail')
      return
    }

    setShowVerificationSection(true)
    setVerificationTime(INITIAL_TIME)
  }

  return (
    <>
      <div>
        <label>
          이메일
          <input type='text' name='email' placeholder='이메일을 입력해주세요.' onChange={handleDebouncedChange} />
        </label>
        <button type='button' disabled={emailMessage !== 'needToCertificate'} onClick={handleSendVerificationCode}>
          인증코드 발송
        </button>
      </div>
      {showVerificationSection && (
        <VerificationInput
          emailText={emailText}
          pageExpirationTimeRef={pageExpirationTimeRef}
          verificationTime={verificationTime}
          setVerificationTime={setVerificationTime}
          setShowVerificationSection={setShowVerificationSection}
          setEmailMessage={setEmailMessage}
        />
      )}
      {emailMessage !== null && <p>{messageInfo[emailMessage]}</p>}
    </>
  )
}

export default EmailVerification
