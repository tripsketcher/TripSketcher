import { Dispatch, SetStateAction, useEffect } from 'react'
import { ValidateSubmitIsPassFunc } from 'types/auth'

export const useCheckSubmitValidation = (
  state: unknown,
  validateSubmitIsPass: ValidateSubmitIsPassFunc,
  setSubmitPassState: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    setSubmitPassState(validateSubmitIsPass(state))
  }, [state])
}
