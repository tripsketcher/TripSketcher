import React from 'react'
import { joinValidationType } from 'types/auth'

interface JoinSubmitButtonProps {
  submitPassState: joinValidationType
  setSubmitPassState: React.Dispatch<React.SetStateAction<joinValidationType>>
}

const JoinSubmitButton = ({}: JoinSubmitButtonProps) => {
  return <button>회원가입</button>
}

export default JoinSubmitButton
