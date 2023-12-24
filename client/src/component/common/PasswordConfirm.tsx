import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { PwType, PwConfirmMessageType, ValidateSubmitIsPassFunc } from 'types/auth'

import { messageInfo, pwTypeInfo } from 'utils/const/auth'

import styles from './PasswordConfirm.module.scss'
import { ClosedPwIcon, OpenedPwIcon } from 'assets/svgs'
import { useCheckSubmitValidation } from 'hooks/useCheckSubmitValidation'

interface PasswordConfirmProps {
  type: PwType
  firstPw: string
  setSubmitPassState: Dispatch<SetStateAction<boolean>>
}

const PasswordConfirm = ({ type, firstPw, setSubmitPassState }: PasswordConfirmProps) => {
  const [pwMessage, setPwMessage] = useState<PwConfirmMessageType | null>(null)
  const [isPwHided, setIsPwHided] = useState<boolean>(true)
  const pwRef = useRef<HTMLInputElement>(null)

  // passwordConfirm에 대한 유효성 검사
  const checkPwConfirmIsSubmittable: ValidateSubmitIsPassFunc = (pwMessage) => {
    return pwMessage === 'validPwConfirm'
  }
  useCheckSubmitValidation(pwMessage, checkPwConfirmIsSubmittable, setSubmitPassState)

  // password컴포넌트의 text 변경시 일치여부 재검사
  const checkSamePw = (pwText: string) => {
    if (pwText.length === 0 || firstPw.length === 0) {
      setPwMessage(null)
    } else if (pwText !== firstPw) {
      setPwMessage('notMatchedPw')
    } else {
      setPwMessage('validPwConfirm')
    }
  }
  useEffect(() => {
    if (pwRef.current) {
      checkSamePw(pwRef.current.value)
    }
  }, [firstPw])

  // event handler
  // const handlePwFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  //   setPwMessage(null)
  // }
  const handleCheckSamePw = (event: React.FocusEvent<HTMLInputElement>) => {
    const secondPw = event.currentTarget.value
    checkSamePw(secondPw)
  }
  const handleEyeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPwHided((pre) => !pre)
  }

  return (
    <div>
      <label>
        <p>{pwTypeInfo[type]}</p>
        <input
          type={isPwHided ? 'password' : 'text'}
          name={type}
          placeholder='2종류 이상의 문자를 조합하여 8자 이상 입력'
          required
          ref={pwRef}
          // onFocus={handlePwFocus}
          onChange={handleCheckSamePw}
        />
      </label>
      {isPwHided ? (
        <button type='button' onClick={handleEyeClick}>
          <ClosedPwIcon className={styles.pwIcon} />
          <p className={styles.pwButtonText}>비밀번호 가리기 버튼</p>
        </button>
      ) : (
        <button type='button' onClick={handleEyeClick}>
          <OpenedPwIcon className={styles.pwIcon} />
          <p className={styles.pwButtonText}>비밀번호 표시 버튼</p>
        </button>
      )}

      {pwMessage && <p>{messageInfo[pwMessage]}</p>}
    </div>
  )
}

export default PasswordConfirm
