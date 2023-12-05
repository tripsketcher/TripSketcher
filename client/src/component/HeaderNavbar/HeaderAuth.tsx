import React from 'react'

import styles from './HeadNavbar.module.scss'
import { NavLink } from 'react-router-dom'

// TODO: 유저 정보 여부에 따라 다르게 표현하도록 변경해주어야 한다.
// -> userInfo가 없다면 로그인, 회원가입 보여주기
// -> userInfo가 있다면 사용자 이름, 프로필 사진 보여주고 해당 프로필 사진을 클릭할 경우 회원 정보 수정 및 로그아웃 버튼 보이도록 만들어주기
//    (hover 됐을 경우 opacity 주고 cursor로 마우스 포인터 바꿔줘야한다.)

const HeaderAuth = () => {
  return (
    <div className={styles.authInfo}>
      <>
        <NavLink to='/login' className={styles.loginButton}>
          <button type='button'>로그인</button>
        </NavLink>
        <NavLink to='/join' className={styles.JoinButton}>
          <button type='button'>회원가입</button>
        </NavLink>
      </>
    </div>
  )
}

export default HeaderAuth
