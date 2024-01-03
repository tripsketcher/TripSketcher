import { ReactNode, useCallback, useEffect, useState } from 'react'

import { useRouter } from 'hooks/useRouter'

import { useUserStore } from 'store/auth'
import { getCurrentUserApi } from 'service/api/auth'

import { AdminRole, User } from 'types/user.d'
import {
  clearUrlBeforeAuthPage,
  getRoutePathBeforeAuthPage,
  getUrlBeforeAuthPage,
  setUrlBeforeAuthPage,
} from 'service/storage/urlBeforeAuth'

interface WithAuthLayoutProps {
  children: ReactNode
  checkAdmin?: boolean
}

// 인증을 수행하는 로직을 공통적으로 수행하게 만드는 컴포넌트
// -> children이 바꿀 때마다 이전 page url에 등록을 해줘야 한다.
const WithAuthLayout = ({ checkAdmin, children }: WithAuthLayoutProps) => {
  const { accessToken, userInfo, setUserInfo } = useUserStore()
  const { routeTo, currentPath } = useRouter()

  // Check Authentication
  // - 유정 정보를 받아와서 setting
  // - 유저 정보가 없다면 login 페이지로 이동
  // - 자식 요소가 변경될 때(라우터가 변경될 때)마다 로그인 유무를 검사하도록 설정
  const fetchUserProfile = useCallback(async () => {
    const userProfileRes = await getCurrentUserApi(accessToken ? accessToken : '')

    // api 요청 결과 없을 때 login page로 이동, 로그인 후 다시 해당 페이지로 이동
    if (userProfileRes.data === null) {
      routeTo('/login')
      return
    }

    userProfileRes.data && setUserInfo(userProfileRes.data)
  }, [])

  useEffect(() => {
    fetchUserProfile()
  }, [children])

  // After Check Authentication
  // WithoutAuthOnly나 Authorization 2 중 1개 검사 수행
  useEffect(() => {
    // Check Authorization.
    // - 접근하는 유저가 권한이 없는 경우에는 로그인 페이지 대신 Main page로 이동
    // - Main page는 접근 권한이 없어도 이용할 수 있는 페이지를 의미한다.
    if (checkAdmin && !userInfo?.roles?.includes(AdminRole)) {
      routeTo('/page-a')
    }
  }, [userInfo])

  // 유저 정보를 받아와 유효한지 검사하기 이전에는 loading 페이지가 보여져야 한다.
  if (userInfo === null) return <div>loading...</div>

  // 아래의 경우를 모두 만족하는 경우 목표하고 있는 페이지가 렌더링되게 된다.
  // 1. 유저 정보를 받아온 후
  // 2. 해당 유저가 해당 페이지에 대해 적절한 권한을 가지고 있는 경우
  return <div>{children}</div>
}

export default WithAuthLayout
