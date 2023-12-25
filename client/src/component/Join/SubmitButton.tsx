import { SubmitValidationInfo } from 'types/auth'
import { isSubmitValidationKey } from 'utils/typeFilter'

interface SubmitButtonProps {
  submitPassState: SubmitValidationInfo
  children: React.ReactNode
}

const validateSubmitIsPass = (submitPassStateObject: SubmitValidationInfo) => {
  for (let key in submitPassStateObject) {
    if (isSubmitValidationKey(key) && !submitPassStateObject[key]) {
      return false
    }
  }

  return true
}

// -> 텍스트는 children으로 받고
// -> 관련 state 객체를 모두 객체로 묶어서 props로 내려준다.
const SubmitButton = ({ submitPassState, children }: SubmitButtonProps) => {
  return (
    <button type='submit' disabled={!validateSubmitIsPass(submitPassState)}>
      {children}
    </button>
  )
}

export default SubmitButton
