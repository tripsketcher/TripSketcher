import { useRouter } from 'hooks/useRouter'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { getCurrentUserApi } from 'service/api/auth'
import { getRoutePathBeforeAuthPage, getUrlBeforeAuthPage } from 'service/storage/urlBeforeAuth'
import { useUserStore } from 'store/auth'
import { User } from 'types/user'

interface WithoutAuthOnlyLayoutProps {
  children: ReactNode
}

// GeneralLayout이 children이 바뀔 때 마다 userProfile을 갱신한다.
// 인증이 있으면 안되는 페이지들이 여기에 들어오게 된다.(로그인, 회원가입)
// -> 여기서는 현재 url을 이전 url로 등록하지 않는다.
// -> 이 페이지가 아닌 페이지들에 대해서만 이전 url로 등록해야한다.
const WithoutAuthOnlyLayout = ({ children }: WithoutAuthOnlyLayoutProps) => {
  const { accessToken, setUserInfo } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)
  const { routeTo } = useRouter()

  // Filtering logic
  // - 인증 정보가 있으면 안되기 때문에 인증 정보가 있다면 이전 페이지로 돌려준다.
  const fetchUserProfile = useCallback(async () => {
    const userProfileRes = await getCurrentUserApi(accessToken ? accessToken : '')
    userProfileRes.data = null
    userProfileRes.data && setUserInfo(userProfileRes.data)

    if (userProfileRes.data !== null) {
      const returnPageUrl = getRoutePathBeforeAuthPage(true)
      routeTo(returnPageUrl)
      return
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchUserProfile()
  }, [])

  // userProfile 정보가 loading 됐는지 여부에 따라 화면이 달라지도록
  return isLoading ? <div>loading...</div> : <div>{children}</div>
}

export default WithoutAuthOnlyLayout
