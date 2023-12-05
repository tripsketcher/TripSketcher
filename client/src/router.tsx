/* eslint-disable import/no-extraneous-dependencies */
import { Navigate, createBrowserRouter, redirect } from 'react-router-dom'
import { Router as RemixRouter } from '@remix-run/router/dist/router'

import type { HeaderElement } from './types/header'

import GeneralLayout from './component/layout/GeneralLayout'
import Join from './pages/Join'
import Login from './pages/Login'
import UserInfo from './pages/UserInfo'
import Map from './pages/Map'
import CourseList from './pages/CourseList'
import Review from './pages/Review'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'

// Router에 쓰이는 공통되는 타입
interface RouterBase {
  id: number // 페이지 아이디 (반복문용 고유값)
  path: string // 페이지 경로
  label: string // 사이드바에 표시할 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
}

// ※ 추가적인 검증을 위해 타입으로 라우터를 구분한다.
// - checkAuth : 사용자 인증 검사를 할지 말지 결정하는 조건
// - checkAdmin : 인증을 수행하는 사용자를 대상으로 인증 성공 시 "추가적으로 admin 검사를 수행"할지 말지 결정하는 조건
// - checkWithoutAuthOnly : 인증을 수행하는 사용자를 대상으로 인증 성공 시 "입장 거부 처리 로직을 수행"할지 말지 결정하는 조건

// 관리자를 제외한 페이지를 라우팅하는 라우터 객체 타입
// - 인증이 필요한 페이지 + 인증이 필요없는 페이지에 대한 타입을 모두 나타낸다.
interface UserAccessibleRouterElement extends RouterBase {
  checkAuth?: boolean // 인증이 필요한 페이지 여부
  checkAdmin?: false
  // or checkAdmin?: never
  checkWithoutAuthOnly?: boolean
}
// 로그인한 경우 들어오면 안되는 페이지를 정의하는 타입(ex: join & login)
// - 인증이 필수로 필요하고, 인증이 성공한 경우에만 사용자인
// 유저가 인증 상태이여도 해당 페이지에는 못들어온다는 걸 표시
interface NoneUserOnlyAccessibleRouterElement extends RouterBase {
  checkAuth?: false
  checkAdmin?: false
  checkWithoutAuthOnly?: false
}
// 권한이 있는 사용자만 들어갈 수 있도록 정의하는 타입
interface AdminAccessibleRouterElement extends RouterBase {
  checkAuth: true // 인증이 필요한 페이지 여부
  checkAdmin?: boolean // 어드민 페이지 여부, checkAuth 속성이 true일 경우에만 동작하도록 처리
  checkWithoutAuthOnly?: false // 인증을 해야하만 들어갈 수 있는 페이지이기 때문에 false로 설정
}

// Router로 사용될 수 있는 모든 타입들을 나타낸다.
type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement | NoneUserOnlyAccessibleRouterElement

// 실제 Router로 사용되는 데이터들
const routerData: RouterElement[] = [
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
    checkAuth: false,
    checkWithoutAuthOnly: true,
  },
  {
    id: 2,
    path: '/join',
    label: 'Join',
    element: <Join />,
    checkAuth: false,
    checkWithoutAuthOnly: true,
  },
  {
    id: 3,
    path: '/admin',
    label: 'Admin',
    element: <AdminPage />,
    checkAuth: true,
    checkAdmin: true,
  },
  {
    id: 4,
    path: '/user-info',
    label: 'UserInfo',
    element: <UserInfo />,
    checkAuth: true,
  },
  {
    id: 5,
    path: '/map/:type',
    label: 'Map',
    element: <Map />,
    checkAuth: false,
  },
  { id: 6, path: '/course-list', label: 'CourseList', element: <CourseList />, checkAuth: true },
  {
    id: 7,
    path: '/review',
    label: 'Review',
    element: <Review />,
    checkAuth: false,
  },
  {
    id: 8,
    path: '/*',
    label: 'NotFound',
    element: <NotFound />,
    checkAuth: false,
  },
  {
    id: 9,
    path: '/',
    label: 'DefaultPage',
    element: <Navigate to='/review' replace={true} />,
    checkAuth: false,
  },
]

// 어드민 전용 페이지이거나 auth가 필요한 페이지는 WithAuthLayout으로 감싸기
export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    if (router.checkAuth) {
      // Accessible page with auth
      // - example : user without admin role & admin page

      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      }
    }

    // withAuth는 인증 확인이 필요한 페이지의 경우에 위의 필터를 수행
    // 인증 정보가 있으면 안되는 페이지에 대한 라우터 정보 생성
    if (router.checkWithoutAuthOnly) {
      return {
        path: router.path,
        element: <GeneralLayout>{router.element}</GeneralLayout>,
      }
    }

    return {
      path: router.path,
      element: <GeneralLayout>{router.element}</GeneralLayout>,
    }
  })
)
// routerData에서 path와 element 속성 배열을 생성하여 createBrowserRouter로 Router 객체 생성
// 어드민 전용 페이지는 checkAdmin = true를 전달, 아니면 false를 전달

const excludeHeaderList = ['Join', 'Login', 'UserInfo', 'NotFound', 'DefaultPage']

// 인증 정보가 필요한 HeaderContent 필터링하기
export const withoutAuthHeaderContent: HeaderElement[] = routerData.reduce((prev, router) => {
  // checkAuth 프로퍼티를 추가하여 admin 페이지로 가는 사이드바 요소를 선택적으로 렌더링 (어드민에게만 보이도록 하기)
  if (router.checkAuth) return prev

  if (excludeHeaderList.includes(router.label)) {
    return prev
  }

  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      isAdminOnly: router.checkAdmin,
    },
  ]
}, [] as HeaderElement[])

// 모든 HeaderContent
export const withAuthHeaderContent: HeaderElement[] = routerData.reduce((prev, router) => {
  if (excludeHeaderList.includes(router.label)) {
    return prev
  }

  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      isAdminOnly: router.checkAdmin,
    },
  ]
}, [] as HeaderElement[])
