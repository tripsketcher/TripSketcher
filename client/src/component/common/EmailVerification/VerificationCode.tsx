import React, { useState } from 'react'
import { checkVerificationCodeApi } from 'service/api/auth'
import { EmailMessageType } from 'types/auth'

const INITIAL_TIME = 180

interface VerificationCodeProps {
  pageExpirationTimeRef?: React.MutableRefObject<number>
  verificationTime: number
  setVerificationTime: React.Dispatch<React.SetStateAction<number>>
  setShowVerificationSection: React.Dispatch<React.SetStateAction<boolean>>
  setEmailMessage: React.Dispatch<React.SetStateAction<EmailMessageType | null>>
}

const VerificationCode = ({
  verificationTime,
  setVerificationTime,
  setShowVerificationSection,
  setEmailMessage,
  pageExpirationTimeRef,
}: VerificationCodeProps) => {
  const [verificationCode, setVerificationCode] = useState('')

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const codeText = event.currentTarget.value
    setVerificationCode(codeText)
  }
  const handleCheckVerificationCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const checkCodeRes = await checkVerificationCodeApi(verificationCode)

    if (checkCodeRes.data === 'fail') return
    if (checkCodeRes.data === 'duplicatedEmail') {
      setShowVerificationSection(false)
      setVerificationTime(INITIAL_TIME)
      setEmailMessage('duplicatedEmail')
      return
    }

    setShowVerificationSection(false)
    setVerificationTime(INITIAL_TIME)
    setEmailMessage('certifiedEmail')
    // 페이지 만료 시간을 정의하는 페이지(회원가입)에서 사용될 때 해당 기능을 사용한다.
    if (pageExpirationTimeRef?.current) pageExpirationTimeRef.current = 60 * 60
  }

  const changeTimeToMinuteFormat = (verificationTime: number): string => {
    const minutes = Math.floor(verificationTime / 60)
    const seconds = verificationTime % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div>
      <label>
        <input type='text' name='certify-code' placeholder='인증코드를 입력해주세요.' onChange={handleCodeChange} />
        <p>{changeTimeToMinuteFormat(verificationTime)}</p>
      </label>
      <button onClick={handleCheckVerificationCode} disabled={verificationTime <= 0 || verificationCode.length === 0}>
        인증 확인
      </button>
    </div>
  )
}

export default VerificationCode
