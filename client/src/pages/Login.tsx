import { useState } from 'react'

import { useRouter } from 'hooks/useRouter'
import usePreviousPageCheck from 'hooks/usePreviousPageCheck'

import useUserStore from 'store/auth'

import { submitLoginInfoApi } from 'service/api/auth'

import styles from './Login.module.scss'
import { ClosedPwIcon, OpenedPwIcon } from 'assets/svgs'
import { DEFAULT_URL } from 'utils/const/api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPwHided, setIsPwHided] = useState<boolean>(true)
  const { setAccessToken } = useUserStore()
  const { routeTo } = useRouter()
  const isFromService = usePreviousPageCheck()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setEmail(value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setPassword(value)
  }
  const handleEyeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPwHided((pre) => !pre)
  }

  const handleLogin = async () => {
    const LoginRes = await submitLoginInfoApi({ email, password })
    const newAccessToken = LoginRes.accessToken
    if (newAccessToken === null) {
      return
    }

    setAccessToken(newAccessToken)

    const pageUrlBeforeLogin = new URL(document.referrer).pathname
    const returnPageUrl = isFromService ? pageUrlBeforeLogin : DEFAULT_URL
    routeTo(returnPageUrl)
  }

  return (
    <div>
      <label>
        이메일
        <input type='email' value={email} onChange={handleEmailChange} />
      </label>
      <div>
        <label>
          비밀번호
          <input type={isPwHided ? 'password' : 'text'} value={password} onChange={handlePasswordChange} />
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
      </div>
      <button onClick={handleLogin}>로그인</button>
      {/* 회원가입, 비밀번호 찾기 버튼 */}
    </div>
  )
}

export default Login
