import { EmailErrorMessage, EmailMessageType } from 'types/auth'

export const isEmailErrorMessage = (
  emailMessage: EmailMessageType | string | null
): emailMessage is EmailErrorMessage => {
  return emailMessage === 'notEmailFormat' || emailMessage === 'tooLongEmail' || emailMessage === 'duplicatedEmail'
}
