// 페이지가 unMount될 때
import { DEFAULT_URL, DEFAULT_URL_WITH_AUTH } from 'utils/const/api'
// -> 현재 페이지를 beforeUrl으로 설정
// -> 외부에서 접속햇을 경우에는

// 서비스 외부 -> 내부
// 이전 기록이 계속 남아있따.. -> 서비스를 나갈때 이를 삭제해줘얗나다.
// - 서비스 내부 -> 외부 -> 내부(로그인 서비스)
// 서비스 내부 -> 내부

export const setUrlBeforeAuthPage = (currentUrl: string) => {
  const storage = globalThis?.sessionStorage
  if (!storage) return

  storage.setItem('urlBeforeAuthPage', currentUrl)
}

export const getUrlBeforeAuthPage = (): string | null => {
  const storage = globalThis?.sessionStorage
  if (!storage) return null

  const urlBeforeAuthPage = storage.getItem('urlBeforeAuthPage')
  return urlBeforeAuthPage
}

export const getRoutePathBeforeAuthPage = (hasAuth: boolean): string => {
  const fullUrl = getUrlBeforeAuthPage()
  if (!fullUrl) {
    return hasAuth ? DEFAULT_URL_WITH_AUTH : DEFAULT_URL
  }

  const urlInstance = new URL(fullUrl)
  const routePath = urlInstance.pathname + urlInstance.search

  return routePath
}

export const clearUrlBeforeAuthPage = () => {
  const storage = globalThis?.sessionStorage
  if (!storage) return

  storage.removeItem('urlBeforeAuthPage')
}
