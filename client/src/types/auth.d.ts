// # Join & Login's Input Message Type
export type EmailErrorMessage = 'notEmailFormat' | 'tooLongEmail' | 'duplicatedEmail'
export type EmailSuccessMessage = 'needToCertificate' | 'certifiedEmail'
export type EmailMessageType = EmailErrorMessage | EmailSuccessMessage
type PwErrorMessage = 'shortPw' | 'tooLongPw' | 'singleKindPw' | 'unableChar'
type PwSuccessMessage = 'lowSafePw' | 'middleSafePw' | 'highSafePw'
export type PwMessageType = PwErrorMessage | PwSuccessMessage
type PwConfirmErrorMessage = 'notMatchedPw'
type PwConfirmSuccessMessage = 'validPwConfirm'
export type PwConfirmMessageType = PwConfirmErrorMessage | PwConfirmSuccessMessage
type NicknameErrorMessage = 'unableChar' | 'duplicateNickname'
type NicknameSuccessMessage = 'validNickname'
export type NicknameMessageType = NicknameErrorMessage | NicknameSuccessMessage
type PhoneErrorMessage = 'notPhoneFormat'
type PhoneSuccessMessage = 'validPhone'
export type PhoneMessageType = PhoneErrorMessage | PhoneSuccessMessage

export type MessageType = {
  [key in EmailMessageType | PwMessageType | PwConfirmMessageType | NicknameMessageType | PhoneMessageType]: string
}
export type PwSafeType = 'dangerous' | 'normal' | 'safe'
export type PwType = 'pw' | 'pwConfirm' | 'currentPw' | 'newPw' | 'newPwConfirm'
export type PwTypeInfo = {
  [key in PwType]: string
}
// Input color type
type UnablePwColor = 'red'
type PwColorType = 'yellow' | 'orange' | 'green'
type FocusColor = 'blue'
export type ColorType = UnablePwColor | PwColorType | FocusColor
export type InputColorInfo = {
  focus: 'blue'
  error: 'red'
  dangerous: 'orange'
  normal: 'yellow'
  safe: 'green'
}

// Join Type
export type JoinValidationKeys = 'email' | 'password' | 'passwordConfirm'
export type JoinValidationInfo = {
  [key in JoinValidationKeys]: boolean
}

// UserInfo Change Type
export type PwChangeValidationKeys = 'currentPw' | 'newPw' | 'newPwConfirm'

export type PwChangeValidationInfo = {
  [key in PwChangeValidationKeys]: boolean
}
type SubmitValidationKeyType = JoinValidationKeys | JoinValidationKeys
export type SubmitValidationInfo = {
  [key in SubmitValidationKeyType]: boolean
}
type ValidateSubmitIsPassFunc = (state: unknown) => boolean
