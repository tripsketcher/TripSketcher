import { useEffect, useRef, useState } from 'react'
import { useRouter } from '../hooks/useRouter'

import SubmitButton from 'component/Join/SubmitButton'
import Email from 'component/common/EmailVerification'
import Password from 'component/common/PasswordVerification'
import PasswordConfirm from 'component/common/PasswordConfirm'

import { submitJoinInfoApi } from 'service/api/auth'

import styles from './Join.module.scss'

// TODO: Email, Password는 재사용 가능하게 디자인 할 것(회원가입, 로그인, 회원정보 수정(예는 비밀번호만))
// 유효성 검사가 필요한 항목들은 화면을 새로 그려줘야하기 때문에 해당 내용을 state로 관리해주어야한다.
// - 일반적인 경우에는 onFocusout 이벤트나 blur이벤트로 관리해주기
// - 아이디 및 비밀번호 유효성 검사의 경우에는 onChangeEvent
const Join = () => {
  const [password, setPassword] = useState('')

  // check submit is available individually
  const [isEmailSubmitValid, setIsEmailSubmitValid] = useState(false)
  const [isPwSubmitValid, setIsPwSubmitValid] = useState(false)
  const [isPwConfirmSubmitValid, setIsPwConfirmSubmitValid] = useState(false)
  const submitStateObject = {
    email: isEmailSubmitValid,
    password: isPwSubmitValid,
    passwordConfirm: isPwConfirmSubmitValid,
  }

  const pageExpirationTimeRef = useRef(60 * 60) // 3600초(1시간)
  const { routeTo } = useRouter()

  // 페이지 만료 시간 설정
  useEffect(() => {
    let intervalId = setInterval(() => {
      if (pageExpirationTimeRef.current > 0) {
        pageExpirationTimeRef.current -= 1
        // console.log(pageExpirationTimeRef.current)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // event handlers
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // get formData value
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log({ email, password })

    const joinResult = await submitJoinInfoApi({
      email,
      password,
    })

    if (joinResult === 'fail') {
      alert('회원가입에 과정에 문제가 발생하였습니다.')
      return
    }

    routeTo('/login')
  }

  return (
    <div className={styles.joinWrapper}>
      <section className={styles.joinMain}>
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit} className={styles.joinForm}>
          <Email setSubmitPassState={setIsEmailSubmitValid} pageExpirationTimeRef={pageExpirationTimeRef} />
          <Password type='pw' setPassword={setPassword} setSubmitPassState={setIsPwSubmitValid} />
          <PasswordConfirm type='pwConfirm' firstPw={password} setSubmitPassState={setIsPwConfirmSubmitValid} />
          <SubmitButton submitPassState={submitStateObject}>회원가입</SubmitButton>
        </form>
      </section>
    </div>
  )
}

export default Join
