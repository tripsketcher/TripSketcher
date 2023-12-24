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
export interface JoinValidationInfo {
  email: boolean
  password: boolean
  passwordConfirm: boolean
}

// UserInfo Change Type
export interface PwChangeValidationInfo {
  currentPw: boolean
  newPw: boolean
  newPwConfirm: boolean
}

type ValidateSubmitIsPassFunc = (state: unknown) => boolean
