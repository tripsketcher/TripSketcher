import {
  EmailErrorMessage,
  EmailMessageType,
  SubmitValidationKeyType,
  JoinValidationKeys,
  PwChangeValidationKeys,
} from 'types/auth'

export const isEmailErrorMessage = (
  emailMessage: EmailMessageType | string | null
): emailMessage is EmailErrorMessage => {
  return emailMessage === 'notEmailFormat' || emailMessage === 'tooLongEmail' || emailMessage === 'duplicatedEmail'
}

export const isJoinValidationKey = (key: string | JoinValidationKeys): key is JoinValidationKeys => {
  return 'email' === key || 'password' === key || 'passwordConfirm' === key
}
export const isPwChangeValidationKey = (key: string | PwChangeValidationKeys): key is PwChangeValidationKeys => {
  return 'currentPw' === key || 'newPw' === key || 'newPwConfirm' === key
}
export const isSubmitValidationKey = (key: string): key is SubmitValidationKeyType => {
  return isJoinValidationKey(key) || isPwChangeValidationKey(key)
}
