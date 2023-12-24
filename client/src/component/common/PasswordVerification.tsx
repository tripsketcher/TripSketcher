import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { PwType, PwMessageType, ValidateSubmitIsPassFunc } from 'types/auth.d'

import { useCheckSubmitValidation } from 'hooks/useCheckSubmitValidation'

import { checkContinuousInput } from 'utils/auth'
import { messageInfo, pwTypeInfo } from 'utils/const/auth'

import styles from './PasswordVerification.module.scss'
import { ClosedPwIcon, OpenedPwIcon } from 'assets/svgs'

interface PasswordVerificationProps {
  type: PwType
  setPassword?: Dispatch<SetStateAction<string>> // 비밀번호와 비밃번호 확인과을 함께 작성하는 경우 상위 컴포넌트로 현재 pw 값을 넘겨야할 필요가 있다.
  setSubmitPassState: Dispatch<SetStateAction<boolean>>
}

// 비밀번호의 유효성 검사가 필요할때 사용되는 컴포넌트
const PasswordVerification = ({ type, setPassword, setSubmitPassState }: PasswordVerificationProps) => {
  const [pwMessage, setPwMessage] = useState<PwMessageType | null>(null)
  const [isPwHided, setIsPwHided] = useState<boolean>(true)

  const checkPwIsSubmittable: ValidateSubmitIsPassFunc = (pwMessage) => {
    return pwMessage === 'lowSafePw' || pwMessage === 'middleSafePw' || pwMessage === 'highSafePw'
  }
  useCheckSubmitValidation(pwMessage, checkPwIsSubmittable, setSubmitPassState)

  // event handlers.
  const handlePwValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pwLevel: number = 0

    // 아이디는 6-12자의 영문 소문자와 숫자만 사용 가능
    const pwText = event.currentTarget.value
    setPassword && setPassword(pwText)

    if (pwText.length === 0) {
      setPwMessage(null)
      return
    }

    // regular expressions
    const middlePwReg = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]{8,15}$/g
    const longPwReg = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]{16,64}$/g
    const singleKindReg = /^(?:[A-Za-z]+|\d+|[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]+)$/ // 입력된 문자가 한 종류인 경우
    const shortPwReg = /^.{1,7}$/ // 비밀번호 길이가 1-8 사이인지 판별
    const tooLongPwReg = /^.{65,}$/
    const validCharReg = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]+$/g // 공백이나 유효하지 않은 문자가 포함된 경우
    const tripleSameReg = /(.)\1\1+/ // 같은문자가 3번 이상 반복되는 경우

    // case 1. 유효한 비밀번호
    if (middlePwReg.test(pwText) && !singleKindReg.test(pwText)) {
      // 8-16 자리 유효한 비밀번호
      pwLevel += 1
      // 추가 점수 로직
      if (!tripleSameReg.test(pwText)) {
        pwLevel += 1
      }
      if (!checkContinuousInput(pwText)) {
        pwLevel += 1
      }
      setPwLevel(pwLevel)
      return
    }
    if (longPwReg.test(pwText)) {
      // 16 자리이상 유효한 비밀번호
      pwLevel += 1
      // 추가 점수 로직
      if (!tripleSameReg.test(pwText)) {
        pwLevel += 1
      }
      if (!checkContinuousInput(pwText)) {
        pwLevel += 1
      }
      if (!singleKindReg.test(pwText)) {
        pwLevel += 1
      }

      setPwLevel(pwLevel)
      return
    }

    // case 2. 유효하지 않은 비밀 번호
    if (!validCharReg.test(pwText)) {
      setPwMessage('unableChar')
      return
    }
    if (shortPwReg.test(pwText)) {
      setPwMessage('shortPw')
      return
    }
    if (singleKindReg.test(pwText)) {
      setPwMessage('singleKindPw')
    }
    if (tooLongPwReg.test(pwText)) {
      setPwMessage('tooLongPw')
    }
  }

  const handleEyeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPwHided((pre) => !pre)
  }

  // 불가, 낮음, 보통, 안전 4개의 상태로 색 관리
  const setPwLevel = (pwLevel: number) => {
    // 유효한 비밀번호이면 낮음 등급 -> yellow색으로 표시
    if (pwLevel === 1) {
      setPwMessage('lowSafePw')
      return
    }

    // 추가 조건을 1개를 만족하면 보통 등급 -> orange색으로 표시
    if (pwLevel === 2) {
      setPwMessage('middleSafePw')
      return
    }

    // 추가 조건을 2개 이상 만족하면 높음 등급 -> green색으로 표시
    setPwMessage('highSafePw')
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
          onChange={handlePwValidation}
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

export default PasswordVerification
