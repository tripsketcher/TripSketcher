import React from 'react'
import { JoinValidationInfo } from 'types/auth'

interface JoinSubmitButtonProps {
  submitPassState: JoinValidationInfo
  setSubmitPassState: React.Dispatch<React.SetStateAction<JoinValidationInfo>>
}

// -> 텍스트는 children으로 받고
// -> 관련 state 객체를 모두 객체로 묶어서 props로 내려준다.
const JoinSubmitButton = ({}: JoinSubmitButtonProps) => {
  return <button>회원가입</button>
}

export default JoinSubmitButton
